import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const user = getUser();
  const userId = user?.userId;

  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    const res = await API.get(`/notifications/${userId}`);
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const deleteNotification = async (id) => {
    await API.delete(`/notifications/${id}`);
    fetchNotifications();
  };

  const openNotification = async (notification) => {

    await API.put(`/notifications/read/${notification.id}`);

    if (notification.referenceId) {
      navigate(`/chat/${notification.referenceId}`);
    }
    fetchNotifications();
    setShow(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setShow(!show)}>
        🔔{" "}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full ">
            {notifications.filter(n=>!n.read).length}
          </span>
        )}
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow rounded p-3">
          {notifications.length === 0 && <p>No notifications</p>}

          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => openNotification(n)}
              className="border-b py-2 cursor-pointer hover:bg-gray-100"
            >
              <p className="text-sm">{n.message}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(n.id);
                }}
                className="text-red-500 text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
