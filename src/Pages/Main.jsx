import React from "react";
import Form from "../components/BoardCreator";
import Board from "../components/Board";
import { StoreContext } from '../utils/store'
function Main() {
	const {
		boards, setBoards
	} = React.useContext(StoreContext)




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
						<Board key={board.id}
							   board={board}

					/>

					))
				)}
			</div>
		</div>
	);
}

export default Main;
