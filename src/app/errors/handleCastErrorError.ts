import { CastError } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastErrorError = (err: CastError): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'invalid ID',
    errorSources,
  };
};

export default handleCastErrorError;
