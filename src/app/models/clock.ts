export class Clock {
  constructor(
    public id: number,
    public hours: number = 12,
    public minutes: number = 0,
    public seconds: number = 0,
    public isPM: boolean = false
  ) {}

  validate(): { isValid: boolean; errors: { hours: string; minutes: string; seconds: string } } {
    const errors = {
      hours: '',
      minutes: '',
      seconds: ''
    };

    if (!this.hours) {
      errors.hours = 'La hora es requerida';
    } else if (this.hours < 1 || this.hours > 12) {
      errors.hours = 'La hora debe estar entre 1 y 12';
    }

    if (this.minutes === undefined || this.minutes === null) {
      errors.minutes = 'Los minutos son requeridos';
    } else if (this.minutes < 0 || this.minutes > 59) {
      errors.minutes = 'Los minutos deben estar entre 0 y 59';
    }

    if (this.seconds === undefined || this.seconds === null) {
      errors.seconds = 'Los segundos son requeridos';
    } else if (this.seconds < 0 || this.seconds > 59) {
      errors.seconds = 'Los segundos deben estar entre 0 y 59';
    }

    return {
      isValid: !Object.values(errors).some(error => error !== ''),
      errors
    };
  }

  updateTime(): void {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
        if (this.hours === 12) {
          this.isPM = !this.isPM;
        } else if (this.hours > 12) {
          this.hours = 1;
        }
      }
    }
  }

  getFormattedTime(): string {
    const displayHours = this.hours % 12 || 12;
    return `${String(displayHours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')} ${this.isPM ? 'PM' : 'AM'}`;
  }

  getRotations(): { hourRotation: number; minuteRotation: number; secondRotation: number } {
    return {
      hourRotation: (this.hours % 12) * 30 + this.minutes * 0.5,
      minuteRotation: this.minutes * 6 + this.seconds * 0.1,
      secondRotation: this.seconds * 6
    };
  }
} 