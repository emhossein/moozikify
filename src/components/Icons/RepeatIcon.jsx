import React from "react";

const RepeatIcon = ({ fill = "white" }) => {
  return (
    <svg
      className="px-0.5"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.9155 4.60331C19.8723 4.60331 20.648 5.37896 20.648 6.33577V14.6349C20.648 15.5917 19.8723 16.3673 18.9155 16.3673H14.6723L16.3462 14.6935C16.5655 14.3562 16.5229 13.8954 16.2213 13.5938C15.919 13.2914 15.4566 13.2493 15.1191 13.4705L11.9686 16.621C11.6303 16.9593 11.6303 17.5078 11.9686 17.8461L15.0888 20.9663C15.4283 21.2126 15.9097 21.1792 16.2202 20.8687C16.5228 20.5661 16.5622 20.1012 16.336 19.7635L14.6723 18.0998H18.9155C20.8291 18.0998 22.3804 16.5485 22.3804 14.6349V6.33577C22.3804 4.42215 20.8291 2.87085 18.9155 2.87085H7.04536C5.13174 2.87085 3.58044 4.42215 3.58044 6.33577V14.6349C3.58044 16.5485 5.13174 18.0998 7.04536 18.0998H9.7096V16.3673H7.04536C6.08855 16.3673 5.3129 15.5917 5.3129 14.6349V6.33577C5.3129 5.37896 6.08855 4.60331 7.04536 4.60331H18.9155Z"
        fill={fill}
      />
    </svg>
  );
};

export default RepeatIcon;
