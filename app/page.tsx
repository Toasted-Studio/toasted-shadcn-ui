import { ThemeToggle } from "@/components/theme-toggle";
import { UniversalPass } from "@/components/toasted/test-wallet-card";
import BoardingPass from "@/components/toasted/wallet-card";
import PortfolioCard from "@/components/toasted/portfolio-card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative">
      <div className="absolute top-0 right-0 mt-10 mr-10">
        <ThemeToggle />
      </div>
      <main className="my-32 mx-auto">
        <h1 className="text-4xl font-bold">
          <Link
            href="https://toasted.studio"
            className="hover:underline bg-[#efe8dd] text-black"
          >
            Toasted Studio
          </Link>{" "}
          - shadcn-ui components
        </h1>
        <div className="flex flex-col mt-20">
          <UniversalPass
            flight="DL701"
            departure={{
              city: "NYC-KENNEDY",
              code: "JFK",
              time: "11:20AM",
            }}
            arrival={{
              city: "LOS ANGELES",
              code: "LAX",
            }}
            passenger="AILEEN ZEIGEN"
            gate="B26"
            zone="3"
            seat="20B"
          />
          <div className="mt-20">
            <BoardingPass />
          </div>
          <div className="mt-20">
            <PortfolioCard />
          </div>
        </div>
      </main>
    </div>
  );
}
