import { createContext, useContext, useState } from "react";

const ScaleFactorContext = createContext();

export function ScaleFactorProvider({ children }) {
  const [scaleFactor, setScaleFactor] = useState(1);

  return (
    <ScaleFactorContext.Provider value={{ scaleFactor, setScaleFactor }}>
      {children}
    </ScaleFactorContext.Provider>
  );
}

export function useScaleFactor() {
  return useContext(ScaleFactorContext);
}
