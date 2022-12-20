import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormationsComponent } from './table-formations.component';

describe('TableFormationsComponent', () => {
  let component: TableFormationsComponent;
  let fixture: ComponentFixture<TableFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
