import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Board from './components/Board/Board';
import { DarkModeProvider } from './contexts/DarkModeContext';

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
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
