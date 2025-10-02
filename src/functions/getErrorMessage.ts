import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function getErrorMessage(
  error: FetchBaseQueryError | unknown
): string | null {
  if (!error) return null;

  if ('status' in (error as FetchBaseQueryError)) {
    const err = error as FetchBaseQueryError;
    if (typeof err.data === 'string') return err.data;
    if (err.data && typeof err.data === 'object' && 'message' in err.data) {
      return (err.data as any).message;
    }
    return `Error ${err.status}`;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as any).message;
  }

  return 'Unknown error';
}
