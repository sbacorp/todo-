import React from 'react'

function CardCreator({ addCardHandler , bid}) {
	const [value, setValue] = React.useState("");
	return (
		<div className="card__creator">
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="creator__input"
				type="text"
				placeholder="название задачи"
			/>
			<button
				onClick={(e) => {
					value.trim().length && addCardHandler(bid, value); setValue('')
				}} 
				className="creator__button"
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="31" width="31">
					<path
						d="M10.675 19.35V13.3h-6.05v-2.65h6.05V4.6h2.65v6.05h6.05v2.65h-6.05v6.05Z"
						fill="#fff"
					/>
				</svg>
			</button>
		</div>
	);
}

export default CardCreator