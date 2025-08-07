import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-button.html',
  styleUrl: './action-button.css'
})
export class ActionButtonComponent {
  @Input() type: 'default' | 'delete' = 'default';
  @Output() click = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses = 'p-2 rounded-full transition-all duration-200 hover:scale-110';
    const typeClasses = {
      default: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
      delete: 'bg-red-500 hover:bg-red-600 text-white'
    };
    return `${baseClasses} ${typeClasses[this.type]}`;
  }

  onClick() {
    this.click.emit();
  }
}
