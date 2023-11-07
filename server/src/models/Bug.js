import { Schema } from "mongoose";

export const BugSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 30 },
    description: { type: String, required: true, maxlength: 200 },
    priority: { type: Number, min: 1, max: 5, required: true },
    closed: { type: Boolean, required: true, default: false },
    closedDate: { type: Date },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})


BugSchema.post('save', doc => {
  if (doc.closed) {
    doc.closedDate = new Date()
    doc.save()
  }
})