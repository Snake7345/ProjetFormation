import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationLaboComponent } from './presentation-labo.component';

describe('PresentationLaboComponent', () => {
  let component: PresentationLaboComponent;
  let fixture: ComponentFixture<PresentationLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationLaboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
