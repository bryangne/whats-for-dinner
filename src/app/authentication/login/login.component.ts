import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      emailInput: new FormControl(),
      passInput: new FormControl()
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.loginForm.get('emailInput').value
    const password = this.loginForm.get('passInput').value
    this.authService.login(email, password).then(res => {
      this.router.navigate(['shoppinglist'])
    }, err => {
      console.log(err)
    })
  }

}
