import { expect } from 'chai';
import 'mocha';
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';
import FakeTelemetryClient from '../telemetry-system-tests/FakeTelemetryClient';

describe('Telemetry System', () => {

	describe('TelemetryDiagnosticControls', () => {

		it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
			const client = new FakeTelemetryClient();
			const controls = new TelemetryDiagnosticControls(client);
			controls.checkTransmission();
			expect(controls.readDiagnosticInfo()).to.contain('OK: TEST RESULT');

		});

	});

});
