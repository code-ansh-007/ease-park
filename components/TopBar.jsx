import { useRouter } from "next/router";
import { VT323 } from "next/font/google";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";


const vt = VT323({ subsets: ["latin"], weight: ["400"] });
function TopBar({ role }) {
  const router = useRouter();
  return (
    <main className={`bg-[#161B24]  font-vt bg-transparent z-20 `}>
      <div className=" h-[72px] bg-[#319A3C]  z-20">
        <div className="flex justify-evenly items-center h-full pt-3">
          <img src="Menu.svg" alt="" />
          <img src="easepark.svg" alt="" width={'150px'}  />
          {role !== "admin" ? (
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              <img src="user.svg" alt="" />
            </button>
          ) : (
            <div>
              {role === "admin" && (
                <Link href={"/guard"}>
                  <div>
                    <MdAdminPanelSettings size={34} className="text-white" />
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default TopBar;
