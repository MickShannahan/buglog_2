import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class BugsController extends BaseController {
  constructor () {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('/:bugId/trackedBugs', this.getTrackersByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.closeBug)
  }


  async getBugs(req, res, next) {
    try {
      const query = req.query
      const bugs = await bugsService.getBugs(query)
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
  async getBugById(req, res, next) {
    try {
      const bugId = req.params.bugId
      const bug = await bugsService.getBugById(bugId)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }
  async getNotesByBugId(req, res, next) {
    try {
      const bugId = req.params.bugId
      const notes = await notesService.getNotesByBugId(bugId)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }
  async getTrackersByBugId(req, res, next) {
    try {
      const bugId = req.params.bugId
      const trackers = await trackedBugsService.getTrackersByBugId(bugId)
      return res.send(trackers)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      const bugData = req.body
      bugData.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(bugData)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async updateBug(req, res, next) {
    try {
      const bugId = req.params.bugId
      const userId = req.userInfo.id
      const bugData = req.body
      const bug = await bugsService.updateBug(bugId, userId, bugData)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      const bugId = req.params.bugId
      const userId = req.userInfo.id
      const bug = await bugsService.closeBug(bugId, userId)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

}