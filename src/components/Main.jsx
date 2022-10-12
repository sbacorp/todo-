import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardCreator from "./CardCreator";

import Form from "./Form";

function Main({ boards, setBoards }) {
	const location = useLocation();

	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);

	const dragStartHandler = (e, board, item) => {
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
		if (e.target.className === "item") {
			e.target.style.boxShadow = "2px 2px 3px #000";
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

	const dropHandler = (e, item, board) => {
		e.target.style.boxShadow = "none";
		e.stopPropagation();
		e.preventDefault();
		const currentIndex = currentBoard.items.indexOf(currentItem);
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

	const addCardHandler = (boardId, title) => {
		const index = boards.findIndex((item) => item.id === boardId);
		console.log(index);
		if (index < 0) return;

		const tempBoards = [...boards];
		tempBoards[index].items.push({
			id: Date.now(),
			title,
			labels: [],
			date: "",
			tasks: [],
		});
		setBoards(tempBoards);
	};

	return (
		<div>
			<Form boards={boards} setBoards={setBoards} />
			<div className="boards">
				{!boards.length ? (
					<div style= {{'marginLeft':'30px', 'fontSize':'30px'}} className="board__title">Добавьте доску</div>
				) : (
					boards.map((board) => (
						<div
							key={board.id}
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={(e) => dropCardHandler(e, board)}
							className="board"
						>
							<div className="board__title">{board.title}</div>
							<div className="board__items">
								{!board.items.length ? (
									<div className="board__title">
										перетащите или добавьте задачу
									</div>
								) : (
									board.items.map((item, idx) => (
										<Link
											key={idx}
											to={`/modal/${item.id}`}
											state={{
												background: location,
											}}
										>
											<div
												className="item"
												draggable={true}
												onDragStart={(e) =>
													dragStartHandler(
														e,
														board,
														item
													)
												}
												onDragLeave={(e) =>
													dragLeaveHandler(e)
												}
												onDragEnd={(e) =>
													dragEndHandler(e)
												}
												onDragOver={(e) =>
													dragOverHandler(e)
												}
												onDrop={(e) =>
													dropHandler(e, item, board)
												}
											>
												<div className="item__title">
													{item.title}
												</div>
											</div>
										</Link>
									))
								)}
							</div>
							<CardCreator
								bid={board.id}
								addCardHandler={addCardHandler}
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Main;
