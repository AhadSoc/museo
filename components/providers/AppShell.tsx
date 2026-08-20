"use client";

import { AppReadyProvider } from "./AppReadyContext";
import { CursorProvider } from "@/components/cursor/CursorContext";
import { UIStateProvider } from "./UIStateProvider";
import SmoothScrollProvider from "./SmoothScrollProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navigation from "@/components/navigation/Navigation";
import MenuOverlay from "@/components/navigation/MenuOverlay";
import SearchOverlay from "@/components/navigation/SearchOverlay";
import PageTransitionLayer from "@/components/transitions/PageTransitionLayer";
import Loader from "@/components/transitions/Loader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppReadyProvider>
      <CursorProvider>
        <UIStateProvider>
          <SmoothScrollProvider>
            <Loader />
            <CustomCursor />
            <div className="grain-overlay" />
            <div className="vignette-overlay" />
            <Navigation />
            <MenuOverlay />
            <SearchOverlay />
            <PageTransitionLayer />
            {children}
          </SmoothScrollProvider>
        </UIStateProvider>
      </CursorProvider>
    </AppReadyProvider>
  );
}
