"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Job = {
  id: number;
  title: string;
  company: string;
  location?: string;
  salary?: number;
  type?: string;
  status?: string;
  description?: string;
  assessmentDescription?: string;
};

type Applicant = {
  name: string;
  email: string;
  position: string;
  phoneNumber: string;
  coverLetter: string;
  cv: File | null;
  assessmentFile: File | null;
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = parseInt(params.id as string);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicant, setApplicant] = useState<Applicant>({
    name: "",
    email: "",
    position: "",
    phoneNumber: "",
    coverLetter: "",
    cv: null,
    assessmentFile: null,
  });

  const [cvFileName, setCvFileName] = useState<string>("");
  const [assessmentFileName, setAssessmentFileName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      // Try to fetch from Django backend
      const res = await fetch(`http://localhost:8000/api/jobs/${jobId}/`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
        setApplicant((prev) => ({ ...prev, position: data.title }));
        return;
      }
    } catch (err) {
      console.log("API not available, showing error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cv' | 'assessment') => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF or DOCX file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      if (fileType === 'cv') {
        setApplicant((prev) => ({ ...prev, cv: file }));
        setCvFileName(file.name);
      } else if (fileType === 'assessment') {
        setApplicant((prev) => ({ ...prev, assessmentFile: file }));
        setAssessmentFileName(file.name);
      }
    }
  };

  const submitApplication = async () => {
    if (!applicant.name || !applicant.email || !applicant.phoneNumber || !applicant.cv || !applicant.assessmentFile) {
      alert("Please fill all required fields including CV and assessment file");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('name', applicant.name);
      formData.append('email', applicant.email);
      formData.append('position', applicant.position);
      formData.append('phoneNumber', applicant.phoneNumber);
      formData.append('coverLetter', applicant.coverLetter);
      formData.append('jobId', jobId.toString());
      if (applicant.cv) {
        formData.append('cv', applicant.cv);
      }
      if (applicant.assessmentFile) {
        formData.append('assessmentFile', applicant.assessmentFile);
      }

      const res = await fetch("http://localhost:8000/api/applicants/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        setApplicant({
          name: "",
          email: "",
          position: "",
          phoneNumber: "",
          coverLetter: "",
          cv: null,
          assessmentFile: null,
        });
        setCvFileName("");
        setAssessmentFileName("");
        router.push('/jobs');
      } else {
        alert("Error submitting application");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-900">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/jobs">
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">Lyrathon Hiring Platform</h1>
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-900 mb-4">Job not found</p>
            <Link href="/jobs">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Back to Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/jobs">
              <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">Lyrathon Hiring Platform</h1>
            </Link>
            <Link href="/jobs">
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Back to Jobs
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-4 text-black">{job.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Company</p>
              <p className="text-lg text-gray-900">{job.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Location</p>
              <p className="text-lg text-gray-900">{job.location || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Salary</p>
              <p className="text-lg text-gray-900">{job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Job Type</p>
              <p className="text-lg text-gray-900">{job.type || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${
                  job.status === "Open" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {job.status || "N/A"}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-black">Job Description</h2>
            <p className="text-gray-900 whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.assessmentDescription && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-black">Assessment</h2>
              <p className="text-gray-900 whitespace-pre-wrap">{job.assessmentDescription}</p>
            </div>
          )}
        </div>

        {/* Application Form */}
        {job.status === "Open" ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-black">Apply for this Position</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); submitApplication(); }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={applicant.name}
                  onChange={handleChange}
                  className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={applicant.email}
                  onChange={handleChange}
                  className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                  placeholder="e.g., john@example.com"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={applicant.phoneNumber}
                  onChange={handleChange}
                  className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                  placeholder="e.g., +1-234-567-8900"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter (Optional)</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  value={applicant.coverLetter}
                  onChange={handleChange}
                  className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
                  placeholder="Tell us why you're a great fit for this position..."
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Upload CV/Resume (PDF or DOCX)</label>
                <div className="mt-1 flex items-center">
                  <label className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 bg-white text-gray-900">
                    <input
                      type="file"
                      id="cv"
                      accept=".pdf,.docx,.doc"
                      onChange={(e) => handleFileChange(e, 'cv')}
                      className="hidden"
                      required
                    />
                    <span className="text-gray-700">{cvFileName || "Choose CV/Resume File"}</span>
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">Allowed formats: PDF, DOCX (Max 10MB)</p>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="assessmentFile" className="block text-sm font-medium text-gray-700">Upload Assessment (PDF or DOCX)</label>
                <div className="mt-1 flex items-center">
                  <label className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 bg-white text-gray-900">
                    <input
                      type="file"
                      id="assessmentFile"
                      accept=".pdf,.docx,.doc"
                      onChange={(e) => handleFileChange(e, 'assessment')}
                      className="hidden"
                      required
                    />
                    <span className="text-gray-700">{assessmentFileName || "Choose Assessment File"}</span>
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">Allowed formats: PDF, DOCX (Max 10MB)</p>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-900 mb-4">This position is currently closed for applications.</p>
          </div>
        )}
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