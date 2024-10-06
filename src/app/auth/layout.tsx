"use client";
import { Loader } from "@veluxlink/components";
import { useUser } from "@veluxlink/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  if (loading || user)
    return (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );

  return children;
}
