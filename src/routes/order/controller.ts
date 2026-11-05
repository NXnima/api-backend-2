import Controller from '../controller.js';
import _ from 'lodash';
import type { Request, Response } from 'express';
import Query  from '../../../database/db.js'
import isEmpty from 'lodash/isEmpty.js';

class OrderController extends Controller {

  async userOrder(
    req: Request<{id:string}, {}>,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const orders = await Query.userOrders(id);
    if(isEmpty(orders)){
      this.response({
        res,
        code : 200,
        massage : "user have not order"
      });
      return;
    }
    this.response({
      res,
      code:200,
      massage : "all users orders successfuly send",
      data : orders
    });
  }

  async removeOrderByUser(
    req: Request<{id:string ,idOrder:string}, {}>,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const idOrder = req.params.idOrder;

    const result = await Query.removeOrderByUser(id,idOrder);
    if(!result){
      this.response({
        res,
        code : 500,
        massage : "could not delete order"
      });
      return;
    }
    this.response({
      res,
      code : 200,
      massage : "order successfully deleted",
      data : result
    })
  }
  async removeOrderByAdmin(
    req: Request<{email:string , idOrder:string}, {}>,
    res: Response
  ): Promise<void> {
    const email = req.params.email;
    const idOrder = req.params.email;

    const result = await Query.removeOrder(email , idOrder);

    if(!result){
      this.response({
        res,
        code : 500,
        massage : "could not delete"
      });
      return;
    }
    this.response({
      res,
      code: 200,
      massage : "successfuly delete order";
      data:result
    });
  }
  async addOrderByUser(
    req: Request<{id:string , productId : string}, {}>,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const productId = req.params.productId;

    const result = await Query.addOrder(id , productId);
    if(!result){
      this.response({
        res,
        code : 500,
        massage : "could not add order"
      });
      return;
    }

    this.response({
      res,
      code : 200,
      massage : "order successfuly add",
      data : result
    });

  }
  async addOrderByAdmin(
    req: Request<{email:string , productId:string}, {}>,
    res: Response
  ): Promise<void> {
    const email = req.params.email;
    const productId = req.params.productId;

    const result = await Query.addOrder(email , productId);
    if(!result){
      this.response({
        res,
        code : 500,
        massage : "could not add order"
      });
      return;
    }

    this.response({
      res,
      code : 200,
      massage : "order successfuly add",
      data : result
    });
  }
}

export default new OrderController();