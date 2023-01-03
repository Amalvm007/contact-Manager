import { outputAst } from '@angular/compiler';
import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() isSidebarToggle=new EventEmitter()



  sideBarToggle(){
    this.isSidebarToggle.emit()
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      )
    },300)

  }

}
