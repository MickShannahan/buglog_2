
export class Note {
  constructor (data) {
    this.id = data.id || data._id
    this.body = data.body
    this.creatorId = data.creatorId
    this.bugId = data.bugId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}