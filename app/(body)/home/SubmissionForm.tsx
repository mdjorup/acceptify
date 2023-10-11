'use client';

import { Prompt, School } from '@/shared/types';
import {
  Button,
  Select,
  SelectItem,
  Selection,
  Textarea,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SubmissionFormProps {
  schools: School[];
  prompts: Prompt[];
}

export const SubmissionForm = ({ schools, prompts }: SubmissionFormProps) => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [essayText, setEssayText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

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
    setEssayText('');
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

  const isInvalidEssay = (): boolean => {
    if (selectedPrompt == null || essayText == null) {
      return false;
    }

    const wordCount = essayText.trim().split(/\s+/).length;
    const characterCount = essayText.length;

    if (
      selectedPrompt.max_characters != null &&
      characterCount > selectedPrompt.max_characters
    ) {
      return true;
    }

    if (
      selectedPrompt.max_words != null &&
      wordCount > selectedPrompt.max_words
    ) {
      return true;
    }

    return false;
  };

  const essayDescription = (): string => {
    if (selectedPrompt == null) {
      return '';
    }

    const characterCount = essayText.length;
    const trimmedEssayText = essayText.trim();
    const wordCount =
      trimmedEssayText.length === 0 ? 0 : trimmedEssayText.split(/\s+/).length;

    if (selectedPrompt.max_characters != null) {
      return `${characterCount} / ${selectedPrompt.max_characters} characters`;
    }

    if (selectedPrompt.max_words != null) {
      return `${wordCount} / ${selectedPrompt.max_words} words`;
    }

    return '';
  };

  const hasAllFields = (): boolean => {
    return selectedSchool != null && selectedPrompt != null && essayText !== '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedSchool == null || selectedPrompt == null || essayText === '') {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('school_id', selectedSchool.id.toString());
    formData.append('prompt_id', selectedPrompt.id.toString());
    formData.append('essay_content', essayText);

    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.error != null) {
      setErrorMessage(data.error);
    } else {
      setErrorMessage('');
    }

    setIsSubmitting(false);

    router.replace('/reviews'); // TODO: uncomment
  };

  return (
    <form
      className="mx-auto mt-10 flex w-10/12 flex-col space-y-4 p-6"
      onSubmit={handleSubmit}
    >
      <Select
        label="School"
        placeholder="Select a School"
        className="max-w-sm"
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
        fullWidth={true}
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
        validationState={isInvalidEssay() ? 'invalid' : 'valid'}
        errorMessage={errorMessage}
        description={essayDescription()}
        label="Essay"
        placeholder="Paste your essay here"
        value={essayText}
        onValueChange={setEssayText}
      />

      <Button
        color="primary"
        isDisabled={!hasAllFields()}
        type="submit"
        isLoading={isSubmitting}
      >
        Generate
      </Button>
    </form>
  );
};
