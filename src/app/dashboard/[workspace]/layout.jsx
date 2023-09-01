"use client";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentWorkspace } from "../../../redux/slices/user-slice";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { value } = useSelector((store) => store.user);
  const { workspace } = useParams();
  const dispatch = useDispatch();

  const findCurrentWorkSpace = value.allWorkspaces.find(
    (work) => work.id == workspace
  );

  useEffect(() => {
    if (findCurrentWorkSpace) {
      dispatch(addCurrentWorkspace(findCurrentWorkSpace));
    }
  }, [findCurrentWorkSpace]);

  return (
    <main className="grid grid-rows-[auto,_1fr] px-3 pt-16">
      <h2 className="capitalize">
        {value.currentWorkspace.name}
      </h2>
      {children}
    </main>
  );
}
