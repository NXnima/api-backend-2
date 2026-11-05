import type Product from "../src/models/product.js";
import type {ResultSetHeader} from 'mysql2';
import db from "../src/config/database.js";

export default new (class Query {
  async findUser(id: string) {}
  async getProduct(startnumber: number, interval: number): Promise<Product[]> {
    const query = `
    USE product_db;

    SELECT *
    FROM product 
    WHERE product_id >= ?
    ORDER BY product_id ASC
    LIMIT ?; 
`;
    const [rows] = await db.execute(query, [startnumber, interval]);

    return rows as Product[];
  }

  async searchProduct(item_name: string): Promise<Product[]> {
    const query = `
      SELECT *
      FROM product_db.product
      WHERE product_name = ?
    `;

    const [rows] = await db.execute<Product[]>(
      query,
      [item_name]
    ) 
    return rows;
  }
<<<<<<< HEAD
  async addProduct(product: Product){}
  async findProduct(id:string):Promise <Product>{
    return Product;
  }
  async changeproduct(id:string , product : Product){}
  async removeProduct(id:string){}
}
=======
    async addProduct(product: Product):Promise<boolean>{
      const query = `
        USE product_db;

        INSERT INTO product
        VALUES(?,?,?,?,?);
      `;

      const [result] = await db.execute<ResultSetHeader>(
        query,
        [
          product.product_id,
          product.product_name,
          product.product_stack,
          product.product_price,
          product.product_category,
          product.product_admin_id
        ]
      );
      return result.affectedRows === 1;
    }
    async findProduct(id: string) :Promise<Product | null>{
          const query = `
          USE product_db;

          SELECT * 
          FROM product 
          WHERE product_id = ?;
        `;

        const [rows] = await db.execute<Product[]>(
          query,
          [id]
        ) 
        return rows[0] ?? null;
    }
    async changeProduct(id:string , product:Product):Promise<boolean>{
      const query = `
        USE product_db;

        UPDATE product_db.product
        SET
            product_id = ?,
            product_stack = ?,
            product_price = ?,
            product_category = ?,
            product_admin_id = ?
        WHERE product_id = ?;
              `;
      const [result] = await db.execute<ResultSetHeader>(
        query,
        [
          product.product_id,
          product.product_name,
          product.product_stack,
          product.product_price,
          product.product_category,
          product.product_admin_id,
          id
        ]
      );
      return result.affectedRows === 1;
    }

    async removeProduct(id: string): Promise<boolean> {

    const query = `
        DELETE FROM product_db.product
        WHERE product_id = ?
    `;
    const[result] = await db.execute<ResultSetHeader>(
      query,[id]
    )
    return result.affectedRows === 1;
    }
  })
>>>>>>> 56908efb285fb0054090b1770e65d5eb46b200f7
