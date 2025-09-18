"use client";

import { useEffect, useCallback, useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

const useUserActivityListener = (callback: (...args: any[]) => void) => {
  const { socket } = useContext(SocketContext);

  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (socket) {
      socket.on("user_activity_update", memoizedCallback);

      return () => {
        socket.off("user_activity_update", memoizedCallback);
      };
    }
  }, [socket, memoizedCallback]);

  return socket;
};

export default useUserActivityListener;