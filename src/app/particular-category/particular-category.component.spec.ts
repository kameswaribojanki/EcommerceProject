import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularCategoryComponent } from './particular-category.component';

describe('ParticularCategoryComponent', () => {
  let component: ParticularCategoryComponent;
  let fixture: ComponentFixture<ParticularCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticularCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
