import { MailLockOutlined } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ToastContainer, toast } from "react-toastify";
import io from 'socket.io-client';
import * as api from '../../service/notification';
function MySideNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const statutEtudiant = user?.etat;
  let socket = null;
const [count, setCount]= useState();


  useEffect(() => {
    async function fetchData() {
      try {
      
        const result =  await api.getNotification(user._id);
setCount(result.length);
          if(!socket){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            socket = io("http://localhost:5000");
            socket.emit('join', user._id, (error) => {
              if (error) {
                alert(error);
              }
            });
            socket.on('notification',  (notificationdata) => {
            console.log("noo");
              const result =   api.getNotification(user._id);
              toast(notificationdata.title);

             
setCount(result.length);
         
             
            });
          }

      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
const handleClick=async ()=>{
navigate("/allnotification")
const result = await  api.updateNotif(user._id);

}
  return (
    <SideNav
      onSelect={(selected) => {
        console.log(selected);
        navigate("/" + selected);
      }}
      style={{ backgroundColor: "#3bb19b" }}
    >
      <SideNav.Toggle />

      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="add-Alumni">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Changer mot de passe</NavText>
        </NavItem>
        <NavItem eventKey="update-etudiant">
          <NavIcon>
            <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Modifier profil</NavText>
        </NavItem>

        {statutEtudiant == "actuel" ? (
          <NavItem eventKey="insérer-stage-été">
            <NavIcon>
              <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
            </NavIcon>
            <NavText>Stage été</NavText>
          </NavItem>
        ) : null}
          {statutEtudiant == "actuel" ? (
          <NavItem eventKey="mes-stage-été">
            <NavIcon>
              <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
            </NavIcon>
            <NavText>Mes Stage d'été</NavText>
          </NavItem>
        ) : null}
        {statutEtudiant == "actuel" ? (
          <NavItem eventKey="insérer-stage-pfe">
            <NavIcon>
              <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
            </NavIcon>
            <NavText>Stage pfe</NavText>
          </NavItem>
        ) : null}
         {statutEtudiant == "actuel" ? (
          <NavItem eventKey="mes-stage-pfe">
            <NavIcon>
              <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
            </NavIcon>
            <NavText>Mes Stage de pfe</NavText>
          </NavItem>
        ) : null}
        <NavItem eventKey="signin">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>
            <Button onClick={handleLogout}>Logout</Button>
          </NavText>
        </NavItem>
        {statutEtudiant == "actuel" ? (

      <div style={{display:"flex", flexDirection:"column"}}  
           
        >
<IconButton >
 <Badge badgeContent={count} color="secondary" onClick={handleClick}>
    <NotificationsActiveIcon />
  </Badge>  
</IconButton>
      </div>):null}
      </SideNav.Nav>

    </SideNav>
  );
}
export default MySideNav;
