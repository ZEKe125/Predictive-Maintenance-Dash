import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import SideBar from "./Sidebar"; // TODO: - Turn generic
import { Heading, RobotTable, DismissableAlert } from "../../components/index";
import { PrimaryCards, MaintenanceDeck } from "./index";
import { ThemeContext } from "../../App";

// Page for dashboard

// Must haves:
// - navbar w/ logo and menu to log out
// - title caption
// - reusable Components with single-value numbers (title and number)
// - reusable Components with graphical data (title and graph)
// - Component with fleet list view

function Dashboard() {
	const [fleetData, setFleetData] = useState([]);
	const [DataLoaded, setDataLoaded] = useState(false);

	var offline = 0;
	var online = 0;
	var hardAlert = 0;
	var softAlert = 0;

	var alert = false;

	const getData = () => {
		fetch("/api/robot/fleet")
			.then((res) => res.json())
			.then((res) => {
				//console.log(res);
				setFleetData(res);
				setDataLoaded(true);
			});
	};

	var robots = fleetData.robots;
	// console.log(fleetData.robots);

	function robotCount() {
		// console.log("refreshCount");
		for (let i = 0; i < robots.length; i++) {
			if (robots[i].status === "offline") {
				offline = offline + 1;
			}
			if (robots[i].status === "online") {
				online = online + 1;
			}
			if (robots[i].status === "softAlert") {
				softAlert = softAlert + 1;
				alert = true;
			}
			if (robots[i].status === "hardAlert") {
				hardAlert = hardAlert + 1;
				alert = true;
			}
		}
	}

	useEffect(() => {
		getData();
	}, []);

	if (!DataLoaded) {
		return (
			<div>
				<h1> Pleses wait some time.... </h1>{" "}
			</div>
		);
	}

	robotCount();

	return (
		<ThemeContext.Consumer>
			{(value) => (
				<div className="Dashboard">
					{robotCount}
					{/* <OffCanvasNavBar /> */}

					<Col>
						<SideBar />
					</Col>

					{/* <Container> */}
					<Col className="main" id={value.theme}>
						<Row>
							<Col>
								<Heading page={"dashboard"} />
							</Col>
						</Row>
						<hr />
						<DismissableAlert alert={alert} />
						<hr />
						<PrimaryCards
							online={online}
							offline={offline}
							soft={softAlert}
							hard={hardAlert}
						/>
						{/* <hr /> */}
						<RobotTable />
						{/* <hr></hr> */}
						<MaintenanceDeck />
					</Col>
					{/* </Container> */}
				</div>
			)}
		</ThemeContext.Consumer>
	);
}

export default Dashboard;
