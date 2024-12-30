'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ResultsTable from '@/app/components/ResultsTable';
import ResultsBar from '@/app/components/ResultsBar';
import { archivo } from '@/app/ui/fonts';
import calculateResults from '@/app/lib/ResultsAlgorithm';
import { getExpensesFromGroup, getGroupNameInGroup } from '@/app/lib/LocalStorageWrapper';
import { ExpenseItem } from '@/app/interfaces/Interfaces';
import EmptyStateComponent from '@/app/components/EmptyStateComponent';
import { sortDebts } from '@/app/lib/ResultsAlgorithm';



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
      const processed = new Set<string>(); // Track processed relationships
  
      for (const personA in debtMap) {
        for (const personB in debtMap[personA]) {
          // Create a unique key to track each relationship
          const key = `${personA}-${personB}`;
          const reverseKey = `${personB}-${personA}`;
  
          // Skip if the reverse relationship has already been processed
          if (processed.has(reverseKey)) continue;
  
          processed.add(key);
  
          if (debtMap[personA][personB] > 0) {
            payerDetails += ` - ${personA} le debe $${Math.abs(debtMap[personA][personB]).toFixed(2)} a ${personB}\n`;
          }
        }
      }
  
      const footer = "\nHecho con ❤️ en hacemosnumeros.com";
      const message = `${header}${payerDetails}${footer}`;
      const encodedMessage = encodeURIComponent(message);

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const whatsappURL = isMobile
        ? `whatsapp://send?text=${encodedMessage}` // Mobile apps
        : `https://web.whatsapp.com/send?text=${encodedMessage}`; // WhatsApp Web/Desktop
  
      window.open(whatsappURL, '_blank');    }
  };

  const result = calculateResults(expenses);

  return (
    <main className="flex flex-col items-center px-8 py-20 min-w-32">

      {expenses.length > 0 ? (
        <>
          <h1 className={`${archivo.className} flex text-center break-normal mt-8 items-center text-2xl lg:text-3xl`}>
            ¡Hicimos números!
          </h1>
          <ResultsTable debtMap={sortDebts(result)} />
          <ResultsBar onButtonClick={handleButtonClick} debtMap={sortDebts(result)} groupName={groupName} />
        </>
      ) : (
        <EmptyStateComponent onCreateNew={() => router.push('/expenses/' + params['group_id'] + '/add-expense')} />
      )}

    </main>
  );
};

export default ResultsDashboardPage;
