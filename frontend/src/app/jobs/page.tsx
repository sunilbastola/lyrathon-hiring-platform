"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: string;
  location?: string;
  salary?: number;
  type?: string;
  status?: string;
  description?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    fetchJobs();
    // Refresh jobs every 5 seconds to see newly created jobs
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Try to fetch from Django backend
      const res = await fetch("http://localhost:8000/api/jobs/");
      if (res.ok) {
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } else {
        console.log("Backend not ready, using fallback");
        setJobs([]);
      }
    } catch (err) {
      console.log("Using fallback - API not available yet");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || (job.location?.toLowerCase().includes(filterLocation.toLowerCase()) ?? false);
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">Lyrathon Hiring Platform</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-2 text-black">Available Jobs</h1>
          <p className="mb-6 text-gray-900">Browse and apply for exciting job opportunities.</p>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Job Title or Company
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                placeholder="e.g., Software Engineer, Tech Corp"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Location
              </label>
              <input
                type="text"
                id="location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                placeholder="e.g., New York, NY"
              />
            </div>
          </div>

          {/* Refresh Button */}
          <div className="mb-6">
            <button
              onClick={fetchJobs}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Refresh Jobs
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-900">Loading jobs...</p>
            </div>
          )}

          {/* Jobs Table */}
          {!loading && (
            <>
              {filteredJobs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-black">Job Title</th>
                        <th className="py-2 px-4 border-b text-black">Company</th>
                        <th className="py-2 px-4 border-b text-black">Location</th>
                        <th className="py-2 px-4 border-b text-black">Salary</th>
                        <th className="py-2 px-4 border-b text-black">Type</th>
                        <th className="py-2 px-4 border-b text-black">Status</th>
                        <th className="py-2 px-4 border-b text-black">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b text-gray-900">{job.title}</td>
                          <td className="py-2 px-4 border-b text-gray-900">{job.company}</td>
                          <td className="py-2 px-4 border-b text-gray-900">{job.location || "N/A"}</td>
                          <td className="py-2 px-4 border-b text-gray-900">
                            {job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b text-gray-900">{job.type || "N/A"}</td>
                          <td className="py-2 px-4 border-b text-center">
                            <span
                              className={`px-3 py-1 rounded text-white text-sm font-medium ${
                                job.status === "Open"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {job.status || "N/A"}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 inline-block"
                            >
                              View & Apply
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-900">No jobs found. Check back soon!</p>
                </div>
              )}
            </>
          )}

          {/* Results Count */}
          {!loading && filteredJobs.length > 0 && (
            <div className="mt-4 text-sm text-gray-900">
              Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} out of {jobs.length} total
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Lyrathon Hiring Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}