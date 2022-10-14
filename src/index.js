import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import StoreProvider from './utils/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<StoreProvider>
				<App />
			</StoreProvider>
		</Router>
	</React.StrictMode>
);

