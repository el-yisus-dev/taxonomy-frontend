import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { CameraModal } from "../../components/CameraModal";
import { ChatAssistant } from "../../components/ChatAssistant";

export const HomeLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    return (
        <div className="app-wrapper">
            <Sidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onOpenCamera={() => setShowCamera(true)}
            />

            <div className="main-area">
                <Outlet />
            </div>

            <ChatAssistant />

            {showCamera && (
                <CameraModal 
                    onClose={() => setShowCamera(false)}
                />
            )}
        </div>
    );
};