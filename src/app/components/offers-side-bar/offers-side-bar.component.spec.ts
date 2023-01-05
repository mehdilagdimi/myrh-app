import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersSideBarComponent } from './offers-side-bar.component';

describe('OffersSideBarComponent', () => {
  let component: OffersSideBarComponent;
  let fixture: ComponentFixture<OffersSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
