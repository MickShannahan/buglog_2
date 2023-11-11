import { AppState } from "../AppState.js"
import { Bug } from "../models/Bug.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('GOT BUGS', res.data)
    const newBugs = res.data.map(pojo => new Bug(pojo))
    AppState.bugs = newBugs
  }

  async getBugById(bugId) {
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log('GOT BUG', res.data)
    const newBug = new Bug(res.data)
    AppState.bug = newBug
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    logger.log('CREATED BUG', res.data)
    return res.data.id
  }

  async updateBug(bugData) {
    const res = await api.put(`api/bugs/${bugData.id}`, bugData)
    logger.log('UPDATING BUG', res.data)
    const newBug = new Bug(res.data)
    AppState.bug = newBug
  }

  async toggleBugClosedStatus(bugId) {
    const res = await api.delete(`api/bugs/${bugId}`)
    logger.log('TOGGLED BUG', res.data)
    const newBug = new Bug(res.data)
    AppState.bug = newBug
  }

  clearAppState() {
    AppState.bug = null
    AppState.bugs.length = 0
    AppState.notes.length = 0
    AppState.trackedBugs.length = 0
  }
}

export const bugsService = new BugsService()