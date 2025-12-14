"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  title: string;
  company: string;
};

export default function EditJob({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job>({ title: "", company: "" });
  const [loading, setLoading] = useState(true);

  const id = params.id;

  // Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          alert("Job not found");
          return;
        }
        const data = await res.json();
        setJob({ title: data.title || "", company: data.company || "" });
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Error fetching job");
      }
    };

    fetchJob();
  }, [id]);

  const updateJob = async () => {
    if (!job.title || !job.company) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        alert("Job updated!");
        router.push("/jobs"); // Redirect back to jobs list
      } else {
        alert("Error updating job");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Job Title"
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Company Name"
        value={job.company}
        onChange={(e) => setJob({ ...job, company: e.target.value })}
      />
      <button
        onClick={updateJob}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Job
      </button>
    </div>
  );
}
