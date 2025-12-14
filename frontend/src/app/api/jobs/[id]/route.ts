import { jobs } from "../../data";

export async function PATCH(req: Request) {
  const id = Number(req.url.split("/").pop());
  const data = await req.json();
  const job = jobs.find((j) => j.id === id);
  if (!job) return new Response("Job not found", { status: 404 });

  Object.assign(job, data);
  return new Response(JSON.stringify(job), { status: 200 });
}

export async function DELETE(req: Request) {
  const id = Number(req.url.split("/").pop());
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return new Response("Job not found", { status: 404 });

  jobs.splice(index, 1);
  return new Response("Deleted", { status: 200 });
}