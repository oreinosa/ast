import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcaLookupComponent } from './cca-lookup.component';

describe('CcaLookupComponent', () => {
  let component: CcaLookupComponent;
  let fixture: ComponentFixture<CcaLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcaLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcaLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
