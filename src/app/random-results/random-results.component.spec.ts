import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomResultsComponent } from './random-results.component';

describe('RandomResultsComponent', () => {
  let component: RandomResultsComponent;
  let fixture: ComponentFixture<RandomResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
