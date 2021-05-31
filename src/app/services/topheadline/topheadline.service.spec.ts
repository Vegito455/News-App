import { TestBed } from '@angular/core/testing';

import { TopHeadlineService } from './topheadline.service';

describe('TopHeadlineService', () => {
  let service: TopHeadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopHeadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
