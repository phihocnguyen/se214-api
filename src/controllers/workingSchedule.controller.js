const wsService = require("../services/workingSchedule")


exports.getWsByDoctor = async (req, res, next) => {
    try {
        const result = await wsService.getWsByDoctor(req.params.id)
        res.status(200).json(result)
    } catch (err){
        next(err)
    }
}

exports.getWsByDay = async (req, res, next) => {
    try {
        let day = ''
        switch(req.params.day) {
            case 'Thứ Hai': {
                day = 'Thứ 2'
                break;
            }
            case 'Thứ Ba': {
                day = 'Thứ 3'
                break;
            }
            case 'Thứ Tư': {
                day = 'Thứ 4'
                break;
            }
            case 'Thứ Năm':{
                day = 'Thứ 5'
                break;
            }
            case 'Thứ Sáu':{
                day = 'Thứ 6'
                break;
            }
            case 'Thứ Bảy':{
                day = 'Thứ 7'
                break;
            }
            default: 
                break;
        }
        const result = await wsService.getWsByDay(day, req.params.id)
        res.status(200).json(result)
    } catch (err){
        console.log(err)
        next(err)
    }
}

exports.updateWs = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await wsService.updateWs(id, req.body)
        res.status(200).json(response)
    } catch (err){
        console.log(err)
        next(err)
    }
}