import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesItem = ({ items }) => {
  return (
    <>
      {items && (
        <>
          <h1 className="my-2 text-lg font-semibold">
            Let&apos;s listen to a new song
          </h1>
          <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2">
            {items?.map((item) => (
              <Link
                title={item.name}
                href={`/category/${item.id}`}
                key={item.id}
                className="w-20"
              >
                <div className="mb-1 aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    alt={item.name}
                    src={item.icons[0].url}
                    fill
                    className="unset"
                  />
                </div>
                <p className="truncate text-xs">{item.name}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesItem;
