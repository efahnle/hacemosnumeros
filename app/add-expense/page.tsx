'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { archivo } from '@/app/ui/fonts';
import { ExpenseCrud } from '../components/ExpenseCRUD';
import ConfirmCancelBar from '../components/ConfirmCancelBar';

export default function Home() {
  const router = useRouter();
  const [expenseData, setExpenseData] = useState({
    payer: '',
    amount: 0,
    participants: [],
    description: ''
  });

  const handleInputChange = (name: string, value: any) => {
    setExpenseData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleButtonClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex} clicked`);
    if (buttonIndex === 1) {
      // User cancelled, go back
      router.push('/expenses-dashboard');
    }

    if (buttonIndex === 2) {
      // User confirmed, validate input and save in localStorage
      if (validateExpenseData(expenseData)) {
        appendExpenseToLocalStorage(expenseData);
        router.push('/expenses-dashboard');
      } else {
        alert('Por favor, completá todos los campos');
      }

    }
  };

  const validateExpenseData = (data: typeof expenseData) => {
    return (
      data.payer &&
      data.amount > 0 &&
      data.participants.length > 0 &&
      data.description
    );
  };


  const appendExpenseToLocalStorage = (newExpense: typeof expenseData) => {
    const existingExpenses = localStorage.getItem('expenses');
    let expenses = existingExpenses ? JSON.parse(existingExpenses) : [];

    expenses.push(newExpense);

    localStorage.setItem('expenses', JSON.stringify(expenses));
  };

  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <div>
        <h1 className={`${archivo.className} flex text-center break-normal items-center lg:text-5xl text-2xl md:text-3xl mb-8`}>
          Agregar gasto
        </h1>
      </div>
      <div>
        <div className='text-center object-top w-screen lg:text-2xl md:text-1xl items-center p-12'>
          <ExpenseCrud onInputChange={handleInputChange} />
          <ConfirmCancelBar onButtonClick={handleButtonClick} />
        </div>
      </div>
    </main>
  );
}
