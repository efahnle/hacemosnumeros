import { useState, ChangeEvent } from "react";

interface iTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
}

export const TagField = ({ tags, addTag, removeTag, maxTags }: iTag) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput.trim() !== "" && userInput.length <= 30 && tags.length < maxTags) {
        addTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col w-[250px] md:w-[400px] lg:w-[600px] xl:w-[700px] text-sm md:text-base lg:text-lg py-2 md:py-4">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Ingresá al menos 2 nombres"
            : `Solo se puede hasta ${maxTags} personas`
        }
        className="w-full border border-gray-300 rounded-md px-2 md:px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      <div className="flex flex-row flex-wrap gap-3 mt-4 mb-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-center px-2 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};