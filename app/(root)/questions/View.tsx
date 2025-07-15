"use client";

import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({ questionId }: { questionId: string }) => {
  //TODO: FIND BETTER SOLUTION
  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });

    if (result.success) {
      toast.success("Views incremented successfully");
    } else {
      toast.error(result.error?.message || "Failed to increment views");
    }
  };

  useEffect(() => {
    handleIncrement();
  }, []);

  return null;
};

export default View;
