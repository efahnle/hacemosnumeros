'use client'

import { useRouter } from 'next/navigation';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar'
import LocalStorageClear from '@/app/components/LocalStorage'


const ExpensesDashboardPage = () => {
  const router = useRouter();

  //const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const loadExpenses = () => {
    const tmp_expenses = localStorage.getItem('expenses');
    if (tmp_expenses){
      return JSON.parse(tmp_expenses);
    } else {
      return [];
    } 
  }

  const expenses = loadExpenses();

  

  const handleDelete = (index: number) => {
    console.log(`should delete expense at index: ${index}`);

    const existingExpenses = localStorage.getItem('expenses');
    let expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
  
    expenses.splice(index, 1);
  
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    location.reload();
  };

  const handleModify = (id: number) => {
    // Placeholder for modifying an expense item
    console.log(`Modify expense with id: ${id}`);
    const url = '/edit-expense/' + id.toString()
    router.push(url);
  };

  const handleButtonClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex} clicked`);
    if (buttonIndex == 1) {
      router.push('/add-expense');
    } 
    //if (buttonIndex == 2) {
    //  const simplifySetting = localStorage.getItem('simplify');
    //  const simplifySettingBool = Boolean(simplifySetting);
    //  const newSimplifySetting = !simplifySettingBool;
    //  localStorage.setItem('simplify', String(newSimplifySetting));
    //}
    
  };

  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <h1 className="flex text-center break-normal items-center text-2xl md:text-3xl lg:text-5xl ">Cargá los gastos</h1>
      <ExpensesTable expenses={expenses} onDelete={handleDelete} onModify={handleModify} />
      <ButtonBar onButtonClick={handleButtonClick} />
    </main>
  );
};

export default ExpensesDashboardPage;


