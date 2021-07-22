import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './hooks/auth';

function App() {

  return (
      <BrowserRouter>   
        <AuthContextProvider>
          <Routes/>
        </AuthContextProvider> 
      </BrowserRouter>
  );
}

export default App;
