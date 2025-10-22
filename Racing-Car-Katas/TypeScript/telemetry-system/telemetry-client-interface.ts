export default interface TelemetryClientInterface {

    diagnosticMessage(): string;
    getOnlineStatus(): boolean;
    connect(connectionString: string): void;
    disconnect(): void;
    send(message: string): void;
    receive(): string;
}