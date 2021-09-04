import { Response } from 'express';

export type Status = 'success' | 'error';

export interface ServerResponse {
    status: Status;
    message: string;
}

export type MiddlewareResponse = Response<ServerResponse> | void;
export type ControllerResponse = Response<ServerResponse>;
