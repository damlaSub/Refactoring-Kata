export enum ParrotTypes {
    EUROPEAN,
    AFRICAN,
    NORWEGIAN_BLUE,
}

export abstract class Parrot {
    constructor(protected numberOfCoconuts: number,
                protected voltage: number,
                protected isNailed: boolean) {
    }
    abstract getSpeed():number;

    protected getBaseSpeed(): number {
        return 12;
    }

    protected getLoadFactor(): number {
        return 9;
    }

    protected getBaseSpeedWithVoltage(voltage: number): number {
        return Math.min(24, voltage * this.getBaseSpeed());
    }

    abstract getCry(): String;

}

