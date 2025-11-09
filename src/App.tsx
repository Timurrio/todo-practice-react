import { routes } from './const/routingConstants';
import { useCheckQuery } from './store/userSlice/userApi';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { data } = useCheckQuery();

  useEffect(() => {
    console.log('APP USEEFFECT: ', data);
  }, [data]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
