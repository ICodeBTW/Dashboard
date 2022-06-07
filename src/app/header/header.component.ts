import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logo: string = '../assets/images/Logo.png';
  @Input() menuStatus: boolean = false;
  @Output() menuClickStatus: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.menuStatus = !this.menuStatus;
    this.menuClickStatus.emit(this.menuStatus);
  }
}
