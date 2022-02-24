import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  }

  get isLogged(){

    return this.tokenService.IsLogged;

  }

  get nombreUsuario(){

    return this.tokenService.getUserName();

  }

}
