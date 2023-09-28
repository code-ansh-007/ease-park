import { useRouter } from "next/router";
import { VT323 } from "next/font/google";


const vt = VT323({ subsets: ["latin"], weight: ["400"] });
function TopBar(props) {
  const router = useRouter();
  return (
    <main className={`bg-[#161B24]  font-vt bg-transparent z-20 `}>
      <div className=" h-[72px] bg-[#319A3C]  z-20">
        <div className="flex justify-evenly items-center h-full pt-3">
          <img src="Menu.svg" alt="" />
          <img src="easepark.svg" alt="" width={'150px'}  />
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            <img src="user.svg" alt="" />
          </button>
        </div>
      </div>
    </main>
  );
}
export default TopBar;
