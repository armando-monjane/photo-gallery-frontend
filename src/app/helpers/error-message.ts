/**
 * Returns an array of error messages from the given error object.
 * @param err - The error object to extract messages from.
 * @returns An array of error messages.
 */
export const getErrorMessages = (err: any): string[] => {
  if (err.data) {
    if (
      err.data.errors &&
      typeof err.data.errors === 'object' &&
      Object.keys(err.data.errors).length > 0
    ) {
      return Object.values(err.data.errors)
        .map((err: any) => (typeof err === 'object' ? Object.values(err) : []))
        .flat() as string[];
    } else if (err.data.message && typeof err.data.message === 'string') {
      return [err.data.message];
    }
  }

  return ['An error occurred'];
};
