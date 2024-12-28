const { PrismaClient, Role } = require("@prisma/client")
const fs = require('fs')
const db = new PrismaClient()

exports.createBlog = async (data, file) => {
    const { doctorId, title, content } = data
    const { originalname, path } = file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    try {
        const newBlog = await db.blog.create(
            {
                data: {
                    title,
                    content,
                    date: new Date(),
                    link: 'http://localhost:5173/blog-detail/',
                    totalView: 0,
                    thumbnail: newPath,
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