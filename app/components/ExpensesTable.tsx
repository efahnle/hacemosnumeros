import React from 'react';

// Define a type for the expense items
interface ExpenseItem {
  id: number;
  persona: string;
  descripcion: string;
  involucrados: string;
  gasto: number;
}

// Define the props for the ExpensesTable component
interface ExpensesTableProps {
  expenses: ExpenseItem[];
  onDelete: (id: number) => void;
  onModify: (id: number) => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, onDelete, onModify }) => {
  return (
    <div className="overflow-x-auto text-center object-top lg:text-2xl md:text-1xl items-center p-12">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Persona</th>
            <th className="px-4 py-2 border-b">Descripción</th>
            <th className="px-4 py-2 border-b">Involucrados</th>
            <th className="px-4 py-2 border-b">Gasto</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-4 py-2 border-b">{expense.persona}</td>
              <td className="px-4 py-2 border-b">{expense.descripcion}</td>
              <td className="px-4 py-2 border-b">{expense.involucrados}</td>
              <td className="px-4 py-2 border-b">{expense.gasto.toFixed(2)}</td>
              <td className="px-4 py-2 border-b flex space-x-2">
                <button
                  onClick={() => onModify(expense.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Modificar
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
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
