import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary fallback={<p>Something went wrong.</p>}>
            <App/>
        </ErrorBoundary>
    </React.StrictMode>
);
