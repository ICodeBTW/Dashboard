import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css'],
})
export class ModalViewComponent implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef) {}
  @Output() close = new EventEmitter();

  ngOnInit(): void {
    document.body.appendChild(this.elementRef.nativeElement);
  }
  ngOnDestroy(): void {
    if (document.body.contains(this.elementRef.nativeElement)) {
      document.body.removeChild(this.elementRef.nativeElement);
    }
  }

  onClose() {
    // document.body.removeChild(this.elementRef.nativeElement);
    this.close.emit();
  }
}
