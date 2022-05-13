import { Button, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import img from '../FP.png'
export default function Login(props) {
    const [UserName,setUseraName]=useState("")
    const [Password,setPassword]=useState("")
    const navigate = useNavigate()
    function getCookie(name) {
      if (!document.cookie) {
        return null;
      }
      const token = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));
  
      if (token.length === 0) {
        return null;
      }
      return decodeURIComponent(token[0].split('=')[1]);
    }
  
    const csrftoken = getCookie('csrftoken')
    console.log(csrftoken)

    const onsubmit=()=>{ 

      let data = new FormData(); 

      data.append("username", UserName);
      data.append("password", Password);

      console.log("login")
      fetch('http://localhost:5000/api/login/', {
        method: 'POST',
        headers:{ 'X-CSRFToken': csrftoken},
        body: data
      }).then(response => response.json())
      .then(data=>{
        if(data){
          props.onLoad(true)
          navigate("/home");
        }
        else{
          props.onLoad(false)

          console.log("auth failed")
        }
      }
      
      )
      .catch(error => navigate("/login"))

    }
  return(
<div>
  <img src={img} style={{width:"30rem",margin:"10rem 5rem 0 0"}}></img>
<Form >
<Row className="mb-3">
      <Form.Group as={Col} className="mb-3" style={{maxWidth:"25rem",margin:"10rem 20rem 20rem 45rem"}}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
             User Name
            </InputGroup.Text>
            <Form.Control
                required

                onChange={(e) =>{ setUseraName(e.target.value)
                }}
                value={UserName}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
               />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Password
            </InputGroup.Text>
            <Form.Control
                required
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                type="password"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Form.Group>
        {/* <Form.Group as={Col} className="mb-3">

        </Form.Group> */}
        </Row>
        <Button variant="success" onClick={onsubmit} style={{margin:"10rem 5rem 0 0"}} size="lg">Login</Button>

        </Form>
</div>
  )
}