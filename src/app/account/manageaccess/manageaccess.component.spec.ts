import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaccessComponent } from './manageaccess.component';

describe('ManageaccessComponent', () => {
  let component: ManageaccessComponent;
  let fixture: ComponentFixture<ManageaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageaccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
