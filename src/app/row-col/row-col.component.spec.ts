import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowColComponent } from './row-col.component';

describe('RowColComponent', () => {
  let component: RowColComponent;
  let fixture: ComponentFixture<RowColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowColComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
