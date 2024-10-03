import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ApplicationRouter } from './Routes/index.routes.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider adapterLocale={AdapterDayjs}> 
      <QueryClientProvider client={queryClient} >
        <ApplicationRouter />
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>,
)
