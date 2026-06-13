import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import ExecutiveSummaryPage from './pages/dashboard/ExecutiveSummaryPage';
import CompliancePage from './pages/dashboard/CompliancePage';
import ComplianceDetailPage from './pages/dashboard/ComplianceDetailPage';
import SchemesPage from './pages/dashboard/SchemesPage';
import DocumentPreviewPage from './pages/dashboard/DocumentPreviewPage';
import DocumentReadyPage from './pages/dashboard/DocumentReadyPage';

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ExecutiveSummaryPage />} />
            <Route path="compliance" element={<CompliancePage />} />
            <Route path="compliance/:id" element={<ComplianceDetailPage />} />
            <Route path="schemes" element={<SchemesPage />} />
            <Route path="schemes/document/:docType" element={<DocumentPreviewPage />} />
            <Route path="schemes/document/:docType/ready" element={<DocumentReadyPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
