import Link from "next/link";

export default function JobViewPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Job Details</h1>

      {/* job details here */}

      <Link href={`/jobs/${id}/edit`}>
        <button>Edit Job</button>
      </Link>
    </div>
  );
}
