import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
  constructor () {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
  }
  createNote(req, res, next) {
    throw new Error("Method not implemented.");
  }
}