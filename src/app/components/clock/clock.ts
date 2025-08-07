import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clock } from '../../models/clock';
import { ClockViewModel } from '../../viewmodels/clock-viewmodel';
import { ModalComponent } from '../modal/modal';
import { ActionButtonComponent } from '../action-button/action-button';
import { SuccessMessageComponent } from '../success-message/success-message';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ActionButtonComponent, SuccessMessageComponent],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  @Input() initialTime!: { hours: number; minutes: number; seconds: number; isPM: boolean };
  @Input() clockId!: number;
  @Output() delete = new EventEmitter<number>();

  viewModel: ClockViewModel;
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12];
  clockDots = Array.from({length: 60}, (_, i) => i + 1);
  readonly PI = Math.PI;

  constructor() {
    this.viewModel = new ClockViewModel(0, { hours: 12, minutes: 0, seconds: 0, isPM: false });
  }

  ngOnInit() {
    this.viewModel = new ClockViewModel(
      this.clockId,
      {
        hours: this.initialTime.hours,
        minutes: this.initialTime.minutes,
        seconds: this.initialTime.seconds,
        isPM: this.initialTime.isPM
      }
    );
    this.viewModel.startTimer();
  }

  ngOnDestroy() {
    this.viewModel.dispose();
  }

  get rotations() {
    return this.viewModel.rotations;
  }

  get clockStyles() {
    return this.viewModel.clockStyles;
  }

  get formattedTime(): string {
    return this.viewModel.formattedTime;
  }

  get showTimeSettings(): boolean {
    return this.viewModel.showTimeSettings;
  }

  get showColorSettings(): boolean {
    return this.viewModel.showColorSettings;
  }

  get colors() {
    return this.viewModel.colors;
  }

  get errors() {
    return this.viewModel.errors;
  }

  get successMessage(): string {
    return this.viewModel.successMessage;
  }

  sin(val: number) {
    return Math.sin(val);
  }

  cos(val: number) {
    return Math.cos(val);
  }

  openTimeSettings() {
    this.viewModel.openTimeSettings();
  }

  closeTimeSettings() {
    this.viewModel.closeTimeSettings();
  }

  openColorSettings() {
    this.viewModel.openColorSettings();
  }

  closeColorSettings() {
    this.viewModel.closeColorSettings();
  }

  handleTimeChange() {
    this.viewModel.handleTimeChange();
  }

  incrementTime(field: 'hours' | 'minutes' | 'seconds') {
    this.viewModel.incrementTime(field);
  }

  decrementTime(field: 'hours' | 'minutes' | 'seconds') {
    this.viewModel.decrementTime(field);
  }

  onDelete() {
    this.delete.emit(this.clockId);
  }
}
