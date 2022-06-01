import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, ButtonGroup, Alert } from "react-bootstrap";
import {
	Heading,
	GenericTable,
	DismissableAlert
} from "../../components/index";

import { Link } from "react-router-dom";
import LineChart from "../../components/LineChart/LineChart";
import Legend from "../../components/Legend/Legend";
import ButtonRadio from "./ButtonRadio";
import "./SingleUnit.css";

// Page for individual robot

function SingleUnitTab({ robotID, name }) {
	// UNIT endpoint not working
	const [UnitData, setUnitData] = useState([]);
	const [UnitDataLoaded, setUnitDataLoaded] = useState(false);

	// useState variables used for the LineChart component
	const [legendData, setLegendData] = useState([]);
	const [selectedItem, setSelectedItem] = useState("Ax1");
	const [chartData, setChartData] = useState([]);
	const [limitsData, setLimitsData] = useState([]);
	const [predictData, setPredictData] = useState([]);
	// const [alertsData, setAlertsData] = useState([]);

	//manages svg scale for mobile view
	var scale = 1;
	var marginScale = 1;

	scale = 0.7 * (window.innerWidth / 800);
	marginScale = scale * 0.5;

	if (window.innerWidth < 420) {
		scale = 0.96 * (window.innerWidth / 800);
		marginScale = scale;
	}

	if (window.innerWidth > 1000) {
		scale = 0.6 * (window.innerWidth / 800);
		marginScale = scale * 0.8;
	}

	const [chartDimensions, setChartDimensions] = useState({
		width: 750 * scale,
		height: 400 * scale,
		margin: {
			top: 10 * marginScale,
			right: 50 * marginScale,
			bottom: 50 * marginScale,
			left: 75 * marginScale,
		},
	});

	// Tabs/buttons open
	const [openTabs, setOpenTabs] = useState([]);
	// Initializes to the last metric in local storage with defaultChecked === true
	const [metricValue, setMetricValue] = useState("PkVel");

	// Timer/clock variables
	const [offset, setOffset] = useState(1)
	const [clock, setClock] = useState(new Date("2021-10-18T01:00:00Z")); // Starting point in database
	const [startDate, setStartDate] = useState("2021-10-17 00:00:00");
	const [endDate, setEndDate] = useState("2021-10-18 01:00:00");

	//Alert logic
	// const [isVisible, setIsVisible] = useState(true);
	// const [numAlerts, setNumAlerts] = useState(0);

	// Define event handlers here...

	const handleTimeClick = (event) => {
		setOffset(event.target.value);
	};

	// Updates the data to display in chart when click on checkbox
	const onChangeMetricTab = (event) => {
		setMetricValue(event.currentTarget.value);
	};

	// Change on radio for the axis
	const onChangeRadioSelection = (name) => {
		setSelectedItem(name);
	};

	// When chart settings are change update openTabs
	const storageListener = () => {
		const updatedTabs = [];
		const openTabs = JSON.parse(window.localStorage.getItem("tabs"));
		openTabs.forEach((item) => {
			if (item.defaultChecked) updatedTabs.push(item);
		});
		setOpenTabs(updatedTabs);
	};

	var selectTab = () => {
		let openTabs = JSON.parse(localStorage.getItem("tabs"));
		let lastOpenTab = "None";
		openTabs.forEach((item) => {
			if (item.defaultChecked) lastOpenTab = item.value;
		});
		return lastOpenTab;
	};

	// Define fetch functions here...

	// Get the robot details (for static display)
	const getUnitData = () => {
		fetch(`/api/robot/${robotID}`)
			.then((resp) => resp.json())
			.then((data) => {
				setUnitData(data);
				setUnitDataLoaded(true);
				console.log(data)
			});
	};

	const getRobotData = (metric) => {
		// let metric = `${metricValue}${selectedItem}`;
		if (
			["AC230V", "DC24V", "HighVoltDC", "BaseBoardTemp"].includes(metricValue)
		)
			metric = `${metricValue}`;
		fetch(
			`/api/robot/${robotID}/filter?metric=${metric}&start-date=${startDate}&end-date=${endDate}`
		)
			.then((resp) => resp.json())
			.then((data) => {
				const newLegend = data.legend;
				const newData = {
					color: "black",
					items: data.items.map((d) => ({
						value: d.value,
						date: new Date(d.timestamp),
					})),
				};
				// setNumAlerts(data.alerts.length);
				setLegendData(newLegend);
				setChartData([newData]);
				setLimitsData(data.limits);
				// setAlertsData(data.alerts);
			});
	};

	const getRobotPredictions = (metric) => {
		if (
			["AC230V", "DC24V", "HighVoltDC", "BaseBoardTemp"].includes(metricValue)
		)
			metric = `${metricValue}`;
		fetch(`/api/robot/${robotID}/predict/filter?metric=${metric}`)
		.then((resp) => resp.json())
		.then((data) => {
			const newData = {
				color: "blue",
				items: data.predict.map((d) => ({
					value: d.value,
					upper_value: d.upper_value,
					lower_value: d.lower_value,
					date: new Date(d.date)
				}))
			}
			setPredictData(newData)
		})
	}

	// Define useEffects here...

	// Initial render of data
	useEffect(() => {
		getUnitData(); // static display
		selectTab();
		let metric = `${metricValue}${selectedItem}`;
		getRobotData(metric);
		getRobotPredictions();
		window.addEventListener("changeStorage", storageListener);
		storageListener();
		const timer = setInterval(() => {
			setClock(clock.setMinutes(clock.getMinutes() + 10));
		}, 10000);
		return () => clearInterval(timer);
	}, []);

	// Update when checkboxes are marked
	useEffect(() => {
		if (UnitDataLoaded) {
			let metric = `${metricValue}${selectedItem}`;
			getRobotData(metric);
			getRobotPredictions(metric);
		}
	}, [selectedItem, metricValue, startDate]);

	useEffect(() => {
		let currTime = new Date(clock);
		let startTime = new Date(clock);
		startTime = startTime.setHours(startTime.getHours() - offset);
		let newDate = new Date(startTime);
		currTime = currTime.toISOString().replace("T", " ").replace("Z", "");
		newDate = newDate.toISOString().replace("T", " ").replace("Z", "");
		setEndDate(currTime);
		setStartDate(newDate);
	}, [clock, offset]);

	useEffect(() => {
		let metric = `${metricValue}${selectedItem}`;
		getRobotData(metric);
	}, [endDate]);

	if (!UnitDataLoaded)
		return (
			<div>
				<h1> Please wait some time.... </h1>{" "}
			</div>
		);

	var AlertOn = "false";
	if (UnitData.status !== "online") {
		AlertOn = "true";
	}



	return (
		<Container className="py-2 mx-0 px-0">
			{/* Intro title */}
			<Row>
				<Col>
					<Heading
						page={"singleunit"}
						unitName={UnitData.ro_name}
						status={UnitData.ro_status}
						//REMOVED SERIAL NUMBER FOR PRIVACY
						serial={UnitData.ro_serialNumber}
						// serial={UnitData.ro_robotID}
						model={UnitData.rm_name}
						workCell={UnitData.ro_workcell}
					/>
					{/* <DismissableAlert 
						alert={isVisible}
						numAlerts={numAlerts}>
							You have a new alert (x)
					</DismissableAlert> */}
				</Col>
			</Row>
			<hr></hr>
			{/* Back to Dashboard Button */}
			<Row>
				<Col>
					<Link to="/dashboard">
						<Button>Back to Dashboard</Button>
					</Link>
				</Col>
			</Row>

			<hr></hr>

			<ButtonRadio
				openTabs={openTabs}
				radioValue={metricValue}
				onChange={onChangeMetricTab}
			/>

			<hr />
			<Row>
				<Col></Col>
				<Col>
					<div className="chart">
						{openTabs.length && legendData.length && (
						<Legend
							data={legendData}
							selectedItem={selectedItem}
							onChange={onChangeRadioSelection}
						/>
					)}	
					<ButtonGroup aria-label="Basic example" onClick={handleTimeClick}>
						<Button variant="primary" value="1">hr</Button>
						<Button variant="primary" value="24">day</Button>
						<Button variant="primary" value="168">week</Button>
						<Button variant="primary" value="672">month</Button>
						<Button variant="primary" value="8064">year</Button>
					</ButtonGroup>
					{openTabs.length && chartData.length && (
						<LineChart 	data={chartData}
									predict={predictData}
									limits={limitsData}
									dimensions={chartDimensions} 
									startDate={startDate} 
									endDate={endDate}/>
					)}   
					</div>
				</Col>
				<Col></Col>
			</Row>

			<hr></hr>

			{/* two GenericTable to display info */}
			<Row>
				{/* <Col> */}
				{/* <GenericTable title="Unit Alerts" data={alertsData} unit={UnitData} /> */}
				{/* </Col> */}
			</Row>

			<hr></hr>

			{/* <UnitAccordion defaults="" id="" /> */}
		</Container>
	);
}

export default SingleUnitTab;
