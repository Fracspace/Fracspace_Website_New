"use client";

import { createContext, useContext, useState } from "react";

const DownloadAppContext = createContext();

export const DownloadAppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDownloadModal = () => setIsOpen(true);
  const closeDownloadModal = () => setIsOpen(false);

  return (
    <DownloadAppContext.Provider
      value={{
        isOpen,
        openDownloadModal,
        closeDownloadModal
      }}
    >
      {children}
    </DownloadAppContext.Provider>
  );
};

export const useDownloadApp = () => useContext(DownloadAppContext);
