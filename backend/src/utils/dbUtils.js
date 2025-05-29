import { pool } from "../config/db.js";
import createTableQueries from "../queries/tableQuery.js";

const createTable = async (tableName, query) => {
    try {
        await pool.query(query);
        // console.log(`${tableName} table created successfully.`);
    } catch (error) {
        console.error(`Error creating ${tableName} table`, error);
        throw error;
    }
};

const createAllTables = async () => {
    try {
        await createTable('Students', createTableQueries.createStudentTable);
        await createTable('Vendors', createTableQueries.createVendorTable);
        await createTable('FoodItems', createTableQueries.createFoodItemTable);
        await createTable('Carts', createTableQueries.createCartTable);
        await createTable('Orders', createTableQueries.createOrderTable);
        await createTable('OrderItems', createTableQueries.createOrderItemTable);
        await createTable('Payments', createTableQueries.createPaymentTable);
        await createTable('Reviews', createTableQueries.createReviewTable);

        console.log("✅ All tables initialized successfully.");
    } catch (error) {
        console.error("❌ Failed to initialize all tables", error);
        throw error;
    }
};

export default createAllTables;
