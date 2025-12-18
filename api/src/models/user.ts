
import mongoose, { model, Schema, Types } from "mongoose";


export const contentTypes= ['YouTube','Tweets','Notes','Link'] as const
const userSchema=new Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,}
})

const ContentSchema=new Schema({
    title:{type:String,required:true},
    link:{type:String,required:true},
    type:{type:String,enum:contentTypes,required:true},
    tags:[
        {
            tagId:
            { type:String,
                required:true
            },
            title:{
                type:String,
                required:true
            }
            
        }
    ],
    userId:{type:Types.ObjectId,ref:"User",required:true},
    createdAt:{
        type:String
    },
    embedding:{
        type:[Number],
        default:undefined,
        select:false // Don't include embeddings in default queries for performance
    }
})


const TagSchema =new Schema({
    title:{
        type:String,
        required:true,
        set:(a:string)=> a.toLowerCase().trim()
    }
})

const LinkSchema= new Schema({
    hash:{type:String},
    userId:{type:Types.ObjectId,ref:"User",required:true}
})


export const UserModel=model("User",userSchema)
export const ContentModel=model("Content",ContentSchema)
export const TagModel=model("Tag",TagSchema)
export const LinkModel=model("Link",LinkSchema)
