import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  pickCardAnimation = false;
  game: Game | any;
  currentCard: string = '';

  constructor(public dialog: MatDialog) {
    this.newGame();
  }

  newGame() {
    this.game = new Game;
    console.log(this.game)
  }
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      //console.log(this.currentCard)
      this.pickCardAnimation = true;
      console.log("New Card:" + this.currentCard)
      console.log('Game is', this.game)
      this.changePlayer();
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  changePlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name) 
      }
    });
  }


}
