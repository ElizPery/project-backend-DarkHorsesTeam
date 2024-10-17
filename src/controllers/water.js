import { getTodayWater } from "../services/water.js";

export const getTodayWaterController = async (req, res) => {
    const { _id: userId } = req.user;
    
    const data = await getTodayWater({userId});
     res.json({
            status: 200,
            message: "Successfully found water data",
            data: data,
        });
};