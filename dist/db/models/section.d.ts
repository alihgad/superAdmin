import mongoose from "mongoose";
declare const sectionModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    page: string;
    section: string;
    images: mongoose.Types.DocumentArray<{
        public_id?: string | null;
        secure_url?: string | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        public_id?: string | null;
        secure_url?: string | null;
    }> & {
        public_id?: string | null;
        secure_url?: string | null;
    }>;
    arabic?: {
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        title?: string | null;
        content?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    page: string;
    section: string;
    images: mongoose.Types.DocumentArray<{
        public_id?: string | null;
        secure_url?: string | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        public_id?: string | null;
        secure_url?: string | null;
    }> & {
        public_id?: string | null;
        secure_url?: string | null;
    }>;
    arabic?: {
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        title?: string | null;
        content?: string | null;
    } | null;
}, {}> & {
    page: string;
    section: string;
    images: mongoose.Types.DocumentArray<{
        public_id?: string | null;
        secure_url?: string | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        public_id?: string | null;
        secure_url?: string | null;
    }> & {
        public_id?: string | null;
        secure_url?: string | null;
    }>;
    arabic?: {
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        title?: string | null;
        content?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    page: string;
    section: string;
    images: mongoose.Types.DocumentArray<{
        public_id?: string | null;
        secure_url?: string | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        public_id?: string | null;
        secure_url?: string | null;
    }> & {
        public_id?: string | null;
        secure_url?: string | null;
    }>;
    arabic?: {
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        title?: string | null;
        content?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    page: string;
    section: string;
    images: mongoose.Types.DocumentArray<{
        public_id?: string | null;
        secure_url?: string | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        public_id?: string | null;
        secure_url?: string | null;
    }> & {
        public_id?: string | null;
        secure_url?: string | null;
    }>;
    arabic?: {
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        title?: string | null;
        content?: string | null;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    page: string;
    section: string;
    images: mongoose.Types.DocumentArray<{
        public_id?: string | null;
        secure_url?: string | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        public_id?: string | null;
        secure_url?: string | null;
    }> & {
        public_id?: string | null;
        secure_url?: string | null;
    }>;
    arabic?: {
        title?: string | null;
        content?: string | null;
    } | null;
    english?: {
        title?: string | null;
        content?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default sectionModel;
//# sourceMappingURL=section.d.ts.map