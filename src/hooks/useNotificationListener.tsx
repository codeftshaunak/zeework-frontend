"use client";

import { useContext, useEffect } from "react";
import SocketContext from "../contexts/SocketContext";

interface NotificationEvent {
  event: string;
  handler: (...args: unknown[]) => void;
}

const useNotificationListener = (
  events: NotificationEvent[] = [],
  dependencies: unknown[] = [],
  condition: boolean = true
): void => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket || !condition) return;

    // Attach all event listeners
    events.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });

    // Cleanup on unmount or dependency change
    return () => {
      events.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
    };
  }, [socket, condition, ...dependencies]);
};

export default useNotificationListener;
