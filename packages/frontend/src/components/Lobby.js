import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { SocketContext, MentorContext } from '../App.js';

function Lobby() {

  const {setIsMentor} = useContext(MentorContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Listen for these events from the server
    socket.on('role', (role) => {
      // Update the mentor state based on the received role
      setIsMentor(role === 'mentor');
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('role');
      socket.off('codeChange');
    };
  }, []);
  
  const codeBlocks = ['Async Case', 'Promise Example', 'Callback Hell', 'Event Loop'];

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block, index) => (
          <li key={index}>
            <Link to={`/code/${index}`}>{block}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
