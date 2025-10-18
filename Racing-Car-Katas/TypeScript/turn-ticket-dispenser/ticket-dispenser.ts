import sequence from './turn-number-sequence';
import TurnTicket from './turn-ticket';
type TurnNumberSequenceInstance = typeof sequence;

export default class TicketDispenser {
  private sequence: TurnNumberSequenceInstance;

  constructor(seq?: TurnNumberSequenceInstance ) {
    this.sequence = seq ?? sequence;
  }

  public getTurnTicket(): TurnTicket {
    const newTurnNumber = this.sequence.getNextTurnNumber();
    return new TurnTicket(newTurnNumber);
  }
}
