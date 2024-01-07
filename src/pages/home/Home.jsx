import { useAPI } from "../../services/api/useAPI";
import Login from "../login/Login";
import Stack from '@mui/material/Stack';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./home.scss";
import { Box, Container } from "@mui/material";

const Home = () => {
  const { user } = useAPI();
  return (
    <div className="home">
      {user == null ?
        (<Container maxWidth="sm">
          <Login />
        </Container>)
        :
        (<Box>
          <Navbar />
          <Stack>
            <Sidebar />
            <div className="homeContainer">
              <div className="widgets">
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
              </div>
              <div className="charts">
                <Featured />
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
              </div>
              <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <Table />
              </div>
            </div>
          </Stack>
        </Box>)
      }
    </div>
  );
};

export default Home;
