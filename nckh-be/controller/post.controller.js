const {responseInValid, responseServerError, responseSuccessWithData, reponseSuccess, responseNotFound} = require("../helper/ResponseRequests")
const { v4: uuid } = require("uuid");
const Joi = require("joi")

const Posts = require("../model/post.model")

const postSchema = Joi.object().keys({
    title: Joi.string(),
    content:  Joi.string(),
    author: Joi.string(),
    url:  Joi.string(), 
    images:Joi.array().items(Joi.string()),
    videos:Joi.array().items(Joi.string()),
    sensetive:  Joi.number().default(0)
})


const create = async (req,res) => {
   const checkValidate = postSchema.validate(req.body)
   if(checkValidate.error) {
       return responseServerError({res, err: checkValidate.error.message})
   }
   checkValidate.value.postId = uuid()
   const newPost = new Posts(checkValidate.value)
   await newPost.save()
   return responseSuccessWithData({res, data: newPost})
}

const update = async (req,res) => {
    const {postId} = req.params
    const checkValidate = postSchema.validate(req.body)
    if(checkValidate.error) {
        return responseServerError({res, err: checkValidate.error.message})
    }

    const post = await Posts.findOne({postId: postId})
    if(!post) return responseNotFound({res, message:"not found"})
    await  post.update(checkValidate.value)

    return responseSuccessWithData({res, data: post})

}

const detail = async (req,res) => {
    const {postId} = req.params
    const post = await Posts.findOne({postId: postId})
    if(!post) return responseNotFound({res, message:"Not found"})
    return responseSuccessWithData({res, data: post})
}


const deletePost = async (req,res) => {
    const {postId} = req.params
    const post = await Posts.findOneAndUpdate({postId: postId})
    if(!post) return responseNotFound({res, message:"Not found"})
    return reponseSuccess({res})
}

const get = async (req,res) => {
    const {search} = req.query
    const {limit, offset} = req.pagination
    let options = {}
    const data = await Posts.find(options).skip(offset).limit(limit)
    const count = await Posts.find(options).countDocuments()
    return responseSuccessWithData({res, data :{
        data,
        count,
        page: parseInt(req.query.page)
    } })
}


module.exports = {
    create, update, deletePost, detail, get
}