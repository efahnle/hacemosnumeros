'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { archivo } from '@/app/ui/fonts';
import { ExpenseCrud } from '../../components/ExpenseCRUD';
import ConfirmCancelBar from '../../components/ConfirmCancelBar';

export default function Home() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  //console.log(params);

  const getExpenseFromLocalStorage = (index: number) => {
    const existingExpenses = localStorage.getItem('expenses');
    let expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
    //console.log(expenses[index])
    return expenses[index]
  };

  const expenseObject = getExpenseFromLocalStorage(Number(params['id']))

  const [expenseData, setExpenseData] = useState({
    payer: expenseObject.payer,
    amount: expenseObject.amount,
    participants: expenseObject.participants,
    description: expenseObject.description
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
      // User confirmed, validate input and save in localStorage
      if (validateExpenseData(expenseData)) {
        updateExpenseInLocalStorage(expenseData);
        router.push('/expenses-dashboard');
      } else {
        alert('Please fill out all fields correctly.');
      }
    }

    if (buttonIndex === 2) {
      // User cancelled, go back
      router.push('/expenses-dashboard');
    }
  };

  const validateExpenseData = (data: typeof expenseData) => {

    console.log(data.payer)
    console.log(data.amount)
    console.log(data.participants)
    console.log(data.description)
    
    
    
    
    return (
      data.payer &&
      data.amount > 0 &&
      data.participants.length > 0 &&
      data.description
    );
  };


  const updateExpenseInLocalStorage = (newExpense: typeof expenseData) => {
    const existingExpenses = localStorage.getItem('expenses');
    let expenses = existingExpenses ? JSON.parse(existingExpenses) : [];

    expenses.splice(Number(params['id']), 1)
    const updatedExpenses = expenses.toSpliced(Number(params['id']),0,newExpense)

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };



  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <div>
        <h1 className={`${archivo.className} flex text-center break-normal items-center lg:text-5xl text-2xl md:text-3xl mb-8`}>
          Editar gasto
        </h1>
      </div>
      <div>
        <div className='text-center object-top w-screen lg:text-2xl md:text-1xl items-center p-12'>
          <ExpenseCrud onInputChange={handleInputChange} 
            prePayer={expenseObject['payer']} 
            preAmount={expenseObject['amount']} 
            preParticipants={expenseObject['participants']} 
            preDescription={expenseObject['description']} 
          />
          <ConfirmCancelBar onButtonClick={handleButtonClick} />
        </div>
      </div>
    </main>
  );
}
