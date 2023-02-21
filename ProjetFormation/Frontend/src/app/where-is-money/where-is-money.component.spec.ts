import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereIsMoneyComponent } from './where-is-money.component';

describe('WhereIsMoneyComponent', () => {
  let component: WhereIsMoneyComponent;
  let fixture: ComponentFixture<WhereIsMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhereIsMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhereIsMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
