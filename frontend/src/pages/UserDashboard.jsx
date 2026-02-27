import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);
import { useAuth } from '../context/AuthContext';

export default function UserDashboard() {
    const { user } = useAuth();

    // Mock user dashboard data
    const stats = [
        { label: 'Applied Jobs', value: '12', icon: Briefcase, color: 'blue' },
        { label: 'In Review', value: '4', icon: Clock, color: 'yellow' },
        { label: 'Interviewing', value: '2', icon: CheckCircle, color: 'emerald' },
        { label: 'Rejected', value: '6', icon: XCircle, color: 'red' },
    ];

    const recentApplications = [
        { id: 1, role: 'Frontend Developer', company: 'Google', date: '2 days ago', status: 'In Review' },
        { id: 2, role: 'UI/UX Designer', company: 'Airbnb', date: '5 days ago', status: 'Interviewing' },
        { id: 3, role: 'React Engineer', company: 'Netflix', date: '1 week ago', status: 'Rejected' },
    ];

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Welcome back, {user?.name || 'User'}!</h1>
                <p className="text-gray-500 text-sm mt-1">Here is the status of your recent applications.</p>
            </div>

            {/* Stats Grid & Chart Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Application Activity</h2>
                    </div>
                    <div className="flex-1 w-full min-h-[250px]">
                        <Line
                            data={{
                                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                                datasets: [
                                    {
                                        label: 'Applications Submitted',
                                        data: [2, 4, 3, 6, 2],
                                        borderColor: '#4834D4',
                                        backgroundColor: 'rgba(72, 52, 212, 0.1)',
                                        tension: 0.4,
                                        fill: true
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                                    <stat.icon className="text-xl" />
                                </div>
                                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Recent Applications</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th>Role / Company</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplications.map((app) => (
                                <tr key={app.id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-gray-100 text-gray-600 rounded-lg w-10 h-10 flex items-center justify-center font-bold">
                                                    <span>{app.company.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{app.role}</div>
                                                <div className="text-sm text-gray-500">{app.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{app.date}</td>
                                    <td>
                                        <span className={`badge badge-sm font-medium ${app.status === 'In Review' ? 'badge-warning' :
                                            app.status === 'Interviewing' ? 'badge-success' :
                                                'badge-error'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <th className="text-right">
                                        <button className="btn btn-ghost btn-xs text-blue-600">View Details</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
