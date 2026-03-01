import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

export const getJobs = async () => {
    const res = await api.get('/jobs');
    return res.data;
};

export const getJobById = async (id) => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
};

export const createJob = async (jobData) => {
    const res = await api.post('/jobs', jobData);
    return res.data;
};

export const deleteJob = async (id) => {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
};

export const applyForJob = async (applicationData) => {
    const res = await api.post('/applications', applicationData);
    return res.data;
};

export const getUserApplications = async () => {
    const res = await api.get('/applications/user');
    return res.data;
};

export const syncUser = async (userData) => {
    const res = await api.post('/auth/sync', userData);
    return res.data;
};

export const logoutUser = async () => {
    const res = await api.post('/auth/logout');
    return res.data;
};

export const getUserInfo = async () => {
    const res = await api.get('/auth/me');
    return res.data;
};

// Newly added routes
export const getPeople = async () => {
    const res = await api.get('/people');
    return res.data;
};

export const getHiringSites = async () => {
    const res = await api.get('/hiring-sites');
    return res.data;
};

export const getResumes = async () => {
    const res = await api.get('/resumes');
    return res.data;
};

export default api;
