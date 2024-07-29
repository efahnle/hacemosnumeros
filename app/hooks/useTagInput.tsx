import { useState, useEffect } from "react";

const useTagInput = (maxTags = 5) => {
  const [tags, setTags] = useState<string[]>([]);
  

  // Load initial tags from localStorage if they exist
  useEffect(() => {
    const storedTags = localStorage.getItem('names');
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    }
  }, []);

  const handleAddTag = (newTag: string) => {
    const newTags = newTag
      .split(',')
      .map(tag => {
        const tagLowerCase = tag.trim().toLowerCase();
        const firstLetterUpper = tagLowerCase.charAt(0).toUpperCase();
        return firstLetterUpper + tagLowerCase.slice(1);
      })
      .filter(tag => tag && !tags.includes(tag));

      const uniqueTags = [...new Set([...tags, ...newTags])];
      if (uniqueTags.length <= maxTags) {
        setTags(uniqueTags);
      } else {
        setTags(uniqueTags.slice(0, maxTags));
      }
    };

  const handleRemoveTag = (tag: string) =>
    setTags(tags.filter((t) => t !== tag));

  return { tags, handleAddTag, handleRemoveTag };
};

export default useTagInput;