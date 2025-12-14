"use client";

import { useState } from "react";

type Job = {
  title: string;
  company: string;
};

export default function CreateJob() {
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const createJob = async () => {
    if (!title || !company) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company }),
      });

      if (res.ok) {
        alert("Job created!");
        setTitle("");
        setCompany("");
      } else {
        alert("Error creating job");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Job</h1>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button
        onClick={createJob}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Job
      </button>
    </div>
  );
}
