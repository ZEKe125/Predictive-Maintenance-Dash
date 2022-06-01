import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import "./Login.css";

// Login Page

// Features

// - Omron logo
// - Centered on page
// - Enter username and password
// - Button connects with backend to authenticate signing in

function Login() {
	let navigate = useNavigate();

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const onSubmitClick = (e) => {
		e.preventDefault();
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
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

	// "./omronlogin.png",

	return (
		<Container className="login" fluid>
			<Row>
				{/* <Col className="left">
					<Row>
						<hr></hr>
						<h1 className="title">PREDICTIVE MAINTENANCE DASHBOARD</h1>
						<hr></hr>
					</Row>
				</Col> */}
				<Col className="right">
					{/* <div style={{height:"100px"}}></div> */}
					<img
						src={Omronlogo}
						alt="omrom logo"
						width="300"
						className="m-auto "
					/>
					<div style={{ height: "70px" }}> </div>

					<Card className="loginCard">
						<Card.Title className="mt-4 mx-auto">
							<h2>Login</h2>
						</Card.Title>
						<Card.Body>
							{/* Bootstrap form for login */}
							<Form>
								{/* Username group */}
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<FloatingLabel
										controlId="floatingUsername"
										label="Username"
										className="mb-3">
										<Form.Control
											type="username"
											placeholder="Username"
											value={username}
											onChange={handleUsernameChange}
										/>
									</FloatingLabel>
								</Form.Group>

								{/* Password group */}
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<FloatingLabel
										controlId="floatingPassword"
										label="Password"
										className="mb-3">
										<Form.Control
											type="password"
											placeholder="Password"
											onChange={handlePasswordChange}
											value={password}
										/>
									</FloatingLabel>
								</Form.Group>
								<Link to="/register">
									<small>Don't have an account? Register</small>
								</Link>
								{/* Submit button */}
								<div className="d-grid mt-2">
									<Button
										variant="primary"
										className="btnFormSend"
										onClick={onSubmitClick}
										type="submit">
										Submit
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
