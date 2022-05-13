import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card'
class Listing extends Component {
 
    constructor(props) {
        super(props)   
        this.state = {
            records: [],
            file:null,
            uname:1,

            
        }
         
    }

    componentDidMount() {
        if(this.props.isauth){
            console.log("heyyy")
        }
        else{
            console.log("fuka")
        }
        fetch('http://localhost:5000/api/task-list/')
            .then(response => response.json())
            .then(records => {

                this.setState({
                    records: records,

                });
            })
            .catch(error => console.log(error))

    }
    refresh(){
        fetch('http://localhost:5000/api/task-list/')
        .then(response => response.json())
        .then(records => {

            this.setState({
                records: records,

            });
            console.log("refreshed")
        })
        .catch(error => console.log(error))

    }
    submit(file){ 

        let data = new FormData(); 

        data.append("file", this.state.file);
        data.append("uname", this.state.uname);

        console.log("task creatingggg",file)
        fetch('http://localhost:5000/api/task-create/', {
          method: 'POST',
          body: data
        }).then(response => {response.json();})
        .then(data=>{this.refresh();})  .catch(error => console.log(error))
      

      }
      renderListing() {
        let recordList = []
        this.state.records.map(record => {
            let name=record.file.slice(13,)
            return recordList.push(
            <Card className='shadow-lg  mb-9 bg-white rounded' id={record.id+"ocard"} key={record.id} style={{ width:'25rem' ,margin:"10px"}}> 
                <Card.Body >
                <Card.Title >{name}</Card.Title>
                <Card.Text>
                </Card.Text>
                {/* <Button id={record.id+"deletecard"} variant="danger" onClick={()=>this.deletecard(record.id)} style={{float:"left"}}>delete</Button> */}

            </Card.Body>



        </Card>

            )
            
        })
 
        return recordList;
    }



    render() {
        return (
            <div>
            <div id="UploadDiv" style={{margin:"0 50rem"}}>
            <Form >
         <InputGroup className="mb-3">

            <Form.Control
                // required
                type="file"
                onChange={(e) =>{ this.state.file=(e.target.files[0])
                }}  
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                style={{maxWidth:"30rem"}}
                // accept=".json"
               />
          </InputGroup>  
          <Button variant="primary" onClick={()=>this.submit(this.state.file)}>Upload</Button>
          </Form>
          </div>
                          <div id="DashboardDiv" style={{display:"none"}}>
                          <h1>Files</h1>
                          <br/>
      
                          <div style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto auto auto"
                          }}>              
                          {this.renderListing()}
                          </div>
      
                      </div>
                      </div>
        );
    }
}
 
export default Listing;
