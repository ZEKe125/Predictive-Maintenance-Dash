import React from "react";
import { Col } from "react-bootstrap";
// import OffCanvasNavBar from "../../components/OffCanvasNavBar";
import SideBar from "./SingleUnitSidebar";
import SingleUnitTab from "./SingleUnitTab";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../App";

// Page for individual
function TabControlledSingleUnit() {
	const location = useLocation();
	const { robotID, robotName } = location.state;
	return (
		<div>
			{/* <OffCanvasNavBar /> */}

			<Col>
				<SideBar />
			</Col>
			<ThemeContext.Consumer>
				{(value) => (
					<Col className="main" id={value.theme}>
						<SingleUnitTab robotID={robotID} name={robotName} />
					</Col>
				)}
			</ThemeContext.Consumer>
		</div>
	);
}

export default TabControlledSingleUnit;
