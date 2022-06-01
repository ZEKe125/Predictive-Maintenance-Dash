import React from "react";

function RobotTableHeader({ width }) {
	const hwidth = window.innerWidth;

	if (width < 420)
		return (
			<thead>
				<tr>
					<th>ID#</th>
					{/* <th>Nickname</th> */}
					<th>Name</th>
					<th>SN#.</th>
					<th>Status</th>
					<th>More..</th>
				</tr>
			</thead>
		);

	return (
		// <Container fluid >
		<thead>
			<tr>
				<th>ID#</th>
				<th>Nickname</th>
				<th>DB-Name</th>
				<th>Serial No.</th>
				<th>Status</th>
				<th>See More..</th>
			</tr>
		</thead>
		// </Container>
	);
}
export default RobotTableHeader;
