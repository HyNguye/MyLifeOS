import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {HomeProvider} from '~/homepage-store';
import { AppProvider } from '@comp/Application/app-store';
ReactDOM.createRoot(document.getElementById('root')).render(
    <HomeProvider>
        <AppProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
        </AppProvider>
    </HomeProvider>,
);
