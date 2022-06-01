
# predictive-maintenance-dashboard

## Description
As Requested by OMRON, a leader in Consumer Electronics and Manufacturing Robotics, the Hummingbird Robotics team developed a Predictive Maintenance Dashboard to help ameliorate revenue loss due to unexpected maintenance-related downtime.  The Dashboard aims to predict immediate and future malfunctions by analyzing data received from fixed non-mobile robots. The Prediction algorithm uses two models. The first is a simple linear model that continuously monitors robot parameters to be in operational ranges. The second is an Autoregressive Integrated Moving Average (ARIMA) model that aims to predict future breakdowns based on previously collected data.

## Technologies used
<img src="https://user-images.githubusercontent.com/82134360/165676324-e06e9b5c-fe3d-46c0-99c1-1d71c644cc17.png" height="100" ><img src="https://user-images.githubusercontent.com/82134360/166163770-107e082c-a067-409b-83c3-3e39078ffb9e.png" height="100" ><img src="https://user-images.githubusercontent.com/82134360/166163773-66edf627-5cc8-4462-afe4-174335e8067c.png" height="100" >

<img src="https://user-images.githubusercontent.com/82134360/166163786-d89c2b51-7f75-4046-9e1f-47e1c5cf1a8a.png" height="100" ><img src="https://user-images.githubusercontent.com/82134360/166163842-2c7f85f2-daf4-48d1-96c1-043a7adb0b70.png" height="100" >

## Frontend
Implemented using React.js and the code can be found in the client directory

### Login Page / Mobile

<img src="https://user-images.githubusercontent.com/82134360/166164315-e7a6683f-7cc0-49d3-a5f1-9d37eb7f369e.png" height="450" >/<img src="https://user-images.githubusercontent.com/82134360/166164353-f3719b2e-cdaf-4c54-ab70-5ffdd84abec7.png" height="450" >


### Dashboard Page / Mobile

<img src="https://user-images.githubusercontent.com/82134360/166164399-4a97ef76-c041-4869-bc18-40fd83085ae8.png" height="450" >/<img src="https://user-images.githubusercontent.com/82134360/166164383-162ca444-38ae-4c25-8ddb-e2f9798242c1.png" height="450" >

### Individual Unit Page / Mobile

<img src="https://user-images.githubusercontent.com/82134360/166164792-f37059f3-f6ff-4c50-a483-9575fbf68be5.png" height="450" >/<img src="https://user-images.githubusercontent.com/82134360/166164823-ec38496c-73b7-4837-bb0e-d58ae6de98e0.png" height="450" >

### DarkMode / Mobile
<img src="https://user-images.githubusercontent.com/82134360/166165076-d3cc5b26-9d5b-460d-9c6f-aeac6a0e20d0.png" height="450" >/<img src="https://user-images.githubusercontent.com/82134360/166165095-a628f3c7-8762-4de7-b6ab-022888d6fbde.png" height="450" >



#### Needed to run:
- Node.js (v16.14.0 recommended)
- Yarn (1.22.17) recommended
- WSL1, Git Bash, Mach Bash (WSL2 is not recommended)

### Backend
Implemented using Python Flask  and the code can be found in the server directory
#### Needed to run:
- Python3

## Run project
Follow the next steps if it is the first time you run the project. 
TWO terminals needed to run.
### Setup server (terminal 1)
1. Navigate to predictive-maintenance-dashboard/server/ directory
	```sh
	cd predictive-maintenance-dashboard/server/
	```
2. Create virtual environment
	```sh
	python3 -m venv venv
	```
3. Activate virtual environment
	```sh
	. venv/Scripts/activate
	```
4. Install requirements.txt
	```sh
	pip install -r requirements.txt
	```
5. The server is now ready, now you can run the server using yarn script if preferred (more specification in Run React app)
	```sh
	yarn start-flask-server
	```

### Run React app (terminal 2)

 1.  Navigate to predictive-maintenance-dashboard/client/ directory 
```sh
cd predictive-maintenance-dashboard/client/
```
2. Install dependencies
	Note: This will install all the node_modules (DO NOT commit this folder to the repository)
	```sh
	npm install
	```
3. Start React app
	```sh
	yarn start
	```
4. Start server (if not running)
Note: Need to be in the client/ directory to run this script
	```sh
	yarn start-flask-server
	```
5. Now React app should be running in port 3000 and flask in 5000. All unknown api request will be handled automatically by the flask server 
	Go to: http://localhost:3000/
