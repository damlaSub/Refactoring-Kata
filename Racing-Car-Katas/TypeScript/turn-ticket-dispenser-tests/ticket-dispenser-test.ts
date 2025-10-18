import { expect } from 'chai';
import 'mocha';
import TicketDispenser, { NextTurnNumberGenerator }  from '../turn-ticket-dispenser/ticket-dispenser';
import sharedSequence  from '../turn-ticket-dispenser/turn-number-sequence';

describe('Turn Ticket Dispenser', () => {

  beforeEach(() => {
    // Reset the sequence before each test
    (sharedSequence  as any).turnNumber = 0;
  });

  it('should return a TurnTicket instance', () => {
    const dispenser = new TicketDispenser(sharedSequence as NextTurnNumberGenerator);
    const ticket = dispenser.getTurnTicket();
    expect(ticket).to.have.property('getTurnNumber');
  });

  it('should start with ticket number 0', () => {
    const dispenser = new TicketDispenser(sharedSequence as NextTurnNumberGenerator);
    const ticket = dispenser.getTurnTicket();
    expect(ticket.getTurnNumber()).to.eql(0);
  });

  it('should increment the ticket number for each new ticket', () => {
    const dispenser = new TicketDispenser(sharedSequence as NextTurnNumberGenerator);
    const firstTicket = dispenser.getTurnTicket();
    const secondTicket = dispenser.getTurnTicket();
    expect(secondTicket.getTurnNumber()).to.eql(firstTicket.getTurnNumber() + 1);
  });

  it('should share the same sequence across different dispensers', () => {
    const dispenserA = new TicketDispenser(sharedSequence as NextTurnNumberGenerator);
    const dispenserB = new TicketDispenser(sharedSequence as NextTurnNumberGenerator);

    const ticketA = dispenserA.getTurnTicket();
    const ticketB = dispenserB.getTurnTicket();

    expect(ticketB.getTurnNumber()).to.eql(ticketA.getTurnNumber() + 1);
  });

  it('should use an injected sequence if provided', () => {
    const fakeSequence: NextTurnNumberGenerator = { getNextTurnNumber: () => 42 };
    const dispenser = new TicketDispenser(fakeSequence);
    const ticket = dispenser.getTurnTicket();
    expect(ticket.getTurnNumber()).to.eql(42);
  });

});
