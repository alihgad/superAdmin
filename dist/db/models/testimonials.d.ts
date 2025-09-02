import mongoose from "mongoose";
export declare const testimonialModel: mongoose.Model<{
    arabic?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    english?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    arabic?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    english?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, {}> & {
    arabic?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    english?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    arabic?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    english?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    arabic?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    english?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    arabic?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    english?: {
        name?: string | null;
        text?: string | null;
        company?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=testimonials.d.ts.map