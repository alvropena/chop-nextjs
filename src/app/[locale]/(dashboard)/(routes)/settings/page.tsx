"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { Label } from "@/components/ui/label";
import LanguageCombobox from "@/components/language-combobox";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsScreen() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold">{t("Settings")}</h1>

                {/* Language Setting */}
                <div>
                    <Label className="text-lg font-medium mb-2">{t("Language")}</Label>
                    <LanguageCombobox />
                </div>

                {/* Dark Mode Setting */}
                <div>
                    <Label className="text-lg font-medium mb-2">{t("Dark_mode")}</Label>
                    <ModeToggle />
                </div>

                {/* Account Settings */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Account Settings</h2>

                    <div className="flex flex-col space-y-2">
                        <Label className="text-sm font-medium">Username</Label>
                        <input type="text" placeholder="Change your username" className="input" />

                        <Label className="text-sm font-medium">Email</Label>
                        <input type="email" placeholder="Change your email" className="input" />

                        <Label className="text-sm font-medium">Password</Label>
                        <Button variant="default" className="w-full">Change Password</Button>

                        <Label className="text-sm font-medium">Phone Number</Label>
                        <input type="text" placeholder="Add your phone number" className="input" />

                        <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                        <Switch id="two-factor-authentication" />
                        
                        <Label className="text-sm font-medium">Connected Accounts</Label>
                        <Button variant="outline" className="w-full">Manage Connected Accounts</Button>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Privacy Settings</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Profile Visibility</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Visibility</SelectLabel>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="friends-only">Friends Only</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Activity Status</Label>
                        <Switch id="activity-status" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Blocked Users</Label>
                        <Button variant="outline" className="w-full">Manage Blocked Users</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Search Privacy</Label>
                        <Switch id="search-privacy" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Data Download</Label>
                        <Button variant="outline" className="w-full">Request Data Download</Button>
                    </div>
                </div>

                {/* Security Settings */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Security Settings</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Login Alerts</Label>
                        <Switch id="login-alerts" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">App Passwords</Label>
                        <Button variant="outline" className="w-full">Manage App Passwords</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Session Management</Label>
                        <Button variant="outline" className="w-full">Manage Sessions</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Security Questions</Label>
                        <Button variant="outline" className="w-full">Manage Security Questions</Button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Notification Settings</h2>

                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{t("Email Notifications")}</Label>
                        <Switch id="email-notifications" />
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{t("Push Notifications")}</Label>
                        <Switch id="push-notifications" />
                    </div>

                    {/* In-app Notifications */}
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{t("In-app Notifications")}</Label>
                        <Switch id="in-app-notifications" />
                    </div>

                    {/* Sound for Notifications */}
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{t("Notification Sound")}</Label>
                        <Switch id="notification-sound" />
                    </div>

                    {/* Do Not Disturb */}
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">{t("Do Not Disturb")}</Label>
                        <Switch id="do-not-disturb" />
                    </div>

                    {/* Notification Frequency */}
                    <div className="flex flex-col mt-4">
                        <Label className="text-sm font-medium mb-2">{t("Notification Frequency")}</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Frequency</SelectLabel>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Content Preferences */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Content Preferences</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Content Language</Label>
                        <LanguageCombobox />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Content Filtering</Label>
                        <Switch id="content-filtering" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Ad Preferences</Label>
                        <Button variant="outline" className="w-full">Manage Ad Preferences</Button>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Appearance Settings</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Theme</Label>
                        <ModeToggle />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Font Size</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Font Size</SelectLabel>
                                    <SelectItem value="small">Small</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="large">Large</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Custom Background</Label>
                        <Button variant="outline" className="w-full">Set Background</Button>
                    </div>
                </div>

                {/* Communication Preferences */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Communication Preferences</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Message Requests</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select who can message you" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Message Requests</SelectLabel>
                                    <SelectItem value="everyone">Everyone</SelectItem>
                                    <SelectItem value="friends">Friends</SelectItem>
                                    <SelectItem value="no-one">No One</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Comments and Replies</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select who can comment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Comments and Replies</SelectLabel>
                                    <SelectItem value="everyone">Everyone</SelectItem>
                                    <SelectItem value="followers">Followers</SelectItem>
                                    <SelectItem value="friends">Friends</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Tagged Posts</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select who can tag you" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tagged Posts</SelectLabel>
                                    <SelectItem value="everyone">Everyone</SelectItem>
                                    <SelectItem value="followers">Followers</SelectItem>
                                    <SelectItem value="friends">Friends</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Accessibility Settings */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Accessibility Settings</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Text-to-Speech</Label>
                        <Switch id="text-to-speech" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Color Contrast</Label>
                        <Switch id="color-contrast" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Subtitles and Captions</Label>
                        <Switch id="subtitles-captions" />
                    </div>
                </div>

                {/* Data and Storage */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Data and Storage</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Storage Management</Label>
                        <Button variant="outline" className="w-full">Manage Storage</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Download Quality</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select quality" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Download Quality</SelectLabel>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Legal and Compliance */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Legal and Compliance</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Terms of Service</Label>
                        <Button variant="outline" className="w-full">View Terms</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Privacy Policy</Label>
                        <Button variant="outline" className="w-full">View Privacy Policy</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Cookie Preferences</Label>
                        <Button variant="outline" className="w-full">Manage Cookies</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Report a Problem</Label>
                        <Button variant="outline" className="w-full">Report Issue</Button>
                    </div>
                </div>

                {/* Support and Feedback */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Support and Feedback</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Help Center</Label>
                        <Button variant="outline" className="w-full">Visit Help Center</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Contact Support</Label>
                        <Button variant="outline" className="w-full">Contact Us</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Bug Report</Label>
                        <Button variant="outline" className="w-full">Report a Bug</Button>
                    </div>
                </div>

                {/* Experimental Features (Beta Settings) */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Experimental Features</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Opt-in to Beta Features</Label>
                        <Switch id="beta-features" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Feedback for New Features</Label>
                        <Button variant="outline" className="w-full">Give Feedback</Button>
                    </div>
                </div>

                {/* Activity Log */}
                <div>
                    <h2 className="text-xl font-medium mb-2">Activity Log</h2>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Account Activity</Label>
                        <Button variant="outline" className="w-full">View Activity</Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Content Interaction</Label>
                        <Button variant="outline" className="w-full">View Interactions</Button>
                    </div>
                </div>

                {/* Log Out Button */}
                <div>
                    <Button onClick={() => router.push("/api/auth/logout")}>{t("Log_out")}</Button>
                </div>
            </div>
        </div>
    );
}
