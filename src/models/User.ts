import { Schema, model, Document } from 'mongoose';
import { File } from './File';

export interface User extends Document {
    id: string;
    email: string;
    password: string;
    diskSpace: number;
    usedSpace: number;
    avatar: string;
    files: File[] | string[];
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024**3*10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }]
});

export default model<User>("User", userSchema);
