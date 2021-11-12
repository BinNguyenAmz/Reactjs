import Header from 'Components/Header';
import ProductFeature from 'features/Product';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './Components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {

  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
