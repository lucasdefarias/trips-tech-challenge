import { HttpException } from '@nestjs/common';
import { HttpError } from './httpError';

export const mapException = (error: any) => {
  if (error instanceof HttpError) {
    throw new HttpException(error.message, error.code, {
      description: JSON.stringify(error.context?.details ?? {}),
    });
  }
  throw error;
};
