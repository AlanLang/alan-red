import React, { Component } from 'react';
import LayoutTab from './layout/LayoutTab'
import BooksAdd from './screen/BooksAdd'
import BookRead from './screen/BookRead'
import Login from './screen/Login/Login'
import { BrowserRouter as Router, Route,Redirect,Switch} from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import withHocPrivateRoute from './containers/withHocPrivateRoute';
import style from  './index.css';
const  PrivateRoute =  withHocPrivateRoute(Route);

class App extends Component {
  constructor () {
    super()
  }
  componentWillMount(){
    document.body.removeChild(document.getElementById('app-loading'));
  }
  render() {
    return (
      <Router>
        <div>
          <Switch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className={style.switchWrapper}
            >
            <PrivateRoute path="/tab" component={LayoutTab}/>
            <PrivateRoute path="/add" component={BooksAdd}/>
            <PrivateRoute path="/read/:id" component={BookRead}/>
            <Route path="/login" component={Login} />
            <Redirect path="" to={{pathname: '/tab'}} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};