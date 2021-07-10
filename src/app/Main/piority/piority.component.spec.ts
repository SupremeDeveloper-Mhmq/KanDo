import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiorityComponent } from './piority.component';

describe('PiorityComponent', () => {
  let component: PiorityComponent;
  let fixture: ComponentFixture<PiorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
