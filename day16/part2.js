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
function generateRulSet(rules) {
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

function generateRuleObj(rules) {
  const ruleObj = {};
  rules.forEach((rule) => {
    rule = rule.split(';');
    const ruleCategory = rule[0];
    const categoryRange = [];
    for (let idx = 1; idx < rule.length; idx += 1) {
      const fieldRange = rule[idx].split('-');
      for (let jdx = parseInt(fieldRange[0], 10); jdx <= parseInt(fieldRange[1], 10); jdx += 1) {
        categoryRange.push(jdx);
      }
      ruleObj[ruleCategory] = categoryRange;
    }
  });
  return ruleObj;
}

function findCategory(validTickets, ruleMap) {
  const categoryAssignments = [];
  validTickets.forEach((column) => {
    const columnCategories = [];
    Object.keys(ruleMap).map((category) => {
      const categoryRange = ruleMap[category];
      column.forEach((value) => {
        if (categoryRange.indexOf(value) < 0) {
          columnCategories.push(category);
        }
      });
      console.log(columnCategories);
    });
  });
}

function pivotValidTickets(validTickets) {
  const turnedArr = validTickets[0].map(
    (_, c) => validTickets.map(
      (row) => row[c],
    ),
  );
  console.log(turnedArr);
}

try {
  let rules = utils.readInput('./example_rules.txt');
  // let rules = utils.readInput('./ruleset.txt');
  rules = utils.modDataNewlineStr(rules);
  const ruleMap = generateRuleObj(rules);

  let validTickets = utils.readInput('./example_tickets.txt');
  // let tickets = utils.readInput('./other_tickets.txt');
  // const ruleSet = generateRulSet(rules);
  validTickets = utils.modDataNewlineStr(validTickets);
  validTickets = validTickets.map((ticket) => ticket.split(','));
  // const validTickets = probeTicketfields(ruleSet, tickets);
  // let data = utils.readInput('./input.txt');
  pivotValidTickets(validTickets);
  findCategory(validTickets, ruleMap);
} catch (e) {
  console.log('Error', e.stack);
}
