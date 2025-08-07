import { Component } from '@angular/core';
import { ClockManagerComponent } from './components/clock-manager/clock-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClockManagerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'reloj-client';
}
