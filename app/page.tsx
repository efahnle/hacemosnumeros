import { archivo } from '@/app/ui/fonts';
import { FormPage } from './components/TagsFormPage';
//import Image from "next/image";
export default function Home() {
  return (
    <main className="flex flex-col items-center py-20 px-4 min-w-32">
      <div>
        <h1 className={`${archivo.className}flex text-center break-normal text-nowrap items-center text-3xl md:text-3xl lg:text-5xl `}>
          ¿Hacemos números?
        </h1>
      </div>
      <div className='w-full '>
        <div>
          <p className="text-center object-top lg:text-2xl md:text-1xl items-center p-12">
            Ingresá los nombres
          </p>
        </div>
        <div className='text-center w-full object-top lg:text-2xl md:text-1xl items-center py-12 px-4'>
          <FormPage/>
        </div>
      </div>
    </main>
  );
}
