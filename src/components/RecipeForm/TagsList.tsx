import { useState } from 'react';
import { Badge } from '../badge/Badge';
import { Input } from './Input';

export const TagsList = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const value = inputValue.trim();
    if (!value) return;

    setTags((prev) => [...prev, value]);
    setInputValue('');
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-1 items-center">
        <Input
          id="tags"
          type="text"
          name="tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag}
        />

        {tags.map((tag, index) => (
          <input key={`tag-${index}`} type="hidden" name="tags" value={tag} />
        ))}

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              onClick={() => handleRemoveTag(index)}
              text={tag}
              close={true}
              key={`tag-${index}`}
              variant="default"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
