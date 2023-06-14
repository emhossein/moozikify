"use client";

import HorizontalScrollView from "../HorizontalScrollView";
import Image from "next/image";
import Link from "next/link";

const FeedItem = ({ items, title, type }) => {
  return (
    <>
      {items && (
        <>
          <h1 className="my-2 text-lg font-semibold">{title}</h1>
          <HorizontalScrollView className="no-scrollbar | mb-4 flex w-full space-x-2 overflow-x-scroll last:mr-4">
            {items?.map((item) => (
              <Link href={`/${type}/${item.id}`} key={item.id}>
                <div
                  className={`mb-2 aspect-square  h-20 overflow-hidden ${
                    type === "artist" ? "rounded-full" : "rounded-lg"
                  }`}
                >
                  <div className="">
                    <Image
                      fill
                      src={item.images[item.images.length - 1].url}
                      alt={item.name}
                      className="unset | pointer-events-none select-none"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p
                  className={`line-clamp-1 select-none text-xs ${
                    type === "artist" && "text-center"
                  }`}
                >
                  {item.name}
                </p>
              </Link>
            ))}
          </HorizontalScrollView>
        </>
      )}
    </>
  );
};

export default FeedItem;
