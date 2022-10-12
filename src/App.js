import { Routes, Route, useLocation } from "react-router-dom";
import ItemPreview from "./Pages/CardInfo";
import Main from "./Pages/Main";
import React, { useState } from "react";

function App() {
	window.addEventListener('storage', ()=>{
		setTimeout(() => {
				setBoards(JSON.parse(localStorage.getItem("boards")) || []);	
		}, 500);
		
	})

	const location = useLocation();
	const background = location.state && location.state.background;
	const [boards, setBoards] = useState(
		JSON.parse(localStorage.getItem("boards")) || []
	);

	React.useEffect(() => {
		localStorage.setItem("boards", JSON.stringify(boards));
	}, [boards]);

	const updateCard = (bid, cid, card) => {
		const index = boards.findIndex((item) => item.id === bid);
		if (index < 0) return;

		const tempBoards = [...boards];
		const items = tempBoards[index].items;

		const cardIndex = items.findIndex((item) => item.id === cid);
		if (cardIndex < 0) return;

		tempBoards[index].items[cardIndex] = card;

		setBoards(tempBoards);
	};

	return (
		<div className="App">
			<Routes location={background || location}>
				<Route
					path="/"
					element={<Main boards={boards} setBoards={setBoards} />}
				>
					<Route path="modal/:id" element={<ItemPreview boards={boards} />} />
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route
						path="modal/:id"
						element={<ItemPreview updateCard={updateCard} boards={boards} />}
					/>
				</Routes>
			)}
		</div>
	);
}

export default App;
