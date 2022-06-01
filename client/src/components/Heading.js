import React, { useState } from "react";
import Clock from "./Clock";
import StatusBadge from "./StatusBadge";

/*
    Heading Component
    
    When called with a 'page' argument, this component passes it as 
    'props.page' and checks it against the switch statement. This will 
    render the heading corresponding to the currently viewed page.
    For use in a new page, add a new 'case' in the switch statement.

    Usage examples:
        - Dashboard.js:
            <Heading 
                page={"dashboard"}
            />
        - SingleUnit.js:
            <Heading
                page={"singleunit"}
                unitName={props.name}
                serial={props.serial}
            />
*/
function Heading({ page, unitName, status, serial, model, workCell }) {
	var title;

	switch (page) {
		case "dashboard":
			title = "SCARA Dashboard";
			return (
				<div className="heading">
					{/* Padding top and bottom */}
					<h1>{title}</h1>
					<h3>Predictive Maintenance</h3>
					<Clock />
				</div>
			);

		case "singleunit":
			title = "Unit " + unitName;
			return (
				<div className="heading">
					{/* Padding top and bottom */}
					<h2>
						{title} | <StatusBadge status={status} />
					</h2>
					<h4>
						S/N: {serial} | | Model: {model} | | WorkCell: {workCell}{" "}
					</h4>
					<Clock />
				</div>
			);

		default:
			title = "Default Heading title";
			return (
				<div className="heading">
					{/* Padding top and bottom */}
					<h2>{this.title}</h2>
					<Clock />
				</div>
			);
	}
}

export default Heading;
