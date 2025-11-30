import { TestBed } from '@angular/core/testing';

import { DashboardFactory } from './dashboard-factory';

describe('DashboardFactory', () => {
  let service: DashboardFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
