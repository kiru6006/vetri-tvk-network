import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { MembersPage } from './pages/MembersPage';
import { MemberDetailPage } from './pages/MemberDetailPage';
import { OrganisationPage } from './pages/OrganisationPage';
import { WingsPage } from './pages/WingsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AdminPage } from './pages/AdminPage';
import { EventsPage } from './pages/EventsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ServiceRequestsPage } from './pages/ServiceRequestsPage';
import { MessagesPage } from './pages/MessagesPage';
import { DocumentsPage } from './pages/DocumentsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="members/:id" element={<MemberDetailPage />} />
            <Route path="organisation" element={<OrganisationPage />} />
            <Route path="wings" element={<WingsPage />} />
            <Route path="ai-assistant" element={<AIAssistantPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="service-requests" element={<ServiceRequestsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
