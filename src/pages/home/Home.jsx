import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="featured">
        <div className="widgets">
          <Widget type="student" />
          <Widget type="class" />
          <Widget type="fee-payment" />
          {/* <Widget type="receipt" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Fee Collections (Last 6 Months)" aspect={2 / 1} disableResizeObserver/>
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Fee Payments</div>
          <Table />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
