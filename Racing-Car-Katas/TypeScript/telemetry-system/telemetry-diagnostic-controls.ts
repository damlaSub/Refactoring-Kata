import TelemetryClient from './telemetry-client';
import TelemetryClientInterface from './telemetry-client-interface';

export default class TelemetryDiagnosticControls {
	private diagnosticChannelConnectionString: string;

	private diagnosticInfo: string;

	private telemetryClient: TelemetryClientInterface;

	constructor(telemetryClient: TelemetryClientInterface) {
		this.diagnosticChannelConnectionString = '*111#';
		this.diagnosticInfo = '';
		this.telemetryClient = telemetryClient;
	}

	public readDiagnosticInfo() {
		return this.diagnosticInfo;
	}

	public writeDiagnosticInfo(newValue: string) {
		this.diagnosticInfo = newValue;
	}

	public checkTransmission() {
		this.diagnosticInfo = '';

		this.telemetryClient.disconnect();
		this.ensureConnected();
		

		this.telemetryClient.send(this.telemetryClient.diagnosticMessage());
		this.diagnosticInfo = this.telemetryClient.receive();
	}

	private ensureConnected(): void {
		let retryLeft = 3;
		while (!this.telemetryClient.getOnlineStatus() && retryLeft > 0) {
			this.telemetryClient.connect(this.diagnosticChannelConnectionString);
			retryLeft -= 1;
		}

		if (!this.telemetryClient.getOnlineStatus()) {
			throw new Error('Unable to connect');
		}
	}
}
