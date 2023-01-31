import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthCallBackComponent } from './oauth-call-back.component';

describe('OauthCallBackComponent', () => {
  let component: OauthCallBackComponent;
  let fixture: ComponentFixture<OauthCallBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthCallBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthCallBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
