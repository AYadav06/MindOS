import { Router, Response, Request } from "express";
import { ContentSchema } from "../types/Schema";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { ContentModel } from "../models/user";
import { error } from "console";


export const contentRouter = Router();

contentRouter.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  // Validate request body
  const parsed = ContentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Content is invalid",
      errors: parsed.error,
    });
  }
  const data = parsed.data;

  try {
    await ContentModel.create({
      contentId: data.contentId,
      title: data.title,
      link: data.link,
      type: data.type,
      tags: data.tags,
      createdAt: data.createdAt,
      userId: req.userId, 
    });

    return res.status(201).json({
      message:"content is created",
      content: {
        contentId: data.contentId,
        title: data.title,
        link: data.link,
        type: data.type,
        tags: data.tags,
        createdAt: data.createdAt,
      },
    });
  } catch (e) {
    console.error("Error saving content:", e);
    return res.status(500).json({
      message: "Internal server error",
      error: e instanceof Error ? e.message : e,
    });
  }
});

contentRouter.get("/",authMiddleware,async (req:AuthRequest,res:Response)=>{
const userId=req.userId;

try{
const content=await ContentModel.find({
  userId
}).populate('userId');

if(content && content.length > 0){
  res.json({
    message:"content retrieved successfully",
    content
  })
} else {
    res.status(404).json({
        message: "No content found for this user"
    })
}
}
catch(e){
res.status(500).json({
  message :"error while getting contents"
})
}
})

contentRouter.delete("/",authMiddleware,async(req:AuthRequest,res:Response)=>{

  const contentId=req.body.contentId;

  if(!contentId){
    res.json({
      message:"ContentId is required"
    })
return ;
  }

  try{
   await ContentModel.deleteOne({
    _id:contentId,userId:req.userId
   })
   res.json({
    message:'content is deleted'
   })
  }
  catch(e){

    res.status(500).json({

      message:"Internal server error ",
      error:e
    })
  }
})


contentRouter.put("/",authMiddleware,async(req:AuthRequest,res:Response)=>{

  try{
const data=ContentSchema.parse(req.body);
const contentId=req.body.contentId;

  const updatedContent=await ContentModel.findOneAndUpdate({
    contentId:contentId,
    userId:req.userId
    },{
      title:data.title,
      link:data.link,
      type:data.type,
      tags:data.tags
    },
  {new:true});
  if(!updatedContent){

    res.json({
      message:"no content id found"
    })
    return;
  }
    res.json({
      message:"Brain is updated",updatedContent
    })
  }
catch(e){
res.json({
  message:"Internal server error ",
  error:e
})
}
})