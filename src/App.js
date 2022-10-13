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



	return (
		<div className="App">
			<Routes location={background || location}>
				<Route
					path="/"
					element={<Main boards={boards} setBoards={setBoards} />}
				>
					<Route
						path="modal/:id"
						element={<ItemPreview boards={boards} setBoards={setBoards} />}
					/>
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route
						path="modal/:id"
						element={<ItemPreview setBoards={setBoards} boards={boards} />}
					/>
				</Routes>
			)}
		</div>
	);
}

export default App;
