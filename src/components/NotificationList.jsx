import React from "react";
import { Clock, MoreHorizontal, Bell } from "lucide-react";

const API_BASE_URL = "https://mapman-production.up.railway.app";

const NotificationList = ({ notifications = [] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notifications.map((notif) => {
                const avatarUrl = notif.msgImage
                    ? (notif.msgImage.startsWith('http') ? notif.msgImage : `${API_BASE_URL}${notif.msgImage}`)
                    : "https://cdn-icons-png.flaticon.com/128/726/726498.png"; // Updated fallback icon

                const isOpened = notif.openStatus === 'opened';
                const indicatorColor = notif.msgStatus === 'accepted' ? 'bg-emerald-500' : 'bg-red-500';

                return (
                    <div
                        key={notif.id}
                        className={`group relative bg-white rounded-[15px] border-b border-slate-200 hover:bg-slate-50 transition-all duration-300 flex flex-col p-4 
                            ${isOpened ? 'border-l-4 border-l-emerald-500/80' : 'border-l-4 border-l-transparent'}`}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header Hub */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 transition-transform duration-500">
                                            <img
                                                src={avatarUrl}
                                                alt={notif.msgTitle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Status Glow */}
                                        <div className={`absolute -right-0.5 -top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${indicatorColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-slate-900 font-bold text-sm tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                                            {notif.msgTitle}
                                        </h4>
                                        <div className="pt-1.5">
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">
                                                {notif.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white rounded-xl text-slate-300 hover:text-slate-600 transition-all">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Message Hub */}
                            <div className="flex-1 pl-1">
                                <p className="text-slate-500 font-medium text-[11px] leading-relaxed line-clamp-2">
                                    {notif.msgDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NotificationList;
