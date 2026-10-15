import { Schema, model, Document, Types } from 'mongoose';

export interface INotification extends Document {
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  type: 'REQUEST_CREATED' | 'REQUEST_ACCEPTED' | 'REQUEST_REJECTED' | 'TUTORING_REMINDER';
  message: string;
  isRead: boolean;
  relatedTutoring?: Types.ObjectId;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['REQUEST_CREATED', 'REQUEST_ACCEPTED', 'REQUEST_REJECTED', 'TUTORING_REMINDER'], 
    required: true 
  },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  relatedTutoring: { type: Schema.Types.ObjectId, ref: 'Tutoring' },
}, {
  timestamps: true
});

export const Notification = model<INotification>('Notification', NotificationSchema);