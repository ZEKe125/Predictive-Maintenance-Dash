import React from "react";
import { Col, Card, Spinner } from "react-bootstrap";
import { ThemeContext } from "../../App";
import "./SingleValCard.css";

function SingleValCard({ name, val, variant, desc }) {
	const width = window.innerWidth;

	if (width < 420)
		return (
			<ThemeContext.Consumer>
				{(value) => (
					<Col // breakpoints for responsive design
						xs={6}
						md={6}
						lg={3}
						xl={3}>
						<Card className="mb-3 h-32" border={variant} id={value.theme}>
							<Card.Body id={value.theme}>
								<h1>
									{val} <Spinner size="sm" animation="grow" variant={variant} />
								</h1>
								<h6>{name}</h6>
							</Card.Body>
							<Card.Footer>
								{/* <small className="text-muted">Last updated: {desc}min.</small> */}
							</Card.Footer>
						</Card>
					</Col>
				)}
			</ThemeContext.Consumer>
		);

	return (
		<ThemeContext.Consumer>
			{(value) => (
				<Col // breakpoints for responsive design
					xs={6}
					md={6}
					lg={3}
					xl={3}>
					<Card className="mb-2 h-48" border={variant} id={value.theme}>
						<Card.Body>
							<h1>
								{val} <Spinner size="sm" animation="grow" variant={variant} />
							</h1>
							<Card.Title>{name}</Card.Title>
							{/* <Card.Text>{props.desc}</Card.Text> */}
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">Last updated: {desc}min.</small>
						</Card.Footer>
					</Card>
				</Col>
			)}
		</ThemeContext.Consumer>
	);
}

export default SingleValCard;
