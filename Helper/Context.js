import { View, Text, Alert } from "react-native";
import React, { createContext, useContext, useState } from "react";


const AppContext = createContext(null);
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    Alert.alert["Fuck Off"];
  }
  return context;
};

const Context = ({ children }) => {
  
  const [data, setData] = useState([]);
  




  

  

  return (
    <AppContext.Provider
      value={{ data, setData }}
    >
      <View>{children}</View>
    </AppContext.Provider>
  );
};

export default Context;
