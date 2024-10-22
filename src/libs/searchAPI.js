const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require('@google/generative-ai')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)
const searchAPI = async (symptom)=> {
        const model = genAI.getGenerativeModel({model: 'gemini-pro'})
        const prompt = 
            `Triệu chứng: ${symptom}\n`+
            `Chuyên khoa: [Nhi khoa, Sản phụ khoa, Da liễu, Tiêu hóa, Cơ xương khớp, Dị ứng - miễn dịch, Gây mê hồi sức, Tai - mũi - họng, Ung bứu, Tim mạch, Lão khoa, Chấn thương chỉnh hình, Răng - Hàm - Mặt, Hô hấp, Ngoại thần kinh, Nội tổng quát]\n`+
            `Chọn chuyên khoa phù hợp:`
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        return text
}

module.exports = searchAPI