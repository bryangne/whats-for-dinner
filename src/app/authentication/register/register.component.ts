import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      emailInput: new FormControl(),
      passInput: new FormControl()
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.registerForm.get('emailInput').value
    const password = this.registerForm.get('passInput').value
    this.authService.register(email, password).then(res => {
      this.router.navigate(['login'])
    }, err => {
      console.log(err)
    })
  }

}
