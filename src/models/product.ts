
import type {RowDataPacket} from 'mysql2';
export default interface product extends RowDataPacket{
  product_id:string;
  product_name:string;
  product_stack:number;
  product_price:string;
  product_category:string;
  product_admin_id:string;
}