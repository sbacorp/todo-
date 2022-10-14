import { Routes, Route, useLocation } from "react-router-dom";
import ItemPreview from "./Pages/CardInfo";
import Main from "./Pages/Main";
import React from "react";
import {StoreContext} from "./utils/store";

function App() {

	const {
		boards, setBoards
	} = React.useContext(StoreContext)
	window.addEventListener('storage', ()=>{
		setTimeout(() => {
			setBoards(JSON.parse(localStorage.getItem("boards")) || []);
		}, 500);

	})
	const location = useLocation();
	const background = location.state && location.state.background;


	React.useEffect(() => {
		localStorage.setItem("boards", JSON.stringify(boards));
	}, [boards]);



	return (
		<div className="App">
			<Routes location={background || location}>
				<Route
					path="/"
					element={<Main />}
				>
					<Route
						path="modal/:id"
						element={<ItemPreview />}
					/>
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route
						path="modal/:id"
						element={<ItemPreview />}
					/>
				</Routes>
			)}
		</div>
	);
}

export default App;
