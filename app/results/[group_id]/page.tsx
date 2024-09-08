'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ResultsTable from '@/app/components/ResultsTable';
import ResultsBar from '@/app/components/ResultsBar';
import { archivo } from '@/app/ui/fonts';
import calculateResults from '@/app/lib/ResultsAlgorithm';
import { getExpensesFromGroup, getGroupNameInGroup } from '@/app/lib/LocalStorageWrapper';
import { ExpenseItem } from '@/app/interfaces/Interfaces';

const ResultsDashboardPage = () => {
  const router = useRouter();
  const params = useParams<{ group_id: string }>();
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [groupName, setGroupName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const groupIndex = Number(params['group_id']);
    setExpenses(getExpensesFromGroup(groupIndex));
    setGroupName(getGroupNameInGroup(groupIndex));
  }, [params]);

  const handleButtonClick = (buttonIndex: number, debtMap?: Record<string, Record<string, number>>, groupName?: string) => {
    if (buttonIndex === 1) {
      router.push('/expenses/' + params['group_id']);
    }
    if (buttonIndex === 2) {
      const header = `*¡Hicimos números!*\n\nJuntada: ${groupName}\n\n`;
      let payerDetails = "";

      for (const personA in debtMap) {
        for (const personB in debtMap[personA]) {
          const record = debtMap[personA][personB] > 0 
            ? ` - ${personA} le debe $${Math.abs(debtMap[personA][personB]).toFixed(2)} a ${personB}\n`
            : ` - ${personA} recibe $${Math.abs(debtMap[personA][personB]).toFixed(2)} de ${personB}\n`;

          payerDetails += record;
        }
      }

      const footer = "\nHecho con ❤️ en hacemosnumeros.com";
      const message = `${header}${payerDetails}${footer}`;
      window.open(`whatsapp://send?text=${encodeURI(message)}`, '_blank');
    }
  };

  const result = calculateResults(expenses);

  return (
    <main className="flex flex-col items-center px-8 py-20 min-w-32">
      <h1 className={`${archivo.className} flex text-center break-normal mt-8 items-center text-2xl lg:text-3xl`}>
        ¡Hicimos números!
      </h1>
      <ResultsTable debtMap={result} />
      <ResultsBar onButtonClick={handleButtonClick} debtMap={result} groupName={groupName} />
    </main>
  );
};

export default ResultsDashboardPage;
