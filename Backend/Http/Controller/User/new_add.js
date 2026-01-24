import { UserModel } from "../../../Schema/User_Schema.js";

// Add this route to your user router
export const updateadd = async (req, res) => {
    try {
        const { name, phone2, address } = req.body;
        console.log(name,phone2,address)
      
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.userId, 
            { 
                $set: { 
                    name, 
                    phone2, 
                    address: [address] 
                } 
            },
            { new: true } 
        );

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};