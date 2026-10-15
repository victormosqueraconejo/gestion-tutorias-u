import { Request, Response } from 'express';
import { Notification } from '../models/notification.model';

export const getUserNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId;
    const notifications = await Notification.find({ recipient: userId })
                                            .sort({ createdAt: -1 })
                                            .limit(20);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener notificaciones', error });
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.status(200).json({ message: 'Notificación leída' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar notificación', error });
  }
};