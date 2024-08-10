"use client"

import { usePreviousGroups } from '@/app/hooks/usePreviousGroups';


export const PreviousGroupsPage = () => {
  const { groups, setGroups } = usePreviousGroups();

  console.log(groups);
  if (groups) {
    
    return (
      <div>
        <div>Otras de tus juntadas</div>
        <div className="overflow-x-auto text-center object-top  text-xs sm:text-l md:text-2xl  items-center p-2 mt-12">
          <table className="min-w-full bg-white border-gray-300">
            <tbody>
              {groups && groups.map((group, index) => (
                <tr key={index}>
                  <td className="px-1 py-0.5 border-y">{group.payer}</td>
                  <td className="px-1 py-0.5 border-y">{group.participants.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  } else {
      return ("vacio");
  }
  


};