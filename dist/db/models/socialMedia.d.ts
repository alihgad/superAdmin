import mongoose from "mongoose";
declare const socialModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    link: string;
    icon: string;
    display: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    link: string;
    icon: string;
    display: boolean;
}, {}> & {
    link: string;
    icon: string;
    display: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    link: string;
    icon: string;
    display: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    link: string;
    icon: string;
    display: boolean;
}>, {}> & mongoose.FlatRecord<{
    link: string;
    icon: string;
    display: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default socialModel;
//# sourceMappingURL=socialMedia.d.ts.map