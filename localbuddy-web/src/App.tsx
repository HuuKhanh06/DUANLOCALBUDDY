// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ToastProvider } from './components/ui/Toast';
import { BookingProvider } from './context/BookingContext';

// Hook tự động phát hiện tham số ?figma=1 để bật chế độ tắt animation
function FigmaModeHandler() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('figma') === '1') {
      document.body.classList.add('figma-mode');
    } else {
      document.body.classList.remove('figma-mode');
    }
  }, [location.search]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ToastProvider>
          <FigmaModeHandler />
          <AppRoutes />
        </ToastProvider>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
