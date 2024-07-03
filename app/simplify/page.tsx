'use client'
import { archivo } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/expenses-dashboard');
  };

  return (
    <main className="flex flex-col items-center p-6 md:p-8 lg:p-10 xl:p-12  min-w-32">
      <div>
        <h1 className={`${archivo.className} flex text-center break-normal items-center pt-20 lg:text-5xl text-2xl md:text-3xl mb-8`}>
          ¿Qué es "Simplificar"?
        </h1>
      </div>
      <div>
        <div>
          <p className="text-center object-top lg:text-2xl md:text-1xl items-center p-6">
            <b>Simplificar</b> reduce la cantidad de pagos que se deben realizar.
          </p>
        </div>
        <div className='text-left object-top lg:text-2xl md:text-1xl items-center p-6'>
          <p>
            Por ejemplo:
          </p>
          <ul className="list-disc p-12">
            <li>Si <b>Juan</b> debe pagarle $100 a <b>Pedro</b></li>
            <li>Y <b>Pedro</b> debe pagarle $100 a <b>Franco</b></li>
          </ul>
          <p>
            <b>Simplificar</b> elimina el pago en el medio y hace que <b>Juan</b> le pague directamente a <b>Franco</b> $100
          </p>
        </div>
        <div>
          <h3 className={`${archivo.className} text-red-800 text-center break-normal items-center lg:text-2xl text-l md:text-xl mt-16`}>
            Sin Simplificar
          </h3>
        </div>
        <div className="flex justify-center mt-4">
          <Image
            src="/without-simplification.png" // Path to the image in the public directory
            alt="Example without simplification"
            width={800} // Set the width of the image
            height={600} // Set the height of the image
          />
        </div>
        <h3 className={`${archivo.className} text-green-600 text-center break-normal items-center lg:text-2xl text-l md:text-xl mt-12`}>
          Con Simplificar
        </h3>
        <div className="flex justify-center mt-4">
          <Image
            src="/with-simplification.png" // Path to the image in the public directory
            alt="Example with simplification"
            width={800} // Set the width of the image
            height={600} // Set the height of the image
          />
        </div>
        <div className="flex mt-10 mb-8 justify-center">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-4 py-2 xl:px-8 xl:py-4 rounded text-xs md:text-sm lg:text-base xl:text-2xl hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    </main>
  );
}