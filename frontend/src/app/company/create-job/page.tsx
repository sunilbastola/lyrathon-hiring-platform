"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  title: string;
  company: string;
  location: string;
  salary: number;
  type: string;
  status: string;
  description: string;
};

export default function CreateJob() {
  const router = useRouter();
  const [job, setJob] = useState<Job>({
    title: "",
    company: "",
    location: "",
    salary: 0,
    type: "Full-time",
    status: "Open",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: name === 'salary' ? parseInt(value) || 0 : value,
    }));
  };

  const createJob = async () => {
    if (!job.title || !job.company || !job.location || !job.salary || !job.description) {
      alert("Please fill all required fields");
      return;
    }

    if (job.salary < 1000 || job.salary > 1000000) {
      alert("Salary must be between 1,000 and 1,000,000");
      return;
    }

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        alert("Job created!");
        setJob({
          title: "",
          company: "",
          location: "",
          salary: 0,
          type: "Full-time",
          status: "Open",
          description: "",
        });
        router.push('/company/job-view');
      } else {
        alert("Error creating job");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Create New Job</h1>
        <p className="mb-6 text-gray-600">Fill in the details to post a new job opening.</p>

        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap gap-4">
          <a href="/company" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
            Back to Dashboard
          </a>
          <a href="/company/job-view" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            View Jobs
          </a>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); createJob(); }}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={job.title}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
              placeholder="e.g., Software Engineer"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={job.company}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
              placeholder="e.g., Tech Corp"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={job.location}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
              placeholder="e.g., New York, NY"
              required
            />
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary ($)</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={job.salary || ""}
              onChange={handleChange}
              min="1000"
              max="1000000"
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
              placeholder="e.g., 80000"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              id="type"
              name="type"
              value={job.type}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={job.status}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={job.description}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
              placeholder="Describe the job responsibilities and requirements..."
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}