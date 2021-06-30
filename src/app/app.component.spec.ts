import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './service/search.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  var service: SearchService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [SearchService]
    }).compileComponents();
    service = TestBed.get(SearchService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);


  }));



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Search box is displayed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const input = fixture.debugElement.nativeElement.querySelector('.search');
    expect(input).toBeTruthy();
  });


  it('should emit value after keyup and debounce time', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const hostElement: HTMLElement = fixture.nativeElement;
    const input: HTMLInputElement = hostElement.querySelector('input')!;
    input.value = 'sydn';
    input.dispatchEvent(new Event('input'));
    tick(3000);
    fixture.detectChanges();
    fixture.whenStable().then(() => {  
      fixture.detectChanges();
    });
  }));


});
