import { DashNavbar } from "@/components/Dash-Navbar";
import { NoteCard } from "@/components/NoteCard";
import { SideBar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddBrain } from "../components/AddBrain";
import { useEffect, useState } from "react";
import axios from "axios";
import { UseContent } from "@/hooks/UseContent";

export const Dashboard =  () => {
  const { contents, ContentData } = UseContent();

  return (
    <div className="bg-">
      <DashNavbar />
      <div className="flex">
        <SideBar />
        <div className="h-screen w-screen">
          <AddBrain />

          <div className="mt-5 ml-15 grid grid-cols-3 gap-5">
            {contents.map(({ title, link, type, tags }) => (
              <NoteCard title={title} link={link} type={type} tags={tags} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
