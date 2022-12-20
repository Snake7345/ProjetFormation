import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQuestionsComponent } from './table-questions.component';

describe('TableQuestionsComponent', () => {
  let component: TableQuestionsComponent;
  let fixture: ComponentFixture<TableQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
