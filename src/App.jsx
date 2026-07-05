import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { PageContentProvider } from './context/PageContentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PageContentProvider>
        <Router>
          <AppRoutes />
        </Router>
      </PageContentProvider>
    </AuthProvider>
  );
}

export default App;