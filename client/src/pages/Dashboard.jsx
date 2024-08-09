import { Avatar, Box, List, ListItem, styled, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

const DashboardWrapper = styled(Box)`
  height: calc(100vh - 133px);
  
  display: flex;
  flex-wrap: wrap;
  .dashboard_left {
    width: 300px;
    height: 100%;
    padding: 50px 0;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    background-color: #fff;
  }
  .dashboard_rgt {
    width: calc(100% - 300px);
    height: 100%;
    .main_body{
      padding: 20px;
      min-height: 100%;
      height: calc(100vh - 133px);
      overflow-y: auto;
    }
  }
  .admin_sec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .nav_list{
    padding: 50px;
    li{
        width: 100%;
    }
  }
`;

const navList = [
  {
    name: "All Users",
    pathName: "all-users",
  },
  {
    name: "All Products",
    pathName: "products",
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardWrapper>
      <Box className="dashboard_left">
        <Box className="admin_sec">
          <Avatar alt="Remy Sharp" src={user?.profilePic} />
          <Typography variant="h4">{user?.name}</Typography>
          <Typography variant="h6">{user?.role}</Typography>
        </Box>
        <List className="nav_list">
          {navList?.map((data) => (
            <ListItem key={data?.name}>
              <Link to={data?.pathName}>{data?.name}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="dashboard_rgt">
        <Box className="main_body">
        <Outlet/>
        </Box>
    
      </Box>
    </DashboardWrapper>
  );
};

export default Dashboard;
