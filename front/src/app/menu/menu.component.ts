import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  }

  onLogOut(): void{

    this.tokenService.logOut();

  }

  get IsLogged(): boolean{

    return this.tokenService.IsLogged;

  }

}
