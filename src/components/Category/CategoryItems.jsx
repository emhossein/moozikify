"use client";

import Image from "next/image";
import { UserIcon } from "../Icons";
import blurhash from "@/utils/blurhash";
import { useRouter } from "next/navigation";

const CategoryItems = ({ items, title }) => {
  const router = useRouter();

  const handleNavigation = (id) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <>
      {items && (
        <div>
          <h1 className="my-2 text-lg font-semibold">{title}</h1>
          <dvi className="flex flex-wrap items-center justify-start space-x-2 space-y-2">
            {items?.map((item, index) => {
              if (item === null) {
                return null;
              }

              return (
                <div
                  title={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className="relative w-40 select-none hover:cursor-pointer"
                  key={item.id + "-" + index}
                >
                  <div
                    className={`pointer-events-none mb-2 aspect-square h-40 select-none overflow-hidden
                       rounded-lg
                    `}
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
                    className={`line-clamp-1 select-none text-center 
                      text-xs
                   `}
                  >
                    {item.name}
                  </p>
                </div>
              );
            })}
          </dvi>
        </div>
      )}
    </>
  );
};

export default CategoryItems;
