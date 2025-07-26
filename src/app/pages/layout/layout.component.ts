import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  userSrv = inject(UserService);
  router = inject(Router);

  logoff() {
    localStorage.removeItem("parkUser");
    this.router.navigateByUrl("/login");
  }
}
