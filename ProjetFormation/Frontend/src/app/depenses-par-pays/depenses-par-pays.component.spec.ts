import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensesParPaysComponent } from './depenses-par-pays.component';

describe('DepensesParPaysComponent', () => {
  let component: DepensesParPaysComponent;
  let fixture: ComponentFixture<DepensesParPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepensesParPaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepensesParPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
