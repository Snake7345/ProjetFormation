import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereIsMoneyGraphiqueComponent } from './where-is-money-graphique.component';

describe('WhereIsMoneyGraphiqueComponent', () => {
  let component: WhereIsMoneyGraphiqueComponent;
  let fixture: ComponentFixture<WhereIsMoneyGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhereIsMoneyGraphiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhereIsMoneyGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
