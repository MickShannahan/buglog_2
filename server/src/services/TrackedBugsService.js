import { dbContext } from "../db/DbContext.js"

class TrackedBugsServicee {
  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker', 'name picture')
    await trackedBug.populate('bug')
    return trackedBug
  }
  async getTrackersByBugId(bugId) {
    const trackers = await dbContext.TrackedBugs.find({ bugId }).populate('tracker')
    return trackers
  }
}

export const trackedBugsService = new TrackedBugsServicee()