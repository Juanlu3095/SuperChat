import { TestBed } from '@angular/core/testing';

import { MessageLibService } from './message-lib.service';

describe('MessageLibService', () => {
  let service: MessageLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
