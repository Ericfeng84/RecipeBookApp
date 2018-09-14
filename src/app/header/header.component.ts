import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navBar = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  navselect(feature: string) {
    this.navBar.emit(feature);
  }


}
