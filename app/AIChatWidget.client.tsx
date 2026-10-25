"use client";

import dynamic from "next/dynamic";

const AIChatWidget = dynamic(() => import("@/components/chat/AIChatWidget"), { ssr: false });

export default AIChatWidget;
