import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  pickCardAnimation = false;
  game: Game | any;
  currentCard: string = '';

  constructor() {
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
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1000);
    }


  }
}
