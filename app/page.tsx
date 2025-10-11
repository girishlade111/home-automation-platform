"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import {
  ChevronDown,
  Home,
  Settings,
  Layers,
  PanelLeft,
  PanelRight,
  Plus,
  Save,
  Undo,
  Redo,
  Play,
  Lightbulb,
  Thermometer,
  Lock,
  Camera,
  Speaker,
  Tv,
  ChevronRight,
  HelpCircle,
  FileText,
  Palette,
  Sliders,
  SearchIcon,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Square,
  Move,
  ChevronUp,
} from "lucide-react"

// Main component
export default function HomeAutomationEditor() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [bottomPanelCollapsed, setBottomPanelCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("floor-plan")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const mainContentRef = useRef<HTMLDivElement>(null)

  // Handle device selection
  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId)
  }

  // Toggle simulation
  const toggleSimulation = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-full text-[#e4e4e4] relative overflow-hidden",
        isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f5f5f5] text-[#333333]",
      
      )}
    >
      {/* Top menu bar */}
      <div
        className={cn(
          "flex items-center h-7 px-2 text-xs font-medium",
          isDarkMode ? "bg-[#252526] border-b border-[#1e1e1e]" : "bg-[#f0f0f0] border-b border-[#e0e0e0]",
        )}
      >
        <div className="flex space-x-4">
          <MenuButton label="File" />
          <MenuButton label="Edit" />
          <MenuButton label="View" />
          <MenuButton label="Components" />
          <MenuButton label="Tools" />
          <MenuButton label="Window" />
          <MenuButton label="Help" />
        </div>
        <div className="ml-auto text-xs opacity-70">Home Automation Designer v1.0</div>
      </div>

      {/* Toolbar */}
      <div
        className={cn(
          "flex items-center h-8 px-2 border-b",
          isDarkMode ? "bg-[#333333] border-[#1e1e1e]" : "bg-[#e8e8e8] border-[#d0d0d0]",
        )}
      >
        <div className="flex items-center space-x-1">
          <ToolbarButton icon={<Move size={16} />} tooltip="Select" />
          <ToolbarButton icon={<Plus size={16} />} tooltip="Add Device" />
          <ToolbarButton icon={<Undo size={16} />} tooltip="Undo" />
          <ToolbarButton icon={<Redo size={16} />} tooltip="Redo" />
          <Separator orientation="vertical" className={cn("h-5 mx-1", isDarkMode ? "bg-[#444444]" : "bg-[#cccccc]")} />
          <ToolbarButton icon={<Save size={16} />} tooltip="Save" />
          <ToolbarButton icon={<FileText size={16} />} tooltip="Export" />
          <ToolbarButton icon={<Square size={16} />} tooltip="Stop" />
          <ToolbarButton icon={<Play size={16} />} tooltip="Run Simulation" />
        </div>

   

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "h-7 w-7 rounded-md",
              isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
            )}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </div>

      {/* Main content area with resizable panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 ">
        {/* Left panel - Project hierarchy */}
        <ResizablePanel
          defaultSize={leftPanelCollapsed ? 5 : 20}
          minSize={5}
          maxSize={30}
          className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-[#252526]" : "bg-black",
            leftPanelCollapsed && "min-w-[50px] max-w-[50px]",
          )}
        >
          {leftPanelCollapsed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftPanelCollapsed(false)}
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <PanelRight className="h-5 w-5" />
              </Button>
              <Separator className={cn("my-2", isDarkMode ? "bg-[#444444]" : "bg-[#cccccc]")} />
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <Layers className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
              <div
                className={cn(
                  "flex items-center justify-between p-2 border-b",
                  isDarkMode ? "border-[#1e1e1e]" : "border-[#e0e0e0]",
                )}
              >
                <h3 className={cn("text-sm font-medium", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
                  Hierarchy
                </h3>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                    )}
                  >
                    <SearchIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setLeftPanelCollapsed(true)}
                    className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                    )}
                  >
                    <PanelLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <ProjectTree isDarkMode={isDarkMode} />
              </ScrollArea>
            </motion.div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle={false} className="bg-gray-800" />

        {/* Center panel - Main editor */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80} minSize={30}>
              <div className={cn("flex flex-col h-full", isDarkMode ? "bg-[#1e1e1e]" : "bg-[#ffffff]")}>
                {/* Wrap the entire content area in a single Tabs component */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                  {/* Tab triggers in the toolbar */}
                  <div className="flex items-center p-2 border-b border-[#1e1e1e]">
                    <TabsList
                      className={cn("h-7 p-0 bg-transparent", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}
                    >
                      <TabsTrigger
                        value="home-view"
                        className={cn(
                          "px-3 h-7 rounded-none data-[state=active]:shadow-none data-[state=active]:text-white border-[#444] bg-[#444] data-[state=active]:bg-[#1e1e1e]",
           
                        )}
                      >
                        Home View
                      </TabsTrigger>
                      <TabsTrigger
                        value="floor-plan"
                        className={cn(
                         "px-3 h-7 rounded-none data-[state=active]:shadow-none data-[state=active]:text-white border-[#444] bg-[#444] data-[state=active]:bg-[#1e1e1e]",
           
                        )}
                      >
                        Floor Plan
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Tab content */}
                  <div className="relative flex-1" ref={mainContentRef}>
                    <TabsContent value="home-view" className="absolute inset-0 data-[state=active]:block">
                      <EditorCanvas isDarkMode={isDarkMode} />
                    </TabsContent>
                    <TabsContent value="floor-plan" className="absolute inset-0 data-[state=active]:block">
                      <EditorCanvas isDarkMode={isDarkMode} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle={false} className="bg-gray-800" />

            {/* Bottom panel - Console/Output */}
            <ResizablePanel
              defaultSize={bottomPanelCollapsed ? 5 : 20}
              minSize={5}
              maxSize={40}
              className={cn(
                "transition-all duration-300",
                isDarkMode ? "bg-[#252526]" : "bg-[#f0f0f0]",
                bottomPanelCollapsed && "min-h-[28px] max-h-[28px]",
              )}
            >
              {bottomPanelCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "flex items-center justify-between p-1 h-7",
                    isDarkMode ? "border-t border-[#1e1e1e]" : "border-t border-[#e0e0e0]",
                  )}
                >
                  <span className={cn("text-xs font-medium ml-2", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
                    Console
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBottomPanelCollapsed(false)}
                    className={cn(
                      "h-5 w-5",
                      isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                    )}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                  <Tabs defaultValue="console" className="w-full h-full">
                    <div
                      className={cn(
                        "flex items-center justify-between p-1 border-b",
                        isDarkMode ? "border-[#1e1e1e]" : "border-[#e0e0e0]",
                      )}
                    >
                      <TabsList
                        className={cn("h-6 p-0 bg-transparent", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}
                      >
                        <TabsTrigger
                          value="console"
                          className={cn(
                            "px-3 h-6 text-xs rounded-none data-[state=active]:shadow-none data-[state=active]:text-white",
                            isDarkMode
                              ? "data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-x border-[#505050]"
                              : "data-[state=active]:bg-[#ffffff] data-[state=active]:border-t data-[state=active]:border-x border-[#cccccc]",
                          )}
                        >
                          Console
                        </TabsTrigger>
                        <TabsTrigger
                          value="logs"
                          className={cn(
                            "px-3 h-6 text-xs rounded-none data-[state=active]:shadow-none data-[state=active]:text-white",
                            isDarkMode
                              ? "data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-x border-[#505050]"
                              : "data-[state=active]:bg-[#ffffff] data-[state=active]:border-t data-[state=active]:border-x border-[#cccccc]",
                          )}
                        >
                          Logs
                        </TabsTrigger>
                        <TabsTrigger
                          value="terminal"
                          className={cn(
                            "px-3 h-6 text-xs rounded-none data-[state=active]:shadow-none data-[state=active]:text-white",
                            isDarkMode
                              ? "data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-x border-[#505050]"
                              : "data-[state=active]:bg-[#ffffff] data-[state=active]:border-t data-[state=active]:border-x border-[#cccccc]",
                          )}
                        >
                          Terminal
                        </TabsTrigger>
                      </TabsList>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBottomPanelCollapsed(true)}
                        className={cn(
                          "h-5 w-5",
                          isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className={cn("flex-1 overflow-hidden", isDarkMode ? "bg-[#1e1e1e]" : "bg-[#ffffff]")}>
                      <TabsContent value="console" className="h-full p-3 data-[state=active]:block overflow-auto">
                        <div
                          className={cn(
                            "font-mono text-xs space-y-1",
                            isDarkMode ? "text-[#cccccc]" : "text-[#555555]",
                          )}
                        >
                          <p className={isDarkMode ? "text-[#6a9955]" : "text-[#008000]"}>
                            [12:05:10] System initialized
                          </p>
                          <p className={isDarkMode ? "text-[#cccccc]" : "text-[#555555]"}>
                            [12:05:11] Loading device configurations...
                          </p>
                          <p className={isDarkMode ? "text-[#cccccc]" : "text-[#555555]"}>
                            [12:05:12] Connected to home network
                          </p>
                          <p className={isDarkMode ? "text-[#4fc1ff]" : "text-[#0000ff]"}>
                            [12:05:13] Found 12 devices on network
                          </p>
                          <p className={isDarkMode ? "text-[#4fc1ff]" : "text-[#0000ff]"}>
                            [12:05:14] Syncing device states...
                          </p>
                          <p className={isDarkMode ? "text-[#f14c4c]" : "text-[#ff0000]"}>
                            [12:05:15] Warning: Living Room Light unresponsive
                          </p>
                          <p className={isDarkMode ? "text-[#6a9955]" : "text-[#008000]"}>
                            [12:05:16] Ready for editing
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="logs" className="h-full p-3 data-[state=active]:block overflow-auto">
                        <div
                          className={cn(
                            "font-mono text-xs space-y-1",
                            isDarkMode ? "text-[#cccccc]" : "text-[#555555]",
                          )}
                        >
                          <p>[12:05:01] INFO: Application started</p>
                          <p>[12:05:02] INFO: Loading configuration</p>
                          <p className={isDarkMode ? "text-[#f14c4c]" : "text-[#ff0000]"}>
                            [12:05:03] WARN: Using default settings
                          </p>
                          <p>[12:05:04] INFO: Network scan initiated</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="terminal" className="h-full p-3 data-[state=active]:block overflow-auto">
                        <div
                          className={cn(
                            "font-mono text-xs space-y-1",
                            isDarkMode ? "text-[#cccccc]" : "text-[#555555]",
                          )}
                        >
                          <p className={isDarkMode ? "text-[#569cd6]" : "text-[#0000ff]"}>$ scan network</p>
                          <p>Scanning for devices...</p>
                          <p>Found 12 devices</p>
                          <p className={isDarkMode ? "text-[#569cd6]" : "text-[#0000ff]"}>$ get status</p>
                          <p>All systems operational</p>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </motion.div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

      <ResizableHandle withHandle={false} className="bg-gray-800" />

        {/* Right panel - Properties/Inspector */}
        <ResizablePanel
          defaultSize={rightPanelCollapsed ? 5 : 20}
          minSize={5}
          maxSize={30}
          className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-[#252526]" : "bg-[#f0f0f0]",
            rightPanelCollapsed && "min-w-[50px] max-w-[50px]",
          )}
        >
          {rightPanelCollapsed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightPanelCollapsed(false)}
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
              <Separator className={cn("my-2", isDarkMode ? "bg-[#444444]" : "bg-[#cccccc]")} />
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <Sliders className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <Palette className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2",
                  isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                )}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
              <div
                className={cn(
                  "flex items-center justify-between p-2 border-b",
                  isDarkMode ? "border-[#1e1e1e]" : "border-[#e0e0e0]",
                )}
              >
                <h3 className={cn("text-sm font-medium", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
                  Inspector
                </h3>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                    )}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRightPanelCollapsed(true)}
                    className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
                    )}
                  >
                    <PanelRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <PropertiesPanel selectedDevice={selectedDevice} isDarkMode={isDarkMode} />
              </ScrollArea>
            </motion.div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status bar */}
      <div
        className={cn(
          "h-6 flex items-center px-3 text-xs",
          isDarkMode ? "bg-[#007acc] text-white" : "bg-[#0078d7] text-white",
        )}
      >
        <div className="flex items-center">
          <span>Status: Ready</span>
        </div>
        <div className="ml-4">Device Count: 0</div>
        <div className="ml-4">Active: 0</div>
        <div className="ml-4">Offline: 0</div>
        <div className="ml-auto flex items-center">
          <span className="mr-2">Last Updated: Never</span>
          <span className={cn("px-2 py-0.5 rounded text-white", isDarkMode ? "bg-[#2ea043]" : "bg-[#107c10]")}>
            Connected
          </span>
        </div>
      </div>
    </div>
  )
}

