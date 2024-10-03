import React from "react";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortCode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = params;

  const url = await prisma.url.findUnique({
    where: { shortCode: shortCode },
  });

  if (!url) {
    return (
      <div className="items-center flex justify-center min-h-screen h-full">
        <div className="flex flex-col space-y-4">
          <h1 className="text-red-600 text-2xl text-center font-semibold ">
            OOPS!! 404 - URL NOT FOUND!
          </h1>
          <Link
            className="text-blue-600 underline text-center font-semibold text-xl"
            href=""
          >
            Go To HomePage
          </Link>
        </div>
      </div>
    );
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
}
