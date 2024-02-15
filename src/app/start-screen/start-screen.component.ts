import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore)

  constructor(private router: Router) {

  }

  newGame() {
    let game = new Game()
    let gameAsJSON = game.toJSON();
    this.addGame(gameAsJSON);
    
  }


  async addGame(item: {}) {
    const dockRef = await addDoc(this.getGamesRef(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.router.navigateByUrl('/game/' + docRef?.id)
      });
    console.log(dockRef);
  }

  
  getGamesRef() {
    let gamesRef = collection(this.firestore, 'games');
    return gamesRef;
  }

}
