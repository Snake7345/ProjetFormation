import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuSommesNousComponent } from './ou-sommes-nous.component';

describe('OuSommesNousComponent', () => {
  let component: OuSommesNousComponent;
  let fixture: ComponentFixture<OuSommesNousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuSommesNousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuSommesNousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
