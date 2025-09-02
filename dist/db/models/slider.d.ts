import mongoose from "mongoose";
declare const SliderModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    page: string;
    section: string;
    slides: mongoose.Types.DocumentArray<{
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }> & {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }>;
    title?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    content?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    page: string;
    section: string;
    slides: mongoose.Types.DocumentArray<{
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }> & {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }>;
    title?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    content?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
}, {}> & {
    page: string;
    section: string;
    slides: mongoose.Types.DocumentArray<{
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }> & {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }>;
    title?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    content?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    page: string;
    section: string;
    slides: mongoose.Types.DocumentArray<{
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }> & {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }>;
    title?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    content?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    page: string;
    section: string;
    slides: mongoose.Types.DocumentArray<{
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }> & {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }>;
    title?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    content?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
}>, {}> & mongoose.FlatRecord<{
    page: string;
    section: string;
    slides: mongoose.Types.DocumentArray<{
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }> & {
        text?: string | null;
        arabic?: {
            title?: string | null;
            content?: string | null;
        } | null;
        english?: {
            title?: string | null;
            content?: string | null;
        } | null;
        image?: {
            public_id?: string | null;
            secure_url?: string | null;
        } | null;
    }>;
    title?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
    content?: {
        arabic?: string | null;
        english?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default SliderModel;
//# sourceMappingURL=slider.d.ts.map