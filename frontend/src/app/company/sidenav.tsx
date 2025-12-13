import Link from 'next/link';

export default function SideNav() {
  return (
    <nav className="flex flex-col bg-gray-800 text-white w-64 h-full p-4">
      <h2 className="text-xl font-bold mb-6">Company Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/company" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/company/create-job" className="block py-2 px-4 rounded hover:bg-gray-700">
            Create Job
          </Link>
        </li>
        <li>
          <Link href="/company/job-view" className="block py-2 px-4 rounded hover:bg-gray-700">
            Job View
          </Link>
        </li>
        <li>
          <Link href="/company/applicant-detail" className="block py-2 px-4 rounded hover:bg-gray-700">
            Applicant Detail
          </Link>
        </li>
        <li>
          <Link href="/login" className="block py-2 px-4 rounded hover:bg-gray-700">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}