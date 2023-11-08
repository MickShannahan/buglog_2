import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TrackedBugsServicee {
  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker', 'name picture')
    await trackedBug.populate('bug')
    return trackedBug
  }
  async getTrackedBugsByBugId(bugId) {
    const trackers = await dbContext.TrackedBugs.find({ bugId }).populate('tracker', 'name picture')
    return trackers
  }
  async getTrackedBugsByUserId(accountId) {
    const bugs = await dbContext.TrackedBugs.find({ accountId }).populate('bug')
    return bugs
  }
  async destroyTrackedBug(trackedBugId, userId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId).populate('bug')
    if (!trackedBug) { throw new BadRequest(`Invalid ID: ${trackedBugId}`) }
    if (trackedBug.accountId.toString() != userId) { throw new Forbidden("NOT ALLOWED") }
    await trackedBug.remove()

    // @ts-ignore
    return `No longer tracking ${trackedBug.bug.title}`
  }
}

export const trackedBugsService = new TrackedBugsServicee()