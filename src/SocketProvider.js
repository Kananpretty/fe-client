import { createContext } from "react";

const ws = new WebSocket("ws://localhost:5000");

export const SocketContext = createContext(ws);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={ws}> {props.children}</SocketContext.Provider>
);
