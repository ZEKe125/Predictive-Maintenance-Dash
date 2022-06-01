import React from "react";
import { Form } from "react-bootstrap";

// We used selected items for multilinechart
function Legend({ data, selectedItem, onChange }) {
	var width = window.innerWidth;
	if (width < 420)
		return (
			<Form>
				<div key={`inline-radio`} className="font-thin ">
					{data.map((d, index) => (
						<Form.Check
							inline
							label={d.label}
							value={d.value}
							name="group1"
							type="radio"
							onChange={() => onChange(d.value)}
							key={d.value}
							id={`inline-radio-${index + 1}`}
							checked={d.value === selectedItem}
						/>
					))}
				</div>
			</Form>
		);

	return (
		<Form>
			<div key={`inline-radio`} className="mb-1 mx-0">
				{data.map((d, index) => (
					<Form.Check
						inline
						label={d.label}
						value={d.value}
						name="group1"
						type="switch"
						onChange={() => onChange(d.value)}
						key={d.value}
						id={`inline-radio-${index + 1}`}
						checked={d.value === selectedItem}
					/>
				))}
			</div>
		</Form>
	);
}

export default Legend;
