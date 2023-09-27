import MapBox from "@/components/MapBox";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/auth/signin"}>
        <span className="p-1 bg-blue-500 text-white">click to sign in</span>
      </Link>
      <MapBox />
    </main>
  );
}
