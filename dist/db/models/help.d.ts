import mongoose from "mongoose";
declare const helpModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    arabic?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    article?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    cover?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    vedio?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    arabic?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    article?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    cover?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    vedio?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, {}> & {
    arabic?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    article?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    cover?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    vedio?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    arabic?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    article?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    cover?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    vedio?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    arabic?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    article?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    cover?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    vedio?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    arabic?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        steps: string[];
        title?: string | null;
        content?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    article?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    cover?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    vedio?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default helpModel;
//# sourceMappingURL=help.d.ts.map