'use client'

import { useRouter } from 'next/navigation';
import ResultsTable from '@/app/components/ResultsTable';
import ResultsBar from '@/app/components/ResultsBar'


const ResultsDashboardPage = () => {
  const router = useRouter();


  const loadExpenses = () => {
    const tmp_expenses = localStorage.getItem('expenses');
    if (tmp_expenses) {
      return JSON.parse(tmp_expenses);
    } else {
      return [];
    }
  }

  const expenses = loadExpenses();




  const handleButtonClick = (buttonIndex: number) => {
    if (buttonIndex === 1) {
      // Go back, user must edit an expense
      router.push('/expenses-dashboard');
    } 
    if (buttonIndex === 2) {
        // Export???
        
    } 

  };


  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <h1 className="flex text-center break-normal items-center text-2xl md:text-3xl lg:text-5xl ">¡Hicimos números!</h1>
      <ResultsTable/>
      <ResultsBar onButtonClick={handleButtonClick}/>

    </main>
  );
};

export default ResultsDashboardPage;


