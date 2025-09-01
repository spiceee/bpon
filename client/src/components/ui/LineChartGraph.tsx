import React from 'react';
import { Group } from '@visx/group';
import { LinePath, AreaClosed } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';

type GraphPointType = { month: string; nodeInputs: number };
type GraphDataType = GraphPointType[];
type GraphNodeType = { month: string; occurrences: number };

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 60, left: 80 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const LineChartGraph: React.FC = () => {
    const [graphData, setGraphData] = React.useState<GraphDataType>([]);

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

    return (
        <div className="lineChartGraph">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Ocorrências reportadas
                </h1>
                <p>Últimos 12 meses</p>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-6">
                <svg width={width} height={height}>
                    <LinearGradient
                        id="line-gradient"
                        from="#32cd32"
                        to="#ffff00"
                    />
                    <LinearGradient
                        id="area-gradient"
                        from="#32cd32"
                        fromOpacity={0.3}
                        to="#ffff00"
                        toOpacity={0.1}
                    />

                    <Group left={margin.left} top={margin.top}>
                        {/* Grid using Visx */}
                        <GridRows
                            scale={nodeInputsScale}
                            width={innerWidth}
                            strokeDasharray="2,2"
                            stroke="#32cd32"
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
                                    fill="#32cd32"
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
                                    className="cursor-pointer"
                                />
                            );
                        })}

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
                            fill="#32cd32"
                            fontWeight="500"
                        >
                            Mês
                        </text>
                        <text
                            x={-40}
                            y={innerHeight / 2}
                            textAnchor="middle"
                            fontSize={14}
                            fill="#32cd32"
                            fontWeight="500"
                            transform={`rotate(-90, -40, ${innerHeight / 2})`}
                        >
                            Ocorrências reportadas
                        </text>
                    </Group>
                </svg>
            </div>
        </div>
    );
};

export default LineChartGraph;
