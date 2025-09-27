import { useContext, useEffect } from "react";
import { SocketContext } from "../Contexts/SocketContext.jsx";

const useNotificationListener = (
  events = [],
  dependencies = [],
  condition = true
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, ...dependencies, condition]);
};

export default useNotificationListener;
