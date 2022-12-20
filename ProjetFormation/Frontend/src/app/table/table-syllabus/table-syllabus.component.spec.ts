import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSyllabusComponent } from './table-syllabus.component';

describe('TableSyllabusComponent', () => {
  let component: TableSyllabusComponent;
  let fixture: ComponentFixture<TableSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSyllabusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
