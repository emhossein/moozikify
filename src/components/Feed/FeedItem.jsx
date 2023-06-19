"use client";

import HorizontalScrollView from "../HorizontalScrollView";
import Image from "next/image";
import { UserIcon } from "../Icons";
import blurhash from "@/utils/blurhash";
import { useRouter } from "next/navigation";

const FeedItem = ({ items, title, type }) => {
  const router = useRouter();

  const handleNavigation = (id) => {
    router.push(`/${type}/${id}`);
  };

  return (
    <>
      {items && (
        <div>
          <h1 className="my-2 text-lg font-semibold">{title}</h1>
          <HorizontalScrollView className="no-scrollbar | mb-4 flex w-full space-x-2 overflow-x-scroll pr-4 last:pr-4">
            {items?.map((item) => {
              if (item === null) {
                return null;
              }

              return (
                <div
                  title={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className="relative w-20 select-none hover:cursor-pointer"
                  key={item.id}
                >
                  <div
                    className={`pointer-events-none mb-2 aspect-square h-20 select-none overflow-hidden ${
                      type === "artist" ? "rounded-full" : "rounded-lg"
                    }`}
                  >
                    <div className="h-full">
                      {item.images.length ? (
                        <Image
                          fill
                          src={item?.images?.[item?.images.length - 1].url}
                          alt={item.name}
                          className="unset | pointer-events-none select-none"
                          placeholder="blur"
                          blurDataURL={blurhash}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-dark">
                          <UserIcon size={60} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p
                    className={`line-clamp-1 select-none text-xs ${
                      type === "artist" && "text-center"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              );
            })}
          </HorizontalScrollView>
        </div>
      )}
    </>
  );
};

export default FeedItem;
