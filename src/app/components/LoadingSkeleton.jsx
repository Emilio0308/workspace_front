import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const LoadingSkeleton = ({ quantity }) => {
  const getListOfSkeleton = () => {
    const List = [];
    for (let i = 1; i <= quantity; i++) {
      List.push(i);
    }
    return List;
  };

  const [listSkeleton] = useState(getListOfSkeleton());

  return (
    <>
      {listSkeleton.map((item) => (
        <Stack spacing={1} key={item}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rounded" height={60} />
        </Stack>
      ))}
    </>
  );
};
export default LoadingSkeleton;
