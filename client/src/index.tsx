import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
