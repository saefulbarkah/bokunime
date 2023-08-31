import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export const httpApiErrorHandle = (error: AxiosError) => {
  if (error === null) throw new Error('Unrecoverable error!! Error is null!');
  const errorCode = error.response?.status;
  if (errorCode === 404)
    return NextResponse.json('Resource not found', {
      status: 404,
    });
  if (errorCode === 500)
    return NextResponse.json('Server error', { status: 500 });
  return NextResponse.json(error);
};
