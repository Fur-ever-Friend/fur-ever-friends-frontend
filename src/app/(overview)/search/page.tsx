"use client";

import { useState } from "react";
import FeedCard from "@/components/Card/FeedCard";
import Image from "next/image";


export default function FeedPage() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state when the user types
  };

  const filteredFeed = fakeFeedData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filtering logic

  return (
    <div>
     
      <div className="w-full">
        <div className="flex justify-center">
          <div className="items-center"></div>

          <div className="justify-self-center">
            <div className="flex items-center gap-4">
              <div className="bg-white flex border-2 border-bright-blue rounded-md w-full ">
                <Image
                  src="/search.svg"
                  width={16}
                  height={16}
                  className="ml-3"
                  alt="search"
                />
                <input
                  type="text"
                  className="w-full p-3 rounded-md focus:outline-none text-black bg-white"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch} // Capture user input
                />
              </div>
              <button className="w-fit h-fit">
                <Image
                  src="/filter.svg"
                  width={25}
                  height={48}
                  alt="filter"
                />
              </button>
            </div>

            <div className="mt-8 grid gap-8">
              
              {filteredFeed.map((item, index) => (
                <FeedCard key={index}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy feed data for demonstration
const fakeFeedData = [
  { title: "Adopt a Cat" },
  { title: "Best Dog Parks" },
  { title: "Pet Care Tips" },
  { title: "Adopt a Dog" },
];