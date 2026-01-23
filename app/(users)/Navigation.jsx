import Link from "next/link";

export default function Navigation() {
  return (
    <header className="grid grid-cols-2 p-4 bg-gray-200">
      <div className="">Fav icon</div>
      <nav>
        <ul className="flex gap-4 list-none">
          <li>
            <Link href="/" className="no-underline text-gray-800 hover:text-black">Home</Link>
          </li>
          <li>
            <Link href="/about" className="no-underline text-gray-800 hover:text-black">About</Link>
          </li>
          <li>
            <Link href="/services" className="no-underline text-gray-800 hover:text-black">Service</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
