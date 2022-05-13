import Navb from "./Navb";
import Login from "./Login";
import FileUpload from "./FileUpload"
import { useNavigate } from "react-router-dom";

function Home(props){
  const navigate = useNavigate()
console.log(props.appProps)

    const showUpload=()=>{
        document.getElementById("UploadDiv").style.display=("block");
        document.getElementById("DashboardDiv").style.display=("none");
        }
        const showDashboard=()=>{
          document.getElementById("UploadDiv").style.display=("none");
          document.getElementById("DashboardDiv").style.display=("block");
        }

        const logout=()=>{ 

          console.log("login")
          fetch('http://localhost:5000/api/logout/', {
            method: 'POST',
          }).then(response => response.json())
          .then(data=>{
            navigate('/login')
          }
          
          )
          .catch(error => navigate("/login"))
    
        }
        if(props.appProps){
          return (
            
            <div >
           <Navb showDashboard={showDashboard} showUpload={showUpload} logout={logout} ></Navb>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <FileUpload isauth={props.appProps}></FileUpload>
           {/* <Listing></Listing> */}
           </div>
        )
        }
        if(!props.appProps){
          logout()
        }

}
export default Home