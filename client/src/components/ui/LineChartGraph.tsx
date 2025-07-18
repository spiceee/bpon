'use client';

import type React from 'react';
import { useState } from 'react';

// Sample data
const data = [
    { month: 'Jan', nodeInputs: 1200 },
    { month: 'Feb', nodeInputs: 1450 },
    { month: 'Mar', nodeInputs: 1100 },
    { month: 'Apr', nodeInputs: 1800 },
    { month: 'May', nodeInputs: 2100 },
    { month: 'Jun', nodeInputs: 1950 },
    { month: 'Jul', nodeInputs: 2300 },
    { month: 'Aug', nodeInputs: 2150 },
    { month: 'Sep', nodeInputs: 2450 },
    { month: 'Oct', nodeInputs: 2200 },
    { month: 'Nov', nodeInputs: 2600 },
    { month: 'Dec', nodeInputs: 2800 },
];

interface TooltipData {
    month: string;
    nodeInputs: number;
    x: number;
    y: number;
}

const LineChartGraph: React.FC = () => {
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Calculate scales
    const maxValue = Math.max(...data.map(d => d.nodeInputs));
    const minValue = Math.min(...data.map(d => d.nodeInputs));
    const valueRange = maxValue - minValue;
    const paddedMax = maxValue + valueRange * 0.1;
    const paddedMin = Math.max(0, minValue - valueRange * 0.1);

    // Scale functions
    const xScale = (index: number) => (index / (data.length - 1)) * innerWidth;
    const yScale = (value: number) =>
        innerHeight -
        ((value - paddedMin) / (paddedMax - paddedMin)) * innerHeight;

    // Generate path data
    const pathData = data
        .map(
            (d, i) =>
                `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.nodeInputs)}`
        )
        .join(' ');

    // Generate area path data
    const areaPathData = `M ${xScale(0)} ${innerHeight} L ${data
        .map((d, i) => `${xScale(i)} ${yScale(d.nodeInputs)}`)
        .join(' L ')} L ${xScale(data.length - 1)} ${innerHeight} Z`;

    // Generate grid lines
    const yGridLines = [];
    const numYLines = 5;
    for (let i = 0; i <= numYLines; i++) {
        const value = paddedMin + (paddedMax - paddedMin) * (i / numYLines);
        const y = yScale(value);
        yGridLines.push({ y, value });
    }

    const xGridLines = data.map((d, i) => ({ x: xScale(i), month: d.month }));

    const handleMouseMove = (
        event: React.MouseEvent<SVGRectElement>,
        dataPoint: typeof data[0],
        index: number
    ) => {
        setTooltip({
            month: dataPoint.month,
            nodeInputs: dataPoint.nodeInputs,
            x: xScale(index),
            y: yScale(dataPoint.nodeInputs),
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Node Inputs Over Time
                </h1>
                <p className="text-slate-600">
                    Monthly node input trends throughout 2024
                </p>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-6">
                <svg width={width} height={height} className="overflow-visible">
                    <defs>
                        <linearGradient
                            id="line-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                        <linearGradient
                            id="area-gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#3b82f6"
                                stopOpacity="0.3"
                            />
                            <stop
                                offset="100%"
                                stopColor="#1d4ed8"
                                stopOpacity="0.1"
                            />
                        </linearGradient>
                    </defs>

                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {/* Y Grid Lines */}
                        {yGridLines.map((line, i) => (
                            <line
                                key={i}
                                x1={0}
                                y1={line.y}
                                x2={innerWidth}
                                y2={line.y}
                                stroke="#e2e8f0"
                                strokeDasharray="2,2"
                                strokeOpacity={0.5}
                            />
                        ))}

                        {/* X Grid Lines */}
                        {xGridLines.map((line, i) => (
                            <line
                                key={i}
                                x1={line.x}
                                y1={0}
                                x2={line.x}
                                y2={innerHeight}
                                stroke="#e2e8f0"
                                strokeDasharray="2,2"
                                strokeOpacity={0.5}
                            />
                        ))}

                        {/* Area under the line */}
                        <path
                            d={areaPathData}
                            fill="url(#area-gradient)"
                            stroke="none"
                        />

                        {/* Main line */}
                        <path
                            d={pathData}
                            fill="none"
                            stroke="url(#line-gradient)"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {data.map((d, i) => (
                            <circle
                                key={i}
                                cx={xScale(i)}
                                cy={yScale(d.nodeInputs)}
                                r={4}
                                fill="#1d4ed8"
                                stroke="white"
                                strokeWidth={2}
                                className="drop-shadow-sm cursor-pointer hover:r-6 transition-all"
                            />
                        ))}

                        {/* Invisible hover areas */}
                        {data.map((d, i) => (
                            <rect
                                key={i}
                                x={xScale(i) - 20}
                                y={0}
                                width={40}
                                height={innerHeight}
                                fill="transparent"
                                onMouseMove={e => handleMouseMove(e, d, i)}
                                onMouseLeave={handleMouseLeave}
                                className="cursor-pointer"
                            />
                        ))}

                        {/* Tooltip indicator line */}
                        {tooltip && (
                            <g>
                                <line
                                    x1={tooltip.x}
                                    x2={tooltip.x}
                                    y1={0}
                                    y2={innerHeight}
                                    stroke="#64748b"
                                    strokeWidth={1}
                                    strokeDasharray="4,4"
                                />
                                <circle
                                    cx={tooltip.x}
                                    cy={tooltip.y}
                                    r={6}
                                    fill="#1d4ed8"
                                    stroke="white"
                                    strokeWidth={3}
                                    className="drop-shadow-md"
                                />
                            </g>
                        )}

                        {/* Y Axis */}
                        <line
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={innerHeight}
                            stroke="#64748b"
                            strokeWidth={1}
                        />
                        {yGridLines.map((line, i) => (
                            <g key={i}>
                                <line
                                    x1={-5}
                                    y1={line.y}
                                    x2={0}
                                    y2={line.y}
                                    stroke="#64748b"
                                    strokeWidth={1}
                                />
                                <text
                                    x={-10}
                                    y={line.y}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fontSize={12}
                                    fill="#64748b"
                                >
                                    {Math.round(line.value).toLocaleString()}
                                </text>
                            </g>
                        ))}

                        {/* X Axis */}
                        <line
                            x1={0}
                            y1={innerHeight}
                            x2={innerWidth}
                            y2={innerHeight}
                            stroke="#64748b"
                            strokeWidth={1}
                        />
                        {data.map((d, i) => (
                            <g key={i}>
                                <line
                                    x1={xScale(i)}
                                    y1={innerHeight}
                                    x2={xScale(i)}
                                    y2={innerHeight + 5}
                                    stroke="#64748b"
                                    strokeWidth={1}
                                />
                                <text
                                    x={xScale(i)}
                                    y={innerHeight + 20}
                                    textAnchor="middle"
                                    fontSize={12}
                                    fill="#64748b"
                                >
                                    {d.month}
                                </text>
                            </g>
                        ))}

                        {/* Axis labels */}
                        <text
                            x={innerWidth / 2}
                            y={innerHeight + 45}
                            textAnchor="middle"
                            fontSize={14}
                            fill="#475569"
                            fontWeight="500"
                        >
                            Month
                        </text>
                        <text
                            x={-40}
                            y={innerHeight / 2}
                            textAnchor="middle"
                            fontSize={14}
                            fill="#475569"
                            fontWeight="500"
                            transform={`rotate(-90, -40, ${innerHeight / 2})`}
                        >
                            Node Inputs
                        </text>
                    </g>
                </svg>

                {/* Tooltip */}
                {tooltip && (
                    <div
                        className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none z-10"
                        style={{
                            left: tooltip.x + margin.left + 10,
                            top: tooltip.y + margin.top - 10,
                            transform: 'translateY(-100%)',
                        }}
                    >
                        <div className="font-semibold">
                            {tooltip.month} 2024
                        </div>
                        <div>
                            Node Inputs: {tooltip.nodeInputs.toLocaleString()}
                        </div>
                    </div>
                )}
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
                <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {Math.max(
                            ...data.map(d => d.nodeInputs)
                        ).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Peak Inputs</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {Math.round(
                            data.reduce((sum, d) => sum + d.nodeInputs, 0) /
                                data.length
                        ).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Average</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {data
                            .reduce((sum, d) => sum + d.nodeInputs, 0)
                            .toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Total Inputs</div>
                </div>
            </div>
        </div>
    );
};

export default LineChartGraph;
