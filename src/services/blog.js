const { PrismaClient, Role } = require("@prisma/client")
const db = new PrismaClient()
const {v2Cloudinary} = require("../utils/cloudinary")
exports.createBlog = async (data, file) => {
    const { doctorId, title, content, category, subCategory } = data
    let url = ''
    await v2Cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
            return null
        }
        else {
            url = result.url
        }
    })
    try {
        const newBlog = await db.blog.create(
            {
                data: {
                    title,
                    content,
                    category,
                    subCategory,
                    date: new Date(),
                    link: 'http://localhost:5173/blog-detail/',
                    totalView: 0,
                    thumbnail: url,
                    doctorId: doctorId
                }
            }
        )
        
        return newBlog
    } catch (err){
        console.log(err)
        return new Error(err)
    }
}

exports.getBlogById = async (id) => {
    try {
        const existBlog = await db.blog.findUnique(
            {
                where: {
                    id: id
                },
                include: {
                    doctor: true
                }
            }
        )
        return existBlog
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

exports.getAllBlogs = async () => {
    try {
        const result = await db.blog.findMany({
            include: {
                doctor: true
            }
        })
        return result
    } catch (err) {
        return new Error(err)
    }
}

exports.getAllBlogsByDoctor = async (doctorId) => {
    try {
        const result = await db.blog.findMany({
            where: {
                doctorId: doctorId
            }
        })
        return result
    } catch (err) {
        return new Error(err)
    }
}

exports.updateView = async (blogId) => {
    try {
        const result = await  db.blog.update(
            {
                where: {
                    id: blogId
                },
                data: {
                    totalView: {increment: 1}
                }
            }
        )
        return result
    } catch (err) {
        return new Error(err)
    }
}