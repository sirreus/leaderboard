import React, { useEffect, useState } from "react";

import { Stack } from "@mui/material";

interface IAvatarSpinner {
  avatars: string[];
}

export const AvatarSpinner: React.FC<IAvatarSpinner> = ({ avatars }) => {
  const loading = true;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItem, setDisplayedItem] = useState<string>(
    avatars[currentIndex]
  );

  useEffect(() => {
    while (loading) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % avatars.length;
        setCurrentIndex(nextIndex);
        setDisplayedItem(avatars[nextIndex]);
      }, 700);

      return () => clearInterval(interval);
    }
  }, [loading, currentIndex]);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <img src={displayedItem} alt="" width={32} />
    </Stack>
  );
};
