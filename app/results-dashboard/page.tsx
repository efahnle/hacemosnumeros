'use client'

import { useRouter } from 'next/navigation';
import ResultsTable from '@/app/components/ResultsTable';
import ResultsBar from '@/app/components/ResultsBar';
import ResultsAlgorithm from '@/app/components/ResultsAlgorithm';
import calculateResults from '@/app/components/ResultsAlgorithm';


const ResultsDashboardPage = () => {
  const router = useRouter();
  const handleButtonClick = (buttonIndex: number) => {
    if (buttonIndex === 1) {
      // Go back, user must edit an expense
      router.push('/expenses-dashboard');
    } 
    if (buttonIndex === 2) {
        // Export???
        
    } 

  };

  const getExpenses = () => {
    const tmp_expenses = localStorage.getItem('expenses');
    if (tmp_expenses) {
      return JSON.parse(tmp_expenses);
    } else {
      return [];
    }
  }

  const getNames = () => {
    const tmp_names = localStorage.getItem('names');
    if (tmp_names) {
      return JSON.parse(tmp_names);
    } else {
      return [];
    }
  }

  const getSimplify = () => {
    return Boolean(localStorage.getItem('simplify'));
  }

  const expenses = getExpenses();
  const names = getNames();
  const simplify = getSimplify();

  const result = calculateResults(expenses, names, simplify);
 //console.log(result);






  return (
    <main className="flex flex-col items-center p-12 min-w-32">
      <h1 className="flex text-center break-normal items-center text-3xl md:text-3xl lg:text-5xl ">¡Hicimos números!</h1>
      <ResultsTable debtMap={result}/>
      <ResultsBar onButtonClick={handleButtonClick}/>

    </main>
  );
};

export default ResultsDashboardPage;


