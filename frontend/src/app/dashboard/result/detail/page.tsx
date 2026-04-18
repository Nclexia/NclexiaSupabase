import { Suspense } from "react";
import TestResult from "./testResult"; 

export default function Page() {
  return (
    <div>
      <h1>Test Result Page</h1>

      <Suspense fallback={<div>Loading test result...</div>}>
        <TestResult />
      </Suspense>
    </div>
  );
}
