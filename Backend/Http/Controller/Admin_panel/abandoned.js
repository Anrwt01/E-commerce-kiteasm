import XLSX from 'xlsx';
import { CartModel } from '../../../Schema/Cart_Schema.js';

export const downloadCartExcel = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Filter for non-empty carts
        let query = { "items.0": { $exists: true } };

        if (startDate && endDate) {
            // Include full day of endDate
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            query.createdAt = {
                $gte: new Date(startDate),
                $lte: end
            };
        }

        const carts = await CartModel.find(query)
            .populate('userId', 'name email phone1 address')
            .populate('items.productId', 'name');

        // Transform data for Excel
        const excelData = carts.map(cart => {
    const totalValue = cart.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const totalItems = cart.items.reduce((acc, curr) => acc + curr.quantity, 0); 
    const productNames = cart.items.map(i => i.productId?.name || 'Unknown Product').join(", ");
    const user = cart.userId || {};
    
    // Address ko combine karke full string banane ke liye
    const addr = user.address?.[0] || {};
    const fullAddress = addr.house 
        ? `${addr.house}, ${addr.galino || ''}, ${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}`
        : 'N/A';

    return {
        "Customer Name": user.name || 'Anonymous',
        "Email": user.email || 'N/A',
        "Phone": user.phone1 || 'N/A',
        "Product Names": productNames,
        "Total Value (₹)": totalValue,
        "Date Modified": cart.updatedAt ? new Date(cart.updatedAt).toLocaleDateString() : new Date(cart.createdAt).toLocaleDateString(),
        "Full Address": fullAddress, 
        "Items Count": totalItems 
    };
});

        // Create Excel Workbook
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Abandoned Carts");

        // Write to Buffer
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=Abandoned_Carts_Report.xlsx');
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error("Excel Generation Error:", error);
        res.status(500).json({ message: "Error generating excel report" });
    }
};