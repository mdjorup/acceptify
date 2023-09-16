import { redirect } from 'next/navigation';

export interface ReviewPageProps {
  reviewId: string;
}

export interface IReviewProgress {
  progress: number;
}

interface IReview {
  reviewId: string;
  essayContent: string;
  essayPrompt: string;
  complete?: boolean;
}

const updateReviewProgress = (reviewId: string): IReviewProgress => {
  return { progress: 90 };
};

const ReviewPage = ({ params }: { params: ReviewPageProps }) => {
  const { reviewId } = params;

  // make sure that the user has access to the review
  let hasAccess = true;

  if (!hasAccess) {
    redirect('/home');
  }

  // get review info

  const review: IReview = {
    reviewId: reviewId,
    essayContent: '',
    essayPrompt: '',
    complete: true,
  };

  if (!review.complete) {
    redirect(`/reviews/${reviewId}/status`);
  }

  return <div>Summary of the review! {JSON.stringify(review)}</div>;
};

export default ReviewPage;
