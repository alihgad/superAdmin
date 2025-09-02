import mongoose from "mongoose";
declare const footerModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    link: string;
    category: string;
    arabic?: {
        title: string;
    } | null;
    english?: {
        title: string;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    link: string;
    category: string;
    arabic?: {
        title: string;
    } | null;
    english?: {
        title: string;
    } | null;
}, {}> & {
    link: string;
    category: string;
    arabic?: {
        title: string;
    } | null;
    english?: {
        title: string;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    link: string;
    category: string;
    arabic?: {
        title: string;
    } | null;
    english?: {
        title: string;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    link: string;
    category: string;
    arabic?: {
        title: string;
    } | null;
    english?: {
        title: string;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    link: string;
    category: string;
    arabic?: {
        title: string;
    } | null;
    english?: {
        title: string;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default footerModel;
//# sourceMappingURL=footer.d.ts.map