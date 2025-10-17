import { expect } from 'chai';
import 'mocha';
import Alarm from '../tire-pressure-monitoring-system/alarm';
import PsiPressure from '../tire-pressure-monitoring-system/psiPressure';
import Sensor from '../tire-pressure-monitoring-system/sensor';

class FakeSensor extends Sensor {
  constructor(private value: number) {
	  super();
  }
  popNextPressurePsiValue(): number {
    return this.value;
  }
}

class FakePsiPressure extends PsiPressure {
  isOutOfRange(value: number): boolean {
    return value < 17 || value > 21;
  }
}

describe('Tyre Pressure Monitoring System', () => {

  describe('Alarm', () => {

    it('should keep alarm off when pressure is within normal range', () => {
      const sensor = new FakeSensor(19); // normal pressure
      const psi = new FakePsiPressure();
      const alarm = new Alarm(sensor, psi);

      alarm.check();

      expect(alarm.isAlarmOn()).to.be.false;
    });

    it('should turn alarm on when pressure is below low threshold', () => {
      const sensor = new FakeSensor(15); // too low
      const psi = new FakePsiPressure();
      const alarm = new Alarm(sensor, psi);

      alarm.check();

      expect(alarm.isAlarmOn()).to.be.true;
    });

    it('should turn alarm on when pressure is above high threshold', () => {
      const sensor = new FakeSensor(23); // too high
      const psi = new FakePsiPressure();
      const alarm = new Alarm(sensor, psi);

      alarm.check();

      expect(alarm.isAlarmOn()).to.be.true;
    });

    it('should keep alarm on after being triggered once', () => {
      // simulate first reading high, second reading normal
      const readings = [23, 19];
      let callIndex = 0;
      const sensor = {
        popNextPressurePsiValue: () => readings[callIndex++]
      } as Sensor;

      const psi = new FakePsiPressure();
      const alarm = new Alarm(sensor, psi);

      alarm.check(); // first: high -> alarm on
      alarm.check(); // second: normal -> alarm stays on

      expect(alarm.isAlarmOn()).to.be.true;
    });

  });

});
