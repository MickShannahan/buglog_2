import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { trackedBugsService } from '../services/TrackedBugsService.js'

export class AccountController extends BaseController {
  constructor () {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/trackedBugs', this.getTrackedBugsByUserId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getTrackedBugsByUserId(req, res, next) {
    try {
      const userId = req.userInfo.id
      const bugs = await trackedBugsService.getTrackedBugsByUserId(userId)
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
}
