import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() maxWidth: string = '2xl';
  @Input() closeable: boolean = true;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  get maxWidthClass(): string {
    const classes = {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-lg',
      xl: 'sm:max-w-xl',
      '2xl': 'sm:max-w-2xl',
    };
    return classes[this.maxWidth as keyof typeof classes] || 'sm:max-w-2xl';
  }

  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.show && this.closeable) {
      this.closeModal();
    }
  }

  closeModal() {
    if (this.closeable) {
      this.close.emit();
    }
  }

  onBackdropClick() {
    this.closeModal();
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }
}
