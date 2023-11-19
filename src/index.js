import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import ErrorBoundary from "./ErrorBoundary";
import {Provider} from "react-redux";
import store from "./Store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ErrorBoundary fallback={<p>Something went wrong.</p>}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);
