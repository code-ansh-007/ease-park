import MapBox from "@/components/MapBox";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home({ sites }) {
  return (
    <main>
      <MapBox sites={sites} />
    </main>
  );
}

export async function getServerSideProps() {
  let sites = [];
  const q = query(collection(db, "listings"));

  const qSnap = await getDocs(q);
  qSnap.forEach((doc) => {
    const siteData = doc.data();
    if (siteData.timeStamp && siteData.timeStamp.seconds) {
      const serverTimestamp = new Date(siteData.timeStamp.seconds * 1000);
      siteData.timeStamp = serverTimestamp.toDateString();
    }
    sites.push(siteData);
  });

  return {
    props: {
      sites,
    },
  };
}
