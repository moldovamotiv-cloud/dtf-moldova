import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const extension = pathname.split(".").pop()?.toLowerCase();
        if (extension !== "pdf") {
          throw new Error("Format de fișier neacceptat.");
        }
        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true
        };
      },
      onUploadCompleted: async () => {}
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({error: error.message || "Încărcarea a eșuat."},{status:400});
  }
}
