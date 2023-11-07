import { Schema } from "mongoose";

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true, maxlength: 200 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    bugId: { type: Schema.Types.ObjectId, required: true, ref: 'Bug' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})