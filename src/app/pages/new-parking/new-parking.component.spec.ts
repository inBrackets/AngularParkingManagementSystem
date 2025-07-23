import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParkingComponent } from './new-parking.component';

describe('NewParkingComponent', () => {
  let component: NewParkingComponent;
  let fixture: ComponentFixture<NewParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewParkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
