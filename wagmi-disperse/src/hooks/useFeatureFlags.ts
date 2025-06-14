import { useState, useEffect } from "react";

// Feature flags for gradual migration
export interface FeatureFlags {
  useStateMachine: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  useStateMachine: false, // Start with state machine disabled
};

// Check URL params and localStorage for feature flags
function getFeatureFlags(): FeatureFlags {
  const flags = { ...DEFAULT_FLAGS };
  
  // Check URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get("useStateMachine") === "true") {
    flags.useStateMachine = true;
  }
  
  // Check localStorage
  try {
    const stored = localStorage.getItem("disperseFeatureFlags");
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(flags, parsed);
    }
  } catch (e) {
    // Ignore parsing errors
  }
  
  return flags;
}

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlags>(getFeatureFlags);
  
  useEffect(() => {
    // Allow toggling via console
    (window as any).disperseFeatures = {
      enable: (feature: keyof FeatureFlags) => {
        const newFlags = { ...flags, [feature]: true };
        setFlags(newFlags);
        localStorage.setItem("disperseFeatureFlags", JSON.stringify(newFlags));
        console.log(`Feature "${feature}" enabled. Refresh to apply.`);
      },
      disable: (feature: keyof FeatureFlags) => {
        const newFlags = { ...flags, [feature]: false };
        setFlags(newFlags);
        localStorage.setItem("disperseFeatureFlags", JSON.stringify(newFlags));
        console.log(`Feature "${feature}" disabled. Refresh to apply.`);
      },
      status: () => {
        console.table(flags);
      },
    };
    
    return () => {
      delete (window as any).disperseFeatures;
    };
  }, [flags]);
  
  return flags;
}