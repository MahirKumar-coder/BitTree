import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    // STEP 1: First, CHECK if a document with this handle already exists.
    const doc = await collection.findOne({ handle: body.handle });

    // STEP 2: If 'doc' is not null, it means the handle is taken. Return an error.
    if (doc) {
        return NextResponse.json({ success: false, error: true, message: 'This handle is already taken!' });
    }

    // STEP 3: If the handle is available (i.e., 'doc' is null), THEN insert the new data.
    const result = await collection.insertOne(body);

    // STEP 4: Return a success response.
    return NextResponse.json({ success: true, error: false, message: 'Your BitTree has been generated. Enjoy!', result: result });
}