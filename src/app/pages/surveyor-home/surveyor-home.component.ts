import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surveyor-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surveyor-home.component.html',
  styleUrls: ['./surveyor-home.component.css']
})
export class SurveyorHomeComponent {
  applicationId = 'IH-SRV-' + Math.floor(100000 + Math.random() * 900000);
  submittedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  steps = [
    { label: 'Application Submitted', done: true, active: false, icon: '📝' },
    { label: 'Document Verification', done: false, active: true, icon: '🔍' },
    { label: 'Admin Review', done: false, active: false, icon: '👨‍💼' },
    { label: 'Account Activation', done: false, active: false, icon: '✅' },
  ];

  faqs = [
    { q: 'How long does the review process take?', a: 'Typically 2–5 business days. You\'ll receive an email notification at each step.' },
    { q: 'Can I check my application status?', a: 'Yes! We\'ll send email updates as your application progresses through each stage.' },
    { q: 'What documents might be requested?', a: 'Government-issued ID, professional license, certification documents, and proof of insurance.' },
    { q: 'What happens after approval?', a: 'You\'ll receive login credentials and access to the InsureHub Surveyor Dashboard.' },
  ];

  expandedFaq: number | null = null;

  constructor(private router: Router) {}

  toggleFaq(index: number) {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  goToLanding() {
    this.router.navigate(['/']);
  }

  logout() {
    this.router.navigate(['/auth']);
  }
}
