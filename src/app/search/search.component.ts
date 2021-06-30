import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {  debounceTime, switchMap } from 'rxjs/operators';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private searchTerms = new Subject<string>();
  public searchData$: Observable<any>;
  constructor(private searchService:SearchService){

  }
  searchText(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit()
  {
     this.searchData$ = this.searchTerms
       .pipe(
         debounceTime(1000),
         switchMap(searchString => searchString.length >= 3? this.searchService.getSearchDetails(searchString):of([]))
       );
   }

}
