import ExcelJS from "exceljs";
import { OrderModel } from "../../../Schema/OrderSchema.js";
export const downloadOrderExcel = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Expecting YYYY-MM-DD

        // 1. Create Filter
        let query = {};
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59)) // Include the full end day
            };
        }

        // 2. Fetch Orders
        const orders = await OrderModel.find(query).sort({ createdAt: -1 });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this period." });
        }

        // 3. Create Excel Workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Orders Report");

        // Define Columns
        worksheet.columns = [
            { header: "Order ID", key: "id", width: 25 },
            { header: "Date", key: "date", width: 20 },
            { header: "Customer Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 25 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Status", key: "status", width: 15 },
            { header: "Address", key: "address", width: 40 }
        ];

        // 4. Add Rows
        orders.forEach(order => {
            worksheet.addRow({
                id: order._id.toString(),
                date: order.createdAt.toLocaleString(),
                name: order.customerDetails.name,
                email: order.customerDetails.email,
                amount: `₹${order.totalAmount}`,
                status: order.orderStatus,
                address: order.customerDetails.address
            });
        });

        // Style the header
        worksheet.getRow(1).font = { bold: true };

        // 5. Set Response Headers and Send File
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Orders_${startDate || 'All'}.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Excel Download Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate Excel file" });
    }
};