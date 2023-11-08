import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotesService {
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture')
    return notes
  }
  async destroyNote(noteId, userId) {
    const note = await dbContext.Notes.findById(noteId)
    if (!note) { throw new BadRequest(`Invalid ID: ${noteId}`) }
    if (note.creatorId.toString() != userId) { throw new Forbidden("NOT ALLOWED") }
    await note.remove()
    return 'Note was succesfully deleted'
  }
}

export const notesService = new NotesService()