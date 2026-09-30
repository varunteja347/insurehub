import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

type AuthTab = 'login' | 'register-user' | 'register-surveyor';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  activeTab: AuthTab = 'login';
  showPassword = false;
  showConfirmPassword = false;
  loginRequiredNotice = false;

  loginForm = {
    email: 'john@example.com',
    password: 'password123',
    rememberMe: true
  };

  registerUserForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    agreeTerms: false
  };

  registerSurveyorForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    certificationBody: '',
    yearsExperience: '',
    specialization: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    agreeTerms: false
  };

  states = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
    'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
    'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
    'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
    'Wisconsin','Wyoming'
  ];

  certificationBodies = [
    'American Society of Appraisers (ASA)',
    'Appraisal Institute (AI)',
    'National Association of Certified Home Inspectors (NACHI)',
    'International Association of Certified Home Inspectors (InterNACHI)',
    'Other'
  ];

  specializations = [
    'Residential Property',
    'Commercial Property',
    'Flood & Disaster Assessment',
    'Auto Damage',
    'Business Interruption',
    'General'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'register-user' || params['tab'] === 'register-surveyor' || params['tab'] === 'login') {
        this.activeTab = params['tab'];
      }
      if (params['reason'] === 'login-required') {
        this.loginRequiredNotice = true;
      }
    });
  }

  setTab(tab: AuthTab) {
    this.activeTab = tab;
    this.loginRequiredNotice = false;
  }

  goToLanding() {
    this.router.navigate(['/']);
  }

  onLogin() {
    if (this.loginForm.email && this.loginForm.password) {
      if (this.loginForm.email.includes('surveyor')) {
        this.authService.login('surveyor');
        this.router.navigate(['/surveyor-home']);
      } else {
        this.authService.login('user');
        this.router.navigate(['/user-home']);
      }
    }
  }

  onRegisterUser() {
    this.authService.login('user');
    this.router.navigate(['/user-home']);
  }

  onRegisterSurveyor() {
    this.authService.login('surveyor');
    this.router.navigate(['/surveyor-home']);
  }
}
