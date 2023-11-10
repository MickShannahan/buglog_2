import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    logger.log('GOT NOTES', res.data)
    const newNotes = res.data.map(pojo => new Note(pojo))
    AppState.notes = newNotes
  }
  async createNote(noteData) {
    const res = await api.post('api/notes', noteData)
    logger.log('CREATED NOTE', res.data)
    const newNote = new Note(res.data)
    AppState.notes.push(newNote)
  }
}

export const notesService = new NotesService()