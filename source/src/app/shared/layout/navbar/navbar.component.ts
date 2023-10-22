import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import * as bootstrap from 'bootstrap';
import { Collapse } from 'bootstrap';
import { AccountService } from 'src/app/shared/services/account.service';
import { User } from 'src/app/auth/models/user-response';
import { erasmusLogo, uniLogo } from '../../helpers/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn:boolean = false;
  bsCollapse!: Collapse;
  user: User | undefined;
  isAdmin:boolean = false;
  uniLogo: string = '../../../../assets/' + uniLogo;
  erasmusLogo: string = '../../../../assets/' + erasmusLogo;

  constructor(private authService: AuthService,
     private tokenService: TokenService,
     private accountService: AccountService,
     private router: Router) { }

  ngOnInit(): void {

    this.bsCollapse = new bootstrap.Collapse('#navbarSupportedContent', {
      toggle: false
    });

    this.authService.updateNavbar.subscribe({
      next: loginResponse => {
          this.refreshIsLoggedIn();
          this.user = this.accountService.getUserData();
          this.isAdmin = this.accountService.isAdmin();
      }
    });

    this.refreshIsLoggedIn();
    this.user = this.accountService.getUserData();
    this.isAdmin = this.accountService.isAdmin();
  }

  refreshIsLoggedIn(): void {
    if (this.tokenService.getToken()){
      if (!this.tokenService.isTokenExpired()) {
        this.isLoggedIn = true
      }
    }
  }

  toggleNavbar(): void {
    this.bsCollapse.toggle();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
