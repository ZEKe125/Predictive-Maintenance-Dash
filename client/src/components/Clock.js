import React from "react";
import { Row, Col } from "react-bootstrap";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <Row>
            <Col>
              <h4>{this.state.date.toLocaleString()} .</h4>
            </Col>
            
          </Row>
          
        </div>
      );
    }
  }
  
  export default Clock;