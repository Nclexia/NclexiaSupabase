import { Suspense } from "react";
import  DetailPage from "./UserByID";
function SearchBarFallback() {
    return <>Loading...</>
  }
export default function Page() {
    
  return (
    <div>

      <Suspense fallback={<SearchBarFallback/>}>
        <DetailPage />
      </Suspense>
    </div>
  );
}
