import calculateResults from "@/app/lib/ResultsAlgorithm";
import initialize_debtmap from "@/app/lib/DebtMapInitializer";

interface Expense {
    payer: string;
    amount: number;
    description: string;
    participants: string[];
}

type DebtMap = Record<string, Record<string, number>>;

describe('Results algorithm', () => {
    it('Simple 2 people balance without simplify', () => {
        const expense: Expense = {
            payer: "eric",
            amount: 100,
            description: "vino",
            participants: ["eric", "meli"]
        }
        const expenses: Expense[] = [];
        expenses.push(expense);

        const expectedDebtMap : DebtMap = initialize_debtmap(expense.participants)
        expectedDebtMap["eric"]["meli"] = -50;
        expectedDebtMap["meli"]["eric"] = 50;

        const results = calculateResults(expenses);
        console.log(expectedDebtMap)
        console.log(results)

        expect(results).toStrictEqual(expectedDebtMap);
    })

})