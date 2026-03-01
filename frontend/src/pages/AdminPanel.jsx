import React, { useState, useEffect } from 'react';
import { getJobs, deleteJob, createJob } from '../services/api';
import { Trash2, Edit, ExternalLink, RefreshCw, Plus, Briefcase, Users, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function AdminPanel() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (err) {
            console.error("Failed to fetch jobs in admin", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4834D4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteJob(id);
                setJobs(jobs.filter(job => job._id !== id && job.id !== id));
                toast.success("Job deleted successfully");
            } catch (err) {
                console.error("Failed to delete", err);
                toast.error("Failed to delete job");
            }
        }
    };


    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">Overview and management of your listings</p>
                </div>
                <Link to="/admin/post-job" className="btn bg-[#4834D4] hover:bg-[#392eb0] text-white border-none flex items-center gap-2 rounded-lg px-4 md:px-6 w-full sm:w-auto justify-center text-sm md:text-base h-11 min-h-0">
                    <Plus className="w-5 h-5 font-bold" /> Create New Job
                </Link>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Application Statistics</h2>
                        </div>
                        <div className="flex-1 w-full min-h-[250px]">
                            <Bar
                                data={{
                                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                    datasets: [
                                        {
                                            label: 'Job Views',
                                            data: [120, 190, 300, 250, 200, 150, 400],
                                            backgroundColor: 'rgba(59, 130, 246, 0.8)',
                                            borderRadius: 4,
                                        },
                                        {
                                            label: 'Applications',
                                            data: [40, 60, 120, 90, 80, 50, 140],
                                            backgroundColor: 'rgba(72, 52, 212, 0.9)',
                                            borderRadius: 4,
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'top' } },
                                    scales: { y: { beginAtZero: true, grid: { borderDash: [4, 4] } } }
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex items-center gap-4">
                            <div className="p-3 md:p-4 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-gray-800">{jobs.length}</div>
                                <div className="text-xs md:text-sm text-gray-500 font-medium">Active Jobs</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex items-center gap-4">
                            <div className="p-3 md:p-4 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                                <Users className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-gray-800">580</div>
                                <div className="text-xs md:text-sm text-gray-500 font-medium">Total Applicants</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex items-center gap-4">
                            <div className="p-3 md:p-4 rounded-lg bg-orange-100 text-orange-600 shrink-0">
                                <Eye className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-gray-800">1,610</div>
                                <div className="text-xs md:text-sm text-gray-500 font-medium">Profile Views</div>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th>Job Title / Company</th>
                                <th>Location</th>
                                <th>Category</th>
                                <th>Date Posted</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-8"><LoadingSpinner /></td></tr>
                            ) : jobs.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No jobs posted yet.</td></tr>
                            ) : jobs.map((job) => (
                                <tr key={job._id || job.id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-gray-100 text-gray-600 rounded-lg w-10 h-10 flex items-center justify-center font-bold">
                                                    <span>{job.company?.[0] || 'C'}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{job.title}</div>
                                                <div className="text-sm text-gray-500">{job.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{job.location}</td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">{job.category}</span>
                                    </td>
                                    <td><span className="text-sm text-gray-500">Just now</span></td>
                                    <th className="text-right">
                                        <button onClick={() => handleDelete(job._id || job.id)} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50" title="Delete Job">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
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