// Menu button component
function MenuButton({ label }: { label: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs font-normal hover:bg-[#505050]/20 shadow-none">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#252526] border-[#505050] rounded-none shadow-lg  text-white shadow-black/30 text-xs">
        <DropdownMenuItem className="focus:bg-[#04395e] focus:text-white text-white">
          <span>New Project</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#04395e] focus:text-white">
          <span>Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#04395e] focus:text-white">
          <span>Save</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#04395e] focus:text-white">
          <span>Export</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Toolbar button component
function ToolbarButton({ icon, tooltip }: { icon: React.ReactNode; tooltip: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none hover:bg-[#505050]/20">
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-[#252526] border-[#505050] text-xs">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Project tree component
function ProjectTree({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="py-2">
      <TreeNode
        label="Home"
        icon={<Home className="h-4 w-4 mr-2" />}
        expanded
        isSelected={true}
        isDarkMode={isDarkMode}
      >
        <TreeNode label="Living Room" icon={<Tv className="h-4 w-4 mr-2" />} expanded isDarkMode={isDarkMode}>
          <TreeNode label="Smart TV" icon={<Tv className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Lights" icon={<Lightbulb className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Thermostat" icon={<Thermometer className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Speakers" icon={<Speaker className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
        </TreeNode>
        <TreeNode label="Kitchen" icon={<Home className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode}>
          <TreeNode label="Lights" icon={<Lightbulb className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Smart Fridge" icon={<Thermometer className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
        </TreeNode>
        <TreeNode label="Bedroom" icon={<Home className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode}>
          <TreeNode label="Lights" icon={<Lightbulb className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Smart Lock" icon={<Lock className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Camera" icon={<Camera className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
        </TreeNode>
        <TreeNode label="Automations" icon={<Settings className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode}>
          <TreeNode label="Morning Routine" icon={<Lightbulb className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Night Mode" icon={<Moon className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
          <TreeNode label="Away Mode" icon={<Lock className="h-4 w-4 mr-2" />} isDarkMode={isDarkMode} />
        </TreeNode>
      </TreeNode>
    </div>
  )
}

// Tree node component
function TreeNode({
  label,
  icon,
  expanded: defaultExpanded = false,
  isSelected = false,
  isDarkMode = true,
  children,
}: {
  label: string
  icon?: React.ReactNode
  expanded?: boolean
  isSelected?: boolean
  isDarkMode?: boolean
  children?: React.ReactNode
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center py-1 px-2 cursor-pointer",
          isSelected
            ? isDarkMode
              ? "bg-[#04395e] text-white"
              : "bg-[#cce5ff] text-[#333333]"
            : isHovered
              ? isDarkMode
                ? "bg-[#2a2d2e]"
                : "bg-[#e8e8e8]"
              : "",
        )}
        onClick={() => children && setExpanded(!expanded)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children ? (
          <ChevronRight
            className={cn(
              "h-4 w-4 mr-1 transition-transform",
              expanded ? "transform rotate-90" : "",
              isDarkMode ? "text-[#cccccc]" : "text-[#555555]",
            )}
          />
        ) : (
          <div className="w-5"></div>
        )}
        {icon && <span className={isDarkMode ? "text-[#cccccc]" : "text-[#555555]"}>{icon}</span>}
        <span className="text-xs">{label}</span>
      </div>
      {expanded && children && (
        <div className={cn("ml-4 border-l pl-2", isDarkMode ? "border-[#505050]" : "border-[#cccccc]")}>{children}</div>
      )}
    </div>
  )
}

// Properties panel component
function PropertiesPanel({ selectedDevice, isDarkMode }: { selectedDevice: string | null; isDarkMode: boolean }) {
  return (
    <div className="p-4">
      {selectedDevice ? (
        <div className="space-y-4">
          <div>
            <h3 className={cn("text-sm font-medium mb-2", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
              Device Properties
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className={cn("text-xs", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>Name:</span>
                <Input
                  value="Living Room Light"
                  className={cn(
                    "h-6 text-xs",
                    isDarkMode
                      ? "bg-[#3c3c3c] border-[#505050] text-[#cccccc]"
                      : "bg-[#ffffff] border-[#cccccc] text-[#555555]",
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className={cn("text-xs", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>Type:</span>
                <Input
                  value="Philips Hue"
                  className={cn(
                    "h-6 text-xs",
                    isDarkMode
                      ? "bg-[#3c3c3c] border-[#505050] text-[#cccccc]"
                      : "bg-[#ffffff] border-[#cccccc] text-[#555555]",
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className={cn("text-xs", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>IP Address:</span>
                <Input
                  value="192.168.1.100"
                  className={cn(
                    "h-6 text-xs",
                    isDarkMode
                      ? "bg-[#3c3c3c] border-[#505050] text-[#cccccc]"
                      : "bg-[#ffffff] border-[#cccccc] text-[#555555]",
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className={cn("text-xs", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>Status:</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#2ea043] mr-2"></div>
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className={isDarkMode ? "bg-[#444444]" : "bg-[#cccccc]"} />

          <div>
            <h3 className={cn("text-sm font-medium mb-2", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
              Light Settings
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className={cn("text-xs", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>Brightness</span>
                  <span className="text-xs">75%</span>
                </div>
                <div className={cn("h-1.5 rounded-full overflow-hidden", isDarkMode ? "bg-[#3c3c3c]" : "bg-[#e0e0e0]")}>
                  <div className={cn("h-full w-3/4 rounded-full", isDarkMode ? "bg-[#0e70c0]" : "bg-[#0078d7]")} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className={cn("text-xs", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
                    Color Temperature
                  </span>
                  <span className="text-xs">4200K</span>
                </div>
                <div className={cn("h-1.5 rounded-full overflow-hidden", isDarkMode ? "bg-[#3c3c3c]" : "bg-[#e0e0e0]")}>
                  <div className={cn("h-full w-1/2 rounded-full", isDarkMode ? "bg-[#0e70c0]" : "bg-[#0078d7]")} />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1 mt-2">
                <div className="w-full aspect-square rounded-full bg-[#d13438] cursor-pointer" />
                <div className="w-full aspect-square rounded-full bg-[#ff8c00] cursor-pointer" />
                <div className="w-full aspect-square rounded-full bg-[#107c10] cursor-pointer" />
                <div className="w-full aspect-square rounded-full bg-[#0078d7] cursor-pointer" />
                <div className="w-full aspect-square rounded-full bg-[#5c2d91] cursor-pointer" />
              </div>
            </div>
          </div>

          <Separator className={isDarkMode ? "bg-[#444444]" : "bg-[#cccccc]"} />

          <div>
            <h3 className={cn("text-sm font-medium mb-2", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
              Automation
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Auto Turn Off</span>
                <Switch isDarkMode={isDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Motion Sensor Link</span>
                <Switch checked isDarkMode={isDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Schedule</span>
                <Switch checked isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <Settings className={cn("h-10 w-10 mb-2 opacity-50", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")} />
          <p className={cn("text-sm", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}>
            No device selected. Select a device to view its properties.
          </p>
        </div>
      )}
    </div>
  )
}

// Editor canvas component
function EditorCanvas({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Grid background */}
      <div
        className={cn("absolute inset-0", isDarkMode ? "bg-[#1e1e1e]" : "bg-[#ffffff]")}
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(to right, #333333 1px, transparent 1px), 
               linear-gradient(to bottom, #333333 1px, transparent 1px)`
            : `linear-gradient(to right, #e0e0e0 1px, transparent 1px), 
               linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "center center",
        }}
      >
        {/* Ruler - horizontal */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-5 flex",
            isDarkMode ? "bg-[#252526] border-b border-[#1e1e1e]" : "bg-[#f0f0f0] border-b border-[#e0e0e0]",
          )}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 relative">
              <div
                className={cn("absolute bottom-0 w-px h-2", isDarkMode ? "bg-[#505050]" : "bg-[#cccccc]")}
                style={{ left: "50%" }}
              ></div>
              <div
                className={cn("absolute bottom-0 text-[9px] left-1", isDarkMode ? "text-[#cccccc]" : "text-[#555555]")}
              >
                {(i + 1) * 100}
              </div>
            </div>
          ))}
        </div>

        {/* Ruler - vertical */}
        <div
          className={cn(
            "absolute top-5 left-0 bottom-0 w-5 flex flex-col",
            isDarkMode ? "bg-[#252526] border-r border-[#1e1e1e]" : "bg-[#f0f0f0] border-r border-[#e0e0e0]",
          )}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 relative">
              <div
                className={cn("absolute right-0 h-px w-2", isDarkMode ? "bg-[#505050]" : "bg-[#cccccc]")}
                style={{ top: "50%" }}
              ></div>
              <div
                className={cn(
                  "absolute top-1 text-[9px] left-0.5 rotate-90 origin-top-left",
                  isDarkMode ? "text-[#cccccc]" : "text-[#555555]",
                )}
              >
                {(i + 1) * 100}
              </div>
            </div>
          ))}
        </div>

        {/* Main canvas area */}
        <div className="absolute top-5 left-5 right-0 bottom-0">
          {/* Floor plan would go here */}
          <div
            className={cn(
              "w-[600px] h-[400px] mx-auto my-10 border",
              isDarkMode ? "border-[#505050]" : "border-[#cccccc]",
            )}
          >
            {/* Room outlines would go here */}
          </div>
        </div>

        {/* Zoom controls */}
        <div
          className={cn(
            "absolute bottom-4 right-4 flex flex-col",
            isDarkMode ? "bg-[#252526] border border-[#505050]" : "bg-[#f0f0f0] border border-[#cccccc]",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-none border-b",
              isDarkMode
                ? "text-[#cccccc] hover:bg-[#404040] border-[#505050]"
                : "text-[#555555] hover:bg-[#e0e0e0] border-[#cccccc]",
            )}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-none border-b",
              isDarkMode
                ? "text-[#cccccc] hover:bg-[#404040] border-[#505050]"
                : "text-[#555555] hover:bg-[#e0e0e0] border-[#cccccc]",
            )}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-none",
              isDarkMode ? "text-[#cccccc] hover:bg-[#404040]" : "text-[#555555] hover:bg-[#e0e0e0]",
            )}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Switch component
function Switch({ checked = false, isDarkMode = true }: { checked?: boolean; isDarkMode?: boolean }) {
  const [isChecked, setIsChecked] = useState(checked)

  return (
    <div
      className={cn(
        "relative inline-flex h-4 w-8 cursor-pointer rounded-full transition-colors",
        isChecked ? (isDarkMode ? "bg-[#0e70c0]" : "bg-[#0078d7]") : isDarkMode ? "bg-[#3c3c3c]" : "bg-[#cccccc]",
      )}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div
        className={cn(
          "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
          isChecked ? "translate-x-4" : "translate-x-0.5",
        )}
      />
    </div>
  )
}

// Search component
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
