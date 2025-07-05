import { create } from 'zustand';
import { Notification } from '../../components/notification/NotificationDropdown';

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string | number) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string | number) => void;
}

type State = Pick<NotificationStore, 'notifications' | 'unreadCount'>;
type Actions = Omit<NotificationStore, 'notifications' | 'unreadCount'>;

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) =>
    set((state: State) => {
      const newNotification = {
        ...notification,
        id: Date.now(),
        timestamp: new Date(),
        read: false,
      } as Notification;
      
      const notifications = [newNotification, ...state.notifications];
      return {
        notifications,
        unreadCount: notifications.filter((n: Notification) => !n.read).length,
      };
    }),
  markAsRead: (notificationId: string | number) =>
    set((state: State) => {
      const notifications = state.notifications.map((notification: Notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );
      return {
        notifications,
        unreadCount: notifications.filter((n: Notification) => !n.read).length,
      };
    }),
  markAllAsRead: () =>
    set((state: State) => {
      const notifications = state.notifications.map((notification: Notification) => ({
        ...notification,
        read: true,
      }));
      return { notifications, unreadCount: 0 };
    }),
  removeNotification: (notificationId: string | number) =>
    set((state: State) => {
      const notifications = state.notifications.filter(
        (notification: Notification) => notification.id !== notificationId
      );
      return {
        notifications,
        unreadCount: notifications.filter((n: Notification) => !n.read).length,
      };
    }),
})); 