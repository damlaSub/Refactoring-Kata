import TurnTicket from './turn-ticket';
/**
 * Defines the contract for any object that can provide
 * the next turn number. Any object with a getNextTurnNumber() 
 * method returning a number satisfies this interface,
 * including the singleton sequence or a mock for testing.
 */
export interface NextTurnNumberGenerator{
    getNextTurnNumber():number;
}

export default class TicketDispenser {

  constructor(private sequence: NextTurnNumberGenerator) {}

  public getTurnTicket(): TurnTicket {
    const newTurnNumber = this.sequence.getNextTurnNumber();
    return new TurnTicket(newTurnNumber);
  }
}
