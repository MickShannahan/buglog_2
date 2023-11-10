import { Bug } from "./Bug.js"

export class TrackedBug {
  constructor (data) {
    this.id = data.id || data._id
    this.bugId = data.bugId
    this.accountId = data.accountId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.tracker = data.tracker
    this.bug = data.bug ? new Bug(data.bug) : null
  }
}

