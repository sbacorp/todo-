import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editable from "../components/Editable/Editable";
import "./CardInfo.css";
import {StoreContext} from "../utils/store";

function CardInfo() {
	const {
		boards, setBoards
	} = React.useContext(StoreContext)
	const navigate = useNavigate();
	const { id } = useParams();

	const board = boards.find((obj) => {
		return obj.items.find((item) => item.id === Number(id));
	});


	const card = board.items.find((item) => {
		return item.id === Number(id);
	});

	const [values, setValues] = React.useState(card);

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


	const updateTitle = (value) => {
		setValues({ ...values, title: value });
	};
	const updateDesc = (value) => {
		setValues({ ...values, desc: value });
	};
	const addTask = (value) => {
		const task = {
			id: Date.now() + Math.random() * 2,
			completed: false,
			text: value,
		};
		setValues({
			...values,
			tasks: [...values.tasks, task],
		});
	};

	const removeTask = (id) => {
		const tasks = [...values.tasks];

		const tempTasks = tasks.filter((item) => item.id !== id);
		setValues({
			...values,
			tasks: tempTasks,
		});
	};
	const updateTask = (id, value) => {
		const tasks = [...values.tasks];

		const index = tasks.findIndex((item) => item.id === id);
		if (index < 0) return;

		tasks[index].completed = value;

		setValues({
			...values,
			tasks,
		});
	};
	React.useEffect(() => {
		updateCard(board.id, values.id, values);
	}, [values]);


	return (
		<div className="cardPreview">
			<div className="cardInfo__modal">
				<button className="cardPreview__close" onClick={() => navigate(-1)}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
						<path
							fill="#fff"
							d="M6.35 20.025 4 17.65 9.625 12 4 6.35l2.35-2.4L12 9.6l5.65-5.65L20 6.35 14.375 12 20 17.65l-2.35 2.375-5.65-5.65Z"
						/>
					</svg>
				</button>
				<div className="cardInfo__box">
					<div className="cardInfo_box_title">
						<p>Название</p>
					</div>
					<Editable
						defaultValue={values.title}
						text={values.title}
						placeholder="Введите название"
						onSubmit={updateTitle}
					/>
				</div>
				<div className="cardInfo_box">
					<div className="cardInfo_box_title">
						<p>Описание</p>
					</div>
					<Editable
						defaultValue={values.desc}
						text={values.desc || "Добавить описание"}
						placeholder="Введите описание"
						onSubmit={updateDesc}
					/>
				</div>
				<div className="cardInfo_box">
					<div className="cardInfo_box_title">
						<p>Пункты</p>
					</div>
					<div className="cardInfo_box_task_list">
						{values.tasks?.map((item) => (
							<div key={item.id} className="cardInfo_box_task_checkbox">
								<input
									type="checkbox"
									defaultChecked={item.completed}
									onChange={(event) =>
										updateTask(item.id, event.target.checked)
									}
								/>
								<p style={{maxWidth: '70%', display:"block"}} className={item.completed ? "completed" +
									" ellipsis" : "ellipsis"}>{item.text}</p>
								<svg

									onClick={() => removeTask(item.id)}
									xmlns="http://www.w3.org/2000/svg"
									height="20"
									width="20"
									fill="#fff"
								>
									<path d="M5 10.75v-1.5h10v1.5Z" />
								</svg>
							</div>
						))}
					</div>
					<Editable
						text={"Добавить пункт"}
						placeholder="Название пункта"
						onSubmit={addTask}
					/>
				</div>
			</div>
		</div>
	);
}

export default CardInfo;
