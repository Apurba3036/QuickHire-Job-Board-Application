import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
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
import { formatDistanceToNow } from 'date-fns';

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
import { getUserApplications } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function UserDashboard() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getUserApplications();
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchApplications();
        }
    }, [user]);

    // Calculate dynamic stats
    const stats = [
        { label: 'Applied Jobs', value: applications.length.toString(), icon: Briefcase, color: 'blue' },
        { label: 'In Review', value: applications.filter(a => !a.status || a.status === 'In Review').length.toString(), icon: Clock, color: 'yellow' },
        { label: 'Interviewing', value: applications.filter(a => a.status === 'Interviewing').length.toString(), icon: CheckCircle, color: 'emerald' },
        { label: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length.toString(), icon: XCircle, color: 'red' },
    ];

    if (loading) return <LoadingSpinner fullScreen />;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
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
                                        data: [0, 0, 0, 0, applications.length],
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
                                <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                                    <stat.icon size={20} />
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
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Application History</h2>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {applications.length} TOTAL
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-6 py-4">Role / Company</th>
                                <th className="px-6 py-4">Applied Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {applications.length > 0 ? applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 text-blue-600 rounded-lg w-10 h-10 flex items-center justify-center font-bold">
                                                <span>{(app.job_id?.company || 'C').charAt(0)}</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{app.job_id?.title || 'Unknown Role'}</div>
                                                <div className="text-sm text-gray-500">{app.job_id?.company || 'Unknown Company'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-gray-600 text-sm">
                                        {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            app.status === 'Interviewing' ? 'bg-emerald-50 text-emerald-600' :
                                            app.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                                            'bg-yellow-50 text-yellow-600'
                                        }`}>
                                            {app.status || 'In Review'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <a 
                                            href={app.resume_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors"
                                        >
                                            <FileText size={16} />
                                            Resume
                                        </a>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="text-gray-400 mb-2">
                                            <Briefcase size={40} className="mx-auto" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800">No applications yet</h3>
                                        <p className="text-gray-500">You haven't applied to any jobs yet. Start your search now!</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
