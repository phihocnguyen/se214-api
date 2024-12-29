const blogService = require("../services/blog")

exports.createBlog = async (req, res, next) => {
    try {

        const newBlog = await blogService.createBlog(req.body, req.file)
        res.status(201).json({
            message: "Created succesfully",
            newBlog
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getDetailBlog = async (req, res, next) => {
    try {
        const existBlog = await blogService.getBlogById(req.params.id)
        res.status(200).json(existBlog)
    } catch (err){
        next(err)
    }
}

exports.getAllBlogs = async (req, res, next) => {
    try {
        const allBlogs = await blogService.getAllBlogs()
        res.status(200).json(allBlogs)
    } catch (err){
        next(err)
    }
}

exports.getAllBlogsByDoctor = async (req, res, next) => {
    try {
        const allBlogs = await blogService.getAllBlogsByDoctor(req.body.doctorId)
        res.status(200).json(allBlogs)
    } catch (err) {
        next(err)
    }
}

exports.updateView = async (req, res, next) => {
    try {
        const result = await blogService.updateView(req.params.blogId)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

exports.getBlogByCategory = async (req, res, next) => {
    try {
        const result = await blogService.getBlogByCategory(req.params.category)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
exports.searchBlog = async (req, res, next) => {
    try {
        const result = await blogService.searchBlog(req.query.search, req.params.category)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}