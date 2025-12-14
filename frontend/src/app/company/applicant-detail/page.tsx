"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Applicant = {
  name: string;
  email: string;
  position: string;
  phoneNumber: string;
  coverLetter: string;
  cv: File | null;
  assessmentFile: File | null;
};

export default function ApplicantDetail() {
  const router = useRouter();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cv' | 'assessment') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF or DOCX file");
        return;
      }
      // Validate file size (max 10MB)
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
    if (!applicant.name || !applicant.email || !applicant.position || !applicant.phoneNumber || !applicant.cv || !applicant.assessmentFile) {
      alert("Please fill all required fields including CV and assessment file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', applicant.name);
      formData.append('email', applicant.email);
      formData.append('position', applicant.position);
      formData.append('phoneNumber', applicant.phoneNumber);
      formData.append('coverLetter', applicant.coverLetter);
      if (applicant.cv) {
        formData.append('cv', applicant.cv);
      }
      if (applicant.assessmentFile) {
        formData.append('assessmentFile', applicant.assessmentFile);
      }

      const res = await fetch("/api/applicants", {
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
        router.push('/company');
      } else {
        alert("Error submitting application");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Applicant Details</h1>
        <p className="mb-6 text-gray-600">Please fill in your information to apply for the job position.</p>

        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap gap-4">
          <a href="/company" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
            Back to Dashboard
          </a>
          <a href="/company/job-view" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            View Jobs
          </a>
        </div>

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
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position Applied For</label>
            <input
              type="text"
              id="position"
              name="position"
              value={applicant.position}
              onChange={handleChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-300"
              placeholder="e.g., Software Engineer"
              required
            />
          </div>
          <div>
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
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
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
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}