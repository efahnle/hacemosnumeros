'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar'
import { archivo } from '@/app/ui/fonts';
import AddExpenseButton from '@/app/components/AddExpenseButton';
import LoadingSpinner from '@/app/components/LoadingSpinner';



const ExpensesDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [modalAction, setModalAction] = useState<() => void>(() => { });
  //const [simplifyStatus, setSimplifyStatus] = useState(false);


  //const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const loadExpenses = () => {
    const tmp_expenses = localStorage.getItem('expenses');
    if (tmp_expenses) {
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
    setLoading(true);

    if (buttonIndex === 1) {
      // edit people / group
      router.push('/');
    } else if (buttonIndex === 2) {
      router.push('/results-dashboard');
    } else if (buttonIndex === 3) {
      router.push('/add-expense');
    }
  };


  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className={`${archivo.className}flex text-center break-normal text-nowrap items-center text-3xl md:text-3xl lg:text-5xl `}>Gastos</h1>

          <div>
            <ExpensesTable expenses={expenses} onDelete={handleDelete} onModify={handleModify} />
            <AddExpenseButton onButtonClick={handleButtonClick} />
          </div>
          <ButtonBar onButtonClick={handleButtonClick} loading={loading} />
        </>
      )}
    </main>
  );
};

export default ExpensesDashboardPage;


