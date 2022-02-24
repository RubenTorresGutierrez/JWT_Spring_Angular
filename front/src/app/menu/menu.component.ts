import { Component, OnInit } from '@angular/core';
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
    // window.location.reload();

  }

  get IsLogged(): boolean{
    if(this.tokenService.getToken())
      return true;
    return false;
  }

}
