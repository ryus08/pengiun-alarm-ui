import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import reducers from './reducers';
import Layers from './components/tv/layers';
import LocalView from './containers/localview';
import pollStarter from './pollstarter';
import AppWithAuth from './components/appwithauth';

import { getConfigs } from './actioncreators/config';

import userSettings from './usersettings';
import { getUserPreferences } from './actioncreators/userpreferences';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ),
);

let content;
if (userSettings.local) {
  content = (
    <LocalView
      startPage={userSettings.startPage}
      noConfig={userSettings.noConfig}
    />
  );
} else {
  content = (
    <Layers
      nrApiKey={userSettings.nrApiKey}
      gitLabActive={userSettings.gitLabActive}
    />
  );
}

ReactDOM.render(
  <Provider store={store}>
    <AppWithAuth>{content}</AppWithAuth>
  </Provider>,
  document.getElementById('root'),
);

store.dispatch(getUserPreferences());
store.dispatch(getConfigs());

pollStarter({ store });

registerServiceWorker();
