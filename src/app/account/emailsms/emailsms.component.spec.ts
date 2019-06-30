import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsmsComponent } from './emailsms.component';

describe('EmailsmsComponent', () => {
  let component: EmailsmsComponent;
  let fixture: ComponentFixture<EmailsmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
