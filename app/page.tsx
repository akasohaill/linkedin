import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  const user=await currentUser();


  return (
    <div className="pt-20">
      <div className="max-w-6xl gap-8 mx-auto flex justify-between">
        {/* sidebar */}
        <Sidebar user={user}/>
        {/* feeds */}
        <Feed user={user}/>
        {/* news */}
        <News/>
      </div>
    </div>
  );
}
