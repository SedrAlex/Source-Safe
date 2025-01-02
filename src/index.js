import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@contexts/themeContext';
import {ShopProvider} from '@contexts/shopContext';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <ThemeProvider>
                <ShopProvider>
                    <App/>
                </ShopProvider>
            </ThemeProvider>
        </BrowserRouter>
        </PersistGate>
    </Provider>
);
