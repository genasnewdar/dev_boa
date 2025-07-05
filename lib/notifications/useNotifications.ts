import { useCallback } from 'react';
import { useNotificationStore } from './store';
import type { Notification } from '../../components/notification/NotificationDropdown';

export const useNotifications = () => {
  const store = useNotificationStore();
  
  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      store.addNotification(notification);
    },
    []
  );

  const markAsRead = useCallback(
    (notificationId: string | number) => {
      store.markAsRead(notificationId);
    },
    []
  );

  const markAllAsRead = useCallback(() => {
    store.markAllAsRead();
  }, []);

  const removeNotification = useCallback(
    (notificationId: string | number) => {
      store.removeNotification(notificationId);
    },
    []
  );

  return {
    notifications: store.notifications,
    unreadCount: store.unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };
}; 