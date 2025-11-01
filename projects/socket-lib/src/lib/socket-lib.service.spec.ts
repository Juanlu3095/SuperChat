import { TestBed } from '@angular/core/testing';

import { SocketLibService } from './socket-lib.service';

describe('SocketLibService', () => {
  let service: SocketLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
