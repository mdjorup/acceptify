'use client';

import { School } from '@/shared/types';
import { Select, SelectItem } from '@nextui-org/react';

interface SchoolInputProps {
  schools: School[];
  isDisabled: boolean;
  onSelectingSchool: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const defaultMessage = 'Select a School';

export const SchoolInput = ({
  schools,
  onSelectingSchool,
  isDisabled,
}: SchoolInputProps) => {
  return (
    <Select
      label="School"
      placeholder="Select a School"
      className="max-w-xs"
      isRequired={true}
      isDisabled={isDisabled}
      onChange={onSelectingSchool}
    >
      {schools &&
        schools.map((school, i) => (
          <SelectItem key={school.id} value={i}>
            {school.official_name}
          </SelectItem>
        ))}
    </Select>
  );
};
