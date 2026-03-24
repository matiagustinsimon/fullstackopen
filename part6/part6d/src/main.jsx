import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { StrictMode } from 'react'
import { NotificationContextProvider } from './NotificationContex.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  < StrictMode >
    <QueryClientProvider client={queryClient}>
      < NotificationContextProvider >
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  </StrictMode>
)