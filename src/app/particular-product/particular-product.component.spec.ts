import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularProductComponent } from './particular-product.component';

describe('ParticularProductComponent', () => {
  let component: ParticularProductComponent;
  let fixture: ComponentFixture<ParticularProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticularProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
