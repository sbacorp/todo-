import React from "react";
import { useParams, useNavigate } from "react-router-dom";
function ItemPreview({boards}) {
	const navigate = useNavigate();
	const {id} = useParams();
	const board = boards.find((obj) => {
		return obj.items.find((item) => item.id === Number(id))
	});
	const title = board.items.find((item) => {
		return item.id === Number(id);
	}).title
	return (
		<div className="modalDiv">
			<div className="modal">
				<h1>{title} </h1>
				<button className="modal__close" onClick={() => navigate(-1)}>
					<svg
						
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						width="24"
					>
						<path
							
							d="M6.35 20.025 4 17.65 9.625 12 4 6.35l2.35-2.4L12 9.6l5.65-5.65L20 6.35 14.375 12 20 17.65l-2.35 2.375-5.65-5.65Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default ItemPreview;
