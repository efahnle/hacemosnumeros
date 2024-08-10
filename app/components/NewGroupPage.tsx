"use client";

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import useTagInput from "../hooks/useTagInput";
import { TagField } from "../ui/TagField";

export const NewGroupPage = () => {
  const MAX_TAGS = 50;
  const MIN_TAGS = 2;
  const router = useRouter();

  const { tags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS);
  const [ groupName, setGroupName ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(''); // State for error message


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (groupName.trim() === '' || tags.length < MIN_TAGS) {
      setErrorMessage("Ponele un nombre a la juntada e ingresa al menos 2 participantes");
    } else {
      setErrorMessage(''); // Clear any existing error message
      console.log("Group Name:", groupName); // Log the group name
      console.log("Tags:", tags); // Log the tags
      localStorage.setItem('names', JSON.stringify(tags));
      router.push('/expenses-dashboard');
    }
  };


  const isButtonDisabled = groupName.trim() === '' || tags.length < MIN_TAGS;

  return (
    <div>
      <div>
        <p className="text-center object-top lg:text-2xl md:text-1xl items-center px-12 py-6">
          Ponele un nombre a la juntada
        </p>
      </div>

      <div className="flex flex-col w-full text-sm md:text-base lg:text-lg py-2 md:py-4">
        <div className="flex flex-row items-center gap-2">
          <input
            name="keyword_group"
            type="text"
            placeholder={
              "Ejemplo: Cena en lo de Eric"
            }
            className="w-full border border-gray-300 rounded-md px-2 md:px-4 py-2"
            value={groupName} // Bind the input value to state
            onChange={(e) => setGroupName(e.target.value)} // Update state on input change

          />
        </div>
      </div>

      <div>
        <p className="text-center object-top lg:text-2xl md:text-1xl items-center px-12 py-6">
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
  );
};