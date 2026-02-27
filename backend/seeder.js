const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const dummyJobs = [
    // Featured Jobs
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
    },
    {
        title: "Product Designer",
        company: "Microsoft",
        location: "Victoria, Australia",
        type: "Full-Time",
        category: "Design",
        tags: ["Marketing", "Design"],
        description: "Microsoft is looking for a Product Designer.",
    },
    {
        title: "Lead Designer",
        company: "Canva",
        location: "Ontario, Canada",
        type: "Full-Time",
        category: "Design",
        tags: ["Design", "Business"],
        description: "Canva is looking for a Lead Designer.",
    },
    {
        title: "Brand Strategist",
        company: "Webflow",
        location: "Madrid, Spain",
        type: "Full-Time",
        category: "Marketing",
        tags: ["Marketing"],
        description: "Webflow is looking for a Brand Strategist.",
    },
    {
        title: "Data Analyst",
        company: "Twitter",
        location: "San Bruno, CA",
        type: "Full-Time",
        category: "Business",
        tags: ["Business"],
        description: "Twitter is looking for a Data Analyst.",
    },

    // Latest Jobs
    {
        title: "Social Media Assistant",
        company: "Nomad",
        location: "Paris, France",
        type: "Full-Time",
        category: "Marketing",
        tags: ["Marketing", "Design"],
        description: "Nomad is looking for a Social Media Assistant.",
    },
    {
        title: "Social Media Assistant",
        company: "Netlify",
        location: "Paris, France",
        type: "Full-Time",
        category: "Marketing",
        tags: ["Marketing", "Design"],
        description: "Netlify is looking for a Social Media Assistant.",
    },
    {
        title: "Brand Designer",
        company: "Maze",
        location: "San Francisco, US",
        type: "Full-Time",
        category: "Design",
        tags: ["Marketing", "Design"],
        description: "Maze is looking for a Brand Designer.",
    },
    {
        title: "Interactive Developer",
        company: "Terraform",
        location: "Hamburg, Germany",
        type: "Full-Time",
        category: "Engineering",
        tags: ["Marketing", "Design"],
        description: "Terraform is looking for an Interactive Developer.",
    },
    {
        title: "Interactive Developer",
        company: "Udacity",
        location: "Hamburg, Germany",
        type: "Full-Time",
        category: "Engineering",
        tags: ["Marketing", "Design"],
        description: "Udacity is looking for an Interactive Developer.",
    },
    {
        title: "HR Manager",
        company: "Packer",
        location: "Lucerne, Switzerland",
        type: "Full-Time",
        category: "Human Resources",
        tags: ["Marketing", "Design"],
        description: "Packer is looking for an HR Manager.",
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        await Job.deleteMany(); // Clear existing
        console.log("Old jobs cleared");

        await Job.insertMany(dummyJobs);
        console.log("Database seeded successfully with Figma dummy data!");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error with data seed", err);
        mongoose.connection.close();
    }
};

seedDB();
