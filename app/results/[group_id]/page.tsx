'use client'

import { useRouter, useParams } from 'next/navigation';
import ResultsTable from '@/app/components/ResultsTable';
import ResultsBar from '@/app/components/ResultsBar';
import { archivo } from '@/app/ui/fonts';
import calculateResults from '@/app/lib/ResultsAlgorithm';
import { getExpensesFromGroup, getGroupNameInGroup } from '@/app/lib/LocalStorageWrapper';


const ResultsDashboardPage = () => {
  const router = useRouter();
  const params = useParams<{ group_id: string }>();

  const handleButtonClick = (buttonIndex: number,  debtmap?: Record<string, Record<string, number>>,groupName?: string) => {
    if (buttonIndex === 1) {
      // Go back, user must edit an expense
      router.push('/expenses/' + params['group_id']);
    }
    if (buttonIndex === 2) {
      console.log(debtmap);
      let header = "*¡Hicimos números!*\n\nJuntada: " + groupName + "\n\n";

      let payer_details = ""
      for (const person_a in debtmap) {
        console.log(person_a);

        for (const person_b in debtmap[person_a]) {
          console.log(person_b);
          if (debtmap[person_a][person_b] > 0) {
            // person_a OWES person_b $N 
            //console.log(person_a + " owes " + person_b + " $" + debtMap[person_a][person_b])
            let record = " - " + person_a + " le debe $" + Math.abs(debtmap[person_a][person_b]).toFixed(2).toString() + " a " + person_b + "\n";
            payer_details = payer_details + record
          } else {
            // person_b OWES person_a $n
            //console.log(person_b + " owes " + person_a + " $" + Math.abs(debtMap[person_a][person_b]))
            let record = " - " + person_a + " recibe $" + Math.abs(debtmap[person_a][person_b]).toFixed(2).toString() + " de " + person_b + "\n";
            payer_details = payer_details + record
          }
        }
      }
      
      const footer = "\nHecho con ❤️ en hacemosnumeros.com.ar"
      const message = header + payer_details +  footer;
      console.log(message);

      window.open("whatsapp://send?text=" + encodeURI(message), '_blank')
    }

  };




  const expenses = getExpensesFromGroup(Number(params['group_id']));
  const groupName = getGroupNameInGroup(Number(params['group_id']));
  
  //const simplify = getSimplify();

  const result = calculateResults(expenses);
  //console.log(result);






  return (
    <main className="flex flex-col items-center p-12 min-w-32">
      <h1 className={`${archivo.className} flex text-center break-normal pt-20 items-center text-3xl md:text-3xl lg:text-5xl`}>¡Hicimos números!</h1>
      <ResultsTable debtMap={result} />
      <ResultsBar onButtonClick={handleButtonClick} debtMap={result} groupName={groupName}/>

    </main>
  );
};

export default ResultsDashboardPage;


