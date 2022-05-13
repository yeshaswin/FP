import Navbar from 'react-bootstrap/Navbar'
import { Container } from "reactstrap";
import Nav from 'react-bootstrap/Nav'
import logo from '../FP.png'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Navb(props){


    return (
        <div  style={{position:"fixed" ,top:"0",width:"100%",zIndex:"1"}}>
      <Navbar  bg="dark" variant='dark'>
      <Navbar.Brand href="" className='' style={{marginLeft:"20px"}} ><img src={logo} style={{width:"200px"}}></img> </Navbar.Brand>
        {/* <Navbar.Brand style={{margin:"0 40rem"}}>File Upload</Navbar.Brand> */}
        <Container >
    <Nav variant="pills" defaultActiveKey="upload">
    <Nav.Item>
    <Nav.Link  onClick={props.showUpload}  id="Upload"  eventKey="upload" >Upload</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link  onClick={()=>{props.showDashboard();}}  id="Dashboard"  eventKey="Dashboard" >Dashboard</Nav.Link>
    </Nav.Item>
    </Nav>
    </Container>
    <Container style={{width:"40px",marginRight:"5rem"}}>
    <Nav variant="pills" defaultActiveKey="orders">
    <Nav.Item>
    <Nav.Link    id="Logout-btn"  eventKey="Logout" onClick={props.logout} >Logout</Nav.Link>
    </Nav.Item>
    </Nav>
    </Container>
  </Navbar>
        </div>
    );

}
export default Navb;