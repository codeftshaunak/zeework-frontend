"use client";

import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";

interface NotificationEvent {
  event: string;
  handler: (...args: unknown[]) => void;
}

const useNotificationListener = (
  events: NotificationEvent[] = [],
  dependencies: unknown[] = [],
  condition: boolean = true
) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {

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