import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtilisateursComponent } from './add-utilisateurs.component';

describe('AddUtilisateursComponent', () => {
  let component: AddUtilisateursComponent;
  let fixture: ComponentFixture<AddUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUtilisateursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
