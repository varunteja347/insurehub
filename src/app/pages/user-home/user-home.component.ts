import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

interface Policy {
  id: string;
  type: string;
  property: string;
  premium: string;
  status: 'Active' | 'Pending' | 'Expired';
  expires: string;
  coverage: string;
}

interface Claim {
  id: string;
  date: string;
  type: string;
  status: 'Approved' | 'In Review' | 'Pending' | 'Closed';
  amount: string;
  description: string;
}

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  activeSection: 'home' | 'policy' | 'claims' = 'home';
  showClaimModal = false;
  userName = 'John Doe';
  scrolled = false;

  policies: Policy[] = [
    {
      id: 'POL-2024-001847',
      type: 'Homeowners Insurance Premier',
      property: '123 Maple Street, Austin, TX 78701',
      premium: '$142/mo',
      status: 'Active',
      expires: 'Dec 15, 2025',
      coverage: '$450,000'
    },
    {
      id: 'POL-2024-002391',
      type: 'Flood Insurance Protection',
      property: '123 Maple Street, Austin, TX 78701',
      premium: '$38/mo',
      status: 'Active',
      expires: 'Dec 15, 2025',
      coverage: '$150,000'
    }
  ];

  claims: Claim[] = [
    {
      id: 'CLM-2024-0083',
      date: 'Oct 12, 2024',
      type: 'Water Damage',
      status: 'In Review',
      amount: '$8,400',
      description: 'Burst pipe in master bathroom causing flooring and wall damage.'
    },
    {
      id: 'CLM-2023-0241',
      date: 'Mar 5, 2023',
      type: 'Wind Damage',
      status: 'Approved',
      amount: '$3,200',
      description: 'Storm damage to roof shingles and gutters.'
    },
    {
      id: 'CLM-2022-0118',
      date: 'Jul 20, 2022',
      type: 'Theft',
      status: 'Closed',
      amount: '$1,750',
      description: 'Stolen personal property from garage.'
    }
  ];

  coverageItems = [
    { label: 'Dwelling Structure Protection', amount: '$450,000', icon: '🏠', detail: 'Guaranteed replacement cost for main home structure.' },
    { label: 'Personal Property & Valuables', amount: '$180,000', icon: '📦', detail: 'Furniture, electronics, clothing, and personal assets.' },
    { label: 'Personal Liability Coverage', amount: '$300,000', icon: '⚖️', detail: 'Legal defense and bodily injury protection.' },
    { label: 'Additional Living Expenses (Loss of Use)', amount: '$90,000', icon: '🏨', detail: 'Hotel and living costs while home is repaired.' },
    { label: 'Medical Payments to Others', amount: '$5,000', icon: '🏥', detail: 'No-fault emergency medical coverage for guests.' },
    { label: 'Other Detached Structures', amount: '$45,000', icon: '🏚️', detail: 'Shed, garage, gazebos, and detached fencing.' },
  ];

  quickActions = [
    { icon: '📄', label: 'View Policy Documents', action: 'policy' },
    { icon: '🔧', label: 'File New Claim', action: 'claim' },
    { icon: '💳', label: 'Make Premium Payment', action: 'payment' },
    { icon: '📞', label: 'Contact Dedicated Agent', action: 'contact' },
    { icon: '📊', label: 'Coverage Health Check', action: 'review' },
    { icon: '📋', label: 'Request Endorsement', action: 'update' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  constructor(private router: Router) {}

  setSection(section: 'home' | 'policy' | 'claims') {
    this.activeSection = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    this.router.navigate(['/auth']);
  }

  handleQuickAction(action: string) {
    if (action === 'policy') this.setSection('policy');
    else if (action === 'claim') this.setSection('claims');
    else this.showClaimModal = true;
  }

  closeModal() {
    this.showClaimModal = false;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Active': 'status-active',
      'Pending': 'status-pending',
      'Expired': 'status-expired',
      'Approved': 'status-active',
      'In Review': 'status-review',
      'Closed': 'status-closed',
    };
    return map[status] || '';
  }
}
