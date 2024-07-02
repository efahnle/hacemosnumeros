interface Expense {
    payer: string;
    amount: number;
    description: string;
    participants: string[];
}

interface DebtRecord {
    from: string; // The user who owes money
    to: string; // The user who is owed money
    amount: number; // The amount owed
}

type DebtMap = Record<string, Record<string, number>>;

export default function calculateResults(expenses: Expense[], names: string[], simplify: Boolean) {
    //console.log(expenses);
    //console.log(names);
    //console.log(simplify);



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
  
    console.log(debtMap);
    return debtMap;

    // const debtsSimplified = simplifyDebts(debtMap);
    // console.log(debtsSimplified);
    //return "a";
}


function simplifyDebts(debtMap: Record<string, Record<string, number>>): DebtRecord[] {
    const netBalance: Record<string, number> = {};
    const simplifiedDebts: DebtRecord[] = [];
  
    // Calculate net balance for each user
    for (const from in debtMap) {
      for (const to in debtMap[from]) {
        const amount = debtMap[from][to];
        if (!netBalance[from]) netBalance[from] = 0;
        if (!netBalance[to]) netBalance[to] = 0;
  
        netBalance[from] -= amount;
        netBalance[to] += amount;
      }
    }
  
    const debtors = Object.keys(netBalance).filter(user => netBalance[user] < 0);
    const creditors = Object.keys(netBalance).filter(user => netBalance[user] > 0);
  
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
  
      const debtAmount = Math.min(-netBalance[debtor], netBalance[creditor]);
  
      simplifiedDebts.push({
        from: debtor,
        to: creditor,
        amount: debtAmount
      });
  
      netBalance[debtor] += debtAmount;
      netBalance[creditor] -= debtAmount;
  
      if (netBalance[debtor] === 0) i++;
      if (netBalance[creditor] === 0) j++;
    }
  
    return simplifiedDebts;
  }