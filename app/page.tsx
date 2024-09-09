import NewGroupPage from '@/app/components/NewGroupPage';
import PreviousGroupsPage from '@/app/components/PreviousGroupsPage';

export default function Home() {

  /* moved to layout
        <div>
        <h1 className={`${archivo.className}flex text-center break-normal text-nowrap items-center text-3xl md:text-4xl lg:text-5xl `}>
          ¿Hacemos números?
        </h1>
      </div>*/

  return (
    <main className="flex flex-col items-center py-20 px-4 min-w-32 max-w-5xl mx-auto">


      <div className='w-full '>
        <div className='text-center w-full object-top lg:text-2xl md:text-1xl items-center py-6 px-4'>
          <NewGroupPage />
        </div>
      </div>
      <div className='text-center w-full object-top lg:text-2xl md:text-1xl items-center py-6 px-4'>
        <PreviousGroupsPage/>
      </div>
    </main>
  );
}
