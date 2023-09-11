'use client';

import { Select, SelectItem } from '@nextui-org/react';

interface SchoolInputProps {
  schools: string[];
  onSelectingSchool: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const defaultMessage = 'Select a School';

export const SchoolInput = ({
  schools,
  onSelectingSchool,
}: SchoolInputProps) => {
  return (
    <Select
      label="School"
      placeholder="Select a School"
      className="max-w-xs"
      isRequired={true}
      onChange={onSelectingSchool}
    >
      {schools &&
        schools.map((school, i) => (
          <SelectItem key={school} value={i}>
            {school}
          </SelectItem>
        ))}
    </Select>
  );
};
