import TodoPage from './pages/TodoPage/TodoPage';
import { useCheckQuery } from './store/userSlice/userApi';

const App: React.FC = () => {
  useCheckQuery();

  return <TodoPage />;
};

export default App;
