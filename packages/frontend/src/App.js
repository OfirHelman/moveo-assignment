import React, {useState} from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from './components/Lobby';
import CodeBlock from './components/CodeBlock';
export const SocketContext = React.createContext(null);
export const MentorContext = React.createContext(null);

// Connect to the Socket.io server for real-time updates
const socket = io('http://localhost:5001');

function App() {
  const [isMentor, setIsMentor] = useState(false);

  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
      <MentorContext.Provider value={{isMentor, setIsMentor}}>
        <Routes>
            <Route path="/" element={<Lobby/>} />
            <Route path="/code/:id" element={<CodeBlock/>} />
        </Routes>
        </MentorContext.Provider>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
