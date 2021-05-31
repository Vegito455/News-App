import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeadlineComponent } from './topheadline.component';

describe('TopHeadlineComponent', () => {
  let component: TopHeadlineComponent;
  let fixture: ComponentFixture<TopHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeadlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
