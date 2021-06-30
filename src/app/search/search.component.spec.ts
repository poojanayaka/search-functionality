import { TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { SearchService } from '../service/search.service';


describe('SearchComponent', () => {
  var service: SearchService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: SearchComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule,RouterTestingModule],
      providers: [SearchService]
    }).compileComponents();
    service = TestBed.get(SearchService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Search box is displayed', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const input = fixture.debugElement.nativeElement.querySelector('.search');
    expect(input).toBeTruthy();
  });


  it('should emit value after keyup and debounce time', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const hostElement: HTMLElement = fixture.nativeElement;
    const input: HTMLInputElement = hostElement.querySelector('input')!;
    input.value = 'sydn';
    input.dispatchEvent(new Event('input'));
    tick(3000);
    fixture.detectChanges();
    const searchbtn = hostElement.querySelector('.search-btn');
    console.log(searchbtn);
    searchbtn.dispatchEvent(new Event('click'));
    tick(3000);
    fixture.detectChanges();
  }));

});
