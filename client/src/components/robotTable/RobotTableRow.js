import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import StatusBadge from "../StatusBadge";

function RobotTableRow({ robotID, nickname, name, serial, status, width }) {
	if (width < 420)
		return (
			<tr>
				<td>{robotID}</td>
				{/* <td>{nickname}</td> */}

				<td>{name}</td>
				<td>SN#-{serial}</td>
				<td>
					<StatusBadge status={status} />{" "}
				</td>
				<th>
					<Link to={"/single"} state={{ robotID: robotID, robotName: name }}>
						<Button variant="outline-primary" size="sm">
							More
						</Button>
					</Link>
				</th>
			</tr>
		);

	return (
		//  {/* <Table striped bordered hover> */}
		//  {/* id={RobotData1.ro_robotID} serial={RobotData1.ro_SerialNumber}  model={RobotData1.rm_name}  */}
		<tr>
			<td>{robotID}</td>
			<td>{nickname}</td>

			<td>{name}</td>
			<td>SCARA-{serial}</td>
			<td>
				<StatusBadge status={status} />{" "}
			</td>
			<th>
				<Link to={"/single"} state={{ robotID: robotID, robotName: name }}>
					<Button variant="outline-primary" size="sm">
						Details..
					</Button>
				</Link>
			</th>
		</tr>
	);
}
export default RobotTableRow;
