import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClockViewModel } from '../../viewmodels/clock-viewmodel';
import { ClockComponent } from '../clock/clock';
import { SuccessMessageComponent } from '../success-message/success-message';

@Component({
  selector: 'app-clock-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ClockComponent, SuccessMessageComponent],
  templateUrl: './clock-manager.html',
  styleUrl: './clock-manager.css'
})
export class ClockManagerComponent {
  clocks: any[] = [];
  viewModel = new ClockViewModel(0, { hours: 12, minutes: 0, seconds: 0, isPM: false });
  nextId = 1;
  successMessage = '';

  get errors() {
    return this.viewModel.errors;
  }

  addClock() {
    const validation = this.viewModel.clock.validate();
    if (validation.isValid) {
      const clockData = {
        id: this.nextId++,
        hours: this.viewModel.clock.hours,
        minutes: this.viewModel.clock.minutes,
        seconds: this.viewModel.clock.seconds,
        isPM: this.viewModel.clock.isPM
      };
      this.clocks.push(clockData);
      this.successMessage = 'Reloj agregado correctamente';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.viewModel = new ClockViewModel(0, {
        hours: this.viewModel.clock.hours,
        minutes: this.viewModel.clock.minutes,
        seconds: this.viewModel.clock.seconds,
        isPM: this.viewModel.clock.isPM
      });
    } else {
      this.viewModel.errors = validation.errors;
    }
  }

  removeClock(clockId: number) {
    const index = this.clocks.findIndex(clock => clock.id === clockId);
    if (index !== -1) {
      this.clocks.splice(index, 1);
      this.successMessage = 'Reloj eliminado correctamente';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
}
