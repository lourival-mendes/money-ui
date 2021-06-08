import { Component } from '@angular/core';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor( public auth: AuthService ) { }

  logout() {
    this.auth.logout();
  }

  toggleMenu(elementNav: Element, elementMobile: Element) {

    elementNav.classList.toggle('active');

    const ariaExpanded = elementNav.classList.contains('active') ? 'true': 'false';
    elementMobile.setAttribute('aria-expanded', ariaExpanded);

    const ariaLabel = elementNav.classList.contains('active') ? 'Fechar Menu' : 'Abrir Menu';

    elementMobile.setAttribute('aria-label', ariaLabel);

  }

}
