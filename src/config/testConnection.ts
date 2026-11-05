import db from './database.js';

const databases = [
    'product_db',
    'admin_db',
    'person_db',
    'user_db',
    'admin_product_db',
    'orders_db',
    'invoices_db',
    'person_role_db'
];

async function testConnection(): Promise<void> {
    try {
        // Test the MySQL connection
        const connection = await db.getConnection();

        console.log('MySQL connection established successfully.');

        connection.release();

        // Test access to each database
        for (const database of databases) {
            const [tables] = await db.query(
                `SHOW TABLES FROM \`${database}\``
            );

            console.log(
                `[SUCCESS] ${database}: ${(tables as object[]).length} tables accessible`
            );
        }

    } catch (error) {
        console.error('Database connection failed:', error);

    } finally {
        await db.end();
    }
}

testConnection();