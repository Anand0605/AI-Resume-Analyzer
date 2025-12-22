import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
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
        score: number;
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
        summary: string;
        skillGap: {
            matched: string[];
            missing: string[];
        };
        name?: string | null | undefined;
        email?: string | null | undefined;
        phone?: string | null | undefined;
        resumeLevel?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        skills: string[];
        score: number;
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
        summary: string;
        skillGap: {
            matched: string[];
            missing: string[];
        };
        name?: string | null | undefined;
        email?: string | null | undefined;
        phone?: string | null | undefined;
        resumeLevel?: string | null | undefined;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    skills: string[];
    score: number;
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
    summary: string;
    skillGap: {
        matched: string[];
        missing: string[];
    };
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    resumeLevel?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
