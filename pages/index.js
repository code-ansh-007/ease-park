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
    let timeStamp = new Date(siteData.timeStamp);
    siteData.timeStamp = timeStamp.toDateString();
    sites.push(siteData);
  });

  return {
    props: {
      sites,
    },
  };
}
