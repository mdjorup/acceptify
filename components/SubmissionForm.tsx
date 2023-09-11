'use client';

import { getSchoolPrompts } from '@/app/api/schools/getSchools';
import { Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { EssayPromptInput } from './EssayPromptInput';
import { SchoolInput } from './SchoolInput';

interface SubmissionFormProps {
  schools: string[];
}

export const SubmissionForm = ({ schools }: SubmissionFormProps) => {
  // let's make this more object oriented in the future
  const [school, setSchool] = useState<string>('');
  const [essayPrompts, setEssayPrompts] = useState<string[]>([]);
  const [essayPrompt, setEssayPrompt] = useState<string>('');
  const [essay, setEssay] = useState<string>('');

  useEffect(() => {
    const setNewPrompts = async () => {
      const newPrompts = await getSchoolPrompts(school);
      setEssayPrompts(newPrompts);
    };
    setNewPrompts();
  }, [school]);

  const onSelectingSchool = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchool(e.target.value);
    setEssayPrompts([]);
    setEssayPrompt('');
    setEssay('');
  };

  const onSelectingEssayPrompt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEssayPrompt(e.target.value);
    setEssay('');
  };

  const wordCount = (): number => {
    if (!essay) return 0;
    return essay.trim().split(/\s+/).length;
  };

  const isValid = (): boolean => {
    return wordCount() <= 650;
  };

  return (
    <div className="mx-auto mt-10 w-full space-y-4 p-6">
      <SchoolInput schools={schools} onSelectingSchool={onSelectingSchool} />

      <EssayPromptInput
        essayPrompts={essayPrompts}
        onSelectingEssayPrompt={onSelectingEssayPrompt}
        isDisabled={school === ''}
      />

      <Textarea
        isRequired={true}
        isDisabled={school === '' || essayPrompt === ''}
        label="Essay"
        placeholder="Paste your essay here"
        required={true}
        description={`${wordCount()} / ${650}`}
        validationState={isValid() ? 'valid' : 'invalid'}
        onValueChange={setEssay}
        className="rounded"
      ></Textarea>
    </div>
  );
};
