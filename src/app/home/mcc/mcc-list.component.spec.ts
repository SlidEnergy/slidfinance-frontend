import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccListComponent } from './mcc-list.component';

describe('MccListComponent', () => {
  let component: MccListComponent;
  let fixture: ComponentFixture<MccListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MccListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
