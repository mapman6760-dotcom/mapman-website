import React from "react";

// Helper component for shimmer block
export const ShimmerBlock = ({ className = "" }) => (
  <div className={`animate-shimmer rounded-xl ${className}`} />
);

// 1. Home Skeleton
export const HomeSkeleton = () => {
  return (
    <div className="space-y-8 md:space-y-16 lg:space-y-24 py-2 md:py-6 relative animate-pulse">
      {/* Sleek Brand Banner Skeleton */}
      <div className="relative px-1">
        <div className="h-[140px] md:h-[160px] lg:h-[200px] bg-white border border-slate-100 rounded-2xl lg:rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-3 w-full">
            <ShimmerBlock className="h-4 w-32" />
            <ShimmerBlock className="h-8 w-2/3 md:w-1/2" />
            <ShimmerBlock className="h-3 w-3/4 md:w-2/3" />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <ShimmerBlock className="h-10 w-28" />
            <ShimmerBlock className="h-10 w-[1px] hidden lg:block" />
            <div className="hidden lg:flex gap-4">
              <div className="space-y-1"><ShimmerBlock className="h-5 w-12" /><ShimmerBlock className="h-2 w-8" /></div>
              <div className="space-y-1"><ShimmerBlock className="h-5 w-12" /><ShimmerBlock className="h-2 w-8" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Banners Slider Skeleton */}
      <div className="px-1 mb-4 md:mb-8">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shrink-0 w-[90%] sm:w-[85%] md:w-[60%] lg:w-[40%] h-[140px] sm:h-[160px] md:h-[200px] lg:h-[220px] bg-white border border-slate-100 rounded-[20px] p-6 md:p-8 flex items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <ShimmerBlock className="h-6 w-3/4" />
                <ShimmerBlock className="h-3 w-2/3" />
                <ShimmerBlock className="h-8 w-24 mt-2" />
              </div>
              <ShimmerBlock className="w-[30%] h-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid Skeleton */}
      <div className="space-y-8 px-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-12 h-1.5 bg-blue-100 rounded-full" />
            <ShimmerBlock className="h-4 w-28" />
          </div>
          <ShimmerBlock className="h-8 w-44" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 aspect-square">
              <ShimmerBlock className="w-20 h-20 rounded-3xl" />
              <ShimmerBlock className="h-4 w-24" />
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <ShimmerBlock className="h-2 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Shop List / Shop Card Skeleton
export const ShopCardSkeleton = () => {
  return (
    <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-4 border border-white/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-4">
      {/* Banner Area */}
      <div className="w-full h-44 md:h-52 bg-slate-50 relative rounded-[2rem] overflow-hidden p-4 flex flex-col justify-between">
        <div className="flex justify-between">
          <ShimmerBlock className="h-6 w-20" />
          <ShimmerBlock className="h-6 w-16" />
        </div>
        <div className="space-y-2">
          <ShimmerBlock className="h-6 w-2/3" />
          <div className="flex items-center gap-2">
            <ShimmerBlock className="w-6 h-6 rounded-full" />
            <ShimmerBlock className="h-3 w-1/2" />
          </div>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="pt-2 px-2 pb-2 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2 p-3 rounded-[1.25rem] bg-slate-50 border border-slate-100">
            <ShimmerBlock className="h-3 w-12" />
            <ShimmerBlock className="h-4 w-20" />
          </div>
          <div className="flex flex-col gap-2 p-3 rounded-[1.25rem] bg-slate-50 border border-slate-100">
            <ShimmerBlock className="h-3 w-12" />
            <ShimmerBlock className="h-4 w-20" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-1">
          <div className="space-y-1">
            <ShimmerBlock className="h-2.5 w-12" />
            <ShimmerBlock className="h-3.5 w-24" />
          </div>
          <ShimmerBlock className="w-10 h-10 rounded-[1rem]" />
        </div>
      </div>
    </div>
  );
};

export const ShopListSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20 font-sans animate-pulse">
      <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <ShimmerBlock className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <ShimmerBlock className="h-5 w-24" />
            <ShimmerBlock className="h-2.5 w-32" />
          </div>
        </div>
        <ShimmerBlock className="h-10 w-28 rounded-xl" />
      </header>

      <main className="max-w-6xl mx-auto p-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ShopCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

// 3. Shop Detail Skeleton
export const ShopDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-pulse">
      {/* Header Banner */}
      <div className="w-full h-64 md:h-96 bg-white relative overflow-hidden border-b border-slate-100 p-6 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full space-y-4">
          <ShimmerBlock className="h-6 w-24" />
          <ShimmerBlock className="h-10 w-2/3 md:w-1/2" />
          <div className="flex flex-wrap gap-4">
            <ShimmerBlock className="h-4 w-32" />
            <ShimmerBlock className="h-4 w-24" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <ShimmerBlock className="h-5 w-32" />
              <ShimmerBlock className="h-3.5 w-full" />
              <ShimmerBlock className="h-3.5 w-full" />
              <ShimmerBlock className="h-3.5 w-3/4" />
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <ShimmerBlock className="h-5 w-40" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <ShimmerBlock className="w-8 h-8 rounded-full" />
                    <div className="space-y-1.5 flex-1">
                      <ShimmerBlock className="h-3.5 w-16" />
                      <ShimmerBlock className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <ShimmerBlock className="h-5 w-32" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <ShimmerBlock className="h-3.5 w-16" />
                    <ShimmerBlock className="h-3.5 w-24" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <ShimmerBlock className="h-5 w-28" />
              <ShimmerBlock className="h-44 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// 4. Video Feed Skeleton
export const VideoFeedSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative animate-pulse">
      {/* Video Box Container */}
      <div className="relative w-full max-w-[480px] h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col justify-between p-6">
        {/* Top bar overlay */}
        <div className="flex justify-between items-center w-full relative z-10">
          <ShimmerBlock className="w-10 h-10 rounded-full bg-white/10" />
          <div className="flex gap-2">
            <ShimmerBlock className="w-16 h-7 rounded-full bg-white/10" />
            <ShimmerBlock className="w-16 h-7 rounded-full bg-white/10" />
          </div>
          <ShimmerBlock className="w-10 h-10 rounded-full bg-white/10" />
        </div>

        {/* Center Play Icon Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white/20 border-b-8 border-b-transparent translate-x-0.5" />
          </div>
        </div>

        {/* Bottom Details & Floating Interactions */}
        <div className="flex justify-between items-end w-full relative z-10 mt-auto">
          {/* Details */}
          <div className="space-y-3 flex-1 pr-12">
            <div className="flex items-center gap-3">
              <ShimmerBlock className="w-10 h-10 rounded-full bg-white/10" />
              <div className="space-y-1">
                <ShimmerBlock className="h-4 w-28 bg-white/10" />
                <ShimmerBlock className="h-2.5 w-16 bg-white/10" />
              </div>
            </div>
            <ShimmerBlock className="h-4 w-3/4 bg-white/10" />
            <ShimmerBlock className="h-3 w-1/2 bg-white/10" />
          </div>

          {/* Interactions */}
          <div className="flex flex-col gap-5 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <ShimmerBlock className="w-12 h-12 rounded-full bg-white/10" />
                <ShimmerBlock className="h-2 w-8 bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Video Thumbnail Card / Saved Items Skeleton
export const VideoCardSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-3 shadow-sm flex flex-col gap-3">
      <div className="relative aspect-[9/16] bg-slate-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center p-3">
        <ShimmerBlock className="absolute inset-0 w-full h-full" />
        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center relative z-10">
          <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent translate-x-0.5" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <ShimmerBlock className="h-5 w-16 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg" />
          <ShimmerBlock className="h-5 w-12 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg" />
        </div>
      </div>
      <div className="px-1.5 space-y-2">
        <ShimmerBlock className="h-4 w-full" />
        <div className="flex items-center gap-2">
          <ShimmerBlock className="w-5 h-5 rounded-full" />
          <ShimmerBlock className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export const VideoGridSkeleton = ({ title = "Videos Feed" }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20 font-sans animate-pulse">
      <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <ShimmerBlock className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <ShimmerBlock className="h-5 w-32" />
            <ShimmerBlock className="h-2.5 w-24" />
          </div>
        </div>
        <ShimmerBlock className="w-10 h-10 rounded-xl" />
      </header>

      <main className="max-w-6xl mx-auto p-4 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

// 6. Notification Skeleton
export const NotificationSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-pulse">
      <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <ShimmerBlock className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <ShimmerBlock className="h-5 w-32" />
            <ShimmerBlock className="h-2.5 w-24" />
          </div>
        </div>
        <ShimmerBlock className="w-10 h-10 rounded-xl" />
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-3xl p-4 flex gap-4 items-start">
            <ShimmerBlock className="w-12 h-12 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="flex justify-between items-start gap-4">
                <ShimmerBlock className="h-4.5 w-2/3" />
                <ShimmerBlock className="h-3 w-12" />
              </div>
              <ShimmerBlock className="h-3.5 w-full" />
              <ShimmerBlock className="h-3.5 w-5/6" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

// 7. Shop Analytics Skeleton
export const ShopAnalyticsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-pulse">
      <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <ShimmerBlock className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <ShimmerBlock className="h-5 w-36" />
            <ShimmerBlock className="h-2.5 w-28" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 mt-6 space-y-6 md:space-y-8">
        {/* Count cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-5 space-y-3">
              <div className="flex justify-between items-center">
                <ShimmerBlock className="w-10 h-10 rounded-xl" />
                <ShimmerBlock className="h-5 w-12" />
              </div>
              <div className="space-y-1">
                <ShimmerBlock className="h-3 w-16" />
                <ShimmerBlock className="h-7 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Big chart skeleton */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <ShimmerBlock className="h-5 w-44" />
            <ShimmerBlock className="h-8 w-24 rounded-lg" />
          </div>
          <ShimmerBlock className="h-64 md:h-80 w-full rounded-2xl" />
        </div>

        {/* Video Performance Table skeleton */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 space-y-4">
          <ShimmerBlock className="h-5 w-48" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center py-3 border-b border-slate-100">
                <ShimmerBlock className="w-12 h-20 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <ShimmerBlock className="h-4 w-1/3" />
                  <ShimmerBlock className="h-3 w-1/4" />
                </div>
                <div className="flex gap-8">
                  <div className="space-y-1"><ShimmerBlock className="h-3 w-8" /><ShimmerBlock className="h-3 w-12" /></div>
                  <div className="space-y-1"><ShimmerBlock className="h-3 w-8" /><ShimmerBlock className="h-3 w-12" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// 8. Profile Skeleton
export const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-pulse">
      <main className="max-w-4xl mx-auto p-4 md:p-6 mt-6 space-y-8">
        {/* User Card Skeleton */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <ShimmerBlock className="w-24 h-24 rounded-[2rem] shrink-0" />
          <div className="flex-1 space-y-3 text-center md:text-left w-full">
            <ShimmerBlock className="h-6 w-44 mx-auto md:mx-0" />
            <ShimmerBlock className="h-3.5 w-60 mx-auto md:mx-0" />
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <ShimmerBlock className="h-7 w-20 rounded-lg" />
              <ShimmerBlock className="h-7 w-24 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Settings options list */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 space-y-4">
          <ShimmerBlock className="h-5 w-32 mb-2" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <ShimmerBlock className="w-9 h-9 rounded-xl" />
                <ShimmerBlock className="h-4 w-28" />
              </div>
              <ShimmerBlock className="w-5 h-5 rounded-lg" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// 9. Map Explore Sidebar Skeleton
export const MapExploreSkeleton = () => {
  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200/60 animate-pulse">
      {/* Search & Categories */}
      <div className="p-4 border-b border-slate-100 space-y-4">
        <ShimmerBlock className="h-12 w-full rounded-xl" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[1, 2, 3, 4].map((i) => (
            <ShimmerBlock key={i} className="h-8 w-24 rounded-lg shrink-0" />
          ))}
        </div>
      </div>

      {/* Shop List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-slate-100 rounded-3xl p-3 flex gap-3">
            <ShimmerBlock className="w-24 h-24 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <ShimmerBlock className="h-4 w-3/4" />
              <ShimmerBlock className="h-3 w-1/2" />
              <div className="flex gap-2 pt-2">
                <ShimmerBlock className="h-5 w-16 rounded-md" />
                <ShimmerBlock className="h-5 w-12 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
