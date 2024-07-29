import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Board from './components/Board/Board';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>
        <BrowserRouter className="text-3xl font-bold underline">
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/:boardname" element={<Board />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          className="bg-custom-bg-secondary border border-custom-text-2/30 text-custom-text-1 text-lg max-w-[500px] px-[24px] py-[1rem]"
          position="top-center"
          reverseOrder={false}
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 4000,
            },
            style: {
              padding: '16px 24px',
              fontSize: '16px',
              maxWidth: '500px',
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
