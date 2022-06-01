import React, { useState, useEffect } from "react";
import {  Tabs, Tab } from "react-bootstrap";


import SingleUnitTab from "./SingleUnitTab";

function ControlledTabs(props) {
	const [robotID, setRobotID] = useState(props.robotID);

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
				<h1> Please wait some time.... </h1>{" "}
			</div>
		);

	return (
        
		<Tabs
			id="controlled-tab-example"
			activeKey={robotID}
			onSelect={(eventKey) => setRobotID(eventKey)}
			className="mb-3">
				
			{/* <Tab eventKey="home" title="Dashboard">
				<DashboardTab/>
			</Tab> */}

				<Tab
					key={robotID}
					eventKey={robotID}
					title={`Robot${robotID}`}>
					<SingleUnitTab robotID={robotID} name={"Rando name"} />
				</Tab>
		</Tabs>
	);
}

export default ControlledTabs;
