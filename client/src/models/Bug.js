export class Bug {
  constructor (data) {
    this.id = data.id || data._id
    this.title = data.title
    this.description = data.description
    this.priority = data.priority
    this.closed = data.closed
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.closedDate = new Date(data.closedDate)
    this.updatedAt = new Date(data.updatedAt)
    this.createdAt = new Date(data.createdAt)
  }
}
