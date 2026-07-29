
import z from 'zod';
import { contentTypes } from '../models/user';


export const tagSchema=z.object({
    tagId:z.string(),
    title:z.string()
    .toLowerCase().trim().max(12,{ message:" Max length of tag is 12"})
    .transform((v) => v.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-'))
})

export const AuthSchema=z.object({
name:z.string(),
email:z.email(),
password:z.string().min(8,{message:"password must be minimum of 8 digits"})
})

export const SignSchema=z.object({
email:z.email(),
password:z.string().min(8,{message:"password must be minimum of 8 digits"})
})

export const ContentSchema=z.object({
    title:z.string(),
    link:z.string(),
    type:z.enum(contentTypes,{message:"Enter a valid type"}),
    tags:z.array(tagSchema),
    contentId:z.string(),
    createdAt:z.string()
}).refine((data) => {
    // Link is required for all types except Notes
    if (data.type !== "Notes") {
        // For non-Notes types, link must be a valid URL
        try {
            new URL(data.link);
            return true;
        } catch {
            return false;
        }
    }
    // For Notes, link can be empty string
    return true;
}, {
    message: "Link must be a valid URL for this content type",
    path: ["link"]
})



