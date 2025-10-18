import { expect } from 'chai';
import 'mocha';
import TicketDispenser from '../turn-ticket-dispenser/ticket-dispenser';
import TurnNumberSequence from '../turn-ticket-dispenser/turn-number-sequence';

describe('Turn Ticket Dispenser', () => {

  beforeEach(() => {
    // Reset the sequence before each test
    (TurnNumberSequence as any).turnNumber = 0;
  });

  it('should return a TurnTicket instance', () => {
    const dispenser = new TicketDispenser();
    const ticket = dispenser.getTurnTicket();
    expect(ticket).to.have.property('getTurnNumber');
  });

  it('should start with ticket number 0', () => {
    const dispenser = new TicketDispenser();
    const ticket = dispenser.getTurnTicket();
    expect(ticket.getTurnNumber()).to.eql(0);
  });

  it('should increment the ticket number for each new ticket', () => {
    const dispenser = new TicketDispenser();
    const firstTicket = dispenser.getTurnTicket();
    const secondTicket = dispenser.getTurnTicket();
    expect(secondTicket.getTurnNumber()).to.eql(firstTicket.getTurnNumber() + 1);
  });

  it('should share the same sequence across different dispensers', () => {
    const dispenserA = new TicketDispenser();
    const dispenserB = new TicketDispenser();

    const ticketA = dispenserA.getTurnTicket();
    const ticketB = dispenserB.getTurnTicket();

    expect(ticketB.getTurnNumber()).to.eql(ticketA.getTurnNumber() + 1);
  });

  it('should use an injected sequence if provided', () => {
  const fakeSequence = { getNextTurnNumber: () => 42 };
  const dispenser = new TicketDispenser(fakeSequence as any);
  const ticket = dispenser.getTurnTicket();
  expect(ticket.getTurnNumber()).to.eql(42);
});

});
