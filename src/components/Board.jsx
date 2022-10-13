import React from "react";
import CardCreator from "./CardCreator";
import Card from "./Card";
function Board({
                   board,
                   dragOverHandler,
                   dropCardHandler,
                   removeBoardHandler,
                   addCardHandler,
                   dragEndHandler,
                   dragLeaveHandler,
                   dragStartHandler,
                   dropHandler,
                   removeCardHandler,
               }) {
    return (
        <div
            className="board"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
        >
            <div className="board__top">
                <div className="board__title">{board.title}</div>
                <button
                    className="button-delete"
                    onClick={() => removeBoardHandler(board.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                        fill="#fff"
                    >
                        <path d="m9.375 16.3 2.65-2.65 2.65 2.65 1.15-1.15-2.65-2.65 2.65-2.65-1.15-1.15-2.65 2.65-2.65-2.65-1.15 1.15 2.65 2.65-2.65 2.65Zm-1.85 4.5q-.975 0-1.625-.65t-.65-1.625V5.9h-1V4.25h4.7v-.975h6.15v.975h4.7V5.9h-1v12.625q0 .975-.65 1.625t-1.625.65ZM17.15 5.9H6.9v12.625q0 .25.188.437.187.188.437.188h9q.25 0 .438-.188.187-.187.187-.437ZM6.9 5.9v13.25-.625Z" />
                    </svg>
                </button>
            </div>

            <div className="board__items">
                {board.items.map((item) => (<Card key={item.id} board={board} item={item} dragOverHandler={dragOverHandler} dragEndHandler={dragEndHandler} dragLeaveHandler={dragLeaveHandler} dragStartHandler={dragStartHandler} dropHandler={dropHandler} removeCardHandler={removeCardHandler}/>))}
            </div>
            <CardCreator bid={board.id} addCardHandler={addCardHandler} />
        </div>
    );
}

export default Board;
