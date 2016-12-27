import React from "react";
import {render} from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import todoApp from './reducers';
import App from './components/App';


// functional components haben keinen eigenen Zustand und bestehen nur aus einer Funktion

// presentational components kümmern sich um layout (enthalten HTML)
// Daten kommen via prop rein. rausgehende Aktionen via event callback


// container component, enthält keine eigenen Layout Informationen, orchestriert Presentational Components
// kennt den Redux State. registriert sich eigenständig beim State für Updates, ist damit flexibler in der Verwendung
// sonst müsste der jeweilige Parent sich auch für Updates registrieren.
// stellt Daten und Verhalten für Presentational Components zur Verfügung


// container component schlagen die Brücke zum Redux Dispatcher


// Store mit Support für Chrome Dev Tools


const store = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Hauptkomponente rendern, Zustand aus Store ziehen

render(
    <Provider store={store}>
        <App
            {...store.getState()}
        />
    </Provider>,
    document.getElementById('root')
);

// bei Änderungen des Store => neu rendern.
// store.subscribe(render);
// render();
