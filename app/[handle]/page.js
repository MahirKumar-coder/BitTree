import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle
  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  // STEP 1: First, CHECK if a document with this handle already exists.
  const item = await collection.findOne({ handle: handle });
  if (!item) {
    return notFound();
  }

  console.log(item)

  const item2 = {
    "_id": {
      "$oid": "68f0e8b6775d975678bb4617"
    },
    "links": [
      {
        "link": "Instagram",
        "linkText": "https://www.instagram.com/artfuldesiigns/"
      },
      {
        "link": "Facebook",
        "linkText": "https://www.facebook.com/mahir.sharma.583671/"
      }
    ],
    "handle": "mahir",
    "pic": "https://avatars.githubusercontent.com/u/199339620?v=4"
  }
  return <div className="flex min-h-screen bg-[#2c1d19] text-white items-start py-10 justify-center">
    {item && <div className="photo flex justify-center items-center flex-col gap-4">
      <img src={item.pic} alt="" />
      <span className="font-bold text-xl">@{item.handle}</span>
      <span className="desc w-80 text-center">{item.desc}</span>
      <div className="links">
        {item.links.map((item, index) => {
          return <Link key={index} href={item.linkText}><div className="py-4 shadow-lg min-w-96 flex justify-center px-2 bg-black rounded-md my-3" >
            {item.link}
          </div>
          </Link>
        })}
      </div>
    </div>}
  </div>
} 