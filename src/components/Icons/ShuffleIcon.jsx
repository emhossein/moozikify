import React from "react";

const ShuffleIcon = ({ fill = "white" }) => {
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
        d="M8.28229 15.1775C8.26682 15.1941 8.25014 15.2123 8.23219 15.2318C8.01314 15.4703 7.60468 15.9149 6.89641 16.3248C6.13477 16.7656 4.99739 17.1802 3.3616 17.169L3.34985 18.8845C5.30149 18.8979 6.73836 18.3984 7.7557 17.8096C8.69496 17.2661 9.25218 16.658 9.48917 16.3994C9.5074 16.3795 9.52428 16.3611 9.53873 16.3455C9.70547 16.1662 9.87173 15.9889 10.04 15.8094C11.2157 14.5556 12.4924 13.1939 14.7396 10.2772C16.3659 8.16624 18.6012 7.68752 19.1113 7.67476H19.6822L18.3531 9.00389C18.1293 9.34759 18.1682 9.81241 18.4698 10.114C18.7522 10.3964 19.1777 10.4485 19.5129 10.2702L22.3596 7.42352C22.6946 7.08854 22.6946 6.54544 22.3596 6.21046L19.6266 3.4775C19.2898 3.29184 18.8577 3.34184 18.572 3.62748C18.2747 3.92485 18.2327 4.38091 18.4461 4.72308L19.6822 5.95922L19.0947 5.95922L19.087 5.95936C18.1513 5.97607 15.3796 6.63559 13.3806 9.23018C11.1842 12.0811 9.9526 13.3946 8.78739 14.6372L8.78587 14.6389C8.61754 14.8184 8.45058 14.9964 8.28229 15.1775Z"
        fill={fill}
      />
      <path
        d="M8.23243 8.7683C8.25035 8.7878 8.26699 8.80592 8.28244 8.82254C8.45073 9.00356 8.61769 9.18162 8.78602 9.36115L8.78718 9.36239C9.19752 9.8 9.61644 10.2468 10.0825 10.766L11.3774 9.64034C10.8925 9.09962 10.4601 8.63843 10.0405 8.19094C9.87217 8.01144 9.70562 7.83381 9.53888 7.65446C9.52443 7.63891 9.5081 7.62109 9.48986 7.60119C9.25287 7.34259 8.69511 6.73394 7.75585 6.19037C6.73851 5.60162 5.30164 5.10213 3.35 5.1155L3.36175 6.831C4.99754 6.81979 6.13492 7.23442 6.89656 7.67519C7.60482 8.08508 8.01338 8.52983 8.23243 8.7683Z"
        fill={fill}
      />
      <path
        d="M13.3808 14.7698C13.2863 14.6472 13.1936 14.5275 13.1027 14.4104L14.3993 13.2833C14.5103 13.4258 14.6237 13.5722 14.7397 13.7228C16.3661 15.8338 18.6014 16.3125 19.1115 16.3252H19.6824L18.3533 14.9961C18.1294 14.6524 18.1683 14.1876 18.4699 13.886C18.7523 13.6036 19.1779 13.5515 19.513 13.7298L22.3598 16.5765C22.6947 16.9115 22.6947 17.4546 22.3598 17.7895L19.6268 20.5225C19.2899 20.7082 18.8578 20.6582 18.5722 20.3725C18.2748 20.0751 18.2328 19.6191 18.4462 19.2769L19.6824 18.0408H19.0949L19.0872 18.0406C18.1514 18.0239 15.3797 17.3644 13.3808 14.7698Z"
        fill={fill}
      />
    </svg>
  );
};

export default ShuffleIcon;
