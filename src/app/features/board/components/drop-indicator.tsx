"use client";

import { memo } from "react";

interface DropIndicatorProps {
    readonly isVisible: boolean;
}

export const DropIndicator = memo(function DropIndicator({ isVisible }: DropIndicatorProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="h-2 bg-purple-400 rounded-full mx-2 my-2 opacity-60 animate-pulse" />
    );
});

