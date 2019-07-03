import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepostdetailComponent } from './singlepostdetail.component';

describe('SinglepostdetailComponent', () => {
  let component: SinglepostdetailComponent;
  let fixture: ComponentFixture<SinglepostdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepostdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
