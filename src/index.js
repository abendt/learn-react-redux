import React from "react";
import {render} from "react-dom";
import Root from "./components/Root";
import configureStore from "./model/configureStore";

// functional components haben keinen eigenen Zustand und bestehen nur aus einer Funktion

// presentational components kümmern sich um layout (enthalten HTML)
// Daten kommen via prop rein. rausgehende Aktionen via event callback


// container component, enthält keine eigenen Layout Informationen, orchestriert Presentational Components
// kennt den Redux State. registriert sich eigenständig beim State für Updates, ist damit flexibler in der Verwendung
// sonst müsste der jeweilige Parent sich auch für Updates registrieren.
// stellt Daten und Verhalten für Presentational Components zur Verfügung


// container component schlagen die Brücke zum Redux Dispatcher


// Hauptkomponente rendern, Zustand aus Store ziehen

const store = configureStore();

render(
    <Root store={store} />,
    document.getElementById('root')
);

