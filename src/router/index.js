import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {Provider} from 'react-redux';

import App from './navigation/index';
import store from '../store/configureStore';

function RouterApp({database}) {
  return () => (
    <Provider store={store}>
      <NavigationContainer>
        <App database={database} />
      </NavigationContainer>
    </Provider>
  );
}

export default RouterApp;
