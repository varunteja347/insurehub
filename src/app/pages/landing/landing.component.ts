import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  scrolled = false;

  testimonials = [
    { name: 'Sarah M.', text: 'InsureHub made getting homeowners insurance incredibly easy. Their team was professional and responsive throughout the process.', stars: 5, location: 'Austin, TX' },
    { name: 'Robert K.', text: 'I\'ve been with InsureHub for over 10 years. Their claims process is smooth and they always go above and beyond.', stars: 5, location: 'Denver, CO' },
    { name: 'Linda P.', text: 'Switching to InsureHub saved me hundreds annually. Excellent coverage at a competitive price!', stars: 5, location: 'Phoenix, AZ' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 60;
  }

  goToAuth(tab: 'login' | 'register-user' | 'register-surveyor' = 'login') {
    this.router.navigate(['/auth'], { queryParams: { tab } });
  }

  goToUserHome() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user-home']);
    } else {
      this.router.navigate(['/auth'], { queryParams: { tab: 'login', reason: 'login-required' } });
    }
  }
}
