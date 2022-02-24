import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Attributes
  isLogged = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsg: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }

  }

  onLogin(): void{

    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    
    this.authService.login(this.loginUsuario)
      .subscribe(data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsg = err.error.message;
        this.toastr.error(this.errMsg, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-right',
        });
        // console.log(err.error.message);
        
      })

  }

}
