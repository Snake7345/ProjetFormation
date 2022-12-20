import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormationsComponent } from './update-formations.component';

describe('UpdateFormationsComponent', () => {
  let component: UpdateFormationsComponent;
  let fixture: ComponentFixture<UpdateFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
