"use client";

import { createContext, useContext, useState } from "react";

const DownloadAppContext = createContext();

export const DownloadAppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetProperty, setTargetProperty] = useState("");

  const openDownloadModal = (propertyName = "") => {
    setTargetProperty(typeof propertyName === "string" ? propertyName : "");
    setIsOpen(true);
  };
  const closeDownloadModal = () => {
    setIsOpen(false);
    setTargetProperty("");
  };

  return (
    <DownloadAppContext.Provider
      value={{
        isOpen,
        targetProperty,
        openDownloadModal,
        closeDownloadModal
      }}
    >
      {children}
    </DownloadAppContext.Provider>
  );
};

export const useDownloadApp = () => useContext(DownloadAppContext);
