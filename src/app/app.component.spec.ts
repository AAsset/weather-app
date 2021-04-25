import { Location } from "@angular/common";
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './routing.module';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

      fixture.detectChanges();

      fixture.ngZone.run(() => {
        router.initialNavigation();
      });
    });
  });

  it('should create the app', async(() => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should redirect to "" when navigate to ""', async(() => {
    fixture.ngZone.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['']).then(() => {
          expect(location.path()).toEqual('/');
        });
      });
    });
  }));

  it('should redirect to "" when navigate to "**"', async(() => {
    fixture.ngZone.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['not-found']).then(() => {
          expect(location.path()).toEqual('/');
        });
      });
    });
  }));
});
