"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

type Url = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyUrl] = useState<string>("");

  const shortenedUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [urls]);

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenedUrl(code)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopyUrl(code);
      setTimeout(() => {
        setCopied(false);
        setCopyUrl("");
      }, 5000);
    });
  };

  return (
    <div className=" flex flex-col space-y-3">
      <h2 className="text-xl font-semibold text-center my-4 underline uppercase">
        Recent URLs
      </h2>
      <ul className="space-y-4">
        {urls?.map((url) => (
          <li
            key={url.id}
            className="flex items-center gap-2 justify-between border border-black bg-card rounded-md text-card-foreground p-4"
          >
            <Link
              href={`/${url.shortCode}`}
              className="text-blue-500 font-serif underline"
              target="_blank"
            >
              {shortenedUrl(url.shortCode)}
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground hover:bg-muted"
                onClick={() => handleCopyUrl(url.shortCode)}
              >
                {copied && copyUrl == url.shortCode ? (
                  <>
                    {" "}
                    {
                      ""
                    } <CheckIcon className="w-4 h-4 text-black font-bold" />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <CopyIcon className="w-4 h-4" />
                    <span className="sr-only">Copy Url</span>{" "}
                  </>
                )}
              </Button>
              <span className=" flex gap-x-2 items-center font-serif">
                <EyeIcon className="h-4 w-4" />
                {""}
                {url.visits}
                {url.visits > 1 ? <h1>views </h1> : <h1>view</h1>}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
