import Card from "../components/Card";
import { DashNavbar } from "../components/DashNav";
import NoteCard from "../components/NoteCard";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../hooks/AuthContext";

export  const Dashboard=()=> {
  const { user, logout } = useAuth();
  return (
    <section className="bg-gradient-to-tl from-slate-800 via-blue-950 to-slate-700">
     <DashNavbar />
      <div className="flex">
        <div className="w-1xs">
        <SideBar />
        </div>
      <div className="w-screen">
      <h1 className="text-2xl font-semibold mx-10 my-8 text-gray-200">Happy To See You Back! {user.name}</h1>
        <NoteCard/>
     </div>
     </div>
    
    </section>
  );
}
