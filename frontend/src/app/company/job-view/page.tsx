"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  location?: string;
  salary?: number;
  type?: string;
  status?: string;
};

export default function JobViewPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    type: "",
    status: "",
  });

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/jobs/");
      if (res.ok) {
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a job
  const startEdit = (job: Job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title || "",
      location: job.location || "",
      salary: job.salary?.toString() || "",
      type: job.type || "",
      status: job.status || "Open",
    });
  };

  const cancelEdit = () => {
    setEditingJobId(null);
    setFormData({ title: "", location: "", salary: "", type: "", status: "" });
  };

  const saveEdit = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          salary: parseInt(formData.salary) || 0,
        }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job.id === id
              ? {
                  ...job,
                  ...formData,
                  salary: parseInt(formData.salary) || 0,
                }
              : job
          )
        );
        cancelEdit();
        alert("Job updated!");
      } else {
        alert("Error updating job");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  const deleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job.id !== id));
        alert("Job deleted!");
      } else {
        alert("Error deleting job");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Job Listings</h1>
        <p className="mb-6 text-gray-900">View and manage your posted job openings.</p>

        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap gap-4">
          <a href="/company" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
            Back to Dashboard
          </a>
          <a href="/company/create-job" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Create Job
          </a>
          <button
            onClick={fetchJobs}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Refresh Jobs
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-900">Loading jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b text-black">ID</th>
                  <th className="py-2 px-4 border-b text-black">Title</th>
                  <th className="py-2 px-4 border-b text-black">Location</th>
                  <th className="py-2 px-4 border-b text-black">Salary ($)</th>
                  <th className="py-2 px-4 border-b text-black">Type</th>
                  <th className="py-2 px-4 border-b text-black">Status</th>
                  <th className="py-2 px-4 border-b text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-center text-gray-900">{job.id}</td>
                    <td className="py-2 px-4 border-b text-gray-900">
                      {editingJobId === job.id ? (
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
                        />
                      ) : (
                        job.title
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-900">
                      {editingJobId === job.id ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
                        />
                      ) : (
                        job.location
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-900">
                      {editingJobId === job.id ? (
                        <input
                          type="number"
                          value={formData.salary}
                          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                          min="1000"
                          max="1000000"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
                        />
                      ) : (
                        job.salary?.toLocaleString()
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-900">
                      {editingJobId === job.id ? (
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      ) : (
                        job.type
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-900">
                      {editingJobId === job.id ? (
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      ) : (
                        job.status
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {editingJobId === job.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(job.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(job)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-900">No jobs posted yet. <Link href="/company/create-job" className="text-indigo-600 hover:underline">Create your first job</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}