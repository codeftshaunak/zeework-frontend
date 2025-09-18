"use client";

import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";

interface NotificationEvent {
  event: string;
  handler: (...args: any[]) => void;
}

const useNotificationListener = (
  events: NotificationEvent[] = [],
  dependencies: any[] = [],
  condition: boolean = true
) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket && condition) {
      events.forEach(({ event, handler }) => {
        socket.on(event, handler);
      });

      return () => {
        events.forEach(({ event, handler }) => {
          socket.off(event, handler);
        });
      };
    }
  }, [socket, ...dependencies, condition]);
};

export default useNotificationListener;