import Link, { LinkProps } from 'next/link';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface T extends LinkProps {}

function ButtonPlay({ ...props }: T) {
  return (
    <Link
      className="flex items-center justify-center bg-danger w-[66px] h-[66px] rounded-full -translate-y-[8px] text-white active:bg-active-danger active:text-secondary transition"
      {...props}
    >
      <i className="text-[25px]  translate-x-1">
        <FaPlay />
      </i>
    </Link>
  );
}

export default ButtonPlay;
