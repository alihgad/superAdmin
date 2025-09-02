import mongoose from "mongoose";
declare const blogModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    text: string;
    sections: mongoose.Types.DocumentArray<{
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }> & {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }>;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    text: string;
    sections: mongoose.Types.DocumentArray<{
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }> & {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }>;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, {}> & {
    text: string;
    sections: mongoose.Types.DocumentArray<{
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }> & {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }>;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    text: string;
    sections: mongoose.Types.DocumentArray<{
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }> & {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }>;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    text: string;
    sections: mongoose.Types.DocumentArray<{
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }> & {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }>;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    text: string;
    sections: mongoose.Types.DocumentArray<{
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }> & {
        title?: {
            arabic?: string | null;
            english?: string | null;
        } | null;
        content?: {
            arabic: string[];
            english: string[];
        } | null;
    }>;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default blogModel;
//# sourceMappingURL=blog.d.ts.map