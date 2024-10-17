import { getWaterForMonth } from "../services/water.js";


export async function getWaterForMonthController(req , res) {
  const {month} = req.body;
  const userId = req.user._id;
  const year = new Date().getFullYear();

  const data = await getWaterForMonth({month , userId , year});

  res.status(200).json({
    status: 200,
    message: "Successfully",
    data
  });
};
