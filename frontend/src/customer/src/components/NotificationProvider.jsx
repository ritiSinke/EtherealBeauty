import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success", duration = 2000) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: notification.type === "success" ? "green" : "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            transition: "opacity 0.5s ease-out",
          }}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Custom Hook to use Notification
export const useNotification = () => useContext(NotificationContext);
export default NotificationProvider;