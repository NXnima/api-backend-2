import Controller from '../controller.js';
import _ from 'lodash';
import type { Request, Response } from 'express';
import type IUser from '../../models/user.js';
import Query from '../../../database/db.js';
import isEmpty from 'lodash/isEmpty.js';
interface CommentBody{
  comment : string;
}
class UserController extends Controller {
  async userdata(
    req : Request<{id:string},{}>,
    res : Response
  ):Promise<void>{
    const id:string = req.params.id;
    const user:IUser = Query.findById(id);
    if(!user){
      this.response({
        res,
        code : 404,
        massage:"user not found somting went wrong"
      });
      return;
    }
    this.response({
      res,
      code : 200,
      massage : "data user successfuly send",
      data : user
    })
  }

  async changeDataUser(
    req : Request<{id:string} , {} , Partial<IUser>>,
    res : Response
  ):Promise<void>{
    const user = {...req.body}
    const id = req.params.id;

    if(isEmpty(user)){
      this.response({
        res,
        code : 400,
        massage : "change data user is missing"
      })
    }

    const result = await Query.changeUserData(id,user);
    if(!result){
      this.response({
        res,
        code : 500,
        massage : "server cant chage data user",
        data : result
      });
      return;
    }

    this.response({
      res,
      code : 201,
      massage : "user data successfuly updated",
      data : result
    });

  }

  async setcomment(
    req : Request<{id:string},{},CommentBody>,
    res : Response
  ):Promise<void>{
    const id : string = req.params.id;
    const comment :string = req.body.comment;


    const result = await Query.addComment(id,comment);
    if(!result){
      this.response({
        res,
        code : 500,
        massage : "in server somting went wrong"
      });
      return;
    }
    this.response({
      res,
      code : 201,
      massage : "comment successfuly added",
      data : result
    })
  }

}

export default new UserController();