'use client'
import React, { useState } from 'react';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar'

// Define a type for the expense items
interface ExpenseItem {
  id: number;
  persona: string;
  descripcion: string;
  involucrados: string;
  gasto: number;
}

const ExpensesDashboardPage = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  const handleDelete = (id: number) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  const handleModify = (id: number) => {
    // Placeholder for modifying an expense item
    console.log(`Modify expense with id: ${id}`);
  };

  const handleButtonClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex} clicked`);
    // Add your logic here for each button click
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


