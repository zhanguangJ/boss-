import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router ,Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'

import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'

import './assets/css/index.less'

ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route component={Main}/>
                </Switch>
            </Router>
        </Provider>
    , document.getElementById('root'));
