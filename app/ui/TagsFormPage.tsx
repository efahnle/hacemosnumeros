"use client";

import useTagInput from "../hooks/useTag";
import { TagField } from "../components/TagField";

export const FormPage = () => {
  const MAX_TAGS = 50;
  const MIN_TAGS = 2;

  const { tags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS);

  const handleSubmit = () => {
    console.log(tags);
  };

  return (
    <section className="flex justify-center gap-y-4">
      <form>
        <TagField
          tags={tags}
          addTag={handleAddTag}
          removeTag={handleRemoveTag}
          maxTags={MAX_TAGS}
        />

        <button
          onClick={handleSubmit}
          className={`pd-4 h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 ${tags.length < MIN_TAGS ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={tags.length < MIN_TAGS}
        >
          Continuar
        </button>
      </form>
    </section>
  );
};