import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
	Form,
	Card,
	Container,
	FloatingLabel,
	Col,
	Row,
} from "react-bootstrap";
import Omronlogo from "../../assets/img/omron0.png";
import "./Register.css";

// Login Page

// Features

// - Omron logo
// - Centered on page
// - Enter username and password
// - Button connects with backend to authenticate signing in

function Register() {
	let navigate = useNavigate();

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const [employeeID, setEmployeeID] = useState();

	const onSubmitClick = (e) => {
		e.preventDefault();
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				employeeID: employeeID,
				email: email,
				username: username,
				password: password,
			}),
		};

		fetch("/api/user/auth/login", opts)
			.then((resp) => {
				if (resp.status == 200) navigate("../dashboard");
				else alert("Invalid username or password");
				console.log(resp);
			})
			.then((msg) => {
				console.log("Backend says hi", msg);
			})
			.catch((error) => {
				console.log("Error in the call!", error);
			});
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handleEmployeeIDChange = (e) => {
		setEmployeeID(e.target.value);
	};

	// "./omronlogin.png",

	return (
		<Container className="login" fluid>
			<Row>
				<Col className="right">
					<img
						src={Omronlogo}
						alt="omrom logo"
						width="300"
						className="m-auto"
					/>
					<div style={{ height: "70px" }}> </div>

					<Card className="infoCard">
						<Card.Title className="mt-4 mx-auto">
							<h2>Register</h2>
						</Card.Title>
						<Card.Body>
							<Form>
								<Row className="mb-3">
									<Form.Group as={Col} controlId="formGridUser">
										<FloatingLabel
											controlId="floatingUsername"
											label="New Username"
											className="mb-3"
										>
											<Form.Control
												type="username"
												placeholder="New Username"
												value={username}
												onChange={handleUsernameChange}
											/>
										</FloatingLabel>	
									</Form.Group>

									<Form.Group as={Col} controlId="formGridPassword">
										<FloatingLabel
											controlId="floatingPassword"
											label="New Password"
											className="mb-3"
										>
											<Form.Control
												type="password"
												placeholder="New Password"
												value={password}
												onChange={handlePasswordChange}
											/>
										</FloatingLabel>	
									</Form.Group>
								</Row>

								<Row className="mb-3">
									<Form.Group as={Col} controlId="formGridEmail">
										<FloatingLabel
											controlId="floatingEmail"
											label="Email"
											className="mb-3"
										>
											<Form.Control
												type="email"
												placeholder="Enter Email"
												value={email}
												onChange={handleEmailChange}
											/>
										</FloatingLabel>	
									</Form.Group>
									<Form.Group as={Col} controlId="formGridEmployeeID">
										<FloatingLabel
											controlId="floatingEmployeeID"
											label="Employee ID#"
											className="mb-3"
										>
											<Form.Control
												type="username"
												placeholder="Employee ID#"
												value={employeeID}
												onChange={handleEmployeeIDChange}
											/>
										</FloatingLabel>	
									</Form.Group>
								</Row>

								{/*
								<Form.Group className="mb-3" id="formGridCheckbox">
									<Form.Check type="checkbox" label="hi" />
								</Form.Group>
								*/}

								<Button
									variant="primary"
									className="btnFormSend"
									onClick={onSubmitClick}
									type="submit">
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Register;
