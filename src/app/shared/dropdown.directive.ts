import {Directive, HostBinding, HostListener} from '@angular/core';

// @ts-ignore
@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropDown'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  constructor() { }

}
