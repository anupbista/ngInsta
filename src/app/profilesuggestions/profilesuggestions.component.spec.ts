import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesuggestionsComponent } from './profilesuggestions.component';

describe('ProfilesuggestionsComponent', () => {
  let component: ProfilesuggestionsComponent;
  let fixture: ComponentFixture<ProfilesuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
