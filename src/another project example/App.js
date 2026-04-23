// import React, { useState, useRef, useEffect, useMemo } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stars, Html, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { 
//   Play, 
//   Pause, 
//   Volume2, 
//   VolumeX, 
//   SkipBack, 
//   SkipForward, 
//   FastForward,
//   Rewind,
//   Maximize,
//   Video,
//   Folder,
//   Box,
//   Presentation,
//   Share2,
//   Settings,
//   MessageCircle,
//   Pencil,
//   Square,
//   Circle,
//   Triangle,
//   ArrowRight,
//   Star,
//   Heart,
//   Bookmark,
//   Camera,
//   ChevronLeft,
//   ChevronRight,
//   Eraser,
//   Type,
//   MousePointer,
//   Palette,
//   Layers,
//   QrCode,
//   PlayCircle,
//   PauseCircle,
//   AlignRight,
//   File,
//   Clock
// } from 'lucide-react';

// // Mock data
// const mockContent = {
//   id: 1,
//   title: "Quyosh sistemasining tuzilishi",
//   type: "3d-animation",
//   duration: 480,
//   subtitles: [
//     { time: 0, text: "Quyosh sistemasiga Quyosh va uning atrofida aylanadigan barcha osmon jismlari kiradi." },
//     { time: 30, text: "Quyosh sistemasida 8 ta asosiy sayyora mavjud: Merkuriy, Venera, Yer, Mars, Yupiter, Saturn, Uran va Neptun." },
//     { time: 60, text: "Merkuriy Quyoshga eng yaqin va eng kichik sayyoradir." },
//     { time: 90, text: "Venera Quyoshdan ikkinchi o'rinda joylashgan va Yerga eng yaqin sayyoradir." },
//     { time: 120, text: "Yer Quyoshdan uchinchi o'rinda joylashgan yagona hayot mavjud bo'lgan sayyoradir." },
//     { time: 150, text: "Mars Quyoshdan to'rtinchi o'rinda joylashgan va 'Qizil sayyora' deb ataladi." },
//     { time: 180, text: "Yupiter Quyosh sistemasidagi eng katta sayyoradir." },
//     { time: 210, text: "Saturn o'zining halqalari bilan mashhur bo'lgan gaz gigantidir." },
//     { time: 240, text: "Uran va Neptun Quyoshdan eng uzoq joylashgan sayyoralardir va ular ham gaz gigantlari hisoblanadi." },
//   ],
//   thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop"
// };

// // Main App Header - Wireframe'dagi yuqori panel
// const AppHeader = () => {
//   return (
//     <div className="bg-white border-b border-gray-200 px-6 py-3">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
//             <ChevronLeft size={20} />
//           </button>
//           <div className="flex flex-col">
//             <span className="text-2xl font-bold text-gray-800 mb-1">Quyosh sistemasining tuzilishi</span>
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1">
//                 <Box size={14} />
//                 3D ANIMATION
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock size={16} className="text-gray-400" />
//                 8 min
//               </span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-2">
//           <button className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
//             A UZB
//           </button>
//           <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Student Tools Sidebar - Wireframe'dagi chap sidebar
// const StudentToolsSidebar = ({ onElementAdd, onDrawToggle, isDrawing, isOpen, onToggle, onExerciseClick, currentPosition, onPositionChange }) => {
//   const [elementsOpen, setElementsOpen] = useState(false);
//   const [drawNoteOpen, setDrawNoteOpen] = useState(false);

//   const shapes = [
//     { icon: Circle, label: 'Circle', color: 'bg-blue-100 text-blue-600' },
//     { icon: Square, label: 'Square', color: 'bg-red-100 text-red-600' },
//     { icon: Triangle, label: 'Triangle', color: 'bg-green-100 text-green-600' },
//     { icon: Star, label: 'Star', color: 'bg-yellow-100 text-yellow-600' },
//     { icon: Heart, label: 'Heart', color: 'bg-pink-100 text-pink-600' },
//     { icon: ArrowRight, label: 'Arrow', color: 'bg-purple-100 text-purple-600' },
//   ];

//   const drawTools = [
//     { icon: Pencil, label: 'Pencil', color: 'bg-red-100 text-red-600' },
//     { icon: Eraser, label: 'Eraser', color: 'bg-gray-100 text-gray-600' },
//     { icon: Type, label: 'Text', color: 'bg-blue-100 text-blue-600' },
//     { icon: MousePointer, label: 'Select', color: 'bg-green-100 text-green-600' },
//     { icon: Palette, label: 'Color', color: 'bg-purple-100 text-purple-600' },
//     { icon: Layers, label: 'Layers', color: 'bg-orange-100 text-orange-600' },
//   ];

//   return (
//     <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
//       isOpen ? 'w-64' : 'w-16'
//     } overflow-hidden relative z-40`}>
//       {/* Toggle Button */}
//       {isOpen ? (
//         <button
//           onClick={onToggle}
//           className="absolute top-4 right-0 z-20 p-2 bg-white border border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50"
//         >
//           <ChevronLeft size={16} />
//         </button>
//       ) : (
//         <div className="fixed top-20 left-16 z-[100]">
//           <button
//             onClick={onToggle}
//             className="p-2 bg-white border border-gray-200 rounded-r-lg shadow-sm hover:bg-gray-50"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       )}
      
//       {/* Icons - Har doim ko'rinadi */}
//       <div className={`flex flex-col items-center py-4 ${isOpen ? 'hidden' : 'block'}`}>
//         {/* Title */}
//         <div className="mb-4 text-xs font-medium text-gray-600 text-center px-2">
//           Student tools
//         </div>
//         <div className="space-y-3">
//           {/* Elements - Yopiq bo'lganda o'ng tarafdan chiqadi */}
//           <div className="relative">
//             <button 
//               onClick={() => setElementsOpen(!elementsOpen)}
//               className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
//               title="Elements"
//             >
//               <Square size={20} />
//             </button>
            
