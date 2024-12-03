import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
})
export class FilterMenuComponent {
  @Input() selectCategory!: (category: string) => void;
  min: number = 200;
  max: number = 10000;

  handleMinChange(amount: number) {
    this.min = Math.max(200, Math.min(this.min + amount, 10000));
  }

  handleMaxChange(amount: number) {
    this.max = Math.min(10000, Math.max(this.max + amount, 200));
  }
}
