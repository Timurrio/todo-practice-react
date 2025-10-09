import { routes } from './const/routingConstants';
import { useCheckQuery } from './store/userSlice/userApi';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  useCheckQuery();

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
