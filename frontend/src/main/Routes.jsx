import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router'
import { Context } from '../Context/AuthContext';
import Home from '../components/template/Home'
import Login from '../components/Login'
import DragonCrud from '../components/dragon/DragonCrud'
import DragonInfo from '../components/dragon/DragonInfo'

import '../components/Default.scss'

function CustomRoute({ isPrivate, ...rest }) {
    const { loading, authenticated } = useContext(Context);
  
    if (loading) {
      return <h1>Loading...</h1>;
    }
  
    if (isPrivate && !authenticated) {
      return <Redirect to="/" />
    }
  
    return <Route {...rest} />;
  }

export default function Routes(){
    return (
        <Switch>
            <CustomRoute exact path='/' component={Login}></CustomRoute>
            <CustomRoute isPrivate exact path='/adicionar' component={DragonCrud}></CustomRoute>
            <CustomRoute isPrivate exact path='/dragon/:id' component={DragonInfo}></CustomRoute>
            <CustomRoute isPrivate exact path='/home' component={Home}></CustomRoute>
            <CustomRoute render={() => <Redirect to="/" />}></CustomRoute>
        </Switch>
    )
}