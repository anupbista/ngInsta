import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacysecurityComponent } from './privacysecurity.component';

describe('PrivacysecurityComponent', () => {
  let component: PrivacysecurityComponent;
  let fixture: ComponentFixture<PrivacysecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacysecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacysecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
