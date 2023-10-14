import React, { createContext, useState } from 'react'

interface MenuContextProps {
  isSideMenuOpen: boolean;
  toggleSideMenu: () => void;
}

export const MenuContext = createContext<MenuContextProps>({
  isSideMenuOpen: true,
  toggleSideMenu: () => {
  },
})

export const MenuProvider: React.FC = ({ children }) => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(true)

  const toggleSideMenu = () => {
    setSideMenuOpen(!isSideMenuOpen)
  }

  return (
    <MenuContext.Provider value={{ isSideMenuOpen, toggleSideMenu }}>
      {children}
    </MenuContext.Provider>
  )
}
