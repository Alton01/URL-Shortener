"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ShortenForm() {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
        }),
      });

      await response.json();
      setUrl("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className=" flex flex-col space-y-4">
        <Input
          className="h-12 border-black font-serif"
          placeholder="Add the URL you want to shorten"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button disabled={isLoading} className="w-full p-2 mt-4" type="submit">
          {" "}
          {isLoading ? "Shortening URL...." : " Shorten URL"}
        </Button>
      </div>
    </form>
  );
}
