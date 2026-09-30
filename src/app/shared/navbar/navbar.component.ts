import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

interface NavLink {
  text: string;
  route?: string;
  active?: boolean;
  requiresAuth?: boolean;
}

interface NavColumn {
  heading: string;
  links: NavLink[];
}

interface NavImage {
  src: string;
  caption: string;
}

interface NavItem {
  label: string;
  columns: NavColumn[];
  image?: NavImage;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() activeTab: string = '';

  activeNav: string | null = null;
  showAccountMenu = false;
  scrolled = false;

  navItems: NavItem[] = [
    {
      label: 'Auto',
      columns: [
        {
          heading: 'Auto Insurance Coverage',
          links: [
            { text: 'Car Insurance', active: false },
            { text: 'Recreational Vehicle Insurance', active: false },
            { text: 'Snowmobile Insurance', active: false },
            { text: 'Electric Vehicle Insurance', active: false },
          ]
        },
        {
          heading: 'Quick Actions',
          links: [
            { text: 'Get an Auto Quote', active: false },
            { text: 'Find an Auto Agent', active: false },
            { text: 'File a Vehicle Claim', active: false },
            { text: 'Manage Auto Policy', active: false },
          ]
        }
      ],
      image: { src: 'assets/auto-car.png', caption: 'Comprehensive auto protection for your vehicles.' }
    },
    {
      label: 'Home',
      columns: [
        {
          heading: 'Home Insurance Options',
          links: [
            { text: 'Homeowners Insurance', active: true, route: '/user-home', requiresAuth: true },
            { text: 'Condo Insurance', active: false },
            { text: 'Vacation Home Insurance', active: false },
            { text: 'Renters Insurance', active: false },
            { text: 'Commercial Property Insurance', active: false },
          ]
        },
        {
          heading: 'I Want To...',
          links: [
            { text: 'Get a Home Quote', active: false },
            { text: 'Find a Local Agent', active: false },
            { text: 'File a Home Claim', active: false, route: '/user-home', requiresAuth: true },
            { text: 'View Policy Documents', active: false, route: '/user-home', requiresAuth: true },
          ]
        }
      ],
      image: { src: 'assets/hero-house.png', caption: 'Protect your home, property, and valuables.' }
    },
    {
      label: 'Business',
      columns: [
        {
          heading: 'Business Insurance Solutions',
          links: [
            { text: 'Business Owners Policy (BOP)', active: false },
            { text: 'Business Interruption Coverage', active: false },
            { text: 'Commercial Property Insurance', active: false },
            { text: 'Workers Compensation', active: false },
            { text: 'Employment Practices Liability', active: false },
          ]
        },
        {
          heading: 'Resources',
          links: [
            { text: 'Find a Business Agent', active: false },
            { text: 'Report a Commercial Claim', active: false },
            { text: 'Business Risk Assessment', active: false },
          ]
        }
      ],
      image: { src: 'assets/family-home.png', caption: 'Tailored risk management for businesses.' }
    },
    {
      label: 'Employee Benefits',
      columns: [
        {
          heading: 'Benefits & Group Plans',
          links: [
            { text: 'Group Life Insurance', active: false },
            { text: 'Health & Accident Insurance', active: false },
            { text: 'Group Disability Coverage', active: false },
            { text: 'Affinity & Group Plans', active: false },
          ]
        },
        {
          heading: 'Employer Portal',
          links: [
            { text: 'Explore Benefits Plans', active: false },
            { text: 'Find a Benefits Specialist', active: false },
            { text: 'Contact Benefits Team', active: false },
          ]
        }
      ]
    },
    {
      label: 'About',
      columns: [
        {
          heading: 'About InsureHub',
          links: [
            { text: 'Our Mission & Story', active: false },
            { text: 'Leadership & Board', active: false },
            { text: 'Careers & Opportunities', active: false },
            { text: 'Press Room & News', active: false },
          ]
        },
        {
          heading: 'Support & Help',
          links: [
            { text: 'Help Center & FAQs', active: false },
            { text: 'Find an Agent Near You', active: false },
            { text: 'Contact Us', active: false },
          ]
        }
      ]
    }
  ];

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 40;
  }

  setActiveNav(label: string | null) {
    this.activeNav = label;
  }

  toggleAccountMenu(show?: boolean) {
    this.showAccountMenu = show !== undefined ? show : !this.showAccountMenu;
  }

  onLinkClick(link: NavLink) {
    this.activeNav = null;
    if (link.requiresAuth || link.text === 'Homeowners Insurance') {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/user-home']);
      } else {
        this.router.navigate(['/auth'], { queryParams: { tab: 'login', reason: 'login-required' } });
      }
    } else if (link.route) {
      this.router.navigate([link.route]);
    } else {
      // Default fallback for demo sub-items
      this.router.navigate(['/auth'], { queryParams: { tab: 'login' } });
    }
  }

  goToAuth(tab: 'login' | 'register-user' | 'register-surveyor' = 'login') {
    this.showAccountMenu = false;
    this.router.navigate(['/auth'], { queryParams: { tab } });
  }

  goToLanding() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.showAccountMenu = false;
    this.router.navigate(['/']);
  }
}
