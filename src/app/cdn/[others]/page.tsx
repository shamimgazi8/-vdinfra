'use client'
import { usePathname } from "next/navigation";

const Others =()=>{
      const pathname = usePathname();
      const currentPage = pathname.split('/').filter(Boolean).pop();
    return <div className=" flex justify-center items-center">
        welcome  {currentPage}
    </div>
}
export default Others