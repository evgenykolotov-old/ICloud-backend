import { User } from './types';

declare global {
    export namespace Express {
        export interface Request {
            user?: Partial<User>;
        }
    }
}