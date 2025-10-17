import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';
import Alarm from '../tire-pressure-monitoring-system/alarm';
import Sensor from '../tire-pressure-monitoring-system/sensor';

describe('Tyre Pressure Monitoring System', () => {

	describe('Alarm', () => {

		let sensorStub: sinon.SinonStub;

		beforeEach(() => {
			sensorStub = sinon.stub(Sensor.prototype, 'popNextPressurePsiValue');
		});

		afterEach(() => {
			sensorStub.restore();
		});

		it('should keep alarm off when pressure is within normal range', () => {
			// Arrange
			sensorStub.returns(19); // between 17 and 21
			const alarm = new Alarm();

			// Act
			alarm.check();

			// Assert
			expect(alarm.isAlarmOn()).to.be.false;
		});

		it('should turn alarm on when pressure is below low threshold', () => {
			sensorStub.returns(15); // below 17
			const alarm = new Alarm();

			alarm.check();

			expect(alarm.isAlarmOn()).to.be.true;
		});

		it('should turn alarm on when pressure is above high threshold', () => {
			sensorStub.returns(23); // above 21
			const alarm = new Alarm();

			alarm.check();

			expect(alarm.isAlarmOn()).to.be.true;
		});

		it('should keep alarm on after being triggered once', () => {
			// Alarm should remain on even if next reading is fine
			sensorStub.onFirstCall().returns(23); // too high
			sensorStub.onSecondCall().returns(19); // normal

			const alarm = new Alarm();

			alarm.check(); // first: high -> alarm on
			alarm.check(); // second: normal -> alarm stays on

			expect(alarm.isAlarmOn()).to.be.true;
		});

	});
});
