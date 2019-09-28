import { TestBed } from '@angular/core/testing';

import { StoreService } from './services/stores.service';

describe('StoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
