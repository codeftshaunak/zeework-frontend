"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { socketURL } from "../helpers/APIs/proxy";

const SocketContext = createContext();

const createSocket = (userId, role) => {
  const newSocket = io(socketURL, {
    autoConnect: false,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    query: { user_id: userId, role: role },
  });

  newSocket.on("connect", () => {
    newSocket.emit("connect_user", { user_id: userId });
  });

  newSocket.on("disconnect", () => {
    setTimeout(() => {
      if (newSocket.disconnected) {
        newSocket.connect();
      }
    }, 3000);
  });

  newSocket.on("connect_error", (error) => {
    console.error("Connection error:", error);
    setTimeout(() => {
      if (newSocket.disconnected) {
        newSocket.connect();
      }
    }, 5000);
  });

  return newSocket;
};

const user = localStorage.getItem("zeework_user");
let userId = null;
let role = null;

if (user && user !== "undefined") {
  try {
    const parsedUser = JSON.parse(user);
    userId = parsedUser.user_id;
    role = parsedUser.role;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userId) {
      const newSocket = createSocket(userId, role);

      newSocket.on("connect", () => setIsConnected(true));
      newSocket.on("disconnect", () => setIsConnected(false));

      setSocket(newSocket);
      newSocket.connect();

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const { socket } = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export { SocketProvider, useSocket, SocketContext, userId };
