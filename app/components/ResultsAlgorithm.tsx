interface Expense {
  payer: string;
  amount: number;
  description: string;
  participants: string[];
}

interface Balance {
  person: string;
  amount: number;
}

type DebtMap = Record<string, Record<string, number>>;

export default function calculateResults(expenses: Expense[], simplify: Boolean) {
  const debtMap: DebtMap = {};

  expenses.forEach(expense => {
    const { payer, amount, participants } = expense;
    const share = amount / participants.length;

    participants.forEach(participant => {
      if (participant !== payer) {
        if (!debtMap[participant]) debtMap[participant] = {};
        if (!debtMap[payer]) debtMap[payer] = {};

        if (!debtMap[participant][payer]) debtMap[participant][payer] = 0;
        if (!debtMap[payer][participant]) debtMap[payer][participant] = 0;

        debtMap[participant][payer] += share;
        debtMap[payer][participant] -= share;
      }
    });
  });

  //console.log(debtMap);


  if (simplify) {
    const debtsSimplified = simplifyDebts(debtMap);
    //console.log(debtsSimplified);
    return debtsSimplified
  } else {
    return debtMap;
  }

}


function simplifyDebts(debtMap: Record<string, Record<string, number>>) {
  const balances: Balance[] = [];
  for (const person_a in debtMap) {
    //console.log(person_a);

    let person_a_balance = 0;

    for (const person_b in debtMap[person_a]) {
      if (debtMap[person_a][person_b] > 0) {
        // person_a OWES person_b $N 
        //console.log(person_a + " owes " + person_b + " $" + debtMap[person_a][person_b])
      } else {
        // person_b OWES person_a $n
        //console.log(person_b + " owes " + person_a + " $" + Math.abs(debtMap[person_a][person_b]))
      }

      person_a_balance += debtMap[person_a][person_b];
    }

    //console.log(person_a + " net balance:" + person_a_balance);
    const balance: Balance = {
      person: person_a,
      amount: person_a_balance
    }

    //console.log(balance);
    balances.push(balance)
  }


  console.log(balances);

  const creditors = balances.filter((creditor) => creditor.amount < 0);
  console.log(creditors);

  const debtors = balances.filter((debtor) => debtor.amount > 0);
  console.log(debtors);


  // iterate over all creditors, and assign debtors one by one 
  const creditors_length = creditors.length;
  const debtors_length = debtors.length;

  const simplifiedDebtMap: Record<string, Record<string, number>> = {};
  for (let i = 0; i < creditors_length; i++) {
    
    let j = 0
    while (creditors[i].amount != 0) {
      console.log("doing cred " + creditors[i].person)
      if (!simplifiedDebtMap[creditors[i].person]) simplifiedDebtMap[creditors[i].person] = {};
      if (!simplifiedDebtMap[debtors[j].person]) simplifiedDebtMap[debtors[j].person] = {};

      if (Math.abs(creditors[i].amount) >= Math.abs(debtors[j].amount)) {
        // Send entire amount from debtor to creditor
        console.log("doing debt " + debtors[i].person)
        simplifiedDebtMap[creditors[i].person][debtors[j].person] = - Math.abs(debtors[j].amount);
        simplifiedDebtMap[debtors[j].person][creditors[i].person] = Math.abs(debtors[j].amount);
        creditors[i].amount += Math.abs(debtors[j].amount)
        debtors.splice(j, 1);
        
      } else {
        // The entire debt is more than what the creditor must receive. the debt must be splitted
      }
      //j++;
      
    }

  }

  return simplifiedDebtMap;
  //return debtMap;

};