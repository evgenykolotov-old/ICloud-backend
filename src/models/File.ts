import { model, Schema, Document } from 'mongoose';
import { User } from './User';

export interface File extends Document {
    _id: string;
    name: string;
	type: string;
	accessLink: string;
	size: number;
	path: string;
	user: User | string;
	parent?: File | string;
	children: string[];
}

const fileSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	accessLink: { type: String },
	size: { type: Number, default: 0 },
	path: { type: String, default: '' },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	parent: { type: Schema.Types.ObjectId, ref: "File" },
	children: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

export default model<File>("File", fileSchema);
