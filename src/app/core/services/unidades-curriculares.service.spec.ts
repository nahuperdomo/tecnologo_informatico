import { TestBed } from '@angular/core/testing';

import { UnidadesCurricularesService } from './unidades-curriculares.service';

describe('UnidadesCurricularesService', () => {
  let service: UnidadesCurricularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesCurricularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
