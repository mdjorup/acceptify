const schools = [
  'Harvard',
  'Yale',
  'Princeton',
  'Columbia',
  'Brown',
  'Cornell',
  'Dartmouth',
  'University of Pennsylvania',
  'Stanford',
  'MIT',
  'Caltech',
  'Duke',
  'Johns Hopkins',
  'University of Chicago',
  'Northwestern',
  'University of Michigan',
  'Carnegie Mellon',
  'University of California, Berkeley',
  'University of California, Los Angeles',
  'University of Southern California',
  'University of Virginia',
];
// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function getSchools(): Promise<string[]> {
  return schools;
}

export const getSchoolPrompts = async (school: string): Promise<string[]> => {
  return [`Why ${school}?`];
};
