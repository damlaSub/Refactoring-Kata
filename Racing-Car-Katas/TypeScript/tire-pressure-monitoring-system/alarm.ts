import PsiPressure from './psiPressure';
import Sensor from './sensor';

export default class Alarm {

	private sensor: Sensor;
	private alarmOn: boolean = false;
	private psiPressure: PsiPressure;

	constructor(sensor: Sensor, psiPressure: PsiPressure) {
		this.sensor = sensor;
		this.psiPressure = psiPressure;
	}

	public check() {
		const psiPressureValue = this.sensor.popNextPressurePsiValue();		
		if(this.psiPressure.isOutOfRange(psiPressureValue)){
			this.alarmOn = true;
		}
	}

	public isAlarmOn() {
		return this.alarmOn;
	}

}
