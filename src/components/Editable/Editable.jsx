import React, { useState } from "react";

import "./Editable.css";

function Editable(props) {
	const [isEditable, setIsEditable] = useState(false);
	const [inputText, setInputText] = useState(props.defaultValue || "");

	const submission = (e) => {
		e.preventDefault();
		if (inputText && props.onSubmit) {
			setInputText("");
			props.onSubmit(inputText);
		}
		setIsEditable(false);
	};

	return (
		<div className="editable">
			{isEditable ? (
				<form
					className={`editable_edit ${props.editClass ? props.editClass : ""}`}
					onSubmit={submission}
				>
					<input
						type="text"
						value={inputText}
						placeholder={props.placeholder || props.text}
						onChange={(event) => setInputText(event.target.value)}
						autoFocus
					/>
					<div className="editable_edit_footer">
						<button type="submit">{props.buttonText || "Применить"}</button>
						<svg
            fill="#fff"
							onClick={() => setIsEditable(false)}
							className="closeIcon"
							xmlns="http://www.w3.org/2000/svg"
							height="20"
							width="20"
						>
							<path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z" />
						</svg>
					</div>
				</form>
			) : (
				<p
					className={`editable_display ${
						props.displayClass ? props.displayClass : ""
					}`}
					onClick={() => setIsEditable(true)}
				>
					{props.text}
				</p>
			)}
		</div>
	);
}

export default Editable;
