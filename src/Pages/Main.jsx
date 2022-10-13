import React, { useState } from "react";
import Form from "../components/BoardCreator";
import Board from "../components/Board";

function Main({ boards, setBoards }) {
	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);

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
	const dropCardHandler = (e, board) => {
		e.preventDefault();
		if (e.target.className === "board") {
			board.items.push(currentItem);
			const currentIndex = currentBoard.items.indexOf(currentItem);
			currentBoard.items.splice(currentIndex, 1);
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

	const addCardHandler = (boardId, title, setValue) => {
		const index = boards.findIndex((item) => item.id === boardId);
		if (index < 0) return;

		const tempBoards = [...boards];
		tempBoards[index].items.push({
			id: Date.now(),
			title,
			tasks: [],
		});
		setBoards(tempBoards);
		setValue("");
	};
	const removeBoardHandler = (boardId) => {
		const index = boards.findIndex((item) => item.id === boardId);
		const tempBoards = [...boards];
		tempBoards.splice(index, 1);
		setBoards(tempBoards);
	};
	const removeCardHandler = (e, cid, bid) => {
		e.preventDefault();
		const index = boards.findIndex((item) => item.id === bid);
		const tempBoards = [...boards];
		const items = tempBoards[index].items;
		const cardIndex = items.findIndex((item) => item.id === cid);
		items.splice(cardIndex, 1);
		setBoards(tempBoards);
	};

	return (
		<div className="main">
			<Form boards={boards} setBoards={setBoards} />
			<div className="boards">
				{!boards.length ? (
					<div
						style={{ marginLeft: "30px", fontSize: "30px" }}
						className="board__title"
					>
						Добавьте доску
					</div>
				) : (
					boards.map((board) => (
						<Board key={board.id} board={board} removeCardHandler={removeCardHandler} dropHandler={dropHandler} dragStartHandler={dragStartHandler} dragLeaveHandler={dragLeaveHandler} dragEndHandler={dragEndHandler} dragOverHandler={dragOverHandler} addCardHandler={addCardHandler} dropCardHandler={dropCardHandler} removeBoardHandler={removeBoardHandler}/>

					))
				)}
			</div>
		</div>
	);
}

export default Main;
