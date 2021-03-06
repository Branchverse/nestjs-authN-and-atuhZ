import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Role } from '../../shared/enums/role';

@Schema({timestamps: true, _id:true})
export class User {

    @Expose()
    @Transform((params) => params.obj._id.toString())
    _id: ObjectId;

    @Expose()
    @Prop({required:true, unique: true})
    username: string;

    @Prop({required:true})
    password: string;

    @Expose()
    @Prop({required:true, unique: true, lowercase: true})
    email: string;

    @Expose()
    @Prop({required:true})
    firstName: string;

    @Expose()
    @Prop({required:true})
    lastName: string;

    @Expose()
    @Prop({required:true, default: Role.UNASSIGNED})
    role: Role;

    @Expose({groups: ['admin']})
    @Prop({required:true, default: Date.now})
    lastLogin: Date;
    
    @Expose({groups: ['admin']})
    @Prop()
    createdAt: Date;

    @Expose({groups: ['admin']})
    @Prop()
    updatedAt: Date;

    @Expose({groups: ['admin']})
    @Prop()
    deletedAt: Date;

    @Expose({groups: ['admin']})
    @Prop({required:true, default: false})
    deleted: boolean;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);