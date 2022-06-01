import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import "./DismissableAlert.css";

function DismissableAlert({ alert = false, numAlerts }) {
	const [show, setShow] = useState(true);

	if (alert) {
		if (show) {
			return (
				<div className="justify-content-end mx-1 my-1">
					<Alert variant="danger" onClose={() => setShow(false)} dismissible>
						<Alert.Heading>Oh snap! You got {numAlerts} Alerts!</Alert.Heading>
						<p>See Robot Fleet for Details</p>
					</Alert>
				</div>
			);
		}
		return (
			<Button variant="danger" onClick={() => setShow(true)}>
				Alerts
			</Button>
		);
	}

	return <Button variant="success">No Alerts</Button>;
}

export default DismissableAlert;
