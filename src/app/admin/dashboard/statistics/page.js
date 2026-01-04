"use client";

import Wrapper from "@/components/Wrapper";

export default function page() {
  return (
    <Wrapper>
      <iframe
        src="http://localhost:3003/umami/embed/f06f0a70-3ae8-4a97-be99-2cabc4bf1660"
        className="w-full h-[800px] rounded-xl border"
      />
    </Wrapper>
  );
}
