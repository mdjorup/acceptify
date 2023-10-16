'use client';

import { Prompt, Review, School } from '@/shared/types';
import {
  Link,
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

const getTableCellStatusClass = (status: string | null) => {
  switch (status) {
    case 'pending':
      return 'text-yellow-500';
    case 'in progress':
      return 'text-blue-500';
    case 'complete':
      return 'text-green-500';
    default:
      return ''; // Default color for unknown statuses
  }
};

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

              <TableCell className={getTableCellStatusClass(review.status)}>
                {review.status &&
                  review.status.charAt(0).toUpperCase() +
                    review.status.slice(1)}
              </TableCell>
              <TableCell>
                <Link
                  isBlock
                  showAnchorIcon
                  href={`/reviews/${review.id}`}
                  color="foreground"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewsTable;
