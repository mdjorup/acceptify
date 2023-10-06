'use client';

import { Prompt, School } from '@/shared/types';
import { Select, SelectItem, Selection } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface SubmissionFormProps {
  schools: School[];
  prompts: Prompt[];
}

export const SubmissionForm = ({ schools, prompts }: SubmissionFormProps) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    if (selectedSchoolId) {
      const relevantPrompts = prompts.filter(
        (prompt) => prompt.school_id === selectedSchoolId,
      );
      setFilteredPrompts(relevantPrompts);
    } else {
      setFilteredPrompts([]);
    }
  }, [selectedSchoolId, prompts]);

  const handleSchoolSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      return;
    }
    const selectedSchoolId = Number(keys.values().next().value);
    setSelectedSchoolId(selectedSchoolId);
  };

  return (
    <div className="mx-auto mt-10 w-10/12 space-y-4 p-6">
      <Select
        label="School"
        placeholder="Select a School"
        className="max-w-xs"
        isRequired={true}
        onSelectionChange={handleSchoolSelectionChange}
      >
        {schools &&
          schools.map((school) => (
            <SelectItem key={school.id} value={school.id}>
              {school.official_name}
            </SelectItem>
          ))}
      </Select>
      <Select
        label="Essay Prompt"
        placeholder="Select an Essay Prompt"
        className="max-w-xs"
        isRequired={true}
        isDisabled={selectedSchoolId == null}
      >
        {filteredPrompts &&
          filteredPrompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.prompt_text}>
              {prompt.prompt_text}
            </SelectItem>
          ))}
      </Select>

      {/* <EssayPromptInput
        essayPrompts={essayPrompts}
        onSelectingEssayPrompt={onSelectingEssayPrompt}
        isDisabled={school === '' || isLoading}
      />

      <Textarea
        isRequired={true}
        isDisabled={school === '' || essayPrompt === '' || isLoading}
        label="Essay"
        placeholder="Paste your essay here"
        required={true}
        description={`${wordCount()} / ${650}`}
        validationState={isValid() ? 'valid' : 'invalid'}
        onValueChange={setEssay}
        className="rounded"
      ></Textarea> */}

      {/* <Button
        color="primary"
        isDisabled={!hasAllFields()}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Generate
      </Button> */}
    </div>
  );
};
