'use client';

import { uploadSubmission } from '@/app/api/reviews/upload';
import { getSchoolPrompts } from '@/app/api/schools/getSchools';
import { useAuth } from '@clerk/nextjs';
import { Button, Textarea } from '@nextui-org/react';
import { redirect } from 'next/navigation';
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userId } = useAuth();

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

  const clearForm = () => {
    setSchool('');
    setEssayPrompts([]);
    setEssayPrompt('');
    setEssay('');
  };

  const wordCount = (): number => {
    if (!essay) return 0;
    return essay.trim().split(/\s+/).length;
  };

  const isValid = (): boolean => {
    return wordCount() <= 650;
  };

  const hasAllFields = (): boolean => {
    return school !== '' && essayPrompt !== '' && essay !== '';
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // generate a review id

    const response = await uploadSubmission({
      userId,
      school,
      essayPrompt,
      essayText: essay,
    });

    // add this to a database with all of the submission information

    // post request to API to generate the review

    // await 2 seconds

    setIsLoading(false);
    if (response.reviewId != null) {
      redirect(`/reviews`);
    }
  };

  return (
    <div className="mx-auto mt-10 w-10/12 space-y-4 p-6">
      <SchoolInput
        schools={schools}
        onSelectingSchool={onSelectingSchool}
        isDisabled={isLoading}
      />

      <EssayPromptInput
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
      ></Textarea>

      <Button
        color="primary"
        isDisabled={!hasAllFields()}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Generate
      </Button>
    </div>
  );
};
