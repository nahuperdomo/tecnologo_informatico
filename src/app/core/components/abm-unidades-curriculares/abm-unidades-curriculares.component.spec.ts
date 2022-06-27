import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmUnidadesCurricularesComponent } from './abm-unidades-curriculares.component';

describe('AbmUnidadesCurricularesComponent', () => {
  let component: AbmUnidadesCurricularesComponent;
  let fixture: ComponentFixture<AbmUnidadesCurricularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmUnidadesCurricularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmUnidadesCurricularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
