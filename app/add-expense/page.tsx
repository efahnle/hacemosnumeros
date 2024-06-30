'use client'

import { archivo } from '@/app/ui/fonts';
import { ExpenseCrud } from '@/app/components/ExpenseCRUD';
import ConfirmCancelBar from '../components/ConfirmCancelBar';

export default function Home() {

const handleButtonClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex} clicked`);
    // Add your logic here for each button click
    };
    
  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <div>
        <h1 className={`${archivo.className} flex text-center break-normal items-center lg:text-5xl text-2xl md:text-3xl mb-8`}>
          Agregar gasto
        </h1>
      </div>
      <div>
        <div className='text-center object-top w-screen lg:text-2xl md:text-1xl items-center p-12'>
          <ExpenseCrud/>
          <ConfirmCancelBar onButtonClick={handleButtonClick}/>
        </div>
      </div>
    </main>
  );
}