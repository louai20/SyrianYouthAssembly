"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ScholarshipForm from "@/components/ScholarshipForm";

interface Props {
  formFields: any[];
}

export default function ScholarshipFormWrapper({ formFields }: Props) {
  const [prefillData, setPrefillData] = useState<Record<string, string>>({});
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      if (!data.user) return;

      const firstName = data.user.user_metadata?.first_name ?? "";
      const lastName = data.user.user_metadata?.last_name ?? "";
      const fullName = [firstName, lastName].filter(Boolean).join(" ");
      

      setPrefillData({
        "user.email": data.user.email ?? "",
        "user_metadata.full_name": fullName,
        "user_metadata.phone": data.user.user_metadata?.phone ?? "",
      });

      //console.log("PrefillData:", data.user);
    };

    fetchUser();
  }, [supabase]);

  return <ScholarshipForm formFields={formFields} prefillData={prefillData} />;
}
