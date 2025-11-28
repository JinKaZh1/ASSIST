import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  MapPin, 
  MessageSquare, 
  Bell, 
  LogOut, 
  Users,
  FileText,
  AlertCircle,
  UserIcon,
  Settings,
  Shield,
  Search,
  Calendar,
  Menu,
  X,
  Sun,
  Moon
} from './components/Icons';
import { User, UserRole } from './types';
import { COURSES, ACTIVITIES, NOTIFICATIONS, FORUM_POSTS } from './services/mockData';
import { AIChat } from './components/AIChat';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { LostAndFound } from './components/LostAndFound';
import { ExcuseLetters } from './components/ExcuseLetters';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminUsers } from './components/AdminUsers';
import { MapNavigation } from './components/MapNavigation';

// --- Pages ---

const Dashboard = ({ user }: { user: User }) => {
  if (user.role === UserRole.ADMIN) return <AdminDashboard />;

  const isTeacher = user.role === UserRole.TEACHER;
  const upcomingAssignments = ACTIVITIES.filter(a => a.status === 'PENDING').slice(0, 3);
  
  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">{user.name.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
            {isTeacher 
              ? "Ready to inspire your students today?" 
              : "Let's make today productive."}
          </p>
        </div>
        <div className="glass-card px-5 py-2.5 rounded-2xl flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-semibold shadow-sm">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg text-indigo-600 dark:text-indigo-400">
             <Calendar className="w-4 h-4" />
          </div>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {isTeacher ? (
          <>
            <StatWidget title="Total Students" value="142" sub="Active in 3 courses" icon={<Users className="w-6 h-6 text-white" />} gradient="from-indigo-500 to-blue-500" />
            <StatWidget title="Attendance" value="88%" sub="Average this week" icon={<Users className="w-6 h-6 text-white" />} gradient="from-emerald-500 to-teal-500" />
            <StatWidget title="To Grade" value="24" sub="Pending submissions" icon={<FileText className="w-6 h-6 text-white" />} gradient="from-amber-500 to-orange-500" />
            <StatWidget title="Excuses" value="5" sub="Requires review" icon={<AlertCircle className="w-6 h-6 text-white" />} gradient="from-rose-500 to-pink-500" />
          </>
        ) : (
          <>
            <StatWidget title="GPA" value="3.8" sub="Top 10% of class" icon={<BookOpen className="w-6 h-6 text-white" />} gradient="from-indigo-500 to-purple-600" />
            <StatWidget title="Enrolled" value={COURSES.length.toString()} sub="Active Courses" icon={<BookOpen className="w-6 h-6 text-white" />} gradient="from-blue-500 to-cyan-500" />
            <StatWidget title="Assignments" value={upcomingAssignments.length.toString()} sub="Due this week" icon={<FileText className="w-6 h-6 text-white" />} gradient="from-amber-500 to-orange-500" />
            <StatWidget title="Attendance" value="96%" sub="Excellent record" icon={<Users className="w-6 h-6 text-white" />} gradient="from-emerald-500 to-green-500" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress / List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">{isTeacher ? "Your Classes" : "Current Progress"}</h2>
             <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COURSES.map(course => (
              <div key={course.id} className="glass-card p-0 rounded-3xl overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className={`h-2 w-full ${course.color}`}></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg mb-2">{course.code}</span>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{isTeacher ? course.schedule : course.professor}</p>
                    </div>
                    {!isTeacher && (
                        <div className="flex flex-col items-end">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">{course.progress}%</span>
                        </div>
                    )}
                    </div>
                    
                    {!isTeacher ? (
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mt-4 overflow-hidden">
                        <div className={`h-full rounded-full ${course.color} transition-all duration-1000 ease-out`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                    ) : (
                    <div className="flex gap-2 mt-6">
                        <button className="flex-1 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 text-xs py-2.5 rounded-xl font-bold transition border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700">Classroom</button>
                        <button className="flex-1 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 text-xs py-2.5 rounded-xl font-bold transition border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700">Gradebook</button>
                    </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card rounded-3xl flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-slate-100/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{isTeacher ? "Activity Feed" : "Up Next"}</h2>
          </div>
          <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[400px] lg:max-h-none custom-scrollbar">
            {isTeacher ? (
               [1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 group p-2 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl transition">
                  <div className="mt-1 w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">John Doe submitted Assignment {i}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CS101 • 10 mins ago</p>
                  </div>
                </div>
              ))
            ) : (
              upcomingAssignments.length > 0 ? upcomingAssignments.map(activity => (
                <div key={activity.id} className="flex gap-4 group p-2 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-2xl transition duration-300">
                   <div className="relative mt-1">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-100 dark:border-amber-700/30 flex flex-col items-center justify-center text-amber-700 dark:text-amber-500 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                         <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{new Date(activity.dueDate).toLocaleString('default', { month: 'short' })}</span>
                         <span className="text-lg font-extrabold leading-none">{new Date(activity.dueDate).getDate()}</span>
                      </div>
                   </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{activity.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2 font-medium">Due at {new Date(activity.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 uppercase tracking-wide">
                      {activity.type}
                    </span>
                  </div>
                </div>
              )) : (
                 <div className="text-center py-10 text-slate-400">
                    <p>No upcoming tasks. Enjoy your day!</p>
                 </div>
              )
            )}
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30">
            <button className="w-full text-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-500/10 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition">View Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatWidget = ({ title, value, sub, icon, gradient }: { title: string, value: string, sub: string, icon: React.ReactNode, gradient: string }) => (
  <div className="glass-card p-6 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
    {/* Background Glow */}
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-20`}></div>
    
    <div className="flex justify-between items-start mb-4 relative z-10">
       <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-indigo-500/20`}>
         {icon}
       </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{value}</h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold mt-1">{title}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        {sub}
      </p>
    </div>
  </div>
);

// --- Simplified Page Components for structure ---

const CoursesPage = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Courses</h1>
    <div className="grid grid-cols-1 gap-6">
      {COURSES.map(course => (
        <div key={course.id} className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition duration-500">
          <div className={`w-full md:w-4 h-2 md:h-auto ${course.color}`}></div>
          <div className="p-8 flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{course.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400">
                  <span className="font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-sm tracking-wide text-slate-600 dark:text-slate-300">{course.code}</span>
                  <span>•</span>
                  <span className="font-medium">{course.professor}</span>
                </div>
              </div>
              <span className="mt-4 md:mt-0 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-5 py-2 rounded-full text-sm font-bold shadow-sm">
                {course.schedule}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-100 dark:border-slate-700/50">
              {['View Syllabus', 'Course Modules', 'Grades & Feedback'].map(action => (
                <button key={action} className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition text-left">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ForumPage = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
      <div className="relative z-10 mb-4 md:mb-0 text-center md:text-left">
         <h1 className="text-3xl font-extrabold mb-2">PH Corners</h1>
         <p className="text-indigo-100 font-medium text-lg">Connect with the campus community.</p>
      </div>
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <div className="absolute left-0 bottom-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
      <button className="relative z-10 bg-white text-indigo-600 px-8 py-3 rounded-2xl text-sm font-bold shadow-lg hover:bg-indigo-50 transition w-full md:w-auto transform hover:scale-105">Create Post</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-3">
        <h3 className="font-bold text-slate-400 px-4 mb-2 uppercase text-xs tracking-wider">Categories</h3>
        {['All Posts', 'Announcements', 'Questions', 'Discussions'].map((cat, i) => (
          <button key={cat} className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition flex items-center justify-between ${i === 0 ? 'bg-white dark:bg-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="md:col-span-3 space-y-5">
        {FORUM_POSTS.map(post => (
          <div key={post.id} className="glass-card p-6 rounded-3xl hover:border-indigo-100 dark:hover:border-slate-700 transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-md" />
              <div>
                <div className="font-bold text-slate-800 dark:text-white text-base">{post.author}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                   <span>{post.timestamp}</span>
                   <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                   <span className={`${post.role === UserRole.TEACHER ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>{post.role}</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{post.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{post.content}</p>
            
            <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <button className="flex items-center gap-2 hover:text-rose-500 transition group"><span className="text-lg group-hover:scale-125 transition-transform">♥</span> {post.likes} Likes</button>
              <button className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"><MessageSquare className="w-4 h-4"/> {post.comments} Comments</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Layout Components ---

interface SidebarProps {
    user: User;
    onLogout: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ user, onLogout, isOpen, onClose }: SidebarProps) => {
  const isAdmin = user.role === UserRole.ADMIN;
  
  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <NavLink 
      to={to} 
      onClick={onClose}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-300 group relative overflow-hidden
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`
      }
    >
      <Icon className="w-5 h-5 transition-transform group-hover:scale-110 relative z-10" /> 
      <span className="relative z-10">{label}</span>
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </NavLink>
  );

  return (
    <>
        {/* Mobile Backdrop */}
        {isOpen && (
            <div 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                onClick={onClose}
            ></div>
        )}

        {/* Sidebar Container */}
        <div className={`
            fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-white/5
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}>
        <div className="p-8 pb-4 flex justify-between items-center">
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 ring-2 ring-white/10">
                    A
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">ASSIST</h2>
                </div>
                <p className="text-[10px] text-slate-500 font-bold pl-14 uppercase tracking-[0.2em]">
                {isAdmin ? 'Admin Console' : 'Academic Portal'}
                </p>
            </div>
            {/* Close Button Mobile */}
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white bg-white/5 p-1 rounded-lg">
                <X className="w-6 h-6" />
            </button>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
            {isAdmin ? (
            <>
                <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 mb-1">Overview</div>
                <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
                <NavItem to="/admin/users" icon={Users} label="Users" />
                <NavItem to="/courses" icon={BookOpen} label="Courses" />
                <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-1">Management</div>
                <NavItem to="/forum" icon={MessageSquare} label="Forum" />
                <NavItem to="/admin/reports" icon={FileText} label="Reports" />
                <NavItem to="/admin/settings" icon={Settings} label="Settings" />
            </>
            ) : (
            <>
                <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 mb-1">Main</div>
                <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
                <NavItem to="/courses" icon={BookOpen} label="My Courses" />
                <NavItem to="/excuse-letters" icon={FileText} label="Excuse Letters" />
                
                <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-1">Campus Life</div>
                <NavItem to="/forum" icon={Users} label="PH Corners" />
                <NavItem to="/lost-found" icon={AlertCircle} label="Lost & Found" />
                <NavItem to="/map" icon={MapPin} label="Campus Map" />
                
                <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-1">Personal</div>
                <NavItem to="/profile" icon={UserIcon} label="My Profile" />
            </>
            )}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-2xl w-full transition group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Sign Out
            </button>
        </div>
        </div>
    </>
  );
};

const Topbar = ({ user, onMenuClick, isDark, toggleTheme }: { user: User, onMenuClick: () => void, isDark: boolean, toggleTheme: () => void }) => {
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="h-24 flex items-center justify-between md:justify-end px-4 md:px-10 md:pl-80 fixed w-full top-0 z-20 transition-all">
      {/* Glass Background Panel */}
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/40 dark:border-white/5 shadow-sm z-0"></div>
      
      {/* Mobile Menu Trigger */}
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative z-10"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-4 md:gap-8 relative z-10">
        
        {/* Actions */}
        <div className="flex items-center gap-3">
           <button 
             onClick={toggleTheme}
             className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition shadow-sm hover:scale-105 active:scale-95"
           >
             {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
           </button>
           <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition shadow-sm hidden sm:flex hover:scale-105 active:scale-95">
             <Search className="w-5 h-5" />
           </button>
           <div className="relative cursor-pointer group">
              <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition shadow-sm hover:scale-105 active:scale-95">
                <Bell className="w-5 h-5" />
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 font-bold shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-4 w-80 glass-card rounded-2xl p-2 hidden group-hover:block animate-fade-in origin-top-right">
                 <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase px-4 py-3 border-b border-slate-100 dark:border-slate-700">Notifications</div>
                 <div className="max-h-64 overflow-y-auto">
                   {NOTIFICATIONS.map(n => (
                     <div key={n.id} className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-700/50 rounded-xl cursor-pointer transition">
                       <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                          {n.type === 'success' && <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shadow-sm shadow-emerald-200"></div>}
                          {n.type === 'warning' && <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 shadow-sm shadow-amber-200"></div>}
                       </div>
                       <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">{n.message}</p>
                       <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">{n.timestamp}</p>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4 pl-4 md:pl-8">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800 dark:text-white">{user.name}</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wide">{user.role}</div>
          </div>
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
             {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover" />
             ) : (
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LayoutProps {
  user: User;
  onLogout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Layout = ({ children, user, onLogout, isDark, toggleTheme }: React.PropsWithChildren<LayoutProps>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <Topbar 
        user={user} 
        onMenuClick={() => setIsSidebarOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      <main className="pt-28 px-4 pb-12 md:px-10 md:pl-80 max-w-[1920px] mx-auto min-h-screen transition-all">
        {children}
      </main>
      
      <AIChat user={user} courses={COURSES} activities={ACTIVITIES} />
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <HashRouter>
      <Layout user={user} onLogout={() => setUser(null)} isDark={isDark} toggleTheme={() => setIsDark(!isDark)}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/map" element={<MapNavigation />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/lost-found" element={<LostAndFound />} />
          <Route path="/excuse-letters" element={<ExcuseLetters />} />
          
          <Route path="/admin/users" element={user.role === UserRole.ADMIN ? <AdminUsers /> : <Navigate to="/" />} />
          <Route path="/admin/reports" element={user.role === UserRole.ADMIN ? <div className="p-20 text-center text-slate-400 text-lg font-bold">Reports Module Placeholder</div> : <Navigate to="/" />} />
          <Route path="/admin/settings" element={user.role === UserRole.ADMIN ? <div className="p-20 text-center text-slate-400 text-lg font-bold">System Settings Placeholder</div> : <Navigate to="/" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;