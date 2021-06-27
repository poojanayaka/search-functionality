import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {  debounceTime, switchMap } from 'rxjs/operators';
import { SearchService } from './search.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private searchTerms = new Subject<string>();
  public searchData$: Observable<any>;
  constructor(private searchService:SearchService,private formBuilder: FormBuilder){

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
