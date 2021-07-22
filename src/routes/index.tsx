import { Route, Switch } from 'react-router-dom';
import GlobalStyles from '../styles/styles'

import { Home } from '../pages/Home/home';
import { NewRoom } from '../pages/NewRoom/newRoom';
import { Room } from '../pages/Room/room';
import { AdminRoom } from '../pages/AdminRoom/adminRoom';
import { FeedBack } from '../pages/FeedBack';

import light from '../styles/themes/ligth';

import { ThemeProvider } from '../hooks/themeContext';

export function Routes() {

  return (
    <ThemeProvider defaultTheme={light}>  
        <GlobalStyles/>
          <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/rooms/new' exact component={NewRoom}/>
              <Route path='/rooms/:id' component={Room}/>
              <Route path='/feedback' component={FeedBack}/>

              <Route path='/admin/rooms/:id' component={AdminRoom}/>
          </Switch>     
    </ThemeProvider>
  );
};