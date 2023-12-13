import ReactDOM from "react-dom/client";
import App from "./App";
import {store, persistor} from "./redux/redux-store"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate loading= {"loading..."} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);