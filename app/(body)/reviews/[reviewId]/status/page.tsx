'use client';
import { Progress } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReviewPageProps } from '../page';

interface ReviewStatusPageProps extends ReviewPageProps {}

const ReviewStatus = ({ params }: { params: ReviewStatusPageProps }) => {
  let status = 0.7;

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentProgress = Math.random() * 100;
      setProgress(currentProgress);
    }, 1000); // polling every 1000ms (1 second)

    // Clear the interval when the component is unmounted.
    return () => clearInterval(interval);
  }, []);

  if (progress > 80) {
    redirect(`/reviews/${params.reviewId}`);
  }
  return (
    <div>
      Review in Progress!
      <Progress size="md" value={progress} />
    </div>
  );
};

export default ReviewStatus;
