import { Clock } from '../models/clock';

export class ClockViewModel {
  public clock: Clock;
  public showTimeSettings: boolean = false;
  public showColorSettings: boolean = false;
  public colors = {
    number: '#000000',
    dot: '#000000',
    smallDot: '#666666',
    hourHand: '#000000',
    minuteHand: '#000000',
    secondHand: '#000000',
    digital: '#000000',
    background: '#ffffff'
  };
  public timer: any = null;
  public errors = {
    hours: '',
    minutes: '',
    seconds: ''
  };
  public successMessage: string = '';

  constructor(clockId: number, initialTime: { hours: number; minutes: number; seconds: number; isPM: boolean } = { hours: 0, minutes: 0, seconds: 0, isPM: false }) {
    this.clock = new Clock(
      clockId,
      initialTime.hours,
      initialTime.minutes,
      initialTime.seconds,
      initialTime.isPM
    );
  }

  get rotations() {
    return this.clock.getRotations();
  }

  get clockStyles() {
    return {
      '--number-color': this.colors.number,
      '--dot-color': this.colors.dot,
      '--hand-color': this.colors.hourHand,
      '--small-dot-color': this.colors.smallDot,
      '--digital-color': this.colors.digital,
      '--background-color': this.colors.background
    };
  }

  get formattedTime(): string {
    return this.clock.getFormattedTime();
  }

  get hours(): number {
    return this.clock.hours;
  }

  set hours(value: number) {
    this.clock.hours = value;
  }

  get minutes(): number {
    return this.clock.minutes;
  }

  set minutes(value: number) {
    this.clock.minutes = value;
  }

  get seconds(): number {
    return this.clock.seconds;
  }

  set seconds(value: number) {
    this.clock.seconds = value;
  }

  get isPM(): boolean {
    return this.clock.isPM;
  }

  set isPM(value: boolean) {
    this.clock.isPM = value;
  }

  updateTime(): void {
    this.clock.updateTime();
  }

  incrementTime(field: 'hours' | 'minutes' | 'seconds'): void {
    if (field === 'seconds') {
      this.clock.seconds++;
      if (this.clock.seconds >= 60) {
        this.clock.seconds = 0;
        this.clock.minutes++;
        if (this.clock.minutes >= 60) {
          this.clock.minutes = 0;
          this.clock.hours++;
          if (this.clock.hours === 12) {
            this.clock.isPM = !this.clock.isPM;
          } else if (this.clock.hours > 12) {
            this.clock.hours = 1;
          }
        }
      }
    } else if (field === 'minutes') {
      this.clock.minutes++;
      if (this.clock.minutes >= 60) {
        this.clock.minutes = 0;
        this.clock.hours++;
        if (this.clock.hours === 12) {
          this.clock.isPM = !this.clock.isPM;
        } else if (this.clock.hours > 12) {
          this.clock.hours = 1;
        }
      }
    } else if (field === 'hours') {
      this.clock.hours++;
      if (this.clock.hours === 12) {
        this.clock.isPM = !this.clock.isPM;
      } else if (this.clock.hours > 12) {
        this.clock.hours = 1;
      }
    }
  }

  decrementTime(field: 'hours' | 'minutes' | 'seconds'): void {
    if (field === 'seconds') {
      if (this.clock.seconds <= 0) {
        this.clock.seconds = 59;
        if (this.clock.minutes <= 0) {
          this.clock.minutes = 59;
          if (this.clock.hours <= 1) {
            this.clock.hours = 12;
            this.clock.isPM = !this.clock.isPM;
          } else {
            this.clock.hours--;
            if (this.clock.hours === 11) {
              this.clock.isPM = !this.clock.isPM;
            }
          }
        } else {
          this.clock.minutes--;
        }
      } else {
        this.clock.seconds--;
      }
    } else if (field === 'minutes') {
      if (this.clock.minutes <= 0) {
        this.clock.minutes = 59;
        if (this.clock.hours <= 1) {
          this.clock.hours = 12;
          this.clock.isPM = !this.clock.isPM;
        } else {
          this.clock.hours--;
          if (this.clock.hours === 11) {
            this.clock.isPM = !this.clock.isPM;
          }
        }
      } else {
        this.clock.minutes--;
      }
    } else if (field === 'hours') {
      if (this.clock.hours <= 1) {
        this.clock.hours = 12;
        this.clock.isPM = !this.clock.isPM;
      } else {
        this.clock.hours--;
        if (this.clock.hours === 11) {
          this.clock.isPM = !this.clock.isPM;
        }
      }
    }
  }

  openTimeSettings(): void {
    this.showTimeSettings = true;
  }

  closeTimeSettings(): void {
    const validation = this.clock.validate();
    if (validation.isValid) {
      this.showTimeSettings = false;
      this.successMessage = 'Tiempo actualizado correctamente';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      this.errors = validation.errors;
    }
  }

  openColorSettings(): void {
    this.showColorSettings = true;
  }

  closeColorSettings(): void {
    this.showColorSettings = false;
    this.successMessage = 'Colores actualizados correctamente';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  handleTimeChange(): void {
    const validation = this.clock.validate();
    this.errors = validation.errors;
  }

  startTimer(): void {
    this.timer = setInterval(() => this.updateTime(), 1000);
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  dispose(): void {
    this.stopTimer();
  }
} 