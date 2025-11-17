import { TestBed } from '@angular/core/testing';

import { ChatmessageLibService } from './chatmessage-lib.service';

describe('ChatmessageLibService', () => {
  let service: ChatmessageLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatmessageLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
