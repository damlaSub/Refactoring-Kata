import { Parrot } from "./parrot";
export class AfricanParrot extends Parrot {

    constructor(numberOfCoconuts: number, voltage: number, isNailed: boolean) {
        super(numberOfCoconuts, voltage, isNailed);
    }
    public getSpeed(): number {
        return Math.max(0, this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts);
    }
    public getCry(): String {
        return "Sqaark!";
    }
}