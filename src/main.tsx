import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {
  RowGroupingModule,
  ServerSideRowModelModule,
} from 'ag-grid-enterprise';
// import { MasterDetailModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  AllCommunityModule,
  RowGroupingModule,
  ServerSideRowModelModule,
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
