import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class PostgresExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = exception.message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.driverError.message) {
      case 'duplicate key value violates unique constraint "flower_name_key"':
        message = 'Flower already exists';
        status = HttpStatus.BAD_REQUEST;
        break;

      case 'numeric field overflow':
        message = 'Price is too high';
        status = HttpStatus.BAD_REQUEST;
        break;

        default:
            message = 'An error occurred while creating the flower';
            status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
        statusCode: status,
        message: message,
    })
  }
}
