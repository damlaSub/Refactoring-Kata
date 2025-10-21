export default class FakeTelemetryClient {
    private online = true;
    private messageSent = '';
    private messageReceived = 'OK: TEST RESULT';

    getOnlineStatus() { return this.online; }
    connect() { this.online = true; }
    disconnect() { this.online = false; }
    send(msg: string) { this.messageSent = msg; }
    receive() { return this.messageReceived; }
    diagnosticMessage() { return 'AT#UD'; }
}
