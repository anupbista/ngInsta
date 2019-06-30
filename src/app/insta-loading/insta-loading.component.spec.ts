import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaLoadingComponent } from './insta-loading.component';

describe('InstaLoadingComponent', () => {
  let component: InstaLoadingComponent;
  let fixture: ComponentFixture<InstaLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
