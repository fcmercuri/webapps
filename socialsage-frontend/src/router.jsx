import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import NavigationBar from './components/NavigationBar';

import Welcome from './components/Welcome';
import PersonaCreator from './components/PersonaCreator';
import TopicBuilder from './components/TopicBuilder';
import ContentBrief from './components/ContentBrief';
import CompetitorInbox from './components/CompetitorInbox';

function RequireAuth({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default function Router() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/personas" element={<RequireAuth><PersonaCreator /></RequireAuth>} />
          <Route path="/topics" element={<RequireAuth><TopicBuilder /></RequireAuth>} />
          <Route path="/briefs" element={<RequireAuth><ContentBrief /></RequireAuth>} />
          <Route path="/inbox" element={<RequireAuth><CompetitorInbox /></RequireAuth>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
