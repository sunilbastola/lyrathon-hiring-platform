'use client' //render on the client side
import React from 'react';
import Link from 'next/link';

const CompanyPage: React.FC = () => {
  // Mock data for applicant details (replace with actual data fetching)
  const applicants = [
    { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Software Engineer', status: 'Applied' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer', status: 'Interviewed' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', position: 'Manager', status: 'Hired' },
  ];

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Company Dashboard - Applicant Details</h1>
        <p className="mb-6 text-gray-900">Here you can view and manage applicant details for your hiring platform.</p>

        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Link href="/company/create-job" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Create Job
          </Link>
          <Link href="/company/job-view" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            View Jobs
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-black">ID</th>
                <th className="py-2 px-4 border-b text-black">Name</th>
                <th className="py-2 px-4 border-b text-black">Email</th>
                <th className="py-2 px-4 border-b text-black">Position</th>
                <th className="py-2 px-4 border-b text-black">Status</th>
                <th className="py-2 px-4 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center text-gray-900">{applicant.id}</td>
                  <td className="py-2 px-4 border-b text-gray-900">{applicant.name}</td>
                  <td className="py-2 px-4 border-b text-gray-900">{applicant.email}</td>
                  <td className="py-2 px-4 border-b text-gray-900">{applicant.position}</td>
                  <td className="py-2 px-4 border-b text-gray-900">{applicant.status}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link href="/company/applicant-detail" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2 inline-block">
                      View Details
                    </Link>
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-black">Add New Applicant</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                placeholder="Enter applicant name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                placeholder="Enter applicant email"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                placeholder="Enter position applied for"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Applicant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;