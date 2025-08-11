"use client";
import { useState, useEffect } from "react";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function SettingsPage() {
    const { user } = useUser();
    const router = useRouter();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        darkMode: false,
        autoSave: true,
        videoQuality: "high",
        exportFormat: "mp4",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
        try {
            const { data } = await axios.get("/api/settings");
            if (data.settings) {
            setSettings(data.settings);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchSettings();
    }, []);

    const handleSettingChange = async (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

    try {
        setSaving(true);
        await axios.post("/api/settings", newSettings);
    } catch (error) {
        console.error("Error saving settings:", error);
        setSettings((prev) => ({ ...prev, [key]: settings[key] }));
    } finally {
        setSaving(false);
    }
};

    const handleEmailChange = () => router.push("/user-profile");
    const handlePasswordChange = () => router.push("/user-profile");

    const handleDeleteAccount = () => {
        if (
        window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        )
    ) {
        router.push("/");
    }
    };

    if (loading) {
        return (
        <div className="flex items-center justify-center h-full p-8">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
            <span className="ml-3 text-white/80">Loading settings...</span>
        </div>
    );
    }

return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold ml-2 mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Account Settings
        </h1>

        {[
            {
            title: "Account Settings",
            content: (
            <>
                <div className="flex items-center justify-between">
                    <div>
                    <Label>Email</Label>
                    <p className="text-sm text-gray-400">
                        {user?.primaryEmailAddress?.emailAddress}
                    </p>
                    </div>
                    <Button variant="outline" onClick={handleEmailChange} className="text-white bg-gray-800 hover:text-white/70 hover:bg-gray-950">
                        Change Email
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                    <Label>Password</Label>
                    <p className="text-sm text-gray-400">
                        Last changed 30 days ago
                    </p>
                    </div>
                    <Button variant="outline" onClick={handlePasswordChange} className="text-white bg-gray-800 hover:text-white/70 hover:bg-gray-950">
                        Change Password
                    </Button>
                </div>
            </>
            ),
        },
        {
            title: "Notification Settings",
            content: (
            <div className="flex items-center justify-between">
                <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                    Receive email updates about your videos
                    </p>
                </div>
                <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                    handleSettingChange("emailNotifications", checked)
                    }
                    disabled={saving}
                />
            </div>
            ),
        },
        {
            title: "Video Settings",
            content: (
            <>
                <div className="flex items-center justify-between">
                    <div>
                    <Label>Auto Save</Label>
                    <p className="text-sm text-gray-400">
                        Automatically save your work
                    </p>
                    </div>
                    <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) =>
                    handleSettingChange("autoSave", checked)
                    }
                    disabled={saving}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Default Video Quality</Label>
                    <select
                    className="w-full p-2 border rounded-md bg-black/30 text-white"
                    value={settings.videoQuality}
                    onChange={(e) =>
                        handleSettingChange("videoQuality", e.target.value)
                    }
                    disabled={saving} >
                        <option value="low">Low (480p)</option>
                        <option value="medium">Medium (720p)</option>
                        <option value="high">High (1080p)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Default Export Format</Label>
                    <select
                    className="w-full p-2 border rounded-md bg-black/30 text-white"
                    value={settings.exportFormat}
                    onChange={(e) =>
                        handleSettingChange("exportFormat", e.target.value)
                    }
                    disabled={saving}
                    >
                        <option value="mp4">MP4</option>
                        <option value="mov">MOV</option>
                        <option value="webm">WebM</option>
                    </select>
                </div>
            </>
            ),
        },
        {
            title: "Theme Settings",
            content: (
            <div className="flex items-center justify-between">
                <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-gray-400">
                        Switch between light and dark theme
                    </p>
                </div>
                <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                    handleSettingChange("darkMode", checked)
                    }
                    disabled={saving}
                />
            </div>
            ),
        },
        {
            title: "Danger Zone",
            danger: true,
            content: (
            <div className="flex items-center justify-between">
                <div>
                    <Label>Delete Account</Label>
                    <p className="text-sm text-gray-400">
                    Permanently delete your account and all data
                    </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </div>
            ),
        },
        ].map((section, i) => (
        <div
            key={i}
            className={`p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] shadow-lg ${
            section.danger
                ? "bg-gradient-to-r from-red-500/20 to-red-800/20"
                : "bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
            }`}>
            <h2
                className={`text-xl font-semibold mb-4 ${
                section.danger
                ? "text-red-400"
                : "bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent"
            }`}>
            {section.title}
            </h2>
            <div className="space-y-4">{section.content}</div>
        </div>
        ))}
    </div>
    );
}




