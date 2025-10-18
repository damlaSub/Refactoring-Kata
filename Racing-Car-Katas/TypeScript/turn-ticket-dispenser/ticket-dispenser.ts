import sequence from './turn-number-sequence';
import TurnTicket from './turn-ticket';
type TurnNumberSequenceInstance = typeof sequence;

export default class TicketDispenser {

  constructor(private sequence: TurnNumberSequenceInstance) {
    this.sequence = sequence;
  }

  public getTurnTicket(): TurnTicket {
    const newTurnNumber = this.sequence.getNextTurnNumber();
    return new TurnTicket(newTurnNumber);
  }
}
