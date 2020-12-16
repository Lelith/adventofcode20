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
  validTickets.forEach((validTicket) => {
    validTicket = validTicket.split(',');

    const ticketCategories = validTicket.map((value, column) => {
      const columnCategories = [];
      value = parseInt(value, 10);
      // console.log(`in which category fits ${value}`);
      Object.keys(ruleMap).map((category) => {
        const categoryRange = ruleMap[category];
        if (categoryRange.indexOf(value) > 0) {
          // console.log(`the nr${value}fits into category${category}`);
          columnCategories.push(category);
        }
      });
      return columnCategories;
    });
    categoryAssignments.push(ticketCategories);
  });
  console.log(categoryAssignments);
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
  // const validTickets = probeTicketfields(ruleSet, tickets);
  // let data = utils.readInput('./input.txt');
  console.log(ruleMap);
  findCategory(validTickets, ruleMap);
} catch (e) {
  console.log('Error', e.stack);
}
