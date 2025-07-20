import {Component, inject} from '@angular/core';
import {IUserModel, User} from '../../model/user.model';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

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
  router = inject(Router);

  onLogin() {
    this.userSrv.loginUser(this.loginObj).subscribe((res: IUserModel) => {
      alert("User found..navigating inside");
      localStorage.setItem("parkUser", JSON.stringify(res));
      this.router.navigateByUrl("/dashboard");
    }, error => {
      alert("Wrong Credentials");
    })


  }
}
