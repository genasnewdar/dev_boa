import { IconBell } from "@tabler/icons-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface Notification {
  id: string | number;
  title: string;
  message?: string;
  timestamp: Date | string;
  read?: boolean;
  [key: string]: any; 
}

export interface NotificationDropdownProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  renderNotification?: (notification: Notification) => React.ReactNode;
  iconProps?: Omit<React.ComponentProps<typeof IconBell>, 'ref'>;
  dropdownProps?: React.HTMLAttributes<HTMLDivElement>;
  unreadCount?: number;
  className?: string;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = memo(({
  notifications,
  onNotificationClick,
  renderNotification,
  iconProps = {},
  dropdownProps = {},
  unreadCount,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = useCallback((notification: Notification) => {
    onNotificationClick?.(notification);
  }, [onNotificationClick]);

  const defaultRenderNotification = useCallback((notification: Notification) => (
    <div
      key={notification.id}
      className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
        !notification.read ? "bg-blue-50" : ""
      }`}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="font-medium">{notification.title}</div>
      {notification.message && (
        <div className="text-sm text-gray-600">{notification.message}</div>
      )}
      <div className="text-xs text-gray-500 mt-1">
        {typeof notification.timestamp === "string"
          ? notification.timestamp
          : notification.timestamp.toLocaleString()}
      </div>
    </div>
  ), [handleNotificationClick]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className="relative"
        onClick={toggleDropdown}
      >
        <IconBell className={`w-6 h-6 ${iconProps.className || ""}`} {...iconProps} />
        {typeof unreadCount === "number" && unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`fixed z-50 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 ${
              dropdownProps.className || ""
            }`}
            style={{
              top: buttonRef.current
                ? buttonRef.current.getBoundingClientRect().bottom + 8
                : 0,
              left: buttonRef.current
                ? Math.max(
                    0,
                    buttonRef.current.getBoundingClientRect().left -
                      280 +
                      buttonRef.current.getBoundingClientRect().width
                  )
                : 0,
            }}
            {...dropdownProps}
          >
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) =>
                renderNotification
                  ? renderNotification(notification)
                  : defaultRenderNotification(notification)
              )
            )}
          </div>,
          document.body
        )}
    </div>
  );
}); 