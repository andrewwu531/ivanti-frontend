import React, { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface TemperatureChartProps {
  temperatures: number[];
  closestToZero: number;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  temperatures,
  closestToZero,
}) => {
  const [chartWidth, setChartWidth] = useState(0);
  const [yAxisPosition, setYAxisPosition] = useState(0);
  const [plottingAreaWidth, setPlottingAreaWidth] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          setChartWidth(width);

          // Calculate Y-axis position and plotting area width
          // Y-axis is positioned at left margin (30px)
          const leftMargin = 30;
          const rightMargin = 10;
          const yAxisX = leftMargin;
          const availableWidth = width - leftMargin - rightMargin;

          setYAxisPosition(yAxisX);
          setPlottingAreaWidth(availableWidth);
        }
      });
      resizeObserver.observe(chartRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Transform temperatures into Recharts data format
  const chartData = temperatures.map((temp, index) => ({
    name: `Temp ${index + 1}`,
    temperature: temp,
    isClosest: temp === closestToZero,
    index: index,
  }));

  const maxValue = Math.max(...temperatures.map(Math.abs));

  // Custom bar component with labels
  const CustomBar = (props: any) => {
    const { y, height, temperature, isClosest, index } = props;

    if (!temperature) return null;

    const barColor = temperature > 0 ? "#ffb300" : "#3388ff"; // Darker orange and darker blue
    const borderColor = "#000000"; // Always use black border
    const borderWidth = 1; // Always use thin border

    // Calculate bar width and position
    const barWidth = plottingAreaWidth / temperatures.length;

    // Position bars so that the left edge of the first bar starts at x=0
    const barX =
      yAxisPosition + (plottingAreaWidth / temperatures.length) * index;

    // Consistent distance for both positive and negative labels
    const labelDistance = 8;
    let labelY;

    if (temperature > 0) {
      labelY = y - labelDistance;
    } else {
      const barBottomEdge = y;
      labelY = barBottomEdge + labelDistance + 9;
    }

    const labelText = temperature > 0 ? `+${temperature}` : `${temperature}`;

    return (
      <g>
        {/* Bar */}
        <rect
          x={barX}
          y={temperature > 0 ? y : y + height}
          width={barWidth}
          height={Math.abs(height)}
          fill={barColor}
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
        {/* Temperature label */}
        <text
          x={barX + barWidth / 2}
          y={labelY}
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill={isClosest ? "#ff0000" : "#333"} // Red text for highlighted temperature
        >
          {labelText}
        </text>
      </g>
    );
  };

  return (
    <div className="px-10 py-12 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        Temperature Chart
      </h2>

      <div ref={chartRef} className="relative px-12 bg-white">
        {/* Hot and Cold icons positioned above and below the Y-axis */}
        <div className="-mb-3">
          <span className="text-2xl"></span>
          <span
            className="ml-4 text-lg font-semibold"
            style={{ color: "#ffb300" }}
          >
            Hot
          </span>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: -200,
              left: -30,
              bottom: 25,
            }}
          >
            <XAxis dataKey="name" hide={true} stroke="#000" strokeWidth={1} />
            <YAxis tick={false} stroke="#000" strokeWidth={1.25} />
            <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
            <Bar dataKey="temperature" shape={<CustomBar />} />
            {/* Custom "0" label at origin */}
            <text
              x={yAxisPosition - 10}
              y={200}
              textAnchor="end"
              fontSize="14"
              fontWeight="500"
              fill="#000"
            >
              0
            </text>
            {/* Red up arrow at top of Y-axis */}
            <polygon
              points={`${yAxisPosition - 8},20 ${yAxisPosition + 8},20 ${yAxisPosition},10`}
              fill="#ffb300"
            />
            {/* Blue down arrow at bottom of Y-axis */}
            <polygon
              points={`${yAxisPosition - 8},375 ${yAxisPosition + 8},375 ${yAxisPosition},385`}
              fill="#3388ff"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="-mt-4">
          <span
            className="ml-3 text-lg font-semibold"
            style={{ color: "#3388ff" }}
          >
            Cold
          </span>
        </div>
      </div>

      {/* Sample temperatures text below the chart */}
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Sample temperatures. Here,{" "}
          {closestToZero > 0 ? `+${closestToZero}` : `${closestToZero}`} is the
          closest to 0.
        </p>
      </div>
    </div>
  );
};

export default TemperatureChart;
