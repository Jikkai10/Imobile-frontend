import React from 'react';
import Routes from './routes';
import BackdropProvider from '@mgcrea/react-native-backdrop-provider';
import './config/StatusBarConfig';

const App = () => <BackdropProvider><Routes /></BackdropProvider>;

export default App;