import { jobs } from "../data";

export async function GET() {
  // Return all jobs
  return new Response(JSON.stringify(jobs), { status: 200 });
}

export async function POST(req) {
  const job = await req.json();
  job.id = Date.now();
  jobs.push(job);
  return new Response(JSON.stringify(job), { status: 201 });
}

