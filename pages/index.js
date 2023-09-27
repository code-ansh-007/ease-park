import MapBox from "@/components/MapBox";
import useGeoLocation from "@/hooks/useGeoLocation";

export default function Home() {
  const location = useGeoLocation();
  return (
    <main>
      <MapBox />
    </main>
  );
}
