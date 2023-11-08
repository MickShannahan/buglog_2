import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class TrackedBugsController extends BaseController {
  constructor () {
    super('api/trackedBugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
  }
  async createTrackedBug(req, res, next) {
    try {
      const trackedBugData = req.body
      trackedBugData.creatorId = req.userInfo.id
      const trackedBug = await trackedBugsService.createTrackedBug(trackedBugData)
      return res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}