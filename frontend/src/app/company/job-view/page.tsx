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

export default function JobViewPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
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
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  // Start editing a job
  const startEdit = (job: Job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title || "",
      location: job.location || "",
      salary: job.salary || "",
      type: job.type || "",
      status: job.status || "Open",
    });
  };

  const cancelEdit = () => {
    setEditingJobId(null);
    setFormData({ title: "", location: "", salary: "", type: "", status: "" });
  };

  const saveEdit = async (id: number) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, ...formData } : job))
      );
      cancelEdit();
      alert("Job updated!");
    } else {
      alert("Error updating job");
    }
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
        <div className="mb-6 flex flex-wrap gap-4">
          <Link
            href="/company"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/company/create-job"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Create Job
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-black">ID</th>
                <th className="py-2 px-4 border-b text-black">Title</th>
                <th className="py-2 px-4 border-b text-black">Location</th>
                <th className="py-2 px-4 border-b text-black">Salary</th>
                <th className="py-2 px-4 border-b text-black">Type</th>
                <th className="py-2 px-4 border-b text-black">Status</th>
                <th className="py-2 px-4 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center text-black">{job.id}</td>

                  {/* Editable fields */}
                  {editingJobId === job.id ? (
                    <>
                      <td className="py-2 px-4 border-b">
                        <input
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          value={formData.salary}
                          onChange={(e) =>
                            setFormData({ ...formData, salary: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b text-black">{job.title}</td>
                      <td className="py-2 px-4 border-b text-black">{job.location}</td>
                      <td className="py-2 px-4 border-b text-black">{job.salary}</td>
                      <td className="py-2 px-4 border-b text-black">{job.type}</td>
                      <td className="py-2 px-4 border-b text-black">{job.status}</td>
                    </>
                  )}

                  {/* Action buttons */}
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    {editingJobId === job.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(job.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
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
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
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
      </div>
    </div>
  );
}