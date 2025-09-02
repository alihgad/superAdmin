import mongoose from "mongoose";
declare const roleModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    permissions: mongoose.Types.ObjectId[];
    name?: {
        arabic: string;
        english: string;
    } | null;
    createdBy?: mongoose.Types.ObjectId | null;
    updatedBy?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    permissions: mongoose.Types.ObjectId[];
    name?: {
        arabic: string;
        english: string;
    } | null;
    createdBy?: mongoose.Types.ObjectId | null;
    updatedBy?: mongoose.Types.ObjectId | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    permissions: mongoose.Types.ObjectId[];
    name?: {
        arabic: string;
        english: string;
    } | null;
    createdBy?: mongoose.Types.ObjectId | null;
    updatedBy?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    permissions: mongoose.Types.ObjectId[];
    name?: {
        arabic: string;
        english: string;
    } | null;
    createdBy?: mongoose.Types.ObjectId | null;
    updatedBy?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    permissions: mongoose.Types.ObjectId[];
    name?: {
        arabic: string;
        english: string;
    } | null;
    createdBy?: mongoose.Types.ObjectId | null;
    updatedBy?: mongoose.Types.ObjectId | null;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    permissions: mongoose.Types.ObjectId[];
    name?: {
        arabic: string;
        english: string;
    } | null;
    createdBy?: mongoose.Types.ObjectId | null;
    updatedBy?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default roleModel;
//# sourceMappingURL=role.d.ts.map