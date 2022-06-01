// import React, { useState, useEffect } from "react";
// import {
// 	Col,
// 	Row,
// 	Container,
// 	Stack,
// 	Button,
// 	// Badge,
// 	// Accordion,
// 	// Ratio
// } from "react-bootstrap";
// import OffCanvasNavBar from "../resources/OffCanvasNavBar";
// // import Clock from "../resources/Clock";
// import SingleValCard from "../resources/SingleValCard";
// import SideBar from "../singleTabs/SingleUnitSidebar";
// import GenericTable from "../resources/GenericTable";
// import { Link } from "react-router-dom";
// import Heading from "../resources/Heading";
// import UnitAccordion from "./UnitAccordion";
// import DismissableAlert from "../dashboard/DismissableAlert";
// // import ControlledTabs from "./ControlledTabs";
// // import omron from "../resources/omron.svg"
// // import { ReactComponent as Omron1 } from "../resources/omron.svg"
// // import Omron3 from "../resources/omron3.png"

// // Page for individual

// function SingleUnit(props) {
// 	// const [fleetData, setFleetData] = useState([]);
// 	// const [DataLoaded, setDataLoaded] = useState(false);

// 	// UNIT endpoint not working
// 	const [UnitData, setUnitData] = useState([]);
// 	const [UnitDataLoaded, setUnitDataLoaded] = useState(false);

// 	// const getFleetData = () => {
// 	// 	fetch("/api/robot/fleet")
// 	// 		.then((res) => res.json())
// 	// 		.then((res) => {
// 	// 			console.log(res);
// 	// 			setFleetData(res);
// 	// 			setDataLoaded(true);
// 	// 		});
// 	// };

// 	const getUnitData = () => {
// 		fetch(`/api/robot/${props.id}`)
// 			.then((res) => res.json())
// 			.then((res) => {
// 				console.log(res);
// 				setUnitData(res);
// 				setUnitDataLoaded(true);
// 			});
// 	};

// 	// {
// 	// 	"fleet_id": 1,
// 	// 	"fleet_name": "Fleet#1",
// 	// 	"robots": [
// 	// 	  {
// 	// 		"robot_id": 1,
// 	// 		"robot_name": "Robot1",
// 	// 		"serial_number": "571-32301",
// 	// 		"status": "offline"
// 	// 	  },
// 	// 	  {
// 	// 		"robot_id": 2,
// 	// 		"robot_name": "Robot2",
// 	// 		"serial_number": "577-159",
// 	// 		"status": "offline"
// 	// 	  }
// 	// 	]
// 	//   }

// 	// useEffect(() => {
// 	// 	getFleetData();
// 	// }, []);

// 	useEffect(() => {
// 		getUnitData();
// 	}, );

// 	if ( !UnitDataLoaded)
// 		return (
// 			<div>
// 				<h1> Pleses wait some time.... </h1>{" "}
// 			</div>
// 		);

// 	var AlertOn = "false";
// 	if (UnitData.status !== "online") {
// 		AlertOn = "true";
// 	}

// 	return (
// 		<Stack>
// 			<OffCanvasNavBar />

// 			<Container fluid>
// 				<Row className="flex-nowrap">
// 					<SideBar />
// 					<Container className="col py-3">
// 						{/* Back to Dashboard Button */}
// 						<Row>
// 							<Col>
// 								{/* <Button><Omron1 width= "7rem" height= "4rem" /></Button> */}
// 								<Link to="/dashboard">
// 									<Button>Back to Dashboard</Button>
// 								</Link>
// 							</Col>
// 						</Row>
// 						<hr></hr>

// 						{/* Intro title */}
// 						<Row>
// 							<Col>
// 								<Heading
// 									page={"singleunit"}
// 									unitName={props.name}
// 									status={UnitData.status}
// 									//make this dynamic with Unit data Once it works
// 									serial={UnitData.ro_serialNumber}
// 									model={UnitData.rm_name}
// 									workCell={UnitData.ro_workcell}
// 								/>
// 							</Col>
// 							<Col>
// 								<DismissableAlert alert={AlertOn} />
// 							</Col>
// 						</Row>
// 						<hr></hr>

// 						{/* Row of SingleValCards to display TBD metrics */}
// 						<Row>
// 							<Col>
// 								<SingleValCard val="1" name="Temp. F" variant />
// 							</Col>
// 							<Col>
// 								<SingleValCard val="2" name="Torque" variant />
// 							</Col>
// 							<Col>
// 								<SingleValCard val="3" name="Quan-tity" variant />
// 							</Col>
// 							<Col>
// 								<SingleValCard val="4" name="Quantity2 " variant />
// 							</Col>
// 						</Row>

// 						<hr></hr>

// 						{/* two GenericTable to display info */}
// 						<Row>
// 							<Col>
// 								<GenericTable
// 									title="Unit Recommended Maintenance"
// 									purpose="Maintanance"
// 								/>
// 							</Col>

// 							<Col>
// 								<GenericTable
// 									title="Unit Maintenance Log"
// 									purpose="Maintanance"
// 								/>
// 							</Col>
// 						</Row>

// 						<hr></hr>

// 						<UnitAccordion defaults="" id="" />
// 					</Container>
// 				</Row>
// 			</Container>
// 		</Stack>
// 	);
// }

// export default SingleUnit;
