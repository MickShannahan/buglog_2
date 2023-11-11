import { AppState } from "../AppState.js"
import { Bug } from "../models/Bug.js"
import { TrackedBug } from "../models/TrackedBug.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TrackedBugsService {
  async getTrackedBugsById(bugId) {
    const res = await api.get(`api/bugs/${bugId}/trackedBugs`)
    logger.log('GOT TRACKED BUGS', res.data)
    const newTrackedBugs = res.data.map(pojo => new TrackedBug(pojo))
    AppState.trackedBugs = newTrackedBugs
  }

  async getMyTrackedBugs() {
    const res = await api.get('account/trackedBugs')
    logger.log('GOT MY TRACKED BUGS', res.data)
    const newTrackedBugs = res.data.map(pojo => new Bug(pojo.bug))
    AppState.bugs = newTrackedBugs
  }

  async createTrackedBug(trackedBugData) {
    const res = await api.post('api/trackedBugs', trackedBugData)
    logger.log('CREATED TRACKED BUG', res.data)
    const newTrackedBug = new TrackedBug(res.data)
    AppState.trackedBugs.push(newTrackedBug)
  }
  async destroyTrackedBug(trackedBugId) {
    const res = await api.delete(`api/trackedBugs/${trackedBugId}`)
    logger.log('DESTROYED TRACKED BUG', res.data)
    const trackedBugIndex = AppState.trackedBugs.find(trackedBug => trackedBug.id == trackedBugId)
    if (trackedBugIndex == -1) { throw new Error(`No bug found with the id of ${trackedBugId}`) }
    AppState.trackedBugs.splice(trackedBugIndex, 1)
  }
}

export const trackedBugsService = new TrackedBugsService()