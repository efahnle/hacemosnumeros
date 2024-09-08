'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import useTagInput from "@/app/hooks/useTagInput";
import { TagField } from "@/app/ui/TagField";
import { initializeDataForNewGroup } from "@/app/lib/LocalStorageWrapper"


const NewGroupPage = () => {
  const MAX_TAGS = 50;
  const MIN_TAGS = 2;
  const router = useRouter();

  const { tags, setTags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS);
  const [groupName, setGroupName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (groupName.trim() === '' || tags.length < MIN_TAGS) {
      setErrorMessage("Ponele un nombre a la juntada e ingresa al menos 2 participantes");
    } else {
      setErrorMessage('');
      const index = initializeDataForNewGroup(groupName, tags);

      router.push('/expenses/' + index);
    }
  };

  return (
    <div>
      
      <div className='text-center font-bold mt-8 pb-6 text-2xl md:text-3xl lg:text-3xl'>
        Creá una nueva juntada  
      </div>
      
      <div className='border-2 rounded-md border-[614B47] px-2 pb-2'>
        <div>
          <p className="text-center object-top lg:text-xl md:text-1xl  pt-8">
            Ponele un nombre a la juntada
          </p>
        </div>

        <div className="flex flex-col w-full text-sm md:text-base lg:text-lg py-2 md:py-4">
          <div className="flex flex-row items-center gap-2">
            <input
              id="input_name_group"
              name="keyword_group"
              type="text"
              placeholder={
                "Ejemplo: Cena en lo de Eric"
              }
              className="w-full border border-gray-300 rounded-md px-2 md:px-4 py-2"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}

            />
          </div>
        </div>

        <div>
          <p className="text-center object-top lg:text-xl md:text-1xl  pt-8">
            Ingresá los participantes
          </p>
        </div>

        <section className="items-center justify-center gap-y-4 ">
          <form onSubmit={handleSubmit}>
            <TagField
              tags={tags}
              addTag={handleAddTag}
              removeTag={handleRemoveTag}
              maxTags={MAX_TAGS}
            />

            <button
              id="add"
              type="submit"
              className={`pd-4 h-10 mt-4 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 ${tags.length < MIN_TAGS ? "opacity-50 cursor-not-allowed" : ""}`}

            >
              Comenzar
            </button>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">
                {errorMessage}
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};


export default NewGroupPage;