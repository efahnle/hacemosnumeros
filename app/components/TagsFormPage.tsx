"use client";

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import useTagInput from "../hooks/useTag";
import { TagField } from "../ui/TagField";

export const FormPage = () => {
  const MAX_TAGS = 50;
  const MIN_TAGS = 2;
  const router = useRouter();

  const { tags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS);

  const handleSubmit = (event : FormEvent) => {
    event.preventDefault();
    console.log(tags);
    localStorage.setItem('tags', JSON.stringify(tags));
    
    router.push('/expenses-dashboard');
  };

  return (
    <section className="flex justify-center gap-y-4">
      <form onSubmit={handleSubmit}>
        <TagField
          tags={tags}
          addTag={handleAddTag}
          removeTag={handleRemoveTag}
          maxTags={MAX_TAGS}
        />

        <button
          type="submit"
          className={`pd-4 h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 ${tags.length < MIN_TAGS ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={tags.length < MIN_TAGS}
        >
          Continuar
        </button>
      </form>
    </section>
  );
};