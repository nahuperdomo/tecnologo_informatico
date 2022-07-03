import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosDocumentosComponent } from './todos-documentos.component';

describe('TodosDocumentosComponent', () => {
  let component: TodosDocumentosComponent;
  let fixture: ComponentFixture<TodosDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
