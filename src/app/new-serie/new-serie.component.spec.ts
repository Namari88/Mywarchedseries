import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSerieComponent } from './new-serie.component';

describe('NewSerieComponent', () => {
  let component: NewSerieComponent;
  let fixture: ComponentFixture<NewSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
