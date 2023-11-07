import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) { throw new BadRequest(`Invalid id: ${bugId}`) }
    return bug
  }
  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator', 'name picture')
    return bugs
  }
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async updateBug(bugId, userId, bugData) {
    const bug = await this.getBugById(bugId)
    if (bug.closed) { throw new BadRequest(`${bug.title} is closed`) }
    if (bug.creatorId.toString() != userId) { throw new Forbidden("NOT ALLOWED") }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority
    await bug.save()
    return bug
  }

  async closeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (bug.creatorId.toString() != userId) { throw new Forbidden("NOT ALLOWED") }
    bug.closed = !bug.closed
    await bug.save()
    return bug
  }

}

export const bugsService = new BugsService()