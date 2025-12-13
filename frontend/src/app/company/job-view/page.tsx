'use client';
import React from 'react';
import Link from 'next/link';

const JobViewPage: React.FC = () => {
  // Mock data for jobs (replace with actual data fetching)
  const jobs = [
    { id: 1, title: 'Software Engineer', location: 'New York, NY', salary: '$80,000 - $100,000', type: 'Full-time', status: 'Open' },
    { id: 2, title: 'Designer', location: 'San Francisco, CA', salary: '$70,000 - $90,000', type: 'Full-time', status: 'Closed' },
    { id: 3, title: 'Manager', location: 'Austin, TX', salary: '$90,000 - $110,000', type: 'Full-time', status: 'Open' },
  ];

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
        <p className="mb-6 text-gray-600">View and manage your posted job openings.</p>

        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Link href="/company" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
            Back to Dashboard
          </Link>
          <Link href="/company/create-job" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Create Job
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Salary</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{job.id}</td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b">{job.location}</td>
                  <td className="py-2 px-4 border-b">{job.salary}</td>
                  <td className="py-2 px-4 border-b">{job.type}</td>
                  <td className="py-2 px-4 border-b">{job.status}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobViewPage;