'use client'

import { useRouter,useParams } from 'next/navigation';
import { useState } from 'react';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar'
import { archivo } from '@/app/ui/fonts';
import AddExpenseButton from '@/app/components/AddExpenseButton';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getDataInIndex, deleteExpenseInGroup } from '@/app/lib/LocalStorageWrapper'
import { Group } from '@/app/interfaces/Interfaces';



const ExpensesDashboardPageChild = (data : Group) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{group_id: string}>();
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [modalAction, setModalAction] = useState<() => void>(() => { });
  //const [simplifyStatus, setSimplifyStatus] = useState(false);


  //const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  const groupData = getDataInIndex(Number(params['group_id']))
  console.log("groupdata:" + groupData);



  const handleDelete = (index: number) => {
    console.log(`should delete expense at index: ${index}`);
    deleteExpenseInGroup(index, Number(params['group_id']));
    location.reload();
  };

  const handleModify = (expense_id: number) => {
    console.log(`Modify expense with id: ${expense_id}`);
    const url = '/expenses/' + params['group_id'] + '/edit-expense/' + expense_id.toString()
    router.push(url);
  };

  const handleButtonClick = (buttonIndex: number) => {
    setLoading(true);

    if (buttonIndex === 1) {
      // edit people / group
      router.push('/');
    } else if (buttonIndex === 2) {
      router.push('/results' + + params['group_id']);
    } else if (buttonIndex === 3) {
      router.push('/expenses/' + params['group_id'] + '/add-expense');
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
            <ExpensesTable data={groupData} onDelete={handleDelete} onModify={handleModify} />
            <AddExpenseButton onButtonClick={handleButtonClick} />
          </div>
          <ButtonBar onButtonClick={handleButtonClick} loading={loading} />
        </>
      )}
    </main>
  );
};

export default ExpensesDashboardPageChild;

