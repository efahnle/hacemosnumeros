import { archivo } from '@/app/ui/fonts';
import { FormPage } from './components/TagsFormPage';
//import Image from "next/image";
export default function Home() {
  return (
    <main className="flex flex-col items-center p-20 min-w-32">
      <div>
        <h1 className={`${archivo.className} flex text-center break-normal items-center lg:text-5xl text-2xl md:text-3xl`}>
          ¿Hacemos números?
        </h1>
      </div>
      <div>
        <div>
          <p className="text-center object-top lg:text-2xl md:text-1xl items-center p-12">
            Ingresá los nombres
          </p>
        </div>
        <div className='text-center object-top lg:text-2xl md:text-1xl items-center p-12'>
          <FormPage/>
        </div>
      </div>
    </main>
  );
}
