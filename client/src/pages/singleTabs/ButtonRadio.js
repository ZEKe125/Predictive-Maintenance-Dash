import { ButtonGroup, Row, ToggleButton } from "react-bootstrap";

import React from "react";

function ButtonRadio({ openTabs, radioValue, onChange }) {
	var width = window.innerWidth;
	// console.log(width);
	// console.log(openTabs.legth);

	var first = null;
	var second = null;
	var third = null;

	if (width < 420) {
		first = openTabs.slice(0, 4);
		second = openTabs.slice(4, 8);
		third = openTabs.slice(8);

		return (
			<>
				{/* <Row> */}
				<ButtonGroup className="mb-2">
					{first.map((item, index) => (
						<ToggleButton
							className="w-1/4 "
							key={index + 1}
							id={`btn-${index + 1}`}
							type="radio"
							variant={"outline-primary"}
							value={item.value}
							checked={radioValue === item.value}
							size="sm"
							onChange={onChange}>
							<small>{item.label}</small>
						</ToggleButton>
					))}
				</ButtonGroup>
				{/* </Row> */}
				<ButtonGroup className=" mb-2">
					{second.map((item, index) => (
						<ToggleButton
							className="w-1/4"
							key={index + 1 + 4}
							id={`btn-${index + 1 + 4}`}
							type="radio"
							variant={"outline-primary"}
							value={item.value}
							checked={radioValue === item.value}
							size="sm"
							onChange={onChange}>
							<small>{item.label}</small>
						</ToggleButton>
					))}
				</ButtonGroup>
				<ButtonGroup className="mb-2">
					{third.map((item, index) => (
						<ToggleButton
							className="w-1/4"
							key={index + 1 + 8}
							id={`btn-${index + 1 + 8}`}
							type="radio"
							variant={"outline-primary"}
							value={item.value}
							checked={radioValue === item.value}
							size="sm"
							onChange={onChange}>
							<small>{item.label}</small>
						</ToggleButton>
					))}
				</ButtonGroup>
			</>
		);
	}

	return (
		<ButtonGroup>
			{openTabs.map((item, index) => (
				<ToggleButton
					key={index + 1}
					id={`btn-${index + 1}`}
					type="radio"
					variant={"outline-primary"}
					value={item.value}
					checked={radioValue === item.value}
					onChange={onChange}>
					{item.label}
				</ToggleButton>
			))}
		</ButtonGroup>
	);
}

export default ButtonRadio;
