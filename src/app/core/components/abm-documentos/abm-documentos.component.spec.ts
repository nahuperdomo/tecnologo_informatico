import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmDocumentosComponent } from './abm-documentos.component';

describe('AbmDocumentosComponent', () => {
  let component: AbmDocumentosComponent;
  let fixture: ComponentFixture<AbmDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
