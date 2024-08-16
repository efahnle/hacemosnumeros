"use client"

import { usePreviousGroups } from '@/app/hooks/usePreviousGroups';
import { useRouter } from 'next/navigation';

export const PreviousGroupsPage = () => {
  const { groups } = usePreviousGroups();

  const router = useRouter();

  const handleRowClick = (index: number) => {
    router.push(`/expenses/${index}`);
  };

  
  return (
    <>
      {groups && groups.length > 0 && (
        <div>
          <div className='text-center mt-8 text-xl md:text-3xl'>Juntadas anteriores</div>
          <div className="w-full overflow-x-auto text-center object-top text-xs sm:text-l md:text-2xl items-center p-2 mt-12">
            <table className="min-w-full bg-white border-gray-300">
              <tbody>
                {groups.map((group, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(index)}
                    className="cursor-pointer hover:bg-gray-100" // Add hover effect if needed
                  >
                    <td className="px-1 py-0.5 border-y">{group.group_name}</td>
                    <td className="px-1 py-0.5 border-y">Donde hubieron {group.expenses.length} gastos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
