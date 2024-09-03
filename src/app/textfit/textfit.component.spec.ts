import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfitComponent } from './textfit.component';

describe('TextfitComponent', () => {
  let component: TextfitComponent;
  let fixture: ComponentFixture<TextfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextfitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
