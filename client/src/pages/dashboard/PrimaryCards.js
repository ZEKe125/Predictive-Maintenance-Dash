import React from "react";
import { Row } from "react-bootstrap";
import { SingleValCard } from "../../components/index";

function PrimaryCards(props) {
	return (
		<Row className="">
			<SingleValCard
				val={props.online}
				variant={"success"}
				name={"Units Online"}
				desc={5}
			/>

			<SingleValCard
				val={props.soft}
				variant={"warning"}
				name={"Units w/ SoftAlert"}
				desc={5}
			/>

			<SingleValCard
				val={props.hard}
				variant={"danger"}
				name={"Units w/ HardAlert"}
				desc={5}
			/>

			<SingleValCard
				val={props.offline}
				variant={"secondary"}
				name={"Units Offline"}
				desc={5}
			/>
		</Row>
	);
}

export default PrimaryCards;
