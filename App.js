

import { Provider } from "react-redux";


import React from "react"
import RouteIn from './Screens/RouteIn';
import Context from "./Helper/Context";
import store from "./Helper/redux/store"


import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
export default function App() {




  let persistor = persistStore(store)
  return (
    <>

      <Provider store={store}>
        <PersistGate persistor={persistor}>

          <Context>

            <RouteIn />
          </Context>
        </PersistGate>
      </Provider>


    </>

  );
}