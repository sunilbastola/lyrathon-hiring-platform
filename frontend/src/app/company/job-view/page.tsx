"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  location?: string;
  salary?: string;
  type?: string;
  status?: string;
};

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const deleteJob = async (id: number) => {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
      alert("Job deleted!");
    } else {
      alert("Error deleting job");
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Job Listings</h1>

        <div className="mb-6 flex gap-4">
          <Link href="/company" className="bg-gray-600 text-white py-2 px-4 rounded">
            Back to Dashboard
          </Link>
          <Link href="/company/create-job" className="bg-indigo-600 text-white py-2 px-4 rounded">
            Create Job
          </Link>
        </div>

        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Location</th>
              <th className="p-2">Salary</th>
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-2 text-center">{job.id}</td>
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.location}</td>
                <td className="p-2">{job.salary}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">{job.status}</td>
                <td className="p-2 space-x-2">
                  <Link
                    href={`/jobs/${job.id}/edit`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
