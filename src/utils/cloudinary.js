import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

const v2Cloudinary = cloudinary.v2
v2Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})
export default v2Cloudinary