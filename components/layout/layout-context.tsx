"use client";
import React, { useState, useContext } from "react";
import { GlobalQuery } from "../../tina/__generated__/types";

interface LayoutState {
  globalSettings: GlobalQuery["global"] | null | undefined;
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalQuery["global"] | null | undefined>
  >;
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
  theme: GlobalQuery["global"]["theme"];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: {
        color: "blue",
        darkMode: "light",
      },
      globalSettings: undefined,
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery["global"] | null | undefined;
  pageData: {};
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalQuery["global"] | null | undefined>(
    initialGlobalSettings
  );
  const [pageData, setPageData] = useState<{}>(initialPageData);

  const theme = globalSettings?.theme || {
    __typename: "GlobalTheme" as const,
    color: "blue",
    font: "sans",
    darkMode: "light"
  };

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
