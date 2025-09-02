import mongoose from "mongoose";
declare const lecinceModel: mongoose.Model<{
    isActive: boolean;
    name?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    isActive: boolean;
    name?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}, {}> & {
    isActive: boolean;
    name?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    isActive: boolean;
    name?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    isActive: boolean;
    name?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}>, {}> & mongoose.FlatRecord<{
    isActive: boolean;
    name?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default lecinceModel;
//# sourceMappingURL=lecince.d.ts.map