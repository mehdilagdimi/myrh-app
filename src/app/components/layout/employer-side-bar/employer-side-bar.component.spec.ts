import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSideBarComponent } from './employer-side-bar.component';

describe('EmployerSideBarComponent', () => {
  let component: EmployerSideBarComponent;
  let fixture: ComponentFixture<EmployerSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
