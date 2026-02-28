import React, { useState } from 'react';
import { applyForJob } from '../services/api';
import { useOutletContext } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function ApplicationModal({ job, onClose }) {
    const { user } = useOutletContext() || {};

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        resume_link: '',
        cover_note: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await applyForJob({
                job_id: job._id || job.id,
                user_id: user?._id || null,
                ...formData
            });
            alert("Application submitted successfully!");
            onClose();
        } catch (err) {
            console.error("Submission error", err);
            alert("Failed to submit application.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-2xl font-bold">Apply for {job.title}</h2>
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <p className="text-sm text-gray-500 mb-2">at {job.company} • {job.location}</p>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Full Name *</span></label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Email Address *</span></label>
                        <input
                            type="email"
                            name="email"
                            required
                            readOnly={!!user?.email}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`input input-bordered w-full ${user ? 'bg-gray-100' : ''}`}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Resume Link (URL) *</span></label>
                        <input
                            type="url"
                            name="resume_link"
                            required
                            value={formData.resume_link}
                            onChange={handleChange}
                            placeholder="https://drive.google.com/..."
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Cover Note</span></label>
                        <textarea
                            name="cover_note"
                            value={formData.cover_note}
                            onChange={handleChange}
                            className="textarea textarea-bordered h-24"
                            placeholder="Why are you a good fit for this role?"
                        ></textarea>
                    </div>

                    <div className="mt-6 flex gap-4 justify-end">
                        <button type="button" onClick={onClose} className="btn btn-ghost" disabled={loading}>Cancel</button>
                        <button type="submit" className="btn btn-primary px-8" disabled={loading}>
                            {loading ? <LoadingSpinner size="1.25rem" color="white" /> : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
