import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviasComponent } from './previas.component';

describe('PreviasComponent', () => {
  let component: PreviasComponent;
  let fixture: ComponentFixture<PreviasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
