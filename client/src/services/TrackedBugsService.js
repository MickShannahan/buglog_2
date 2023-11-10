import { AppState } from "../AppState.js"
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

  async createTrackedBug(trackedBugData) {
    const res = await api.post('api/trackedBugs', trackedBugData)
    logger.log('CREATED TRACKED BUG', res.data)
    const newTrackedBug = new TrackedBug(res.data)
    AppState.trackedBugs.push(newTrackedBug)
  }
}

export const trackedBugsService = new TrackedBugsService()