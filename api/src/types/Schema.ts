
import z from 'zod';
import { contentTypes } from '../models/user';


export const tagSchema=z.object({
    tagId:z.string(),
    title:z.string()
    .toLowerCase().trim().max(12,{ message:" Max length of tag is 12"})
    .transform((v) => v.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-'))
})

export const AuthSchema=z.object({
username:z.string().min(3,{message:"username has to be minimum of 3 letter"}),
password:z.string().min(8,{message:"password must be minimum of 8 digits"})
})


export const ContentSchema=z.object({
    title:z.string(),
    link:z.string(),
    type:z.enum(contentTypes,{message:"Enter a valid type"}),
    tags:z.array(tagSchema),
    contentId:z.string(),
    createdAt:z.string()
})



