import XLSX from 'xlsx';
import { ProductModel } from '../../../Schema/Product_Schema.js';

export const downloadProductExcel = async (req, res) => {
    try {
        const products = await ProductModel.find({});

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found in inventory." });
        }

        // Transform data for Excel
        const excelData = products.map(product => ({
            "Product ID": product._id.toString(),
            "Name": product.name,
            "Category": product.category,
            "Price (₹)": product.price,
            "Stock Level": product.stock,
            "Status": product.isActive ? "Active" : "Inactive",
            "Exclusive": product.isExclusive ? "Yes" : "No",
            "Added Date": product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'
        }));

        // Create Excel Workbook
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory List");

        // Write to Buffer
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=Product_Inventory_Report.xlsx');
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error("Product Excel Export Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate inventory report" });
    }
};
