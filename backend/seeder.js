const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const Person = require('./models/Person');
const HiringSite = require('./models/HiringSite');
const Resume = require('./models/Resume');

dotenv.config();

const dummyJobs = [
    { title: "Senior Frontend Engineer", company: "Stripe", location: "San Francisco, CA", type: "Full-Time", category: "Engineering", tags: ["React", "TypeScript", "Frontend"], description: "Join our core payments team." },
    { title: "Backend API Developer", company: "Netflix", location: "Remote", type: "Full-Time", category: "Engineering", tags: ["Node.js", "Java", "Backend"], description: "Scale the backend architecture that serves millions." },
    { title: "Principal Product Designer", company: "Figma", location: "New York, NY", type: "Full-Time", category: "Design", tags: ["UI/UX", "Prototyping", "Design"], description: "Help build the future of collaborative design tools." },
    { title: "Growth Marketing Manager", company: "Spotify", location: "Stockholm, Sweden", type: "Full-Time", category: "Marketing", tags: ["Growth", "Analytics"], description: "Drive user acquisition strategies globally." },
    { title: "Data Scientist", company: "Airbnb", location: "Seattle, WA", type: "Full-Time", category: "Data", tags: ["Python", "Machine Learning", "Data"], description: "Optimize pricing algorithms and matching." },
    { title: "iOS Developer", company: "Uber", location: "London, UK", type: "Contract", category: "Engineering", tags: ["Swift", "Mobile"], description: "Build the next generation rider experience." },
    { title: "DevOps Engineer", company: "AWS", location: "Austin, TX", type: "Full-Time", category: "Engineering", tags: ["AWS", "Kubernetes", "CI/CD"], description: "Maintain critical cloud infrastructure." },
    { title: "Technical Writer", company: "Notion", location: "Remote", type: "Part-Time", category: "Content", tags: ["Writing", "Documentation"], description: "Create guides and docs for power users." },
    { title: "Brand Designer", company: "Dropbox", location: "San Francisco, US", type: "Full-Time", category: "Design", tags: ["Design", "Branding"], description: "Dropbox is looking for a Brand Designer to help shape the future." },
    { title: "Email Marketing Specialist", company: "Twitch", location: "Paris, France", type: "Full-Time", category: "Marketing", tags: ["Email", "Campaigns"], description: "Twitch is looking for an Email Marketing specialist." },
    { title: "Visual Designer", company: "Twitter", location: "Sydney, Australia", type: "Contract", category: "Design", tags: ["Design", "Visuals"], description: "Help us build engaging visual content." },
    { title: "Software Engineer Intern", company: "Google", location: "Mountain View, CA", type: "Internship", category: "Engineering", tags: ["C++", "Java", "Intern"], description: "Summer 2026 Software Engineering Internship." },
    { title: "Android Developer", company: "Robinhood", location: "Menlo Park, CA", type: "Full-Time", category: "Engineering", tags: ["Kotlin", "Mobile"], description: "Democratize finance for all." },
    { title: "UX Researcher", company: "Zoom", location: "Remote", type: "Full-Time", category: "Design", tags: ["Research", "User Testing"], description: "Understand how people communicate." },
    { title: "Community Manager", company: "Discord", location: "San Francisco, CA", type: "Full-Time", category: "Marketing", tags: ["Community", "Social"], description: "Manage our largest gaming partnerships." },
    { title: "Security Analyst", company: "Cloudflare", location: "Remote", type: "Contract", category: "Engineering", tags: ["Security", "Network"], description: "Protect millions of websites from attacks." },
    { title: "Sales Executive", company: "Salesforce", location: "Chicago, IL", type: "Full-Time", category: "Sales", tags: ["B2B", "SaaS"], description: "Enterprise software sales." },
    { title: "VP of Engineering", company: "Vercel", location: "Remote", type: "Full-Time", category: "Management", tags: ["Leadership", "Next.js"], description: "Lead the open source and platform teams." },
    { title: "Content Strategist", company: "Pinterest", location: "Los Angeles, CA", type: "Full-Time", category: "Content", tags: ["Strategy", "SEO"], description: "Shape our content discovery engine." },
    { title: "Machine Learning Engineer", company: "OpenAI", location: "San Francisco, CA", type: "Full-Time", category: "Engineering", tags: ["AI", "PyTorch"], description: "Train next generation foundational models." }
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
