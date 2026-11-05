import Controller from '../controller.js';
import _ from 'lodash';
import type { Request, Response } from 'express';
import Query from '../../../database/db.js';
import isEmpty from 'lodash/isEmpty.js';
import type Product from '../../models/product.js'
import type product from '../../models/product.js';
interface getProduct{
  productId:string;
}
interface menueproduct{
  startnumber : number;
  interval : number;
}

interface searchBar{
  name:string;
}

class ProductController extends Controller {
  async menuShowProucts(
    req : Request<{} , {} , menueproduct>,
    res : Response
  ):Promise<void>{
    const startnumber =await req.body.startnumber;
    const interval =await req.body.interval;
    const listOfProduct = await Query.getProduct(startnumber, interval);
    
    if(isEmpty(listOfProduct)){
      this.response({
        res,
        code:200,
        massage:"end of product list"
      });
      return;
    }
    this.response({
      res,
      massage:'all product sucsesfuly send',
      data:listOfProduct
    })
    return;
  }

  async search(
    req : Request<{} , {} , searchBar>,
    res : Response
  ):Promise <void>{
    //return a product or list of products
    const products =await Query.searchProduct(req.body.name);

    //check the product is found
    if(isEmpty(products)){
      this.response({
        res,
        massage : "product not found",
        code : 200
      });
      return;
    }

    this.response({
      res,
      massage : "products successfuly send",
      code: 200,
      data : products
    });
  }
  async getProduct(
    req : Request<{} , {} , getProduct>,
    res : Response
  ):Promise <void>{
    const product = await Query.findProduct(req.body.productId);
    if(product == null){
      this.response({
        res,
        massage : "product not found",
        code : 404
      });
      return;
    }
    
    this.response({
      res,
      massage : "product successfuly send",
      code:200,
      data:product
    });

  }
  async addProduct(
    req : Request<{} , {} , Product>,
    res : Response
  ):Promise <void>{
    const product: Product =await { ...req.body };  

    if(product == null){
      this.response({
        res,
        massage : "data is missing",
        code : 500
      });
      return;
    }

    const result = await Query.addProduct(product);
    if(!result){
      this.response({
        res,
        code : 500,
        massage : "product not added"

      });
      return;
    }

    this.response({
      res,
      code :201,
      massage : "product successfuly added",
      data : result
    });
      return;
    
  }

  async changeproduct(
    req : Request<{id : string} , {} , Partial<Product>>,
    res : Response
  ):Promise <void>{
    const id = req.params.id;
    const product = {...req.body};

    if(isEmpty(product)){
      this.response({
        res,
        code : 400,
        massage : "product data is missing"
      });
      return;
    }

    const result = await Query.changeproduct(id , product);

    if(!result){
      this.response({
        res,
        code : 404,
        massage:"product not found or update failed"
      });
      return;
    }

    this.response({
      res,
      code : 200,
      massage : "product successesfuly updated",
      data : result
    })


  }
  async deleteProuct(
    req : Request<{id: string} , {} >,
    res : Response
  ):Promise <void>{
    const id = req.body;
    const result = await  Query.removeProduct(id)
    if(!result){
      this.response({
        res,
        massage : "somting went wrong",
        code : 500
      });
      return;
    }
    this.response({
      res,
      code:200,
      massage:"product successfilly deleted",
      data:result
    })
  }
}

export default new ProductController();