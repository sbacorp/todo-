import React from "react";
import { Link, useLocation } from "react-router-dom";
import {StoreContext} from "../utils/store";
function Card({
                  item,
                  board,
                  removeCardHandler,
              }) {

    const {
        boards, setBoards,currentBoard, setCurrentBoard,currentItem, setCurrentItem
    } = React.useContext(StoreContext)
    const location = useLocation();


    const dragStartHandler = (board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    };

    const dragEndHandler = (e) => {
        e.target.style.boxShadow = "none";
    };

    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = "none";
    };
    const dragOverHandler = (e) => {
        e.preventDefault();
        if (e.target.className === "card") {
            e.target.style.boxShadow = "0px 4px 5px darkcyan";
        }
    };
    const dropHandler = (e, board, item) => {
        e.target.style.boxShadow = "none";
        e.stopPropagation();
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        if (currentIndex < -1 ) return;
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
    };
    return (
        <Link
            to={`/modal/${item.id}`}
            state={{
                background: location,
            }}
        >
            <div
                className="card"
                draggable={true}
                onDragStart={() => dragStartHandler(board, item)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
            >
                <div className="card__title ellipsis">{item.title.slice(0,15)}</div>
                <div style={{ justifySelf: "flex-end" }}>
                    {item.tasks?.filter((item) => item.completed)?.length}/
                    {item.tasks?.length}
                </div>

                <svg
                    className="card-remove"
                    style={{ justifySelf: "right" }}
                    onClick={(e) => removeCardHandler(e, item.id, board.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    fill="#fff"
                >
                    <path d="M5 13v-2h14v2Z" />
                </svg>
            </div>
        </Link>
    );
}

export default Card;
