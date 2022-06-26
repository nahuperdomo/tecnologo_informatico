import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { AuthenticateService } from '../../services/authenticate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private servLogin : AuthenticateService ) { }
  
  public loginForm = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public logear(): void {
    console.log(this.loginForm.controls['username'].value);
    console.log(this.loginForm.controls['password'].value);
    let log = new LoginModel(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);



    console.log(this.loginForm.value);
    this.servLogin.logear(log).subscribe({
      next: value => console.log(value),
      error: err => { alert('Error al cargar las noticias: ' + err) }
      
    });
  }

  ngOnInit(): void {
  }



}
