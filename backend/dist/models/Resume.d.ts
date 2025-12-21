import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
}, mongoose.Document<unknown, {}, {
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
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
        education: mongoose.Types.DocumentArray<{
            degree?: string | null | undefined;
            year?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            degree?: string | null | undefined;
            year?: string | null | undefined;
        }> & {
            degree?: string | null | undefined;
            year?: string | null | undefined;
        }>;
        createdAt: NativeDate;
        name?: string | null | undefined;
        email?: string | null | undefined;
        phone?: string | null | undefined;
        score?: number | null | undefined;
        resumeLevel?: string | null | undefined;
        skillGap?: {
            matched: string[];
            missing: string[];
        } | null | undefined;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        skills: string[];
        education: mongoose.Types.DocumentArray<{
            degree?: string | null | undefined;
            year?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            degree?: string | null | undefined;
            year?: string | null | undefined;
        }> & {
            degree?: string | null | undefined;
            year?: string | null | undefined;
        }>;
        createdAt: NativeDate;
        name?: string | null | undefined;
        email?: string | null | undefined;
        phone?: string | null | undefined;
        score?: number | null | undefined;
        resumeLevel?: string | null | undefined;
        skillGap?: {
            matched: string[];
            missing: string[];
        } | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    skills: string[];
    education: mongoose.Types.DocumentArray<{
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }> & {
        degree?: string | null | undefined;
        year?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    score?: number | null | undefined;
    resumeLevel?: string | null | undefined;
    skillGap?: {
        matched: string[];
        missing: string[];
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
