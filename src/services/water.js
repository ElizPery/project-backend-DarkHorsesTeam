import {WaterCollection} from '../db/models/Water.js';

export const getTodayWater = async ({ userId }) => {

    // const todayYear = new Date().getFullYear();
    // const todayDay = new Date().getDate();
    // const todayMonth = new Date().getMonth();
    // const date = `${todayYear}-${todayMonth + 1}-${todayDay}`;
    
    const waterQuery = WaterCollection.find();
    const data = waterQuery.where('userId').equals(userId);

    












    // const dataDate = "2024-10-17T20:21";
    // const dataDateSlice = dataDate.slice(0, 10);
    // console.log(dataDateSlice);

    // console.log(dataDateSlice === date);
    return data;
};