import mongoose from "mongoose";
declare const planModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    price: number;
    activeFeatures: number[];
    arabic?: {
        name: string;
        description: string;
        features: string[];
    } | null;
    english?: {
        name: string;
        description: string;
        features: string[];
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    price: number;
    activeFeatures: number[];
    arabic?: {
        name: string;
        description: string;
        features: string[];
    } | null;
    english?: {
        name: string;
        description: string;
        features: string[];
    } | null;
}, {}> & {
    price: number;
    activeFeatures: number[];
    arabic?: {
        name: string;
        description: string;
        features: string[];
    } | null;
    english?: {
        name: string;
        description: string;
        features: string[];
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    price: number;
    activeFeatures: number[];
    arabic?: {
        name: string;
        description: string;
        features: string[];
    } | null;
    english?: {
        name: string;
        description: string;
        features: string[];
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    price: number;
    activeFeatures: number[];
    arabic?: {
        name: string;
        description: string;
        features: string[];
    } | null;
    english?: {
        name: string;
        description: string;
        features: string[];
    } | null;
}>, {}> & mongoose.FlatRecord<{
    price: number;
    activeFeatures: number[];
    arabic?: {
        name: string;
        description: string;
        features: string[];
    } | null;
    english?: {
        name: string;
        description: string;
        features: string[];
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default planModel;
//# sourceMappingURL=plan.d.ts.map