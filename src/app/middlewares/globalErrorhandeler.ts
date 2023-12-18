/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastErrorError from '../errors/handleCastErrorError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

export const globalErrorHandeler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpliedError = handleZodError(err);
    statusCode = simpliedError?.statusCode;
    message = simpliedError?.message;
    errorSources = simpliedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simpliedError = handleValidationError(err);
    statusCode = simpliedError?.statusCode;
    message = simpliedError?.message;
    errorSources = simpliedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simpliedError = handleCastErrorError(err);
    statusCode = simpliedError?.statusCode;
    message = simpliedError?.message;
    errorSources = simpliedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: 'appError path',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: 'Error path',
        message: err?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
