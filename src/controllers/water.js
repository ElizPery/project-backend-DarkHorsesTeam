import { getTodayWater } from "../services/water.js";

export const getTodayWaterController = async (req, res) => {
    const userId = req.user._id;
    const dailyNorma = req.user.dailyNorma;
    
    const data = await getTodayWater({userId, dailyNorma});
     res.json({
            status: 200,
            message: "Successfully found today's water data",
            data,
        });
};