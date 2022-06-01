import React, { useState, useEffect } from "react";
import { Button, Badge, Table, Container, Modal, Form } from "react-bootstrap";
import { ThemeContext } from "../../App";
// import FormModal from "./FormModal";
import "./AlertTable.css";

function FormModal({ unitID, type, date, ...props }) {
	return (
		<ThemeContext.Consumer>
			{(value) => (
				<Modal
					{...props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header id={value.theme} closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Maintenance Entry
						</Modal.Title>
					</Modal.Header>
					<Modal.Body id={value.theme}>
						<h6>RobotID- {unitID}</h6>
						<h6>AlertType- {type}</h6>
						<h6>Date - {date}</h6>
						<hr />
						<Form>
							<Form.Group className="mb-3" controlId="EmployeeName">
								<Form.Label>Employee Name</Form.Label>
								<Form.Control type="name" placeholder="Full Name" autoFocus />
							</Form.Group>
							<Form.Group className="mb-3" controlId="EmployeeName">
								<Form.Label>EmployeeID</Form.Label>
								<Form.Control type="EmployeeID" placeholder="ID#" />
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1">
								<Form.Label>Maintenance Summary</Form.Label>

								<Form.Control as="textarea" rows={3} />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer id={value.theme}>
						<Button onClick={props.onHide}>Close</Button>
					</Modal.Footer>
				</Modal>
			)}
		</ThemeContext.Consumer>
	);
}

function GenericTable({ title, data, unit }) {
	// console.log(title);
	// console.log(data);
	// console.log(unit);

	// const [show, setShow] = useState([]);
	const [modalShow, setModalShow] = useState([]);
	const [tableAlerts, setTableAlerts] = useState([]);

	function addEntry() {
		setModalShow([...modalShow, false]);
	}

	function updateEntry({ key, value }) {
		let temp_state = [...modalShow];
		temp_state[key] = value;
		setModalShow(temp_state);
	}

	// const tableAlerts = data.filter(alert =>
	var found = false;
	useEffect(() => {
		for (let alert in data) {
			found = false;
			for (let tAlert in tableAlerts) {
				if (
					data[alert].type === tableAlerts[tAlert].type &&
					data[alert].value === tableAlerts[tAlert].value
				) {
					found = true;
				}
			}
			if (!found) {
				setTableAlerts((tableAlerts) => [...tableAlerts, data[alert]]);
				addEntry();
			}
			// console.log(tableAlerts);
		}
	}, [data]);

	return (
		<ThemeContext.Consumer>
			{(value) => (
				<Container className="py-3 px-2">
					<h4>{title} </h4>

					<Table striped bordered hover variant={value.theme}>
						<thead>
							<tr>
								<th>Alert#</th>
								<th>unitID</th>
								<th>Type</th>
								<th>Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tableAlerts.map((alert, i) => (
								<tr key={`${i}`}>
									<td>{i + 1}</td>
									<td>{unit.ro_robotID}</td>
									<td>
										{alert.type} val: {alert.value}{" "}
									</td>
									<td>{alert.timestamp}</td>
									<th className="">
										<Button
											key={i}
											className="mx-1"
											variant="primary"
											// onClick={() => setModalShow(true)}
											onClick={() => updateEntry({ key: i, value: true })}
											size="sm">
											Resolve
										</Button>

										<FormModal
											unitID={unit.ro_robotID}
											type={`${alert.type}`}
											date={`${alert.timestamp}`}
											show={modalShow[i]}
											// onHide={() => setModalShow(false)}
											onHide={() => updateEntry({ key: i, value: false })}
										/>

										<Button className="mx-1" variant="danger" size="sm">
											delete
										</Button>
									</th>
								</tr>
							))}
						</tbody>
					</Table>
				</Container>
			)}
		</ThemeContext.Consumer>
	);
}
export default GenericTable;
