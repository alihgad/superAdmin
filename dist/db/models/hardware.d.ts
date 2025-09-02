import mongoose from "mongoose";
declare const hardwareModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isActive: boolean;
    arabic?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    english?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isActive: boolean;
    arabic?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    english?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isActive: boolean;
    arabic?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    english?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
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
    isActive: boolean;
    arabic?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    english?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isActive: boolean;
    arabic?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    english?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isActive: boolean;
    arabic?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    english?: {
        spec: mongoose.Types.DocumentArray<{
            name?: string | null;
            value?: string | null;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string | null;
            value?: string | null;
        }> & {
            name?: string | null;
            value?: string | null;
        }>;
        name?: string | null;
        description?: string | null;
    } | null;
    image?: {
        public_id?: string | null;
        secure_url?: string | null;
    } | null;
    price?: number | null;
    enumKey?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default hardwareModel;
//# sourceMappingURL=hardware.d.ts.map