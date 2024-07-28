'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar'
import Modal from '../components/Modal';
import { archivo } from '@/app/ui/fonts';


const ExpensesDashboardPage = () => {
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
    if (buttonIndex === 1) {
      router.push('/add-expense');
    } else if (buttonIndex === 2) {
      router.push('/results-dashboard');
    }
  };


  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <h1 className={`${archivo.className}flex text-center break-normal text-nowrap items-center text-3xl md:text-3xl lg:text-5xl `}>Gastos</h1>
      <ExpensesTable expenses={expenses} onDelete={handleDelete} onModify={handleModify} />
      <ButtonBar onButtonClick={handleButtonClick} />
    </main>
  );
};

export default ExpensesDashboardPage;


