import React from "react";
import { Badge } from "react-bootstrap";

function StatusBadge({ status = "danger" }) {
	switch (status) {
		case "online":
			return (
				<Badge pill bg="success">
					online
				</Badge>
			);

		case "softAlert":
			return (
				<Badge pill bg="warning">
					ALERT
				</Badge>
			);

		case "hardAlert":
			return (
				<Badge pill bg="danger">
					ALERT
				</Badge>
			);

		default:
			return (
				<Badge pill bg="secondary">
					offline
				</Badge>
			);
	}
}

export default StatusBadge;
