import React, {useState} from 'react'

export const StoreContext = React.createContext(null)

export default ({ children }) => {
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [boards, setBoards] = useState(
        JSON.parse(localStorage.getItem("boards")) || []
    );


    const store = {
        currentBoard, setCurrentBoard,
        currentItem, setCurrentItem,
        boards, setBoards,
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}