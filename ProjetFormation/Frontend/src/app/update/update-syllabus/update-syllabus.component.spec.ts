import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSyllabusComponent } from './update-syllabus.component';

describe('UpdateSyllabusComponent', () => {
  let component: UpdateSyllabusComponent;
  let fixture: ComponentFixture<UpdateSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSyllabusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
