'use client';

import { Prompt, School } from '@/shared/types';
import { Select, SelectItem, Selection, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface SubmissionFormProps {
  schools: School[];
  prompts: Prompt[];
}

export const SubmissionForm = ({ schools, prompts }: SubmissionFormProps) => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    if (selectedSchool != null) {
      const relevantPrompts = prompts.filter(
        (prompt) => prompt.school_id === selectedSchool.id,
      );
      setFilteredPrompts(relevantPrompts);
    } else {
      setFilteredPrompts([]);
    }
  }, [selectedSchool, prompts]);

  const handleSchoolSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      return;
    }
    const selectedSchoolId = Number(keys.values().next().value);
    const selectedSchool = schools.find(
      (school) => school.id === selectedSchoolId,
    );
    if (selectedSchool == null) {
      return;
    }
    setSelectedSchool(selectedSchool);
    setSelectedPrompt(null);
  };

  const handlePromptSelectionChange = (keys: Selection) => {
    // Add this handler
    if (keys === 'all') {
      return;
    }
    const selectedPromptId = Number(keys.values().next().value);
    const selectedPrompt = prompts.find(
      (prompt) => prompt.id === selectedPromptId,
    ) as Prompt;
    if (selectedSchool == null) {
      return;
    }
    setSelectedPrompt(selectedPrompt);
  };

  const isValidEssay = () => {};

  return (
    <div className="mx-auto mt-10 flex w-10/12 flex-col space-y-4 p-6">
      <Select
        label="School"
        placeholder="Select a School"
        className="w-2/3"
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
        className="w-2/3"
        isRequired={true}
        onSelectionChange={handlePromptSelectionChange}
        isDisabled={selectedSchool == null}
      >
        {filteredPrompts &&
          filteredPrompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.prompt_text}
            </SelectItem>
          ))}
      </Select>
      <Textarea
        isRequired={true}
        isDisabled={selectedPrompt == null}
        label="Essay"
        placeholder="Paste your essay here"
      />

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
