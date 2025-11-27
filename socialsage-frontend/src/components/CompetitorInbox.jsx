// src/components/CompetitorInbox.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useAsync } from '../hooks/useAsync';  // single import only
import { apiPost, apiGet } from '../api/index';
import { AuthContext } from '../context/AuthContext';
import { AppStateContext } from '../context/AppStateContext';

function CompetitorInbox() {
  return <div className="p-6 text-gray-800">Competitor Inbox - Under construction</div>;
}

export default CompetitorInbox;
