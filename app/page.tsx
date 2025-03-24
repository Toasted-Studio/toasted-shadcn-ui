import { ThemeToggle } from "@/components/theme-toggle";
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
      </main>
    </div>
  );
}
