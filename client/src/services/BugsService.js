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
}

export const bugsService = new BugsService()