import React, { useState, useEffect } from "react";
import {
	Nav,
	Button,
	Form,
	Col,
	Collapse,
	Row,
	Container,
	Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function SideBar() {
	const [open, setOpen] = useState(false);
	const [selectedChartSettings, setSelectedChartSettings] = useState([]);

	// This will update the boolean value to true/false when checking box
	const onChangeChartSettings = (event) => {
		const newSelectedItems = [...selectedChartSettings];
		newSelectedItems.forEach((item) => {
			if (item.value === event.target.value) {
				if (item.defaultChecked) {
					item.defaultChecked = false;
				} else {
					item.defaultChecked = true;
				}
			}
		});
		setSelectedChartSettings(newSelectedItems);
	};

	useEffect(() => {
		const storedCheckbox = JSON.parse(localStorage.getItem("tabs"));
		if (storedCheckbox === null) {
			// This will trigger useEffect with dependency and will be added to local storage
			const initialCheckbox = [
				{ defaultChecked: true, value: "PkVel", label: "Peak Velocity" },
				{ defaultChecked: false, value: "DutyCyc", label: "Duty Cycle" },
				{ defaultChecked: false, value: "AmpTemp", label: "Amp Temperature" },
				{ defaultChecked: false, value: "EncTemp", label: "Enc Temperature" },
				{
					defaultChecked: false,
					value: "BaseBoardTemp",
					label: "Base Board Temperature",
				},
				{ defaultChecked: false, value: "ActTor", label: "Act Torque" },
				{ defaultChecked: false, value: "PkTor", label: "Peak Torque" },
				{ defaultChecked: false, value: "AC230V", label: "AC 230V" },
				{ defaultChecked: false, value: "DC24V", label: "DC 24V" },
				{
					defaultChecked: false,
					value: "HighVoltDC",
					label: "High Voltage DC",
				},
				{
					defaultChecked: false,
					value: "PkPosErr",
					label: "Peak Position Error",
				},
			];
			setSelectedChartSettings(initialCheckbox);
		} else {
			// When there is already settings on localStorage updae selectedChartSettings
			const storedCheckbox = JSON.parse(localStorage.getItem("tabs"));
			setSelectedChartSettings(storedCheckbox);
		}
	}, []);

	// This will capture changes in chart settings and update localStorage
	useEffect(() => {
		localStorage.removeItem("tabs");
		localStorage.setItem("tabs", JSON.stringify(selectedChartSettings));
		const openTabs = [];
		selectedChartSettings.forEach((item) => {
			if (item.defaultChecked) openTabs.push(item);
		});
		// Need to communicate chart settings to other components (SingleUnitTab)
		const event = new Event("changeStorage");
		window.dispatchEvent(event);
	}, [selectedChartSettings]);

	return (
		<Container className="sidebar-col bg-dark">
			{/* <h3>Sidebar</h3> */}
			<Nav
				defaultActiveKey="/single"
				onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
				variant="pills">
				<Stack className="text-white">
					<Nav.Item>
						<Nav.Link className="text-white" href="/dashboard">
							My Dashboard
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link className="text-white" href="/single">
							My Fleet
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link className="text-white" href="#">
							Alerts
						</Nav.Link>
					</Nav.Item>
				</Stack>
			</Nav>
			<Button
				onClick={() => setOpen(!open)}
				aria-controls="example-collapse-text"
				aria-expanded={open}>
				Chart Settings
			</Button>
			<hr />
			<Stack className="text-white">
				<Collapse in={open}>
					<Form.Group active="/home" onChange={onChangeChartSettings}>
						{selectedChartSettings.map((item) => (
							<Form.Check
								type="checkbox"
								value={item.value}
								key={item.value}
								defaultChecked={item.defaultChecked}
								label={item.label}
							/>
						))}
					</Form.Group>
				</Collapse>
			</Stack>
		</Container>
	);
}

export default SideBar;
