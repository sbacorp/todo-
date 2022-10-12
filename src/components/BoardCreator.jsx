import React from 'react'

function Form({boards, setBoards}) {

	const [value, setValue] = React.useState('')
	const addboardHandler = (name) => {
		
		const tempBoards = [...boards];
		tempBoards.push({
			id: Math.floor(Date.now() + Math.random()),
			title: name,
			items: [],
		});
		setBoards(tempBoards);
		setValue('');
	};
  return (
		<div className="form">
			<h2 className="form__title">Создать доску</h2>
			<input
				onKeyPress={(e) => {value.trim().length && e.key === "Enter" && addboardHandler(value);}}
				className="form__input"
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="введите название доски"
			/>
			<button
				onClick={() => {
					value.trim().length && addboardHandler(value);
				}}
				className="form__button"
			>
				Подтвердить
			</button>
		</div>
	);
}

export default Form