import React, { useState } from "react";
import CardCreator from "../components/CardCreator";
import { Link, useLocation } from "react-router-dom";
import Form from "../components/BoardCreator";


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
			tasks: [],
		});
		setBoards(tempBoards);
	};
	const removeBoardHandler = (boardId) => {
		const index = boards.findIndex((item) => item.id === boardId);
		const tempBoards = [...boards];
		tempBoards.splice(index, 1);
		setBoards(tempBoards);
	};
	const removeCardHandler = (e,cid, bid ) => {
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
						<div
							key={board.id}
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={(e) => dropCardHandler(e, board)}
							className="board"
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
								{!board.items.length ? (
									<div className="board__title">
										перетащите или добавьте задачу
									</div>
								) : (
									board.items.map((item) => (
										<Link
											key={item.id}
											to={`/modal/${item.id}`}
											state={{
												background: location,
											}}
										>
											<div
												className="card"
												draggable={true}
												onDragStart={(e) =>
													dragStartHandler(e, board, item)
												}
												onDragLeave={(e) => dragLeaveHandler(e)}
												onDragEnd={(e) => dragEndHandler(e)}
												onDragOver={(e) => dragOverHandler(e)}
												onDrop={(e) => dropHandler(e, item, board)}
											>
												<div className="card__title">{item.title}</div>
												<svg
												className="card-remove"
													style={{ justifySelf: "right" }}
													onClick={(e) =>
														removeCardHandler(e, item.id, board.id)
													}
													xmlns="http://www.w3.org/2000/svg"
													height="24"
													width="24"
													fill="#fff"
												>
													<path d="M5 13v-2h14v2Z" />
												</svg>
											</div>
										</Link>
									))
								)}
							</div>
							<CardCreator bid={board.id} addCardHandler={addCardHandler} />
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Main;
