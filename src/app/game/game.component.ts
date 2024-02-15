import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {
  Firestore,
  Unsubscribe,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Gamedata } from '../interfaces/gamedata.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  
  game: Game | any;
  gameId: string | undefined | any;
  firestore: Firestore = inject(Firestore);

  unsubGame;
  

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.gameId = params['id'];
    });
    this.unsubGame = this.subGame(this.gameId);
  }

  ngOnInit(): void {}

  ngonDestroy() {
    //this.unsubGamesdata();
    this.unsubGame();
  }

  getGamesRef() {
    let gamesRef = collection(this.firestore, 'games');
    return gamesRef;
  }

  newGame() {
    this.game = new Game();
    
  }

  subGame(colId: string) {
    return onSnapshot(doc(this.firestore, 'games', colId), (document: any) => {
      console.log(document.data());
      (this.game.currentPlayer = document.data().currentPlayer),
        (this.game.stack = document.data().stack),
        (this.game.players = document.data().players),
        (this.game.playedCards = document.data().playedCards),
        (this.game.pickCardAnimation = document.data().pickCardAnimation),
        (this.game.currentCard = document.data().currentCard);
    });
  }

  getSingelGameDoc(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setGameObject(): Gamedata {
    return this.game.toJSON();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      //console.log(this.currentCard)
      this.game.pickCardAnimation = true;
      console.log('New Card:' + this.game.currentCard);
      console.log('Game is', this.game);
      this.changePlayer();
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  changePlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame(){
    const gameIdRef = doc(this.firestore, "games", this.gameId);
    await updateDoc(gameIdRef, this.game.toJSON());
  }
}
