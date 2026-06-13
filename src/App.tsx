import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import ExecutiveSummaryPage from './pages/dashboard/ExecutiveSummaryPage';
import CompliancePage from './pages/dashboard/CompliancePage';
import ComplianceDetailPage from './pages/dashboard/ComplianceDetailPage';
import SchemesPage from './pages/dashboard/SchemesPage';
import GovernmentSchemesPage from './pages/dashboard/GovernmentSchemesPage';
import DocumentPreviewPage from './pages/dashboard/DocumentPreviewPage';
import DocumentReadyPage from './pages/dashboard/DocumentReadyPage';
import ApplicationsPage from './pages/dashboard/ApplicationsPage';
import ApplicationDetailPage from './pages/dashboard/ApplicationDetailPage';
import MyDocumentsPage from './pages/dashboard/MyDocumentsPage';
import AccountSettingsPage from './pages/dashboard/AccountSettingsPage';
import RegulatoryFeedPage from './pages/dashboard/RegulatoryFeedPage';
import FundingInsightsPage from './pages/dashboard/FundingInsightsPage';

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
            <Route path="schemes" element={<GovernmentSchemesPage />} />
            <Route path="schemes/generate" element={<SchemesPage />} />
            <Route path="schemes/document/:docType" element={<DocumentPreviewPage />} />
            <Route path="schemes/document/:docType/ready" element={<DocumentReadyPage />} />
            <Route path="applications" element={<MyDocumentsPage />} />
            <Route path="applications/tracking" element={<ApplicationsPage />} />
            <Route path="applications/:id" element={<ApplicationDetailPage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
            <Route path="regulatory-feed" element={<RegulatoryFeedPage />} />
            <Route path="growth" element={<FundingInsightsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
