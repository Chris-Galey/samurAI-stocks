import { getDetailPrediction } from "../api/PredictionApi.jsx";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { sampleData } from "../assets/prophet.js";

export default function Predictions() {
  const [pred, setPred] = useState([]);
  const { symbol } = useParams();
  const parseDate = (date) => {
    const originalDate = new Date(date);

    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");
    const formattedDateString = `${month}-${day}`;
    return formattedDateString;
  };
  useEffect(() => {
    const fetchPredictions = async () => {
      const data = await getDetailPrediction(symbol);

      // const data = sampleData;
      const lastThirtyDays = data.forecast.slice(-30);
      const cleanedData = lastThirtyDays.map((dataPoint) => ({
        date: parseDate(dataPoint.ds),
        price: dataPoint.yhat.toFixed(2),
        high: dataPoint.yhat_upper.toFixed(2),
        low: dataPoint.yhat_lower.toFixed(2),
      }));

      setPred(cleanedData);
    };
    fetchPredictions();
  }, [symbol]);

  return (
    <div className=" flex flex-col place-items-center w-full gap-10">
      <h1>${symbol} 30 Day Predictions</h1>

      <div className=" flex place-content-center w-1/2 h-1/2">
        <AreaChart
          width={500}
          height={500}
          data={pred}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="price"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#price)"
          />
        </AreaChart>
      </div>
      <div className="flex flex-row gap-5">
        <Link to={"/dashboard/explore/"} className="modern-button">
          {" "}
          Explore{" "}
        </Link>
        <Link
          to={`/dashboard/companyProfile/?symbol=${symbol}`}
          className="modern-button"
        >
          Company Profile
        </Link>
      </div>
    </div>
  );
}
