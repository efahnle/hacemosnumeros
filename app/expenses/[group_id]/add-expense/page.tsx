'use client'

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { archivo } from '@/app/ui/fonts';
import { ExpenseCrud } from '@/app/components/ExpenseCRUD';
import ConfirmCancelBar from '@/app/components/ConfirmCancelBar';
import { addExpenseToGroup } from '@/app/lib/LocalStorageWrapper';
import { ExpenseItem } from '@/app/interfaces/Interfaces';

export default function AddExpense() {
  const router = useRouter();
  const params = useParams<{group_id: string}>();

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
    if (buttonIndex === 1) {
      // User cancelled, go back
      router.push('/expenses/' + params['group_id']);
    }

    if (buttonIndex === 2) {
      // User confirmed, validate input and save in localStorage
      if (validateExpenseData(expenseData)) {
        const newExpense: ExpenseItem = {
          payer: expenseData.payer,
          amount: expenseData.amount,
          description: expenseData.description,
          participants: expenseData.participants
        }

        addExpenseToGroup(newExpense, Number(params['group_id']));

        router.push('/expenses/' + params['group_id']);
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
