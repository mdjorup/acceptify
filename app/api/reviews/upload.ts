import { v4 as uuidv4 } from 'uuid';

export interface UploadSubmissionProps {
  userId: string | null | undefined;
  school: string;
  essayPrompt: string;
  essayText: string;
}

export interface UploadSubmissionResponse {
  success: boolean;
  message?: string;
  reviewId?: string;
}

export const uploadSubmission = async (
  props: UploadSubmissionProps,
): Promise<UploadSubmissionResponse> => {
  const { userId, school, essayPrompt, essayText } = props;

  if (!userId) {
    return {
      success: false,
      message: 'User not logged in',
    };
  }

  const reviewId = uuidv4();

  // 1) check if the user is able to submit
  // most likely this is if the user has free available reviews or is subscribed

  // 2) upload the submission to the database

  // 3) subtract available submissions from the user's account

  // 4) invoke a function to process the review based on the submission id

  // timeout 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true,
    reviewId,
  };
};
