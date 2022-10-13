import React from "react";
import { Link, useLocation } from "react-router-dom";
function Card({
                  item,
                  board,
                  dragStartHandler,
                  dragLeaveHandler,
                  dragEndHandler,
                  dragOverHandler,
                  dropHandler,
                  removeCardHandler,
              }) {
    const location = useLocation();
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
                <div className="card__title">{item.title.slice(0,15)}</div>
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
