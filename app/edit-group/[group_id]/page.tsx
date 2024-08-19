'use client'

import { useRouter, useParams } from 'next/navigation';
import { useEffect, FormEvent, useState } from 'react';
import useTagInput from "@/app/hooks/useTagInput";
import { TagField } from "@/app/ui/TagField";
import { getDataInIndex, updateGroupNameAndParticipants } from "@/app/lib/LocalStorageWrapper";
import { archivo } from '@/app/ui/fonts';


const EditGroupPage = () => {
    const MAX_TAGS = 50;
    const MIN_TAGS = 2;
    const router = useRouter();
    const params = useParams<{ group_id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [groupName, setGroupName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { tags, setTags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS);


    function getRemovedParticipants(oldParticipants: string[], newParticipants: string[]): string[] {
        return oldParticipants.filter(participant => !newParticipants.includes(participant));
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        router.push('/');
    }

    const confirmDelete = () => {
        const groupData = getDataInIndex(Number(params['group_id']));
        const removedParticipants = getRemovedParticipants(groupData.names, tags);
        updateGroupNameAndParticipants(Number(params['group_id']), groupName, tags, removedParticipants);
        router.push('/expenses/' + params['group_id']);

    };

    // Fetch the existing group data on mount
    useEffect(() => {
        const groupData = getDataInIndex(Number(params['group_id']));
        setGroupName(groupData.group_name);
        setTags(groupData.names);
    }, [params, setTags]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (groupName.trim() === '' || tags.length < MIN_TAGS) {
            setErrorMessage("Ponele un nombre a la juntada e ingresa al menos 2 participantes");
        } else {
            setErrorMessage('');

            const groupData = getDataInIndex(Number(params['group_id']));
            const removedParticipants = getRemovedParticipants(groupData.names, tags);

            if (removedParticipants.length > 0) {
                // Prompt user with a modal
                //const confirmRemoval = confirm(`Los siguientes participantes serán eliminados: ${removedParticipants.join(', ')}. Esto eliminará o reasignará todos los gastos asociados. ¿Desea continuar?`);
                setIsModalOpen(true);

            } else {
                updateGroupNameAndParticipants(Number(params['group_id']), groupName, tags, removedParticipants);
                router.push('/expenses/' + params['group_id']);
        
            }

        }
    };
    return (
        <div className='text-center w-full object-top lg:text-2xl md:text-1xl items-center py-20 px-8'>
            <div>
                <div className={`${archivo.className}flex text-center break-normal text-nowrap items-center text-3xl md:text-4xl lg:text-5xl`}>
                    Editá la juntada
                </div>
                <div>
                    <p className="text-center object-top lg:text-2xl md:text-1xl items-center px-12 py-6">
                        Nombre de la juntada
                    </p>
                </div>

                <div className="flex flex-col w-full text-sm md:text-base lg:text-lg py-2 md:py-4">
                    <div className="flex flex-row items-center gap-2">
                        <input
                            name="keyword_group"
                            type="text"
                            placeholder={"Ejemplo: Cena en lo de Eric"}
                            className="w-full border border-gray-300 rounded-md px-2 md:px-4 py-2"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <p className="text-center object-top lg:text-2xl md:text-1xl items-center px-12 py-6">
                        Participantes
                    </p>
                </div>

                <section className="items-center justify-center gap-y-4 ">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <TagField
                                tags={tags}
                                addTag={handleAddTag}
                                removeTag={handleRemoveTag}
                                maxTags={MAX_TAGS}
                            />
                            <div className="mt-6 flex justify-between">
                                <button
                                    className="pd-4 h-10 mt-4 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600"
                                    type='reset'
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`pd-4 h-10 mt-4 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 ${tags.length < MIN_TAGS ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    Guardar cambios
                                </button>
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </section>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-xl mb-4">Borrar participantes</h2>
                        <p>Si ya hay gastos en esta juntada, borrar un participante causará que se lo elimine de los gastos.</p><br />
                        <p>Si ese participante fue el que pagó, se eliminará el gasto por completo.</p>
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
        </div>

    );
};

export default EditGroupPage;