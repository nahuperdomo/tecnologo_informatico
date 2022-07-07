import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { AuthenticateService } from '../../services/authenticate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private servLogin : AuthenticateService,  private router: Router ) { }
  
  public loginForm : FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  public logear(): void {
    let log = new LoginModel(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    this.servLogin.logear(log).subscribe({
      next: value => {localStorage.setItem('token', value.token),
                      window.location.reload()
                      },
      error: err => { Swal.fire('Error al logear revise su usuario o contraseña') }
    });
   if (localStorage.getItem('token') != null) {
    window.location.href = '';
   }

  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['']);
    }
  }

}
