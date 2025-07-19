import {Component, inject} from '@angular/core';
import {IUserModel, User} from '../../model/user.model';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: User = new User();
  userSrv = inject(UserService);

  onLogin() {
    this.userSrv.loginUser(this.loginObj).subscribe((res: IUserModel) => {
      alert("User found..navigating inside");
    }, error => {
      alert("Wrong Credentials");
    })


  }
}
