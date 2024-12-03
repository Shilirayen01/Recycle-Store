import { Component, HostListener } from '@angular/core';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faArrowRight = faArrowRight;
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const clickedInside = (<Element>event.target).closest('#user-menu-button');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
