import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SearchService{

constructor(private httpClient: HttpClient){}

getSearchDetails(searchText):Observable<any>{
    let url = 'https://jsonplaceholder.typicode.com/comments?q='+searchText;
    return this.httpClient.get(url);
 }
}