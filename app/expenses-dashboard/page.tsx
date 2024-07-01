'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar'
import Modal from '../components/Modal';


const ExpensesDashboardPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => { });
  const [simplifyStatus, setSimplifyStatus] = useState(false);


  useEffect(() => {
    const simplifySetting = localStorage.getItem('simplify');
    setSimplifyStatus(!Boolean(simplifySetting));
  }, []);

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
    } else if (buttonIndex === 3) {
      // Check the current simplify status before showing the modal
      const simplifySetting = localStorage.getItem('simplify');
      const isSimplifyActive = simplifySetting === "true";
      setSimplifyStatus(isSimplifyActive);

      // Show modal to confirm action
      setModalAction(() => () => {
        console.log('Confirmed action for button 3');
        router.push('/some-other-page'); // Replace with the desired path
        setIsModalOpen(false); // Close modal after action
      });
      setIsModalOpen(true);
    }
  };


  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <h1 className="flex text-center break-normal items-center text-2xl md:text-3xl lg:text-5xl ">Cargá los gastos</h1>
      <ExpensesTable expenses={expenses} onDelete={handleDelete} onModify={handleModify} />
      <ButtonBar onButtonClick={handleButtonClick} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalAction}
        title="¿Hacemos números entonces?"
        message="Si ya cargaste todos los datos, podés confirmar."
        simplifyStatus={simplifyStatus}
      />
    </main>
  );
};

export default ExpensesDashboardPage;


