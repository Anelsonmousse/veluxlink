"use client";
import { BottomBar, Loader, Modal } from "@veluxlink/components";
import { useUser } from "@veluxlink/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, error } = useUser();
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || error) router.replace("/auth/login");
  }, [user, error, router]);

  if (!user || error) return null;

  if (loading)
    return (
      <div className="w-full h-screen text-white font-bold flex items-center justify-center">
        <Loader />
      </div>
    );

  if (user)
    return (
      <>
        {children}
        <BottomBar
          profile={user.image}
          actions={{
            history: () => setShowHistory(true),
            home: () => router.push("/dashboard"),
            profile: () => router.push("/dashboard/profile"),
          }}
        />
        <Modal open={showHistory} onClose={() => setShowHistory(false)}>
          <p className="font-bold text-xl mb-4">History</p>
          <div>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border-b py-4 flex items-center justify-between border-b-white border-opacity-15"
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="pic"
                    className="rounded-full"
                    width={48}
                    height={48}
                    src="/pic.png"
                  />
                  <div>
                    <p className="font-bold text-sm md:text-base">
                      Ikechukwu Peter
                    </p>
                    <p className="flex items-center text-white text-xs md:text-sm text-opacity-25 gap-2">
                      <span>Voice Call</span>
                      <span>30:00</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm md:text-base">+$420</p>
                  <p className="text-white text-xs md:text-sm text-opacity-25">
                    12-05-2024
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
}
