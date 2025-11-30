import { TestBed } from '@angular/core/testing';

import { ChatroomLibService } from './chatroom-lib.service';

describe('ChatroomLibService', () => {
  let service: ChatroomLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatroomLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
