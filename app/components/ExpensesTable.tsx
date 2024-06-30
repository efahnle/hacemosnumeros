import React from 'react';

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; // Import an icon from react-icons


// Define a type for the expense items
interface ExpenseItem {
  payer: string;
  description: string;
  participants: [string];
  amount: number;
}

// Define the props for the ExpensesTable component
interface ExpensesTableProps {
  expenses: ExpenseItem[];
  onDelete: (id: number) => void;
  onModify: (id: number) => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, onDelete, onModify }) => {
  return (
    <div className="overflow-x-auto text-center object-top  text-xs sm:text-l md:text-2xl  items-center p-2 mt-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8  lg:py-4 border-b">Persona</th>
            <th className="px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8  lg:py-4 border-b">Descripción</th>
            <th className="px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8  lg:py-4 border-b">Involucrados</th>
            <th className="px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8  lg:py-4 border-b">Gasto</th>
            <th className="px-1 py-0.5 sm:px-4 sm:py-2 lg:px-8  lg:py-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{expense.payer}</td>
              <td className="px-4 py-2 border-b">{expense.description}</td>
              <td className="px-4 py-2 border-b">{expense.participants.join(', ')}</td>
              <td className="px-4 py-2 border-b">${expense.amount.toFixed(2)}</td>
              <td className="px-4 py-2 border-b items-center ">
                <button
                  onClick={() => onModify(index)}
                  className="text-blue-500 hover:text-blue-700 px-3"
                >
                  <AiOutlineEdit/>
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="text-red-500 hover:text-red-700 px-"
                >
                  <AiOutlineDelete/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
