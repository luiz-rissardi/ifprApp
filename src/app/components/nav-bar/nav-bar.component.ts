import { Component,OnInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{

  public ShowNavDescriptionItem = window.innerWidth >= 992 ? false:true;

  constructor(private DOM:Renderer2){
  }
  ngOnInit(): void {
    const setItem = this.DOM.selectRootElement("#setIcon",true);
    const navBar = this.DOM.selectRootElement("#navBarMenu",true);
    this.DOM.listen(setItem,"click",()=>{
      if (setItem.classList.contains('rotedToRight')) {
        this.DOM.removeClass(setItem, 'rotedToRight');
        this.DOM.removeClass(navBar, 'decrease-left');
        this.ShowNavDescriptionItem = false
      } else {
        this.DOM.addClass(setItem, 'rotedToRight');
        this.DOM.addClass(navBar, 'decrease-left');
        this.ShowNavDescriptionItem = true
      }
    })
  }


}
