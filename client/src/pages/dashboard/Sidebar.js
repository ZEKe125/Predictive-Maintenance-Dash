import React from "react";
import { Nav, Container, Stack } from "react-bootstrap";

// import { Nav, Col, Row } from "react-bootstrap";

// TODO: - Make this generic for both robot page and dashboard

class SideBar extends React.Component {
	render() {
		return (
			<Container className="sidebar-col bg-dark">
				{/* <h3>Sidebar</h3> */}
				<Nav
					defaultActiveKey="/dashboard"
					// onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
					variant="pills">
					<Stack className="text-white">
						<Nav.Item>
							<Nav.Link className="text-white" href="/dashboard">
								My Dashboard
							</Nav.Link>
						</Nav.Item>
						{/* <Nav.Item>
							<Nav.Link className="text-white" href="#">
								My Fleet
							</Nav.Link>
						</Nav.Item> */}
						{/* <Nav.Item>
							<Nav.Link className="text-white" href="#">
								Alerts
							</Nav.Link>
						</Nav.Item> */}
					</Stack>
				</Nav>
			</Container>
		);
	}
}

export default SideBar;
