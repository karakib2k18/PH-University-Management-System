import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const duplicateValue = (err.message.match(/"([^"]+)"/) || [])[1];

  const errorSources: TErrorSources = [
    {
      path: err?.keyValue,
      message: `${duplicateValue} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Value found',
    errorSources,
  };
};

export default handleDuplicateError;
