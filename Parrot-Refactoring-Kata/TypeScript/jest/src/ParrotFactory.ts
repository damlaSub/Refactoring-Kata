import { AfricanParrot } from "./AfricanParrot";
import { EuropeanParrot } from "./EuropeanParrot";
import { NorwegianBlueParrot } from "./NorwegianBlueParrot";
import { ParrotTypes, Parrot } from "./parrot";

export function createParrot(
    parrotType: ParrotTypes,
    numberOfCoconuts: number,
    voltage: number,
    isNailed: boolean
) : Parrot {
     switch(parrotType){
        case ParrotTypes.EUROPEAN:
            return new EuropeanParrot(numberOfCoconuts, voltage, isNailed);
        case ParrotTypes.AFRICAN:
            return new AfricanParrot(numberOfCoconuts, voltage, isNailed);
        case ParrotTypes.NORWEGIAN_BLUE:
            return new NorwegianBlueParrot(numberOfCoconuts, voltage, isNailed);
        default:
            throw new Error("Should be unreachable");
    }
}