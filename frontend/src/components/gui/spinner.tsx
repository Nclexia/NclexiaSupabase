

import { useState ,useEffect} from "react";
import { RingLoader   } from "react-spinners";

import { useTheme } from 'next-themes';


function RingLoaderSpin() {
  let { resolvedTheme } = useTheme()

  let [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // To prevent hydration error

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Wait until client-side mount

  return (

<div>
<RingLoader  
      color={`${resolvedTheme == "dark" ? "#1e2d4f" : "#cce4ff"}`}

      loading={loading}
      speedMultiplier={10}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
</div>
   

  );
}
export default RingLoaderSpin;