
import mongoose, { model, Schema, Types } from "mongoose";

export const contentTypes= ['Youtube','Tweets','Notes','Link'] as const
const userSchema=new Schema({
   username:{type:String,require:true,unique:true},
   password:{type:String,require:true,}
})

const ContentSchema=new Schema({
    title:{type:String,require:true},
    link:{type:String,require:true},
    type:{type:String,enum:contentTypes,require:true},
    tags:[
        {
            tagId:
            { type:String,
                require:true
            },
            title:{
                type:String,
                require:true
            }
            
        }
    ],
    userId:{type:Types.ObjectId,ref:"Users",require:true},
    createdAt:{
        type:String
    }
})


const TagSchema =new Schema({
    title:{
        type:String,
        require:true,
        set:(a:string)=> a.toLowerCase().trim()
    }
})

const LinkSchema= new Schema({
    hash:{type:String},
    userId:{type:Types.ObjectId,ref:"Users",required:true,unique:true,timestamps:true}
})


export const UserModel=model("User",userSchema)
export const ContentModel=model("Content",ContentSchema)
export const TagModel=model("Tag",TagSchema)
export const LinkModel=model("Link",LinkSchema)
