import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import RobotTableHeader from "./RobotTableHeader";
import RobotTableRow from "./RobotTableRow";
import { ThemeContext } from "../../App";

function RobotTable() {
	const width = window.innerWidth;
	const [fleetData, setFleetData] = useState([]);
	const [DataLoaded, setDataLoaded] = useState(false);

	const getData = () => {
		fetch("/api/robot/fleet")
			.then((res) => res.json())
			.then((res) => {
				setFleetData(res);
				setDataLoaded(true);
			});
	};

	var nickNames = ["Rusty", "BumbleBee", "Optimus", "Megatron"];

	useEffect(() => {
		getData();
	}, []);

	if (!DataLoaded)
		return (
			<div>
				<h1> Pleses wait some time.... </h1>{" "}
			</div>
		);

	return (
		<ThemeContext.Consumer>
			{(value) => (
				<Container
					fluid
					className="
			py-3 
			px-1
	">
					<h4>Robot Fleet ID#: {fleetData.fleet_id} </h4>
					<Table striped bordered hover responsive="sm" variant={value.theme}>
						<RobotTableHeader width={width} />
						<tbody>
							{fleetData.robots.map((robot, i) => (
								<RobotTableRow
									key={`robot-row-${i}`}
									robotID={robot.robot_id}
									nickname={nickNames[i]}
									name={robot.robot_name}
									serial={robot.robot_id}
									status={robot.status}
									width={width}
								/>
							))}
						</tbody>
					</Table>
				</Container>
			)}
		</ThemeContext.Consumer>
	);
}
export default RobotTable;
export { RobotTableHeader, RobotTableRow };
