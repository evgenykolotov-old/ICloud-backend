import { Response } from 'express';
import { User } from '../models/User';

export type Status = 'success' | 'error';

export interface ServerResponse {
    status: Status;
    message: string;
    payload?: Partial<User>;
}

export type MiddlewareResponse = Response<ServerResponse> | void;
export type ControllerResponse = Response<ServerResponse>;
