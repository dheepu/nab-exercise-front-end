import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  loginFormGroup: FormGroup;

  message: String;

  ngOnInit() {
  }

  login() {
    //console.log(this.loginFormGroup.value);
    this.authenticationService.login(this.loginFormGroup.value).subscribe(result => {
      this.router.navigate(['/']);
    }, error => {
      if (error.error.message != undefined) {
        this.message = error.error.message;
      } else {
        this.message = error.message;
      }
    });
  }

}
