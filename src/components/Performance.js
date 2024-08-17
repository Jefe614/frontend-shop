import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const PerformancePage = () => {
    const [shopData, setShopData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState(null);

    const chartRef = useRef(null);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/performance/');
                setShopData(response.data.shop_data);
                setChartData(response.data.chart_data);
                setAlerts(response.data.alerts);
            } catch (error) {
                console.error('Error fetching performance data:', error);
                if (error.response) {
                    setError(`Error: ${error.response.status} ${error.response.statusText}`);
                } else if (error.request) {
                    setError('No response received from the server');
                } else {
                    setError(`Error: ${error.message}`);
                }
            }
        };

        fetchPerformanceData();
    }, []);

    useEffect(() => {
        // Clean up previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        if (chartData.datasets) {
            const ctx = document.getElementById('performanceTrends').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += 'KSH ' + context.parsed.y.toFixed(2);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Month'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Sales (KSH)'
                            }
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Performance Summary</h1>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

            {/* Shop Data Table */}
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2">Shop</th>
                            <th className="px-4 py-2 text-right">Total Cash In</th>
                            <th className="px-4 py-2 text-right">Total Till In</th>
                            <th className="px-4 py-2 text-right">Total Cash Out</th>
                            <th className="px-4 py-2 text-right">Total Till Out</th>
                            <th className="px-4 py-2 text-right">Total Cash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shopData.map((data, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                <td className="px-4 py-2">{data.shop}</td>
                                <td className="px-4 py-2 text-right text-green-500">KSH {data.total_cash_in.toFixed(2)}</td>
                                <td className="px-4 py-2 text-right text-green-500">KSH {data.total_till_in.toFixed(2)}</td>
                                <td className="px-4 py-2 text-right text-red-500">KSH {data.total_cash_out.toFixed(2)}</td>
                                <td className="px-4 py-2 text-right text-red-500">KSH {data.total_till_out.toFixed(2)}</td>
                                <td className={`px-4 py-2 text-right ${data.total_cash < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    KSH {data.total_cash.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

           {/* KPIs Section */}
<div className="mt-12">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Key Performance Indicators (KPIs)
    </h2>
    <div className="flex flex-wrap justify-center gap-8">
        {shopData.map((data, index) => (
            <div
                key={index}
                className="max-w-sm w-full bg-white border-2 border-blue-600 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
                <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                    {data.shop.charAt(0).toUpperCase() + data.shop.slice(1)}
                </h3>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-semibold text-blue-500">
                            Average Sales per Day:
                        </span>{' '}
                        KSH {data.average_sales_per_day.toFixed(2)}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold text-blue-500">
                            Sales to Target Ratio:
                        </span>{' '}
                        {(data.sales_to_target_ratio * 100).toFixed(2)}%
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold text-blue-500">
                            Profit Margin:
                        </span>{' '}
                        {data.profit_margin.toFixed(2)}%
                    </p>
                </div>
            </div>
        ))}
    </div>
</div>


            {/* Performance Trends Chart */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Performance Trends</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <canvas id="performanceTrends" className="w-full" height="400"></canvas>
                </div>
            </div>

            {/* Alerts Section */}
            {alerts.length > 0 && (
                <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                    <h4 className="font-bold">Alerts</h4>
                    <ul>
                        {alerts.map((alert, index) => (
                            <li key={index} className="mb-2">{alert}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PerformancePage;
