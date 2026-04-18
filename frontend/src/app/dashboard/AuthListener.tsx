"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";



export default function AuthListener() {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/");
      }
      setIsInitialized(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (isInitialized && !session) {
          router.push("/");
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [router, isInitialized]);

  return null;
}