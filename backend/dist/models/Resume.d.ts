import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
}, mongoose.Document<unknown, {}, {
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        skills: string[];
        name?: string | null | undefined;
        email?: string | null | undefined;
        score?: number | null | undefined;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        skills: string[];
        name?: string | null | undefined;
        email?: string | null | undefined;
        score?: number | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    skills: string[];
    name?: string | null | undefined;
    email?: string | null | undefined;
    score?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
