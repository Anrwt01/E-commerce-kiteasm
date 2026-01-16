
import dotenv from "dotenv";
dotenv.config();
import { OrderModel } from "../../../Schema/OrderSchema.js";


export const AdminALLorder = async (req, res) => {
   
    try {
    const orders = await OrderModel.find({})
      .sort({ createdAt: -1 }); // 
   
      return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }


}



// export default AdminALLorder;