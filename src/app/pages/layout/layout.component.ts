import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  userSrv = inject(UserService);

}
