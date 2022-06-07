import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}
  RITMnumber: string = '';
  ngOnInit(): void {
    this.RITMnumber = this.activeRoute.snapshot.params['ritm'];
  }
  modalStatus: boolean = false;
  SelectedNode = null;
  legend = false;

  onNodeClick(event: any) {
    if (typeof event == 'boolean') {
      this.legend = true;
      this.modalStatus = true;
    } else {
      this.SelectedNode = event.data;
      this.modalStatus = true;
    }
  }
  onModalClose(event: boolean) {
    this.legend = false;
    this.modalStatus = false;
  }
}
