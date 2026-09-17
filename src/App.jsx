import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RoadmapView from './components/RoadmapView';
import PinyinMaster from './components/PinyinMaster';
import HanziStrokes from './components/HanziStrokes';
import FlashcardDeck from './components/FlashcardDeck';
import GrammarMaster from './components/GrammarMaster';
import StudyPlanner from './components/StudyPlanner';
import ResourcesGuide from './components/ResourcesGuide';
import AuthGate from './components/AuthGate';
import AdminApprovalModal from './components/AdminApprovalModal';
import { AuthProvider } from './context/AuthContext';
import { roadmapStages } from './data/roadmapData';

function MainApp() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Completed milestones state persisted in localStorage
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('mandarin_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mandarin_milestones', JSON.stringify(completedMilestones));
    } catch (e) {
      console.error(e);
    }
  }, [completedMilestones]);

  const toggleMilestone = (milestoneName) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [milestoneName]: !prev[milestoneName]
    }));
  };

  // Calculate overall stats
  const allMilestones = roadmapStages.flatMap(s => s.milestones);
  const totalTasks = allMilestones.length;
  const completedTasks = allMilestones.filter(m => !!completedMilestones[m]).length;

  return (
    <AuthGate>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
        {/* Header & Sticky Nav */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          progressStats={{ completedTasks, totalTasks }}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {activeTab === 'roadmap' && (
            <RoadmapView 
              setActiveTab={setActiveTab}
              completedMilestones={completedMilestones}
              toggleMilestone={toggleMilestone}
            />
          )}
          {activeTab === 'pinyin' && <PinyinMaster />}
          {activeTab === 'hanzi' && <HanziStrokes />}
          {activeTab === 'vocabulary' && <FlashcardDeck />}
          {activeTab === 'grammar' && <GrammarMaster />}
          {activeTab === 'planner' && <StudyPlanner />}
          {activeTab === 'resources' && <ResourcesGuide />}
        </main>

        {/* Admin Approval Modal */}
        <AdminApprovalModal 
          isOpen={isAdminModalOpen} 
          onClose={() => setIsAdminModalOpen(false)} 
        />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="font-semibold text-slate-700">Dự án Lộ Trình Học Tiếng Trung Từ Con Số 0 (Zero to Hero)</span>
            </div>

            <div className="italic text-center text-slate-400">
              “千里之行，始于足下 — Đường đi ngàn dặm bắt đầu từ một bước chân.”
            </div>

            <div>
              Khung chuẩn hóa HSK 3.0 & Giao tiếp thực tế
            </div>
          </div>
        </footer>
      </div>
    </AuthGate>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
