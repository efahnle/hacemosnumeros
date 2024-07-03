import { useState, ChangeEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";


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


  const handleAddTag = () => {
    if (userInput.trim() !== "" && userInput.length <= 100 && tags.length < maxTags) {
      addTag(userInput);
      setUserInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput.trim() !== "" && userInput.length <= 100 && tags.length < maxTags) {
        addTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col w-full text-sm md:text-base lg:text-lg py-2 md:py-4">
      <div className="flex flex-row items-center gap-2">
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
        <button
          className="bg-blue-500 text-white px-3 py-3 rounded-md hover:bg-blue-700"
          onClick={handleAddTag}
          disabled={userInput.trim() === "" || userInput.length > 100 || tags.length === maxTags}
        >
          <AiOutlinePlus />
        </button>
      </div>

      <div className="flex flex-row w-full flex-wrap gap-3 mt-4 mb-4">
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