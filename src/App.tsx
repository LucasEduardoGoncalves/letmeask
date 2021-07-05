import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyles from './styles/styles'

import { Home } from './pages/Home/home';
import { NewRoom } from './pages/NewRoom/newRoom';
import { Room } from './pages/Room/room';
import { AdminRoom } from './pages/AdminRoom/adminRoom';

import { AuthContextProvider } from './hooks/auth';
import light from './styles/themes/ligth';

import { ThemeProvider } from './hooks/themeContext';


function App() {

  return (
    <ThemeProvider defaultTheme={light}>
      <BrowserRouter>    
          <GlobalStyles/>
          <AuthContextProvider>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/rooms/new' exact component={NewRoom}/>
                <Route path='/rooms/:id' component={Room}/>

                <Route path='/admin/rooms/:id' component={AdminRoom}/>
              </Switch>
          </AuthContextProvider>      
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
