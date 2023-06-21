import Category from "@/components/Category/Category";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="pb-52">
      <Category id={params.categoryId} />
    </div>
  );
};

export default page;
