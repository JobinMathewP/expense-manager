import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionsDeniedException extends HttpException {
  constructor(
    message: string = 'You do not have permission to perform this action',
  ) {
    super(message, HttpStatus.FORBIDDEN); // HTTP 403
  }
}
