"use client";

import React, { useEffect, useState } from "react";

import Me from "../../components/Me/Me";
import { fetchColorDom } from "@/utils/fetchColorDom";
import { useDataStore } from "@/zustand/store";

const Page = () => {
  const user = useDataStore((state) => state.user);

  const [colorData, setColorData] = useState(null);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const data = await fetchColorDom(user?.images[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColor();
  }, [user]);

  return (
    <div className="pb-52">
      {user && <Me user={user} colorData={colorData} />}
    </div>
  );
};

export default Page;
