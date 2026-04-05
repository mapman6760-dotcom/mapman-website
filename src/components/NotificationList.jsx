import React from "react";
import { Clock, MoreHorizontal } from "lucide-react";

const notifications = [
    {
        id: 1,
        name: "Nithyakumar",
        action: "saved the video you uploaded 2 days ago",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        type: "danger", // indicator color
        time: "2 days ago",
    },
    {
        id: 2,
        name: "Praveen kumar",
        action: "Viewed your shop details",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
        type: "success",
        time: "4 Hrs Ago",
        showTimeIcon: true
    },
    {
        id: 3,
        name: "Sachin",
        action: "New shop will be added",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
        type: "success",
        time: "6 Hrs Ago",
        showTimeIcon: true
    },
    {
        id: 4,
        name: "Rajamani",
        action: "saved the video you uploaded 2 days ago",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        type: "danger",
        time: "2 days ago",
    },
    {
        id: 5,
        name: "Shop Name",
        action: "New video uploaded right now",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
        type: "success",
        time: "Just now",
    },
    {
        id: 6,
        name: "Nithyakumar",
        action: "saved the video you uploaded 2 days ago",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        type: "danger",
        time: "2 days ago",
    }
];

const NotificationList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className="group relative bg-white rounded-3xl border border-slate-100/50 shadow-[0_2px_15px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col"
                >
                    {/* Top Accent Bar - Ultra Slim */}
                    <div
                        className={`absolute left-0 right-0 top-0 h-[4px] ${notif.type === "danger" ? "bg-[#ef4444]" : "bg-[#22c55e]"
                            }`}
                    ></div>

                    <div className="p-3 flex flex-col h-full pt-4">
                        {/* Status Hub */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="relative shrink-0">
                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <img
                                        src={notif.avatar}
                                        alt={notif.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Corner Dot */}
                                <div className={`absolute -right-0.5 -top-0.5 w-2.5 h-2.5 rounded-full border-2 border-white 
                                    ${notif.type === 'danger' ? 'bg-red-500' : 'bg-emerald-500'}`}
                                />
                            </div>
                        </div>

                        {/* Text Hub */}
                        <div className="flex-1 space-y-0.5 mb-3">
                            <h4 className="text-slate-900 font-bold text-sm tracking-tight leading-none truncate">
                                {notif.name}
                            </h4>
                            <p className="text-slate-400 font-black text-[8px] uppercase tracking-wider leading-relaxed opacity-60">
                                {notif.action}
                            </p>
                        </div>

                        {/* Time & ID Hub */}
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50/40 text-blue-500 rounded-lg border border-blue-100/20">
                                <span className="text-[8px] font-black uppercase tracking-tighter">
                                    {notif.time}
                                </span>
                            </div>
                            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest opacity-30">
                                #{notif.id}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
