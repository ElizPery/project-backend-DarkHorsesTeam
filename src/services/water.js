import {WaterCollection} from '../db/models/Water.js';

const addZero = (value) => {
    const string = value.toString();
    if (string.length < 2) {
        return `0${value}`;
    }
    return value;
};

export const getTodayWater = async ({ userId, dailyNorma }) => {

    const year = new Date().getFullYear();
    const month = addZero(new Date().getMonth() + 1);
    const day = addZero(new Date().getDate());
       
    const waterQuery = await WaterCollection.find({
        "userId": userId,
        date: { $gte: `${year}-${month}-${day}T00:00:00` }
    });

    if (waterQuery.length === 0) {
        return {
            data: [],
            totalWaterPercent: "0%"
        };
    };
    
    let waterForDay;
    waterQuery.forEach((element) => {
        waterForDay += element.volume;
    });

    const percent = Math.ceil((waterForDay / dailyNorma) * 100);
    
    return {
        data: waterQuery,
        totalWaterPercent:`${percent}%`
    };
};