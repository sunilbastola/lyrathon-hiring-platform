import { jobs } from "../data"; // your in-memory job array

export async function GET() {
  // Return all jobs
  return new Response(JSON.stringify(jobs), { status: 200 });
}

export async function POST(req: Request) {
  const job = await req.json();
  if (!job.title || !job.company) {
    return new Response("Missing title or company", { status: 400 });
  }

  job.id = Date.now(); // unique id
  job.location = job.location || "";
  job.salary = job.salary || "";
  job.type = job.type || "Full-time";
  job.status = job.status || "Open";

  jobs.push(job);

  return new Response(JSON.stringify(job), { status: 201 });
}
