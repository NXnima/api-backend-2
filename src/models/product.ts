<<<<<<< HEAD
export default interface product{
  ProductId:string;
  stack:number;
  price:string;
  category:string;
  admin_id:string;
=======
import type {RowDataPacket} from 'mysql2';
export default interface product extends RowDataPacket{
  product_id:string;
  product_name:string;
  product_stack:number;
  product_price:string;
  product_category:string;
  product_admin_id:string;
>>>>>>> 56908efb285fb0054090b1770e65d5eb46b200f7
}