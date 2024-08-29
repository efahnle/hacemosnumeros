import initialize_debtmap from "@/app/lib/DebtMapInitializer";
import { ExpenseItem as Expense, Balance } from "@/app/interfaces/Interfaces";



type DebtMap = Record<string, Record<string, number>>;

export default function calculateResults(expenses: Expense[]) {
  const all_participants = expenses.flatMap(expense => expense.participants);
  const all_payers = expenses.flatMap(expense => expense.payer);
  const all_possible_people = [ ...all_participants, ...all_payers];
  const unique_participants = Array.from(new Set(all_possible_people));
  const debtMap: DebtMap = initialize_debtmap(unique_participants);
  
  expenses.forEach(expense => {
    const { payer, amount, participants } = expense;

    // Weird typescript rounding bug
    const share = Math.round( amount / participants.length);

    participants.forEach(participant => {
      if (participant !== payer) {
        
        if (!debtMap[participant][payer]) debtMap[participant][payer] = 0;
        if (!debtMap[payer][participant]) debtMap[payer][participant] = 0;

        debtMap[participant][payer] += share;
        debtMap[payer][participant] -= share;
      }
    });
  });

  const debtsSimplified = simplifyDebts(debtMap);
  return debtsSimplified

}


function simplifyDebts(debtMap: Record<string, Record<string, number>>) {
  const balances: Balance[] = [];
  
  for (const person_a in debtMap) {

    let person_a_balance = 0;

    for (const person_b in debtMap[person_a]) {
      
      /*
      if (debtMap[person_a][person_b] > 0) {
        // person_a OWES person_b $N 
        console.log("a " + person_a + " owes " + person_b + " $" + debtMap[person_a][person_b])
      } else {
        // person_b OWES person_a $n
        console.log("b " + person_b + " owes " + person_a + " $" + Math.abs(debtMap[person_a][person_b]))
      }
      */
      person_a_balance += debtMap[person_a][person_b];

    }

    const balance: Balance = {
      person: person_a,
      amount: person_a_balance
    }

    balances.push(balance)
  }

  
  const creditors = balances.filter((creditor) => creditor.amount < 0);
  
  const debtors = balances.filter((debtor) => debtor.amount > 0);
  let max_escape = 0;

  const all_participants = balances.map(balance => balance.person);
  const unique_participants = Array.from(new Set(all_participants));
  const simplifiedDebtMap: DebtMap = initialize_debtmap(unique_participants);

  for (let i = 0; i < creditors.length; i++) {

    const j = 0
    while (creditors[i].amount != 0) {
      // console.log("person: " + creditors[i].person + ", amount: " + creditors[i].amount)

      if (Math.abs(creditors[i].amount) >= Math.abs(debtors[j].amount)) {
        // console.log("case a: " + debtors[j].person + ", amount: " + debtors[j].amount)
        // Send entire amount from debtor to creditor
        // All the debt is assigned to the same creditor and we remove the debtor from the list

        // Record payments, both ways
        simplifiedDebtMap[creditors[i].person][debtors[j].person] = - Math.abs(debtors[j].amount);
        simplifiedDebtMap[debtors[j].person][creditors[i].person] = Math.abs(debtors[j].amount);

        // Decrease from the creditor. This could either be partial or total
        creditors[i].amount += Math.abs(debtors[j].amount)

        // Clear out the debtor, as we've already assign his expense to a creditor successfully
        debtors.splice(j, 1);

      } else {
        // console.log("case b: " + debtors[j].person + ", amount: " + debtors[j].amount)
        // The entire debt is more than what the creditor must receive. the debt must be splitted
        // Here this debtor pays 100% of what the creditor had to receive, and sets the difference to find another creditor the next loop
        const difference = Math.abs(debtors[j].amount) - Math.abs(creditors[i].amount);

        // Record payments, both ways
        simplifiedDebtMap[creditors[i].person][debtors[j].person] = - Math.abs(creditors[i].amount);
        simplifiedDebtMap[debtors[j].person][creditors[i].person] = Math.abs(creditors[i].amount);

        // Clear out the creditor
        creditors[i].amount = 0;

        // Assign the difference to the debtor for the next iteration
        debtors[j].amount = difference;
        break;

      }
      max_escape++;
      if (max_escape > 100) {
        break;
      }
    }

  }

  return simplifiedDebtMap;


};