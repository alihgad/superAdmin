import mongoose from "mongoose";
export declare const userModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name?: string | null;
    createdBy?: string | null;
    email?: string | null;
    password?: string | null;
    role?: mongoose.Types.ObjectId | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: NativeDate | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name?: string | null;
    createdBy?: string | null;
    email?: string | null;
    password?: string | null;
    role?: mongoose.Types.ObjectId | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: NativeDate | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name?: string | null;
    createdBy?: string | null;
    email?: string | null;
    password?: string | null;
    role?: mongoose.Types.ObjectId | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name?: string | null;
    createdBy?: string | null;
    email?: string | null;
    password?: string | null;
    role?: mongoose.Types.ObjectId | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: NativeDate | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name?: string | null;
    createdBy?: string | null;
    email?: string | null;
    password?: string | null;
    role?: mongoose.Types.ObjectId | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: NativeDate | null;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name?: string | null;
    createdBy?: string | null;
    email?: string | null;
    password?: string | null;
    role?: mongoose.Types.ObjectId | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: NativeDate | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=user.d.ts.map