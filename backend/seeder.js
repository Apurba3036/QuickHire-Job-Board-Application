const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const Person = require('./models/Person');
const HiringSite = require('./models/HiringSite');
const Resume = require('./models/Resume');

dotenv.config();

const dummyJobs = [
    // ... [Original dummy jobs retained]
    {
        title: "Email Marketing",
        company: "Principle",
        location: "Madrid, Spain",
        type: "Part-Time",
        category: "Marketing",
        tags: ["Marketing", "Design"],
        description: "Principle is looking for an Email Marketing Specialist to join the team.",
    },
    {
        title: "Brand Designer",
        company: "Dropbox",
        location: "San Francisco, US",
        type: "Full-Time",
        category: "Design",
        tags: ["Design", "Business"],
        description: "Dropbox is looking for a Brand Designer to help shape the future.",
    },
    {
        title: "Email Marketing",
        company: "Twitch",
        location: "Paris, France",
        type: "Full-Time",
        category: "Marketing",
        tags: ["Marketing"],
        description: "Twitch is looking for an Email Marketing specialist.",
    },
    {
        title: "Visual Designer",
        company: "Twitter",
        location: "Victoria, Australia",
        type: "Full-Time",
        category: "Design",
        tags: ["Design"],
        description: "Twitter is looking for a Visual Designer to help us build.",
    }
];

const dummyPeople = [
    { name: "Alice Johnson", role: "Software Engineer", location: "New York, USA", profilePic: "https://i.pravatar.cc/150?u=alice", skills: ["React", "Node.js", "MongoDB"] },
    { name: "Bob Smith", role: "Product Manager", location: "London, UK", profilePic: "https://i.pravatar.cc/150?u=bob", skills: ["Strategy", "Agile", "Roadmapping"] },
    { name: "Charlie Davis", role: "UX Designer", location: "Berlin, Germany", profilePic: "https://i.pravatar.cc/150?u=charlie", skills: ["Figma", "Prototyping", "User Research"] },
    { name: "Diana Prince", role: "Data Scientist", location: "Toronto, Canada", profilePic: "https://i.pravatar.cc/150?u=diana", skills: ["Python", "Machine Learning", "SQL"] },
    { name: "Eve Adams", role: "Marketing Specialist", location: "Sydney, Australia", profilePic: "https://i.pravatar.cc/150?u=eve", skills: ["SEO", "Content Marketing", "Analytics"] },
    { name: "Frank Wright", role: "DevOps Engineer", location: "San Francisco, USA", profilePic: "https://i.pravatar.cc/150?u=frank", skills: ["AWS", "Docker", "Kubernetes"] },
    { name: "Grace Hopper", role: "Backend Developer", location: "Chicago, USA", profilePic: "https://i.pravatar.cc/150?u=grace", skills: ["Java", "Spring Boot", "Microservices"] },
    { name: "Hank Pym", role: "Frontend Developer", location: "Austin, USA", profilePic: "https://i.pravatar.cc/150?u=hank", skills: ["Vue.js", "Tailwind CSS", "TypeScript"] }
];

const dummyHiringSites = [
    { name: "LinkedIn", url: "https://linkedin.com", description: "The world's largest professional network." },
    { name: "Indeed", url: "https://indeed.com", description: "The #1 job site in the world." },
    { name: "Glassdoor", url: "https://glassdoor.com", description: "Find the job that fits your life." },
    { name: "Monster", url: "https://monster.com", description: "Find the right job, right now." },
    { name: "ZipRecruiter", url: "https://ziprecruiter.com", description: "The smartest way to hire and get hired." },
    { name: "SimplyHired", url: "https://simplyhired.com", description: "Job search engine." }
];

const dummyResumes = [
    { userName: "Alice Johnson", jobTitle: "Software Engineer", url: "https://example.com/resume/alice.pdf" },
    { userName: "Bob Smith", jobTitle: "Product Manager", url: "https://example.com/resume/bob.pdf" },
    { userName: "Charlie Davis", jobTitle: "UX Designer", url: "https://example.com/resume/charlie.pdf" },
    { userName: "Diana Prince", jobTitle: "Data Scientist", url: "https://example.com/resume/diana.pdf" },
    { userName: "Eve Adams", jobTitle: "Marketing Specialist", url: "https://example.com/resume/eve.pdf" },
    { userName: "Frank Wright", jobTitle: "DevOps Engineer", url: "https://example.com/resume/frank.pdf" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        await Job.deleteMany();
        await Person.deleteMany();
        await HiringSite.deleteMany();
        await Resume.deleteMany();
        console.log("Old data cleared");

        await Job.insertMany(dummyJobs);
        await Person.insertMany(dummyPeople);
        await HiringSite.insertMany(dummyHiringSites);
        await Resume.insertMany(dummyResumes);
        console.log("Database seeded successfully with all dummy data!");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error with data seed", err);
        mongoose.connection.close();
    }
};

seedDB();
