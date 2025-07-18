import React from 'react';
import { Group } from '@visx/group';
import { LinePath, AreaClosed } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';

interface TooltipData {
    month: string;
    nodeInputs: number;
    x: number;
    y: number;
}

type GraphPointType = { month: string; nodeInputs: number };
type GraphDataType = GraphPointType[];
type GraphNodeType = { month: string; occurrences: number };

const LineChartGraph: React.FC = () => {
    const [tooltip, setTooltip] = React.useState<TooltipData | null>(null);
    const [graphData, setGraphData] = React.useState<GraphDataType>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./nodes.json');
                const data = await response.json();
                const fetchedGraphData = data.reduce(
                    (acc: GraphDataType, curr: GraphNodeType) => {
                        acc.push({
                            month: new Date(curr.month)
                                .toLocaleDateString('pt-BR', { month: 'short' })
                                .replace('.', ''),
                            nodeInputs: curr.occurrences,
                        });
                        return acc;
                    },
                    [] as GraphDataType
                );
                setGraphData(fetchedGraphData);
            } catch (error) {
                console.error('Error fetching nodes:', error);
                setGraphData([] as GraphDataType);
            }
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        console.log('graphData', graphData);
    }, [graphData]);

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Ensure we have valid data
    const validData = graphData.filter(
        d => d && d.month && typeof d.nodeInputs === 'number'
    );

    // Scales using Visx with proper domain validation
    const monthScale = scalePoint<string>({
        range: [0, innerWidth],
        domain: validData.map(d => d.month),
        padding: 0.1,
    });

    const maxNodeInputs = Math.max(...validData.map(d => d.nodeInputs));
    const nodeInputsScale = scaleLinear<number>({
        range: [innerHeight, 0],
        domain: [0, maxNodeInputs * 1.1],
        nice: true,
    });

    const handleMouseMove = (dataPoint: GraphPointType) => {
        if (!dataPoint || !dataPoint.month) return;

        const x = monthScale(dataPoint.month) || 0;
        const y = nodeInputsScale(dataPoint.nodeInputs);

        setTooltip({
            month: dataPoint.month,
            nodeInputs: dataPoint.nodeInputs,
            x,
            y,
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Ocorrências reportadas
                </h1>
                <p className="text-slate-600">Últimos 12 meses</p>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-6">
                <svg width={width} height={height}>
                    <LinearGradient
                        id="line-gradient"
                        from="#3b82f6"
                        to="#1d4ed8"
                    />
                    <LinearGradient
                        id="area-gradient"
                        from="#3b82f6"
                        fromOpacity={0.3}
                        to="#1d4ed8"
                        toOpacity={0.1}
                    />

                    <Group left={margin.left} top={margin.top}>
                        {/* Grid using Visx */}
                        <GridRows
                            scale={nodeInputsScale}
                            width={innerWidth}
                            strokeDasharray="2,2"
                            stroke="#e2e8f0"
                            strokeOpacity={0.5}
                        />
                        <GridColumns
                            scale={monthScale}
                            height={innerHeight}
                            strokeDasharray="2,2"
                            stroke="#e2e8f0"
                            strokeOpacity={0.5}
                        />

                        {/* Area under the line using Visx */}
                        <AreaClosed<typeof validData[0]>
                            data={validData}
                            x={d => monthScale(d.month) || 0}
                            y={d => nodeInputsScale(d.nodeInputs)}
                            yScale={nodeInputsScale}
                            fill="url(#area-gradient)"
                            curve={curveMonotoneX}
                        />

                        {/* Main line using Visx */}
                        <LinePath<typeof validData[0]>
                            data={validData}
                            x={d => monthScale(d.month) || 0}
                            y={d => nodeInputsScale(d.nodeInputs)}
                            stroke="url(#line-gradient)"
                            strokeWidth={3}
                            curve={curveMonotoneX}
                        />

                        {/* Data points */}
                        {validData.map((d, i) => {
                            const x = monthScale(d.month) || 0;
                            const y = nodeInputsScale(d.nodeInputs);
                            return (
                                <circle
                                    key={`${d.month}-${i}`}
                                    cx={x}
                                    cy={y}
                                    r={4}
                                    fill="#1d4ed8"
                                    stroke="white"
                                    strokeWidth={2}
                                    className="drop-shadow-sm cursor-pointer hover:r-6 transition-all"
                                />
                            );
                        })}

                        {/* Invisible hover areas */}
                        {validData.map((d, i) => {
                            const x = monthScale(d.month) || 0;
                            return (
                                <rect
                                    key={`hover-${d.month}-${i}`}
                                    x={x - 20}
                                    y={0}
                                    width={40}
                                    height={innerHeight}
                                    fill="transparent"
                                    onMouseMove={() => handleMouseMove(d)}
                                    onMouseLeave={handleMouseLeave}
                                    className="cursor-pointer"
                                />
                            );
                        })}

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

                        {/* Axes using Visx */}
                        <AxisBottom
                            top={innerHeight}
                            scale={monthScale}
                            tickStroke="#64748b"
                            tickLabelProps={{
                                fill: '#64748b',
                                fontSize: 12,
                                textAnchor: 'middle',
                            }}
                        />
                        <AxisLeft
                            scale={nodeInputsScale}
                            numTicks={5}
                            tickFormat={value =>
                                `${Number(value).toLocaleString()}`
                            }
                            tickStroke="#64748b"
                            tickLabelProps={{
                                fill: '#64748b',
                                fontSize: 12,
                                textAnchor: 'end',
                                dx: -4,
                            }}
                        />

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
                    </Group>
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
                            ...validData.map(d => d.nodeInputs)
                        ).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Peak Inputs</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {Math.round(
                            validData.reduce(
                                (sum, d) => sum + d.nodeInputs,
                                0
                            ) / validData.length
                        ).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Average</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {validData
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
