import React, { createContext, useState } from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const setPersona = (persona) => {
    setSelectedPersona(persona);
    // Clear topic selection whenever persona changes
    setSelectedTopic(null);
  };

  const setTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <AppStateContext.Provider value={{
      selectedPersona,
      setPersona,
      selectedTopic,
      setTopic,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};
