import React from "react";
import "./OffCanvasNavBar.css";
import { Navbar, Row, Container, Offcanvas, Nav } from "react-bootstrap";
import Omron4 from "../assets/img/omron4.png";
import OmronGuy from "../assets/img/omron_guy.png";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import ReactSwitch from "react-switch";
// Page for Side Navigation bar

function OffCanvasNavBar() {
	let navigate = useNavigate();
	const logoutAPI = "/api/user/auth/logout";
	const logout = (e) => {
		e.preventDefault();

		fetch(logoutAPI, {
			method: "POST",
		})
			.then((resp) => {
				if (resp.status === 200) navigate("../login");
				else alert("Invalid username or password");
				console.log(resp);
			})
			.catch((error) => {
				console.log("Error in the call!", error);
			});
	};
	return (
		<ThemeContext.Consumer>
			{(value) => (
				<Navbar expand={false} sticky="top" bsPrefix="navbar" id={value.theme}>
					<Container fluid>
						{/* Logo */}

						<Navbar.Brand className="mx-0 " bsPrefix="navbar-brand">
							<NavLink to="/dashboard">
								<img src={Omron4} alt="omrom logo" width="170" />
							</NavLink>
						</Navbar.Brand>

						<div className="switch col-2">
							<label> {value.theme === "light" ? "Light" : "Dark"}</label>
							<ReactSwitch
								onChange={value.toggleTheme}
								checked={value.theme === "dark"}
							/>
							{/* <label> {theme === "light" ? "Light" : "Dark"}</label> */}
						</div>

						{/* Navbar Menu */}
						<Navbar.Toggle
							as="button"
							aria-controls="offcanvasNavbar"></Navbar.Toggle>

						<Navbar.Offcanvas
							id={value.theme}
							// id="offcanvasNavbar"
							aria-labelledby="offcanvasNavbarLabel"
							placement="end">
							<Offcanvas.Header closeButton></Offcanvas.Header>

							<Offcanvas.Body>
								<hr />

								<Row>
									<div className="block col-auto">
										<img
											src={OmronGuy}
											alt="omrom logo"
											width="110"
											height="auto"
										/>
									</div>

									<div className=" col-auto self-center ml-0">
										<h4>John Doe</h4>
										<small className="text-muted">omron_guy99@omron.net</small>
									</div>
								</Row>

								<hr />

								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link href="#action1">Settings</Nav.Link>
									{/* <Nav.Link href="#action2">Link</Nav.Link> */}
									<Nav.Link onClick={logout}>Sign Out</Nav.Link>
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			)}
		</ThemeContext.Consumer>
	);
}

export default OffCanvasNavBar;
