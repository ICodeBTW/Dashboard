import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Shared/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  constructor(private dataService: DataService,private router:Router) {}

  searchData: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  @Output('searchTerm') searchEvent = new EventEmitter();

  ngOnInit(): void {
    this.searchData = this.dataService.searchResults();
  }

  onSearchInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.searchTerm == '') {
      this.filteredData.length = 0;
    } else {
      if (this.searchTerm.length > 6) {
        this.searchFilter(this.searchTerm);
      }
    }
  }

  searchFilter(value: string) {
    this.filteredData.length = 0;
    for (let i = 0; i < this.searchData.length; i++) {
      if ((this.searchData[i]['title'] as string).includes(value)) {
        this.filteredData.push(this.searchData[i]);
      }
    }
  }

  onResultClick(value: string) {
    this.searchTerm = value;
    this.filteredData.length = 0;
    this.onSubmit(null);
  }

  onSubmit(event: Event | null) {
    if (this.searchTerm != '') {
      // this.searchEvent.emit(this.searchTerm);
      this.router.navigate(['progress',this.searchTerm])
    }
    if (event) {
      event.preventDefault();
    }
  }
}
