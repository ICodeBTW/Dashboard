import { Component, OnInit } from '@angular/core';
import { DataService } from '../Shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) {}

  searchTerm: string = '';

  ngOnInit(): void {}

  onSearch(event: string) {
    this.searchTerm = event;
  }
}
