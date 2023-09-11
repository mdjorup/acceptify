import { Select, SelectItem } from '@nextui-org/react';

interface EssayPromptInputProps {
  essayPrompts: string[];
  isDisabled?: boolean;
  onSelectingEssayPrompt: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const EssayPromptInput = ({
  essayPrompts,
  isDisabled,
  onSelectingEssayPrompt,
}: EssayPromptInputProps) => {
  return (
    <Select
      label="Essay Prompt"
      placeholder="Select an essay prompt"
      isDisabled={isDisabled}
      isRequired={true}
      onChange={onSelectingEssayPrompt}
    >
      {essayPrompts &&
        essayPrompts.map((essayPrompt, i) => (
          <SelectItem key={essayPrompt} value={i}>
            {essayPrompt}
          </SelectItem>
        ))}
    </Select>
  );
};
