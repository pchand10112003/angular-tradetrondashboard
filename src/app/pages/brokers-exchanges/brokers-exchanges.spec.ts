import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersExchanges } from './brokers-exchanges';

describe('BrokersExchanges', () => {
  let component: BrokersExchanges;
  let fixture: ComponentFixture<BrokersExchanges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokersExchanges],
    }).compileComponents();

    fixture = TestBed.createComponent(BrokersExchanges);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
