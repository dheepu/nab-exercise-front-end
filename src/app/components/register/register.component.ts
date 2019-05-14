import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  message: String;

  constructor(private authenticationService: AuthenticationService) { 
    this.myForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      manager: new FormControl(null)
    })
  }

  ngOnInit() {
  }

  registerUser() {
    this.authenticationService.registerUser(this.myForm.value).subscribe(result => {
      console.log(result);      
      this.myForm.reset();
      this.message = 'User created successfully.';
    }, error => {
      this.message = 'Some error occurred'
    })
  }

}
