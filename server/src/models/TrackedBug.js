import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, required: true, ref: 'Bug' },
    accountId: { type: Schema.Types.ObjectId, require: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  justOne: true,
  ref: 'Bug'
})
TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})

TrackedBugSchema.index({ bugId: 1, accountId: 1 }, { unique: true })