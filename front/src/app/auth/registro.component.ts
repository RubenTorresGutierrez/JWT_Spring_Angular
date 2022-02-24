import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // Attributes
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  roles: string[] = [];
  errMsg: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }


  ngOnInit() {

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }

  }

  onRegister(): void{

    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    
    this.authService.nuevo(this.nuevoUsuario)
      .subscribe(data => {
        this.toastr.success('Cuenta creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsg = err.error.mensaje;
        this.toastr.error(this.errMsg, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-right',
        });
        // console.log(err.error.message);
        
      })

  }

}
