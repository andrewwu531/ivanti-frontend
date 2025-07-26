import React, { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface RecordChartProps {
  temperatures: number[];
  closestToZero: number;
}

const RecordChart: React.FC<RecordChartProps> = ({
  temperatures,
  closestToZero,
}) => {
  const [yAxisPosition, setYAxisPosition] = useState(0);
  const [plottingAreaWidth, setPlottingAreaWidth] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;

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

  const chartData = temperatures.map((temp, index) => ({
    name: `Temp ${index + 1}`,
    temperature: temp,
    isClosest: temp === closestToZero,
    index: index,
  }));

  const CustomBar = (props: any) => {
    const { y, height, temperature, isClosest, index } = props;

    if (!temperature) return null;

    const barColor = temperature > 0 ? "#ffb300" : "#3388ff";
    const borderColor = "#000000";
    const borderWidth = 1;

    const barWidth = plottingAreaWidth / temperatures.length;

    const barX =
      yAxisPosition + (plottingAreaWidth / temperatures.length) * index;

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
        <rect
          x={barX}
          y={temperature > 0 ? y : y + height}
          width={barWidth}
          height={Math.abs(height)}
          fill={barColor}
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
        <text
          x={barX + barWidth / 2}
          y={labelY}
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill={isClosest ? "#ff0000" : "#333"}
        >
          {labelText}
        </text>
      </g>
    );
  };

  return (
    <div className="px-10 bg-white rounded-lg pt-18 pb-18">
      <h2 className="mb-12 text-2xl font-semibold text-center text-gray-800">
        Temperature Chart
      </h2>

      <div ref={chartRef} className="relative px-12 bg-white">
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
            <polygon
              points={`${yAxisPosition - 8},20 ${yAxisPosition + 8},20 ${yAxisPosition},10`}
              fill="#ffb300"
            />
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

export default RecordChart;
