import Link from "next/dist/client/link";
import { useEffect, useState, useCallback } from "react";


const Header = () => {

  return (
    <div className={`header`}>
      <Link href="/">
        <a>
          <button>Home</button>
        </a>
      </Link>
    </div>
  );
};

export default Header;