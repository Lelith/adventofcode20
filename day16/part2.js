const utils = require('../utils');

function probeTicketfields(ruleSet, tickets) {
  const invalidTickets = [];
  tickets.forEach((ticket, ticketId) => {
    const fields = utils.modDataCommas(ticket);
    let valid = true;
    let fieldPointer = 0;
    while (valid && fieldPointer < fields.length) {
      console.log('probe field:', fields[fieldPointer]);
      if (ruleSet.indexOf(fields[fieldPointer]) < 0) {
        valid = false;
        invalidTickets.push(ticketId);
      }
      fieldPointer += 1;
    }
  });
  console.log(invalidTickets);
  tickets = tickets.filter((ticket, idx) => invalidTickets.indexOf(idx) < 0);
  console.log(tickets);
}
function generateRuleMap(rules) {
  const ruleSet = [];
  rules.forEach((ticketFields) => {
    ticketFields = ticketFields.split(';');
    ticketFields.forEach((field) => {
      const fieldRange = field.split('-');
      for (let idx = parseInt(fieldRange[0], 10); idx <= parseInt(fieldRange[1], 10); idx += 1) {
        if (ruleSet.indexOf(idx) < 0) { ruleSet.push(idx); }
      }
    });
  });
  return ruleSet;
}

try {
  let rules = utils.readInput('./example_rules.txt');
  // let rules = utils.readInput('./ruleset.txt');
  rules = utils.modDataNewlineStr(rules);
  const ruleSet = generateRuleMap(rules);
  let tickets = utils.readInput('./example_tickets.txt');
  // let tickets = utils.readInput('./other_tickets.txt');
  tickets = utils.modDataNewlineStr(tickets);
  probeTicketfields(ruleSet, tickets);
  // let data = utils.readInput('./input.txt');
} catch (e) {
  console.log('Error', e.stack);
}
