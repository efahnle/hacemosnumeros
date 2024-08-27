"use client"

import { usePreviousGroups } from '@/app/hooks/usePreviousGroups';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { deleteGroup } from '@/app/lib/LocalStorageWrapper';


export const PreviousGroupsPage = () => {
  const { groups } = usePreviousGroups();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    console.log("rowclick " + index)
    router.push(`/expenses/${index}`);
  };

  const handleEditClick = (index: number) => {
    router.push(`/edit-group/${index}`);
  };

  const handleDeleteClick = (index: number) => {
    setGroupToDelete(index);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (groupToDelete !== null) {
      console.log(`Confirmed delete of group at index ${groupToDelete}`);
      deleteGroup(groupToDelete);
      setIsModalOpen(false);
      setGroupToDelete(null);
      location.reload();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGroupToDelete(null);
  };

  return (
    <>
      {groups && groups.length > 0 && (
        <div>
          <div className="text-left pb-6 mt-8 text-xl md:text-3xl">Juntadas anteriores</div>
          <div className='border-2 rounded-md border-gray-700 px-2 pb-2'>
            <div className="w-full overflow-x-auto text-center object-top text-xs sm:text-l md:text-2xl items-center p-2 mt-8">
              <table className="min-w-full bg-white border-gray-300">
                <thead>
                  <tr>
                    <th className="px-1 py-0.5 border-y">Nombre</th>
                    <th className="px-1 py-0.5 border-y">Gastos</th>
                    <th className="px-1 py-0.5 border-y">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td
                        className="px-1 py-0.5 border-y cursor-pointer"
                        onClick={() => handleRowClick(index)}
                      >
                        {group.group_name}
                      </td>
                      <td className="px-1 py-0.5 border-y"
                        onClick={() => handleRowClick(index)}>
                        {group.expenses.length} gastos
                      </td>
                      <td className="px-1 py-0.5 border-y">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(index);
                          }}
                        >
                          <AiOutlineEdit size={24} />
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(index);
                          }}
                        >
                          <AiOutlineDelete size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl mb-4">Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar esta juntada?</p>
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
