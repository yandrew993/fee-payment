import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { DarkModeContext } from "../../context/darkModeContext";

const Chart = ({ aspect, title, studentId }) => {
  const [chartData, setChartData] = useState([]);
  
  // Build the endpoint URL - if studentId is provided, fetch student-specific data
  const endpoint = studentId 
    ? `/payment/monthly-stats?studentId=${studentId}` 
    : "/payment/monthly-stats";
  
  const { data, loading, error } = useFetch(endpoint, true);
  const { darkMode } = useContext(DarkModeContext);

  // Debug logs
  console.log("Chart - endpoint:", endpoint);
  console.log("Chart - data:", data, "Type:", typeof data);
  console.log("Chart - error:", error);
  console.log("Chart - loading:", loading);


  // Process the data once it's fetched
  useEffect(() => {
    if (data) {
      // Convert API data to chart-friendly format
      const formattedData = Object.entries(data).map(([month, total]) => ({
        name: getMonthName(month),
        Total: total,
      }));

      // Sort data by month number
      formattedData.sort((a, b) => {
        const monthOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
      });

      setChartData(formattedData);
    }
  }, [data]);

  // Helper function to convert month number to name
  const getMonthName = (monthNum) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(monthNum) - 1] || `Month ${monthNum}`;
  };

  return (
    <div className={`chart ${darkMode ? "dark" : "light"}`}>
      <div className="title">{title}</div>
      {loading ? (
        <div className={`loading ${darkMode ? "dark" : "light"}`}>
          <CircularProgress /></div>
      ) : error ? (
        <div className={`error ${darkMode ? "dark" : "light"}`}>
          Error loading chart data
        </div>
      ) : (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;