import { asNativeElements, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') matMenu!: MatMenu;
  constructor() { }
  public nombre='prueb Prueba'
  public resise=false;
  ngOnInit(): void {
  }
  OpenMenu(){

    console.log(document.getElementsByClassName('matmenuCustom')[0].clientWidth)

  }
  resiseMenu(e:any){
    e.stopPropagation();
    this.resise=!this.resise
  }
}
