'use client';

import { Prompt, Review, School } from '@/shared/types';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import format from 'date-fns/format';

export interface ReviewWithRelations extends Omit<Review, 'prompt_id'> {
  prompt_id: Review['prompt_id'];
  prompt: {
    id: Prompt['id'];
    prompt_text: Prompt['prompt_text'];
    schools: School | null;
  } | null;
}

interface ReviewsTableProps {
  reviews: ReviewWithRelations[];
  // onReviewDelete: (review: Review) => void;
  // onReviewEdit: (review: Review) => void;
}

const ReviewsTable = ({ reviews }: ReviewsTableProps) => {
  return (
    <div>
      <Table isStriped aria-label="Reviews Collection">
        <TableHeader>
          <TableColumn>Created</TableColumn>
          <TableColumn>School</TableColumn>
          <TableColumn>Prompt</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                {format(new Date(review.created_at), "MM/dd/yyyy 'at' h:mm a")}
              </TableCell>
              <TableCell>{review.prompt?.schools?.official_name}</TableCell>
              <TableCell>{review.prompt?.prompt_text}</TableCell>

              <TableCell>{review.status}</TableCell>
              <TableCell>{'view'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewsTable;
