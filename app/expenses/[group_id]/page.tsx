'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ExpensesTable from '@/app/components/ExpensesTable';
import ButtonBar from '@/app/components/ButtonBar';
import { archivo } from '@/app/ui/fonts';
import AddExpenseButton from '@/app/components/AddExpenseButton';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getDataInIndex, deleteExpenseInGroup } from '@/app/lib/LocalStorageWrapper';
import { Group } from '@/app/interfaces/Interfaces';
import EmptyStateComponent from '@/app/components/EmptyStateComponent';


const ExpensesDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState<Group | null>(null); 
  const router = useRouter();
  const params = useParams<{ group_id: string }>();
  console.log(groupData);

  // Fetch group data after component mounts (client-side only)
  useEffect(() => {
    const groupIndex = Number(params['group_id']);
    const data = getDataInIndex(groupIndex);
    setGroupData(data);
  }, [params]);

  const handleDelete = (index: number) => {
    deleteExpenseInGroup(index, Number(params['group_id']));
    location.reload();
  };

  const handleModify = (expense_id: number) => {
    const url = '/expenses/' + params['group_id'] + '/edit-expense/' + expense_id.toString();
    router.push(url);
  };

  const handleButtonClick = (buttonIndex: number) => {
    setLoading(true);

    if (buttonIndex === 1) {
      // edit people / group
      router.push('/');
    } else if (buttonIndex === 2) {
      router.push('/results/' + params['group_id']);
    } else if (buttonIndex === 3) {
      router.push('/expenses/' + params['group_id'] + '/add-expense');
    }
  };

  return (
    <main className="flex flex-col items-center px-8 py-20 min-w-32">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className={`${archivo.className} flex text-center break-normal text-nowrap mt-8 items-center text-2xl md:text-2xl lg:text-3xl `}>
            Gastos
          </h1>

          <div>
          {(groupData?.expenses?.length ?? 0) > 0 ? (
              <>
                <ExpensesTable data={groupData} onDelete={handleDelete} onModify={handleModify} />
                <AddExpenseButton onButtonClick={handleButtonClick} />
              </>
            ) : (
              <EmptyStateComponent onCreateNew={() => router.push('/expenses/' + params['group_id'] + '/add-expense')} />
            )}
          </div>
          <ButtonBar onButtonClick={handleButtonClick} loading={loading} />
        </>
      )}
    </main>
  );
};

export default ExpensesDashboardPage;