//             {/* Yopiq bo'lganda o'ng tarafdan chiqadigan shapes panel */}
//             {!isOpen && elementsOpen && (
//               <div className="fixed top-20 left-20 z-[100]">
//                 <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg w-48">
//                   <div className="mb-2">
//                     <input
//                       type="text"
//                       placeholder="Search shapes..."
//                       className="w-full p-1 text-xs border border-gray-200 rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Recents</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {shapes.slice(0, 3).map((shape, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(shape.label)}
//                           className={`p-2 rounded ${shape.color}`}
//                           title={shape.label}
//                         >
//                           <shape.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="mb-2">
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Connections</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {shapes.slice(3, 6).map((shape, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(shape.label)}
//                           className={`p-2 rounded ${shape.color}`}
//                           title={shape.label}
//                         >
//                           <shape.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Basic</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {shapes.map((shape, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(shape.label)}
//                           className={`p-2 rounded ${shape.color}`}
//                           title={shape.label}
//                         >
//                           <shape.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Draw Note - Yopiq bo'lganda o'ng tarafdan chiqadi */}
//           <div className="relative">
//             <button 
//               onClick={() => setDrawNoteOpen(!drawNoteOpen)}
//               className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center" 
//               title="Draw Note"
//             >
//               <Pencil size={20} />
//             </button>
            
//             {/* Yopiq bo'lganda o'ng tarafdan chiqadigan draw tools panel */}
//             {!isOpen && drawNoteOpen && (
//               <div className="fixed top-20 left-20 z-[100]">
//                 <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg w-48">
//                   <div className="mb-2">
//                     <input
//                       type="text"
//                       placeholder="Search tools..."
//                       className="w-full p-1 text-xs border border-gray-200 rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Drawing Tools</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {drawTools.slice(0, 3).map((tool, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(tool.label)}
//                           className={`p-2 rounded ${tool.color}`}
//                           title={tool.label}
//                         >
//                           <tool.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Text Tools</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {drawTools.slice(3, 6).map((tool, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(tool.label)}
//                           className={`p-2 rounded ${tool.color}`}
//                           title={tool.label}
//                         >
//                           <tool.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* AI Assistant */}
//           <button className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center" title="AI Assistant">
//             <MessageCircle size={20} />
//           </button>
          
//           {/* First Position */}
//           <button 
//             onClick={() => onPositionChange('first')}
//             className={`p-2 rounded border flex items-center justify-center hover:bg-orange-100 transition-colors ${
//               currentPosition === 'first' 
//                 ? 'text-blue-600 bg-blue-50 border-blue-200' 
//                 : 'text-orange-500 bg-orange-50 border-orange-200'
//             }`}
//             title="First Position"
//           >
//             <Bookmark size={20} />
//           </button>
          
//           {/* Second Position */}
//           <button 
//             onClick={() => onPositionChange('second')}
//             className={`p-2 rounded border flex items-center justify-center hover:bg-orange-100 transition-colors ${
//               currentPosition === 'second' 
//                 ? 'text-blue-600 bg-blue-50 border-blue-200' 
//                 : 'text-orange-500 bg-orange-50 border-orange-200'
//             }`}
//             title="Second Position"
//           >
//             <Bookmark size={20} />
//           </button>
          
//           {/* Exercise */}
//           <button 
//             onClick={onExerciseClick}
//             className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center" 
//             title="Exercise"
//           >
//             <Presentation size={20} />
//           </button>
//         </div>
//       </div>
      
//       {/* Full Content - Faqat ochiq bo'lganda */}
//       {isOpen && (
//         <div className="py-4 min-w-64">
//           {/* Title - Ochiq bo'lganda ham ko'rinadi */}
//           <div className="mb-2 text-base font-semibold text-blue-600 text-start px-4 border-b border-gray-200 pb-4">
//             Student tools
//           </div>
//           <div className="space-y-6">
//             {/* Elements - Ochiq bo'lganda tagidan chiqadi */}
//             <div className="relative">
//               <button
//                 onClick={() => setElementsOpen(!elementsOpen)}
//                 className="w-full flex items-center gap-2 p-2 text-left rounded hover:bg-gray-50 px-4"
//               >
//                 <Square size={16} />
//                 <span className="font-medium text-gray-700">Elements</span>
//               </button>
              
//               {/* Ochiq bo'lganda tagidan chiqadigan shapes panel */}
//               {elementsOpen && (
//                 <div className="bg-white border border-gray-200  p-2  mt-2 px-2">
//                   <div className="mb-2">
//                     <input
//                       type="text"
//                       placeholder="Search shapes..."
//                       className="w-full p-1 text-xs border border-gray-200 rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Recents</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {shapes.slice(0, 3).map((shape, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(shape.label)}
//                           className={`p-2 rounded ${shape.color}`}
//                           title={shape.label}
//                         >
//                           <shape.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="mb-2">
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Connections</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {shapes.slice(3, 6).map((shape, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(shape.label)}
//                           className={`p-2 rounded ${shape.color}`}
//                           title={shape.label}
//                         >
//                           <shape.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Basic</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {shapes.map((shape, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(shape.label)}
//                           className={`p-2 rounded ${shape.color}`}
//                           title={shape.label}
//                         >
//                           <shape.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Draw Note - Ochiq bo'lganda tagidan chiqadi */}
//             <div className="relative">
//               <button
//                 onClick={() => setDrawNoteOpen(!drawNoteOpen)}
//                 className="w-full flex items-center gap-2 p-2 text-left rounded hover:bg-gray-50 px-4"
//               >
//                 <Pencil size={16} />
//                 <span className="font-medium text-gray-700">Draw Note</span>
//               </button>
              
//               {/* Ochiq bo'lganda tagidan chiqadigan draw tools panel */}
//               {drawNoteOpen && (
//                 <div className="bg-white border border-gray-200 p-2 mt-2 px-2">
//                   <div className="mb-2">
//                     <input
//                       type="text"
//                       placeholder="Search tools..."
//                       className="w-full p-1 text-xs border border-gray-200 rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Drawing Tools</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {drawTools.slice(0, 3).map((tool, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(tool.label)}
//                           className={`p-2 rounded ${tool.color}`}
//                           title={tool.label}
//                         >
//                           <tool.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-700 mb-1">Text Tools</h4>
//                     <div className="grid grid-cols-3 gap-1">
//                       {drawTools.slice(3, 6).map((tool, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => onElementAdd(tool.label)}
//                           className={`p-2 rounded ${tool.color}`}
//                           title={tool.label}
//                         >
//                           <tool.icon size={16} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* AI Assistant */}
//             <div className="px-4">
//               <h3 className="font-medium mb-3 text-gray-700 flex items-center gap-2">
//                 <MessageCircle size={16} />
//                 AI assistent
//               </h3>
//             </div>

//             {/* Position Buttons */}
//             <div className="space-y-2 px-4">
//               <button
//                 onClick={() => onPositionChange('first')}
//                 className={`w-full p-2 text-left rounded ${
//                   currentPosition === 'first' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 First Position
//               </button>
//               <button
//                 onClick={() => onPositionChange('second')}
//                 className={`w-full p-2 text-left rounded ${
//                   currentPosition === 'second' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Second Position
//               </button>
//               <button
//                 onClick={onExerciseClick}
//                 className={`w-full p-2 text-left rounded ${
//                   currentPosition === 'exercise' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 exercise
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ContentViewer komponenti ichida defaultCCHandler ni olib tashlayman
// const ContentViewer = ({ content, onTimeUpdate, currentTime, showExercise, onExerciseClose, isCCActive, subtitleMode, currentPosition, onPositionChange }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentVideoTime, setCurrentVideoTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showProgressBar, setShowProgressBar] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [showCenterButton, setShowCenterButton] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showFullscreenControls, setShowFullscreenControls] = useState(false);
//   const [showFullscreenSidebar, setShowFullscreenSidebar] = useState(true);
//   const [fullscreenElementsOpen, setFullscreenElementsOpen] = useState(false);
//   const [fullscreenDrawNoteOpen, setFullscreenDrawNoteOpen] = useState(false);
//   const videoRef = useRef(null);
//   const progressBarRef = useRef(null);
//   const fullscreenProgressBarRef = useRef(null);
//   const progressTimeoutRef = useRef(null);
//   const centerButtonTimeoutRef = useRef(null);
//   const fullscreenTimeoutRef = useRef(null);

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       setCurrentVideoTime(currentTime);
//       onTimeUpdate(currentTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       setDuration(videoRef.current.duration);
//     }
//   };

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       console.log('handlePlayPause called, isPlaying:', isPlaying, 'video.paused:', videoRef.current.paused);
      
//       if (videoRef.current.paused) {
//         videoRef.current.play().catch(error => {
//           console.error('Error playing video:', error);
//         });
//       } else {
//         videoRef.current.pause();
//       }
      
//       // Center button ko'rsatish
//       setShowCenterButton(true);
//       if (centerButtonTimeoutRef.current) {
//         clearTimeout(centerButtonTimeoutRef.current);
//       }
//       centerButtonTimeoutRef.current = setTimeout(() => {
//         setShowCenterButton(false);
//       }, 1000);
//     }
//   };

//   const handleSkipBack = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = Math.max(0, currentVideoTime - 10);
//     }
//   };

//   const handleSkipForward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = Math.min(duration, currentVideoTime + 10);
//     }
//   };

//   const handleRewind = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = Math.max(0, currentVideoTime - 30);
//     }
//   };

//   const handleFastForward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = Math.min(duration, currentVideoTime + 30);
//     }
//   };

//   const handleVolumeChange = (newVolume) => {
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume;
//       setVolume(newVolume);
//       setIsMuted(newVolume === 0);
//     }
//   };

//   const handleMuteToggle = () => {
//     if (videoRef.current) {
//       if (isMuted) {
//         videoRef.current.volume = volume;
//         setIsMuted(false);
//       } else {
//         videoRef.current.volume = 0;
//         setIsMuted(true);
//       }
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleVideoMouseEnter = () => {
//     setShowProgressBar(true);
//     if (progressTimeoutRef.current) {
//       clearTimeout(progressTimeoutRef.current);
//     }
//   };

//   const handleVideoMouseLeave = () => {
//     if (!isDragging) {
//       progressTimeoutRef.current = setTimeout(() => {
//         setShowProgressBar(false);
//       }, 2000);
//     }
//   };

//   const handleProgressClick = (e) => {
//     if (progressBarRef.current && videoRef.current) {
//       const rect = progressBarRef.current.getBoundingClientRect();
//       const clickX = e.clientX - rect.left;
//       const progressWidth = rect.width;
//       const clickPercent = clickX / progressWidth;
//       const newTime = clickPercent * duration;
//       videoRef.current.currentTime = newTime;
//       setCurrentVideoTime(newTime);
//     }
//   };

//   const handleProgressMouseDown = (e) => {
//     setIsDragging(true);
//     handleProgressClick(e);
//   };

//   const handleProgressMouseMove = (e) => {
//     if (isDragging) {
//       handleProgressClick(e);
//     }
//   };

//   const handleProgressMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleFullscreenToggle = async () => {
//     try {
//       // Store current video state before toggling
//       if (videoRef.current) {
//         const currentState = {
//           currentTime: videoRef.current.currentTime,
//           isPlaying: !videoRef.current.paused,
//           volume: videoRef.current.volume,
//           muted: videoRef.current.muted
//         };
//         console.log('Storing video state before fullscreen toggle:', currentState);
//         setVideoStateBeforeToggle(currentState);
//       }

//       if (!isFullscreen) {
//         // Entering fullscreen - use native browser fullscreen
        
//         // Request fullscreen on the document element
//         await document.documentElement.requestFullscreen();
        
//         // Update state after successful fullscreen
//         setIsFullscreen(true);
//         setShowFullscreenControls(true);
        
//         if (fullscreenTimeoutRef.current) {
//           clearTimeout(fullscreenTimeoutRef.current);
//         }
//         fullscreenTimeoutRef.current = setTimeout(() => {
//           setShowFullscreenControls(false);
//         }, 3000);
        
//         // Video state restoration is now handled by useEffect
//       } else {
//         // Exiting fullscreen
//         await document.exitFullscreen();
//         setIsFullscreen(false);
//       }
//     } catch (error) {
//       console.error('Fullscreen error:', error);
//       // Fallback to previous behavior if fullscreen API fails
      
//       // Store current video state before toggling
//       if (videoRef.current) {
//         const currentState = {
//           currentTime: videoRef.current.currentTime,
//           isPlaying: !videoRef.current.paused,
//           volume: videoRef.current.volume,
//           muted: videoRef.current.muted
//         };
//         console.log('Storing video state before fullscreen toggle (fallback):', currentState);
//         setVideoStateBeforeToggle(currentState);
//       }
      
//       const newFullscreenState = !isFullscreen;
//       setIsFullscreen(newFullscreenState);
      
//       if (newFullscreenState) {
//         setShowFullscreenControls(true);
//         if (fullscreenTimeoutRef.current) {
//           clearTimeout(fullscreenTimeoutRef.current);
//         }
//         fullscreenTimeoutRef.current = setTimeout(() => {
//           setShowFullscreenControls(false);
//         }, 3000);
//       }
      
//       // Video state restoration is now handled by useEffect
//     }
//   };

//   const handleFullscreenMouseMove = () => {
//     if (isFullscreen) {
//       setShowFullscreenControls(true);
//       if (fullscreenTimeoutRef.current) {
//         clearTimeout(fullscreenTimeoutRef.current);
//       }
//       fullscreenTimeoutRef.current = setTimeout(() => {
//         setShowFullscreenControls(false);
//       }, 3000);
//     }
//   };

//   // Keyboard event handler
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.code === 'Space') {
//         e.preventDefault();
//         handlePlayPause();
//       }
//     };

//     document.addEventListener('keydown', handleKeyPress);
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [isPlaying, handlePlayPause]);

//   // Fullscreen change event handler
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement && isFullscreen) {
//         // User exited fullscreen via browser controls
//         setIsFullscreen(false);
//       }
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, [isFullscreen]);

//   // Click outside handler for fullscreen panels
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isFullscreen && (fullscreenElementsOpen || fullscreenDrawNoteOpen)) {
//         const sidebar = document.querySelector('[data-fullscreen-sidebar]');
//         const elementsPanel = document.querySelector('[data-elements-panel]');
//         const drawPanel = document.querySelector('[data-draw-panel]');
        
//         if (sidebar && !sidebar.contains(event.target) && 
//             elementsPanel && !elementsPanel.contains(event.target) &&
//             drawPanel && !drawPanel.contains(event.target)) {
//           setFullscreenElementsOpen(false);
//           setFullscreenDrawNoteOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isFullscreen, fullscreenElementsOpen, fullscreenDrawNoteOpen]);

//   // Video state preservation for fullscreen toggle
//   const [videoStateBeforeToggle, setVideoStateBeforeToggle] = useState(null);
//   const [isRestoringVideoState, setIsRestoringVideoState] = useState(false);

//   // Position change handler
//   const handlePositionChange = (newPosition) => {
//     console.log('Position changing from', currentPosition, 'to', newPosition);
//     onPositionChange(newPosition);
//   };

//   // Reset video state when switching to video position
//   useEffect(() => {
//     if (currentPosition === 'first' && videoRef.current) {
//       console.log('Video position activated, resetting video state');
//       // Reset video state when switching to video position
//       setIsPlaying(false);
//       setShowCenterButton(true);
//       if (centerButtonTimeoutRef.current) {
//         clearTimeout(centerButtonTimeoutRef.current);
//       }
//       centerButtonTimeoutRef.current = setTimeout(() => {
//         setShowCenterButton(false);
//       }, 1000);
//     }
//   }, [currentPosition]);

//   // Save video state when switching away from video position
//   useEffect(() => {
//     if (currentPosition !== 'first' && videoRef.current) {
//       console.log('Saving video state before switching away from video position');
//       const currentState = {
//         currentTime: videoRef.current.currentTime,
//         isPlaying: !videoRef.current.paused,
//         volume: videoRef.current.volume,
//         muted: videoRef.current.muted
//       };
//       setVideoStateBeforeToggle(currentState);
//     }
//   }, [currentPosition]);

//   // Save video state when component unmounts or video element changes
//   useEffect(() => {
//     return () => {
//       if (videoRef.current) {
//         console.log('Component unmounting, saving video state');
//         const currentState = {
//           currentTime: videoRef.current.currentTime,
//           isPlaying: !videoRef.current.paused,
//           volume: videoRef.current.volume,
//           muted: videoRef.current.muted
//         };
//         setVideoStateBeforeToggle(currentState);
//       }
//     };
//   }, []);

//   // Ensure video element is properly initialized when mounted
//   useEffect(() => {
//     if (currentPosition === 'first' && videoRef.current) {
//       console.log('Video element mounted, ensuring proper state');
      
//       // Add event listeners for better state management
//       const video = videoRef.current;
      
//       const handlePlay = () => {
//         console.log('Video play event');
//         setIsPlaying(true);
//       };
      
//       const handlePause = () => {
//         console.log('Video pause event');
//         setIsPlaying(false);
//       };
      
//       const handleTimeUpdate = () => {
//         if (video) {
//           setCurrentVideoTime(video.currentTime);
//         }
//       };
      
//       video.addEventListener('play', handlePlay);
//       video.addEventListener('pause', handlePause);
//       video.addEventListener('timeupdate', handleTimeUpdate);
      
//       // If no saved state, ensure video is paused
//       if (!videoStateBeforeToggle) {
//         if (!video.paused) {
//           video.pause();
//         }
//         setIsPlaying(false);
//       }
      
//       return () => {
//         video.removeEventListener('play', handlePlay);
//         video.removeEventListener('pause', handlePause);
//         video.removeEventListener('timeupdate', handleTimeUpdate);
//       };
//     }
//   }, [currentPosition]);





//   // 3D Animation Component for Second Position
//   const ThreeDAnimation = React.memo(() => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedPlanet, setSelectedPlanet] = useState(null);
//     const [showOrbits, setShowOrbits] = useState(true);
//     const [cameraPosition, setCameraPosition] = useState('default');
//     const cameraRef = useRef(null);
//     const [animationSpeed, setAnimationSpeed] = useState(0.0001);

//     useEffect(() => {
//       // Check if model exists
//       const checkModel = async () => {
//         try {
//           setIsLoading(true);
//           setError(null);
          
//           const response = await fetch('/models/solar_system_animation.glb');
//           if (!response.ok) {
//             throw new Error('3D model not found. Please ensure solar_system_animation.glb is in public/models/ folder');
//           }
          
//           setIsLoading(false);
//         } catch (err) {
//           console.error('Error loading model:', err);
//           setError(err.message);
//           setIsLoading(false);
//         }
//       };

//       checkModel();
//     }, []);

//     if (isLoading) {
//       return (
//         <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
//           <div className="text-center text-white">
//             <div className="text-6xl mb-4 animate-spin">🌌</div>
//             <h2 className="text-2xl font-bold mb-2">Quyosh sistemasi yuklanmoqda</h2>
//             <p className="text-lg opacity-80">Iltimos, kuting...</p>
//           </div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
//           <div className="text-center text-white">
//             <div className="text-6xl mb-4">⚠️</div>
//             <h2 className="text-2xl font-bold mb-2">Model yuklanishida xatolik</h2>
//             <p className="text-lg opacity-80">{error}</p>
//             <p className="text-sm opacity-60 mt-2">
//               Iltimos, solar_system_animation.glb fayl public/models/ papkasida ekanligini tekshiring
//             </p>
//           </div>
//         </div>
//       );
//     }

//       return (
//     <div className="w-full h-full relative">
//         {/* React Three Fiber Canvas */}
//         <Canvas
//           camera={{ position: [0, 15, 25], fov: 60 }}
//           shadows
//           style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
//           gl={{ 
//             antialias: true,
//             alpha: true,
//             powerPreference: "high-performance",
//             preserveDrawingBuffer: false,
//             failIfMajorPerformanceCaveat: false
//           }}
//           onCreated={({ gl, camera }) => {
//             cameraRef.current = camera;
//             // Handle WebGL context loss
//             gl.getContext().canvas.addEventListener('webglcontextlost', (event) => {
//               console.warn('WebGL context lost, attempting to restore...');
//               event.preventDefault();
//             });
            
//             gl.getContext().canvas.addEventListener('webglcontextrestored', () => {
//               console.log('WebGL context restored');
//             });
//           }}
//           onPointerMissed={() => setSelectedPlanet(null)}
//         >
//           {/* Lighting */}
//           <ambientLight intensity={0.3} />
//           <directionalLight
//             position={[10, 10, 5]}
//             intensity={1}
//             castShadow
//             shadow-mapSize-width={2048}
//             shadow-mapSize-height={2048}
//           />
//           <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" />

//           {/* Stars Background */}
//           <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

//           {/* Solar System Model */}
//           <SolarSystemModel 
//             selectedPlanet={selectedPlanet}
//             onPlanetSelect={setSelectedPlanet}
//             showOrbits={showOrbits}
//             animationSpeed={animationSpeed}
//             setAnimationSpeed={setAnimationSpeed}
//             cameraRef={cameraRef}
//           />

//           {/* Camera Controls */}
//           <OrbitControls
//             enablePan={true}
//             enableZoom={true}
//             enableRotate={true}
//             minDistance={10}
//             maxDistance={50}
//             maxPolarAngle={Math.PI / 2}
//           />
//         </Canvas>

//         {/* UI Controls */}
//           <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-blur-sm z-10">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-bold">Sayyoralar</h3>
//               <button
//               onClick={() => setShowOrbits(!showOrbits)}
//                 className="text-sm px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
//               >
//                 {showOrbits ? 'Yashir' : 'Ko\'rsat'}
//               </button>
//             </div>
            
//             <div className="space-y-2 mb-3">
//               {['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((planet) => (
//                 <button
//                   key={planet}
//                 onClick={() => setSelectedPlanet(planet)}
//                   className={`planet-button block w-full text-left px-3 py-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors ${
//                     selectedPlanet === planet ? 'bg-blue-600 text-white' : ''
//                   }`}
//                 >
//                   {planet}
//                 </button>
//               ))}
//             </div>
            
//             <button
//             onClick={() => setSelectedPlanet(null)}
//               className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors text-sm"
//             >
//               Umumiy ko'rinish
//             </button>
            
//             {/* Animation Speed Control */}
//             <div className="mt-3 pt-3 border-t border-gray-600">
//               <label className="block text-sm font-medium mb-2">Animatsiya tezligi</label>
//               <input
//                 type="range"
//                 min="0.0001"
//                 max="0.5"
//                 step="0.001"
//                 value={animationSpeed}
//                 onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
//                 className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
//               />
//               <div className="text-xs text-gray-400 mt-1">
//                 {Math.round(animationSpeed * 1000) / 10}% tezlik
//               </div>
//             </div>
//           </div>
        
//         {/* Selected Planet Info */}
//         {selectedPlanet && (
//           <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-blur-sm max-w-xs z-10">
//             <h4 className="text-lg font-bold mb-2">{selectedPlanet}</h4>
//             <p className="text-sm opacity-80">
//               {selectedPlanet === 'Sun' && 'Quyosh - Quyosh sistemasining markazi'}
//               {selectedPlanet === 'Mercury' && 'Merkuriy - Eng yaqin va eng kichik sayyora'}
//               {selectedPlanet === 'Venus' && 'Venera - Yerga eng yaqin sayyora'}
//               {selectedPlanet === 'Earth' && "Yer - Yagona hayot mavjud bo'lgan sayyora"}
//               {selectedPlanet === 'Mars' && 'Mars - Qizil sayyora'}
//               {selectedPlanet === 'Jupiter' && 'Yupiter - Eng katta sayyora'}
//               {selectedPlanet === 'Saturn' && 'Saturn - Halqalari bilan mashhur'}
//               {selectedPlanet === 'Uranus' && 'Uran - Yan tomonga egilgan'}
//               {selectedPlanet === 'Neptune' && 'Neptun - Eng uzoq sayyora'}
//             </p>
//           </div>
//         )}
        
//         {/* Status Indicator */}
//           <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg backdrop-blur-sm z-10">
//             <span className="text-sm">
//             ✅ 3D Model tayyor
//             </span>
//           </div>
//       </div>
//     );
//   });

//   // Solar System Model Component with GLB Model
//   const SolarSystemModel = React.memo(({ selectedPlanet, onPlanetSelect, showOrbits, animationSpeed, setAnimationSpeed, cameraRef }) => {
//     const groupRef = useRef();
//     const timeRef = useRef(0);
    
//     // Load the GLB model with animations
//     const { scene, animations } = useGLTF('/models/solar_system_animation.glb');
    
//     // Animation mixer for GLB animations
//     const mixerRef = useRef();
    
//     // Memoize scene to prevent unnecessary re-renders
//     const memoizedScene = useMemo(() => scene, [scene]);
    
//     // Enable shadows and setup the model
//     useEffect(() => {
//       if (memoizedScene) {
//         console.log('=== SETUP: Setting up scene objects ===');
//         let clickableCount = 0;
        
//         memoizedScene.traverse((child) => {
//           if (child.isMesh) {
//             child.castShadow = true;
//             child.receiveShadow = true;
            
//             // Make all meshes clickable for now
//             child.userData.clickable = true;
//             child.userData.planetName = child.name;
            
//             // Try to identify planets by name patterns
//             let standardName = null;
//             const name = child.name.toLowerCase();
            
//             if (name.includes('sun') || name.includes('53')) standardName = 'Sun';
//             else if (name.includes('mercury') || name.includes('merkur')) standardName = 'Mercury';
//             else if (name.includes('venus') || name.includes('venera')) standardName = 'Venus';
//             else if (name.includes('earth') || name.includes('yer') || name.includes('52')) standardName = 'Earth';
//             else if (name.includes('mars') || name.includes('54')) standardName = 'Mars';
//             else if (name.includes('jupiter') || name.includes('yupiter') || name.includes('56')) standardName = 'Jupiter';
//             else if (name.includes('saturn') || name.includes('saturn') || name.includes('58')) standardName = 'Saturn';
//             else if (name.includes('uranus') || name.includes('uran') || name.includes('60')) standardName = 'Uranus';
//             else if (name.includes('neptune') || name.includes('neptun') || name.includes('62')) standardName = 'Neptune';
//             else if (name.includes('pluto') || name.includes('42')) standardName = 'Pluto';
            
//             if (standardName) {
//               child.userData.standardName = standardName;
//               clickableCount++;
//               console.log('Made clickable:', child.name, '->', standardName);
//             } else {
//               console.log('Unknown object:', child.name, 'Type:', child.type, 'Full name:', child.name);
//             }
//           }
//         });
        
//         console.log(`=== SETUP: Made ${clickableCount} objects clickable ===`);
        
//         // Setup animation mixer if animations exist
//         if (animations && animations.length > 0) {
//           console.log('Found GLB animations:', animations.length);
//           try {
//             mixerRef.current = new THREE.AnimationMixer(memoizedScene);
            
//             // Play all animations with slower speed
//             animations.forEach((clip) => {
//               console.log('Playing animation:', clip.name);
//               const action = mixerRef.current.clipAction(clip);
//               // Set animation speed dynamically
//               action.timeScale = animationSpeed;
//               action.play();
//             });
//           } catch (error) {
//             console.warn('Animation mixer setup failed:', error);
//           }
//         } else {
//           console.log('No GLB animations found, using custom animation');
//         }
//       }
//     }, [memoizedScene, animations]); // Removed animationSpeed dependency
    
//     // Update animation speed when it changes
//     useEffect(() => {
//       if (mixerRef.current && animations && animations.length > 0) {
//         animations.forEach((clip) => {
//           const action = mixerRef.current.clipAction(clip);
//           if (action.isRunning()) {
//             action.timeScale = animationSpeed;
//           }
//         });
//       }
//     }, [animationSpeed, animations]);

//         // Handle planet clicks and camera movement
//     useEffect(() => {
//       console.log('Camera effect triggered:', { selectedPlanet, cameraRef: !!cameraRef?.current, memoizedScene: !!memoizedScene });
      
//       if (selectedPlanet && cameraRef?.current) {
//         console.log('Looking for planet:', selectedPlanet);
        
//         // Find the selected planet in the scene
//         let targetPosition = null;
//         let foundPlanet = null;
        
//         memoizedScene.traverse((child) => {
//           if (child.userData.clickable) {
//             console.log('Found clickable object:', child.name, 'standardName:', child.userData.standardName);
//             if (child.userData.standardName === selectedPlanet) {
//               targetPosition = child.getWorldPosition(new THREE.Vector3());
//               foundPlanet = child;
//               console.log('Found target planet:', selectedPlanet, 'at position:', targetPosition);
//             }
//           }
//         });
        
//         // Debug: Show all clickable objects
//         console.log('=== DEBUG: All clickable objects ===');
//         memoizedScene.traverse((child) => {
//           if (child.userData.clickable) {
//             console.log('Clickable:', child.name, 'standardName:', child.userData.standardName);
//           }
//         });
//         console.log('=== END DEBUG ===');
        
//         console.log('Looking for planet:', selectedPlanet);
//         console.log('Target position found:', !!targetPosition);
//         console.log('Found planet:', !!foundPlanet);

//         if (targetPosition && foundPlanet) {
//           console.log('Moving camera to planet:', selectedPlanet);
          
//           // Move camera to the planet
//           const distance = 8; // Distance from planet
//           const offset = new THREE.Vector3(distance, distance * 0.5, distance);
          
//           // Animate camera movement
//           const startPosition = cameraRef.current.position.clone();
//           const endPosition = targetPosition.clone().add(offset);
          
//           console.log('Camera movement:', { start: startPosition, end: endPosition });
          
//           let progress = 0;
//           const animateCamera = () => {
//             progress += 0.02;
//             if (progress <= 1) {
//               cameraRef.current.position.lerpVectors(startPosition, endPosition, progress);
//               cameraRef.current.lookAt(targetPosition);
//               requestAnimationFrame(animateCamera);
//             }
//           };
//           animateCamera();
//         } else {
//           console.log('Planet not found or no target position');
//         }
//       } else if (!selectedPlanet && cameraRef?.current) {
//         console.log('Returning to default view');
        
//         // Return to default view
//         const defaultPosition = new THREE.Vector3(0, 15, 25);
//         const startPosition = cameraRef.current.position.clone();
        
//         let progress = 0;
//         const animateCamera = () => {
//           progress += 0.02;
//           if (progress <= 1) {
//             cameraRef.current.position.lerpVectors(startPosition, defaultPosition, progress);
//             cameraRef.current.lookAt(0, 0, 0);
//             requestAnimationFrame(animateCamera);
//           }
//         };
//         animateCamera();
//       } else {
//         console.log('Camera or scene not ready:', { selectedPlanet, cameraRef: !!cameraRef?.current, memoizedScene: !!memoizedScene });
//       }
//     }, [selectedPlanet, cameraRef, memoizedScene]);

//     // Animation loop for the GLB model
//     useEffect(() => {
//       let animationId;
//       const animate = (currentTime) => {
//         if (groupRef.current) {
//           timeRef.current = currentTime * 0.001;
          
//           // Update GLB animations if they exist
//           if (mixerRef.current) {
//             try {
//               mixerRef.current.update(timeRef.current);
//             } catch (error) {
//               console.warn('Animation update failed:', error);
//             }
//           }
          
//           // Only apply custom animations if no GLB animations exist
//           if (!mixerRef.current || !animations || animations.length === 0) {
//             // Rotate entire solar system
//             groupRef.current.rotation.y += 0.001;
            
//             // Animate individual planets if they exist in the model
//             groupRef.current.traverse((child) => {
//               if (child.name && child.name.toLowerCase().includes('planet')) {
//                 const planetName = child.name.toLowerCase();
                
//                 // Store original position for orbital calculations
//                 if (!child.userData.originalPosition) {
//                   child.userData.originalPosition = {
//                     x: child.position.x,
//                     y: child.position.y,
//                     z: child.position.z
//                   };
//                 }
                
//                 // Realistic planet rotation and orbital speeds based on actual astronomical data
//                 if (planetName.includes('mercury')) {
//                   // Mercury - fastest rotation and orbit (88 Earth days)
//                   child.rotation.y += 0.04; // Self rotation
//                   const orbitRadius = 2;
//                   const orbitSpeed = 0.8; // Fastest orbit
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('venus')) {
//                   // Venus - slow rotation (243 Earth days), medium orbit (225 Earth days)
//                   child.rotation.y += 0.015; // Very slow self rotation
//                   const orbitRadius = 3;
//                   const orbitSpeed = 0.6;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('earth')) {
//                   // Earth - medium rotation (24 hours), medium orbit (365 days)
//                   child.rotation.y += 0.025; // Self rotation
//                   const orbitRadius = 4;
//                   const orbitSpeed = 0.5;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('mars')) {
//                   // Mars - medium rotation (24.6 hours), medium orbit (687 days)
//                   child.rotation.y += 0.02; // Self rotation
//                   const orbitRadius = 5;
//                   const orbitSpeed = 0.4;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('jupiter')) {
//                   // Jupiter - slow rotation (9.9 hours), slow orbit (12 years)
//                   child.rotation.y += 0.012; // Self rotation
//                   const orbitRadius = 6;
//                   const orbitSpeed = 0.25;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('saturn')) {
//                   // Saturn - slow rotation (10.7 hours), slow orbit (29 years)
//                   child.rotation.y += 0.01; // Self rotation
//                   const orbitRadius = 7;
//                   const orbitSpeed = 0.2;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('uranus')) {
//                   // Uranus - very slow rotation (17 hours), very slow orbit (84 years)
//                   child.rotation.y += 0.008; // Self rotation
//                   const orbitRadius = 8;
//                   const orbitSpeed = 0.15;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else if (planetName.includes('neptune')) {
//                   // Neptune - very slow rotation (16 hours), very slow orbit (165 years)
//                   child.rotation.y += 0.006; // Self rotation
//                   const orbitRadius = 9;
//                   const orbitSpeed = 0.12;
//                   child.position.x = child.userData.originalPosition.x + Math.cos(timeRef.current * orbitSpeed) * orbitRadius;
//                   child.position.z = child.userData.originalPosition.z + Math.sin(timeRef.current * orbitSpeed) * orbitRadius;
//                 } else {
//                   // Default for other planets
//                   child.rotation.y += 0.015;
//                 }
                
//                 // Special planet tilts
//                 if (planetName.includes('uranus')) {
//                   child.rotation.x = Math.PI / 2;
//                 } else if (planetName.includes('saturn')) {
//                   child.rotation.x = Math.PI / 6;
//                 }
//               }
              
//               // Add rotation to the Sun if it exists
//               if (child.name && child.name.toLowerCase().includes('sun')) {
//                 child.rotation.y += 0.01;
//               }
//             });
//           }
//         }
//         animationId = requestAnimationFrame(animate);
//       };
      
//       animate(0);
      
//       return () => {
//         if (animationId) {
//           cancelAnimationFrame(animationId);
//         }
//         // Cleanup animation mixer
//         if (mixerRef.current) {
//           try {
//             mixerRef.current.stopAllAction();
//           } catch (error) {
//             console.warn('Animation cleanup failed:', error);
//           }
//         }
//       };
//     }, [animations, animationSpeed]);

//     return (
//       <group ref={groupRef}>
//         <primitive object={memoizedScene} />
        
//         {/* Add planet labels based on actual model positions */}
//         {memoizedScene && (() => {
//           const labels = [];
//           memoizedScene.traverse((child) => {
//             if (child.isMesh && child.name) {
//               const planetName = child.name;
//               // Only add labels for planets, not for other objects
//               if (planetName.toLowerCase().includes('planet') || 
//                   planetName.toLowerCase().includes('sun') ||
//                   planetName.toLowerCase().includes('earth') ||
//                   planetName.toLowerCase().includes('mars') ||
//                   planetName.toLowerCase().includes('jupiter') ||
//                   planetName.toLowerCase().includes('saturn') ||
//                   planetName.toLowerCase().includes('uranus') ||
//                   planetName.toLowerCase().includes('neptune') ||
//                   planetName.toLowerCase().includes('mercury') ||
//                   planetName.toLowerCase().includes('venus')) {
                
//                 // Get the actual position of the planet from the model
//                 const position = child.getWorldPosition(new THREE.Vector3());
                
//                 labels.push(
//                   <Html key={planetName} position={[position.x, position.y + 2, position.z]} center>
//                     <div 
//                       className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs whitespace-nowrap cursor-pointer hover:bg-opacity-90 transition-all"
//                       onClick={() => onPlanetSelect(child.userData.standardName || planetName)}
//                       style={{ pointerEvents: 'auto' }}
//                     >
//                       {child.userData.standardName || planetName}
//                     </div>
//                   </Html>
//                 );
//               }
//             }
//           });
//           return labels;
//         })()}
//       </group>
//     );
//   });

//   SolarSystemModel.displayName = 'SolarSystemModel';

//   // Restore video state when fullscreen changes or video element changes
//   useEffect(() => {
//     if (videoStateBeforeToggle && videoRef.current) {
//       console.log('Attempting to restore video state:', videoStateBeforeToggle);
      
//       // Small delay to ensure the new video element is mounted
//       const timeoutId = setTimeout(() => {
//         if (videoRef.current) {
//           setIsRestoringVideoState(true);
          
//           try {
//             // Restore video properties
//             videoRef.current.currentTime = videoStateBeforeToggle.currentTime;
//             videoRef.current.volume = videoStateBeforeToggle.volume;
//             videoRef.current.muted = videoStateBeforeToggle.muted;
            
//             // Update local state to match restored state
//             setCurrentVideoTime(videoStateBeforeToggle.currentTime);
//             setVolume(videoStateBeforeToggle.volume);
//             setIsMuted(videoStateBeforeToggle.muted);
//             setIsPlaying(videoStateBeforeToggle.isPlaying);
            
//             console.log('Video state restored successfully');
            
//             // Restore play state if it was playing
//             if (videoStateBeforeToggle.isPlaying) {
//               videoRef.current.play().catch(error => {
//                 console.log('Auto-play prevented during restoration:', error);
//                 setIsPlaying(false);
//               });
//             }
//           } catch (error) {
//             console.error('Error restoring video state:', error);
//           }
          
//           // Clear the restoring flag after a short delay
//           setTimeout(() => {
//             setIsRestoringVideoState(false);
//           }, 100);
//         }
//         // Clear the stored state
//         setVideoStateBeforeToggle(null);
//       }, 200); // Increased delay to ensure video element is ready

//       return () => clearTimeout(timeoutId);
//     }
//   }, [isFullscreen, videoStateBeforeToggle, currentPosition]);

//   // Additional effect to restore state when video element is ready
//   useEffect(() => {
//     if (videoStateBeforeToggle && videoRef.current && currentPosition === 'first') {
//       console.log('Video element ready, attempting to restore state');
      
//       const timeoutId = setTimeout(() => {
//         if (videoRef.current && videoRef.current.readyState >= 1) {
//           console.log('Video element ready, restoring state');
          
//           try {
//             videoRef.current.currentTime = videoStateBeforeToggle.currentTime;
//             setCurrentVideoTime(videoStateBeforeToggle.currentTime);
//             setVolume(videoStateBeforeToggle.volume);
//             setIsMuted(videoStateBeforeToggle.muted);
//             setIsPlaying(videoStateBeforeToggle.isPlaying);
            
//             if (videoStateBeforeToggle.isPlaying) {
//               videoRef.current.play().catch(error => {
//                 console.log('Auto-play prevented during restoration:', error);
//                 setIsPlaying(false);
//               });
//             }
            
//             setVideoStateBeforeToggle(null);
//           } catch (error) {
//             console.error('Error restoring video state:', error);
//           }
//         }
//       }, 300);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [videoStateBeforeToggle, currentPosition]);

//   const progressPercent = duration > 0 ? (currentVideoTime / duration) * 100 : 0;

//   // Fullscreen video player
//   if (isFullscreen) {
//     return (
//       <div 
//         className="absolute inset-0 bg-black z-50"
//         onMouseMove={handleFullscreenMouseMove}
//       >
//         {/* Student Tools Sidebar - Fullscreen rejimda ham ko'rinadi */}
//         <div className={`absolute left-0 top-0 h-full z-30 transition-all duration-300 ${
//           showFullscreenSidebar ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           <div className="w-14 bg-white/90 backdrop-blur-md border-r rounded-br-lg border-white-200 flex flex-col items-center py-2" data-fullscreen-sidebar>
//             <div className="space-y-3">
//               {/* Elements Button */}
//               <div className="relative">
//                 <button 
//                   onClick={() => setFullscreenElementsOpen(!fullscreenElementsOpen)}
//                   className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center hover:bg-orange-100 transition-colors" 
//                   title="Elements"
//                 >
//                   <Square size={20} />
//                 </button>
                
//                 {/* Elements Panel - Fullscreen */}
//                 {fullscreenElementsOpen && (
//                   <div className="absolute left-16 top-0 z-[100]" data-elements-panel>
//                     <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg p-3 shadow-lg w-48">
//                       <div className="mb-3">
//                         <input
//                           type="text"
//                           placeholder="Search shapes..."
//                           className="w-full p-2 text-sm border border-gray-200 rounded"
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <h4 className="text-sm font-medium text-gray-700 mb-2">Basic Shapes</h4>
//                         <div className="grid grid-cols-3 gap-2">
//                           <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Circle">
//                             <Circle size={16} />
//                           </button>
//                           <button className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Square">
//                             <Square size={16} />
//                           </button>
//                           <button className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Triangle">
//                             <Triangle size={16} />
//                           </button>
//                           <button className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200" title="Star">
//                             <Star size={16} />
//                           </button>
//                           <button className="p-2 bg-pink-100 text-pink-600 rounded hover:bg-pink-200" title="Heart">
//                             <Heart size={16} />
//                           </button>
//                           <button className="p-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200" title="Arrow">
//                             <ArrowRight size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Draw Note Button */}
//               <div className="relative">
//                 <button 
//                   onClick={() => setFullscreenDrawNoteOpen(!fullscreenDrawNoteOpen)}
//                   className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center hover:bg-orange-100 transition-colors" 
//                   title="Draw Note"
//                 >
//                   <Pencil size={20} />
//                 </button>
                
//                 {/* Draw Tools Panel - Fullscreen */}
//                 {fullscreenDrawNoteOpen && (
//                   <div className="absolute left-16 top-0 z-[100]" data-draw-panel>
//                     <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg p-3 shadow-lg w-48">
//                       <div className="mb-3">
//                         <input
//                           type="text"
//                           placeholder="Search tools..."
//                           className="w-full p-2 text-sm border border-gray-200 rounded"
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <h4 className="text-sm font-medium text-gray-700 mb-2">Drawing Tools</h4>
//                         <div className="grid grid-cols-3 gap-2">
//                           <button className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Pencil">
//                             <Pencil size={16} />
//                           </button>
//                           <button className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200" title="Eraser">
//                             <Eraser size={16} />
//                           </button>
//                           <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Text">
//                             <Type size={16} />
//                           </button>
//                           <button className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Select">
//                             <MousePointer size={16} />
//                           </button>
//                           <button className="p-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200" title="Color">
//                             <Palette size={16} />
//                           </button>
//                           <button className="p-2 bg-orange-100 text-orange-600 rounded hover:bg-orange-200" title="Layers">
//                             <Layers size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* AI Assistant Button */}
//               <button 
//                 onClick={() => {
//                   // AI Assistant functionality
//                   console.log('AI Assistant clicked in fullscreen');
//                   // Here you can add AI chat functionality
//                 }}
//                 className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center hover:bg-orange-100 transition-colors" 
//                 title="AI Assistant"
//               >
//                 <MessageCircle size={20} />
//               </button>
              
            
//             </div>
//           </div>
//         </div>

//         {/* Toggle Button for Fullscreen Sidebar */}
//         <button
//           onClick={() => setShowFullscreenSidebar(!showFullscreenSidebar)}
//           className={`absolute top-4 z-40 p-1 bg-white/90 backdrop-blur-md border border-gray-200 rounded-r-lg shadow-sm hover:bg-white transition-all duration-300 ${
//             showFullscreenSidebar ? 'left-14' : 'left-0'
//           }`}
//         >
//           {showFullscreenSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
//         </button>

//         {/* Fullscreen Video */}
//         <div className="absolute inset-0 z-0">
//           {currentPosition === 'first' ? (
//             <video
//               ref={videoRef}
//               className="w-full h-full object-cover"
//               onTimeUpdate={handleTimeUpdate}

//               onLoadedMetadata={handleLoadedMetadata}
//               onPlay={() => !isRestoringVideoState && setIsPlaying(true)}
//               onPause={() => !isRestoringVideoState && setIsPlaying(false)}
//               onEnded={() => setIsPlaying(false)}
//             >
//               <source src="/solar_system.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <ThreeDAnimation />
//           )}

//           {/* Fullscreen Progress Bar - faqat video uchun */}
//           {currentPosition === 'first' && (
//             <div 
//               className={`absolute bottom-20 left-0 right-0 p-4 pl-6 transition-opacity duration-300 z-20 ${
//                 showFullscreenControls ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <div 
//                 ref={fullscreenProgressBarRef}
//                 className="w-full h-2 bg-gray-600 bg-opacity-50 rounded-full cursor-pointer relative"
//                 onClick={handleProgressClick}
//                 onMouseDown={handleProgressMouseDown}
//                 onMouseMove={handleProgressMouseMove}
//                 onMouseUp={(e) => handleProgressMouseUp(e)}
//               >
//                 {/* Progress Fill */}
//                 <div 
//                   className="h-full bg-green-500 rounded-full transition-all duration-100"
//                   style={{ width: `${progressPercent}%` }}
//                 ></div>
                
//                 {/* Progress Handle */}
//                 <div 
//                   className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full shadow-lg border-2 border-white transition-all duration-100 hover:scale-110"
//                   style={{ left: `calc(${progressPercent}% - 10px)` }}
//                 ></div>
//               </div>
//             </div>
//           )}

//           {/* Fullscreen Controls - faqat video uchun */}
//           {currentPosition === 'first' && (
//             <div className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 z-20 ${
//               showFullscreenControls ? 'opacity-100' : 'opacity-0'
//             }`}>
//                 <div className={`bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/30`}> 
//                 <div className="flex items-center gap-4">
//                   {/* Play/Pause */}
//                   <button 
//                     onClick={handlePlayPause}
//                     className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all"
//                   >
//                     {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-[2px]" />}
//                   </button>

//                   {/* Skip Back */}
//                   <button 
//                     onClick={handleSkipBack}
//                     className="p-2 text-white hover:bg-white/20 rounded"
//                   >
//                     <SkipBack size={20} />
//                   </button>

//                   {/* Skip Forward */}
//                   <button 
//                     onClick={handleSkipForward}
//                     className="p-2 text-white hover:bg-white/20 rounded"
//                   >
//                     <SkipForward size={20} />
//                   </button>

//                   {/* Volume */}
//                   <button 
//                     onClick={handleMuteToggle}
//                     className="p-2 text-white hover:bg-white/20 rounded"
//                   >
//                     {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//                   </button>

//                   {/* Time */}
//                   <div className="text-white font-mono text-sm">
//                     {formatTime(currentVideoTime)} / {formatTime(duration)}
//                   </div>

//                   <div className="flex-1"></div>

//                   {/* Exit Fullscreen */}
//                   <button 
//                     onClick={handleFullscreenToggle}
//                     className="p-2 text-white hover:bg-white/20 rounded"
//                   >
//                     <Maximize size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden z-10">
//       {/* Content Area - Scrollable */}
//       <div className="flex-1 overflow-y-auto">
//         {/* Video Section - Har doim ko'rinadi */}
//         <div className="p-4">
//           <div className="bg-white rounded-lg shadow-sm p-2 mb-2">
//             <div 
//               className="bg-black rounded-lg aspect-[16/9] relative overflow-hidden max-w-4xl mx-auto"
//               onMouseEnter={handleVideoMouseEnter}
//               onMouseLeave={handleVideoMouseLeave}
//             >
//               {currentPosition === 'first' ? (
//                 <video
//                   ref={videoRef}
//                   className="w-full h-full object-cover"
//                   onTimeUpdate={handleTimeUpdate}
//                   onLoadedMetadata={handleLoadedMetadata}
//                   onPlay={() => !isRestoringVideoState && setIsPlaying(true)}
//                   onPause={() => !isRestoringVideoState && setIsPlaying(false)}
//                   onEnded={() => setIsPlaying(false)}
//                 >
//                   <source src="/solar_system.mp4" type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <ThreeDAnimation />
//               )}
              
//               {/* Play Button Overlay - faqat video uchun */}
//               {currentPosition === 'first' && (
//                 <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
//                   showCenterButton ? 'opacity-100' : 'opacity-0'
//                 }`}>
//                   <button 
//                     onClick={handlePlayPause}
//                     className="p-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all border border-white/30 shadow-lg"
//                   >
//                     {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
//                   </button>
//                 </div>
//               )}

//               {/* Progress Bar Overlay - faqat video uchun */}
//               {currentPosition === 'first' && (
//                 <div 
//                   className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
//                     showProgressBar ? 'opacity-100' : 'opacity-0'
//                   }`}
//                 >
//                   <div 
//                     ref={progressBarRef}
//                     className="w-full h-2 bg-gray-600 bg-opacity-50 rounded-full cursor-pointer relative"
//                     onClick={handleProgressClick}
//                     onMouseDown={handleProgressMouseDown}
//                     onMouseMove={handleProgressMouseMove}
//                     onMouseUp={handleProgressMouseUp}
//                   >
//                     {/* Progress Fill */}
//                     <div 
//                       className="h-full bg-green-500 rounded-full transition-all duration-100"
//                       style={{ width: `${progressPercent}%` }}
//                     ></div>
                    
//                     {/* Progress Handle */}
//                     <div 
//                       className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-white transition-all duration-100 hover:scale-110"
//                       style={{ left: `calc(${progressPercent}% - 8px)` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Subtitle - video tagidan, media controller tepasidan */}
//           {isCCActive && (subtitleMode === 'both' || subtitleMode === 'center') && (
//             <div className="w-full flex justify-center mb-2">
//               <div className="bg-white/80 text-gray-800 px-4 py-2 rounded shadow text-center text-base font-medium max-w-4xl">
//                 Yer Quyosh sistemasida 3 chi o'rinda joylashgan
//               </div>
//             </div>
//           )}
          
//           {/* Media Controls - Har doim ko'rinadi */}
//           <div className="bg-white rounded-lg shadow-sm p-4 max-w-4xl mx-auto">
//             <div className="flex items-center gap-4">
//               {/* Left side - File controls */}
//               <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
//                 <Camera size={20} />
//               </button>
//               <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
//                 <Video size={20} />
//               </button>
//               <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
//                 <Folder size={20} />
//               </button>
              
//               <div className="flex-1"></div>
              
//               {/* Speed controls - media controllerning chap tarafida */}
//               <button 
//                 onClick={handleRewind}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 title="Rewind 30s"
//               >
//                 <Rewind size={20} />
//               </button>
//               <button 
//                 onClick={handleFastForward}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 title="Fast Forward 30s"
//               >
//                 <FastForward size={20} />
//               </button>
              
//               {/* Media controls - Maximize va Settings yonida */}
//               <button 
//                 onClick={handleSkipBack}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 title="Skip Back 10s"
//               >
//                 <SkipBack size={20} />
//               </button>
//               <button 
//                 onClick={handlePlayPause}
//                 className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//                 title={isPlaying ? "Pause" : "Play"}
//               >
//                 {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
//               </button>
//               <button 
//                 onClick={handleSkipForward}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 title="Skip Forward 10s"
//               >
//                 <SkipForward size={20} />
//               </button>
//               <button 
//                 onClick={handleMuteToggle}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 title={isMuted ? "Unmute" : "Mute"}
//               >
//                 {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//               </button>
              
//               {/* Time display */}
//               <div className="text-sm text-gray-600 font-mono">
//                 {formatTime(currentVideoTime)} / {formatTime(duration)}
//               </div>
              
//               {/* Right side - Settings */}
//               <button 
//                 onClick={handleFullscreenToggle}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 title="Fullscreen"
//               >
//                 <Maximize size={20} />
//               </button>
//               <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
//                 <Settings size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Exercise Polygon - Faqat showExercise true bo'lganda ko'rinadi */}
//         {showExercise && (
//           <div className="px-4 pb-4">
//             <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-dashed border-gray-300 max-w-4xl mx-auto">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-medium text-gray-800">Exercise poligon</h3>
//                 <button 
//                   onClick={onExerciseClose}
//                   className="p-2 text-gray-600 hover:bg-gray-100 rounded"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600 mb-4">
//                 Agar bosilsa shu yerda testmi mashq mi qilaveradi
//               </p>
//               <div className="flex gap-4">
//                 <button className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex-1">
//                   Test boshlash
//                 </button>
//                 <button className="p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex-1">
//                   Mashq boshlash
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Right Sidebar - Wireframe'dagi o'ng sidebar
// const RightSidebar = ({ onCCToggle, isCCActive }) => {
//   return (
//     <div className="w-16 bg-white border-l border-gray-200 flex flex-col items-center justify-between py-4">
//       <div className="space-y-2">
//         <button className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 font-bold text-md flex items-center justify-center" title="VR">
//           VR
//         </button>
//         <button className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 font-bold text-md flex items-center justify-center" title="AR">
//           AR
//         </button>
//         <button className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center" title="QR">
//           <QrCode size={20} />
//         </button>
//         <button className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center" title="Share">
//           <Share2 size={20} />
//         </button>
//         <button 
//           className={`p-3 rounded border font-bold text-xs flex items-center justify-center ${isCCActive ? 'bg-orange-500 text-white border-orange-500' : 'text-orange-500 bg-orange-50 border-orange-200'}`}
//           title="CC"
//           onClick={onCCToggle}
//         >
//           CC
//         </button>
//         <button className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center" title="Docs">
//           <File size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // SubtitlePanel componenti ichida:
// const SubtitlePanel = ({ subtitles, currentTime, isOpen, subtitleMode, setSubtitleMode }) => {
//   const currentSubtitle = subtitles.find(sub => 
//     currentTime >= sub.time && currentTime < (subtitles[subtitles.indexOf(sub) + 1]?.time || Infinity)
//   );

//   return (
//     <div className={`w-80 bg-white border-l border-gray-200 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}> 
//       <div className="flex items-center justify-between gap-2 p-3 border-b border-gray-100">
//         <div className="flex gap-1">
//           <button onClick={() => setSubtitleMode('both')} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${subtitleMode==='both' ? 'bg-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}> <Box size={16}/> </button>
//           <button onClick={() => setSubtitleMode('center')} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${subtitleMode==='center' ? 'bg-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}> <Maximize size={16}/> </button>
//           <button onClick={() => setSubtitleMode('right')} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${subtitleMode==='right' ? 'bg-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}> <AlignRight size={16}/> </button>
//         </div>
//         <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">UZ 🇺🇿</button>
//       </div>
//       {/* Yirik active subtitle */}
//       <div className="bg-gray-50 p-5 rounded-xl mb-5 shadow-sm mx-0">
//         <div className="text-lg font-semibold text-gray-900 leading-snug">
//           {currentSubtitle ? currentSubtitle.text : 'Subtitle mavjud emas'}
//         </div>
//       </div>
//       {/* Subtitle ro'yxati - Scroll qilish mumkin */}
//       <div className="px-2 pb-2 h-[100%] overflow-y-auto">
//         {subtitles.map((sub, idx) => (
//           <div 
//             key={idx}
//             className={`group px-3 py-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 shadow-sm mb-3 ${
//               currentSubtitle === sub
//                 ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-200' 
//                 : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-blue-200'
//             }`}
//             style={{ minHeight: 72 }}
//           >
//             <span className="font-mono text-[12px] text-gray-500 group-hover:text-blue-700 select-none">{Math.floor(sub.time / 60)}:{(sub.time % 60).toString().padStart(2, '0')}</span>
//             <div className="text-sm leading-snug font-normal break-words">{sub.text}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const QaraMetaEduPlatform = () => {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(true);
//   const [isSubtitleOpen, setIsSubtitleOpen] = useState(true);
//   const [showExercise, setShowExercise] = useState(false);
//   const [subtitleMode, setSubtitleMode] = useState('both'); // 'both', 'center', 'right'
//   const [isCCActive, setIsCCActive] = useState(false);
//   const [currentPosition, setCurrentPosition] = useState('first'); // 'first' or 'second'

//   const handleElementAdd = (elementType) => {
//     console.log('Element qo\'shildi:', elementType);
//   };

//   const handleDrawToggle = () => {
//     setIsDrawing(!isDrawing);
//   };

//   const handleStudentToolsToggle = () => {
//     setIsStudentToolsOpen(!isStudentToolsOpen);
//   };

//   const handleSubtitleToggle = () => {
//     setIsSubtitleOpen(!isSubtitleOpen);
//   };

//   const handleExerciseClick = () => {
//     setShowExercise(true);
//     // Exercise chiqqanda Student Tools va Subtitle yopiladi
//     setIsStudentToolsOpen(false);
//     setIsSubtitleOpen(false);
//   };

//   const handleExerciseClose = () => {
//     setShowExercise(false);
//     // Exercise yopilganda Student Tools va Subtitle qayta ochiladi
//     setIsStudentToolsOpen(true);
//     setIsSubtitleOpen(true);
//   };

//   const handleCCToggle = () => {
//     setIsCCActive((prev) => !prev);
//     setSubtitleMode('both');
//     setIsSubtitleOpen(true);
//   };

//   const handlePositionChange = (newPosition) => {
//     console.log('Position changed to:', newPosition);
//     setCurrentPosition(newPosition);
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-50 overflow-hidden z-0">
//       {/* App Header */}
//       <AppHeader />

//       {/* Main Content */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Student Tools Sidebar */}
//         <StudentToolsSidebar
//           onElementAdd={handleElementAdd}
//           onDrawToggle={handleDrawToggle}
//           isDrawing={isDrawing}
//           isOpen={isStudentToolsOpen}
//           onToggle={handleStudentToolsToggle}
//           onExerciseClick={handleExerciseClick}
//           currentPosition={currentPosition}
//           onPositionChange={handlePositionChange}
//         />

//         {/* Content Viewer */}
//         <ContentViewer 
//           content={mockContent}
//           currentTime={currentTime}
//           onTimeUpdate={setCurrentTime}
//           showExercise={showExercise}
//           onExerciseClose={handleExerciseClose}
//           isCCActive={isCCActive}
//           subtitleMode={subtitleMode}
//           currentPosition={currentPosition}
//           onPositionChange={handlePositionChange}
//         />
        
//         {/* Subtitle Toggle Button - O'ng tarafda */}
//         <div className="relative">
//                 <button
//             onClick={handleSubtitleToggle}
//             className="absolute top-4 right-0 z-10 p-2 bg-white border border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50"
//                 >
//             {isSubtitleOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//                 </button>
//               </div>
        
//         {/* Subtitle Panel - O'ng tarafda, RightSidebar dan chapda */}
//         {isCCActive && (subtitleMode === 'both' || subtitleMode === 'right') && (
//           <SubtitlePanel
//             subtitles={mockContent.subtitles}
//             currentTime={currentTime}
//             isOpen={isSubtitleOpen}
//             subtitleMode={subtitleMode}
//             setSubtitleMode={setSubtitleMode}
//           />
//           )}
        
//         {/* Right Sidebar */}
//         <RightSidebar onCCToggle={handleCCToggle} isCCActive={isCCActive} />
//         </div>
//       </div>
//   );
// };

// export default QaraMetaEduPlatform; 