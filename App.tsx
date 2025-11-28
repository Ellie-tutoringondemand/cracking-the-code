import React, { useState } from 'react';
import { Page, UserType, PatientProfile } from './types';
import Education from './components/Education';
import Personalisation from './components/Personalisation';
import CarerPortal from './components/CarerPortal';
import { BookOpen, UserCog, HeartHandshake, Brain, Heart, ChevronRight, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [userType, setUserType] = useState<UserType>('carer'); // Default to carer for education
  
  // App State for Profile
  const [profile, setProfile] = useState<PatientProfile>({
    name: '',
    stage: 'early',
    memories: '',
    comforts: '',
    music: '',
    communication: '',
    routines: '',
    wishes: '',
    dislikes: '',
  });

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-between h-full px-4 py-6 max-w-md mx-auto w-full">
            
            {/* Friendly Logo Area - Flexible space */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 shrink-0">
              <div className="bg-white p-5 rounded-full shadow-lg mb-4 border-4 border-blue-50 relative">
                <Brain size={79} className="text-nhs-blue/80" strokeWidth={1.5} />
                <Heart size={39} className="text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-pink-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-nhs-darkBlue text-center leading-tight">
                Cracking The Code
              </h1>
            </div>

            {/* Slogan */}
            <div className="bg-white/60 p-5 rounded-2xl mb-6 sm:mb-8 text-center backdrop-blur-sm border border-white shadow-sm shrink-0 w-full">
              <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed">
                A tool to help families understand Alzheimer's, preserve personhood, and manage care with confidence.
              </p>
            </div>

            {/* 3 Main Buttons */}
            <div className="w-full space-y-3 sm:space-y-4 shrink-0 pb-2">
              
              {/* Education Button */}
              <button 
                onClick={() => setPage('education')}
                className="w-full bg-white hover:bg-blue-50 border-2 border-nhs-blue text-nhs-darkBlue p-4 rounded-xl shadow-md flex items-center gap-4 transition-all transform active:scale-98 group"
              >
                <div className="bg-blue-100 p-2 rounded-full text-nhs-blue shrink-0">
                  <BookOpen size={24} />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-lg font-bold">Education</span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-nhs-blue" size={24} />
              </button>

              {/* Personalisation Button */}
              <button 
                onClick={() => setPage('personalisation')}
                className="w-full bg-white hover:bg-green-50 border-2 border-nhs-green text-green-900 p-4 rounded-xl shadow-md flex items-center gap-4 transition-all transform active:scale-98 group"
              >
                <div className="bg-green-100 p-2 rounded-full text-nhs-green shrink-0">
                  <UserCog size={24} />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-lg font-bold">Personalisation</span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-nhs-green" size={24} />
              </button>

              {/* Carer Portal Button */}
              <button 
                onClick={() => setPage('carer-portal')}
                className="w-full bg-white hover:bg-yellow-50 border-2 border-nhs-warmYellow text-yellow-900 p-4 rounded-xl shadow-md flex items-center gap-4 transition-all transform active:scale-98 group"
              >
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                  <HeartHandshake size={24} />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-lg font-bold">Carer Portal</span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-yellow-600" size={24} />
              </button>

            </div>

          </div>
        );
      case 'education':
        return <Education userType={userType} setUserType={setUserType} />;
      case 'personalisation':
        return <Personalisation profile={profile} setProfile={setProfile} />;
      case 'carer-portal':
        return <CarerPortal profile={profile} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text">
      {page !== 'home' && (
        <nav className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 no-print">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-nhs-blue transition-colors font-medium text-lg"
            >
              <ChevronLeft size={24} />
              Back to Home
            </button>
          </div>
        </nav>
      )}
      <main className={page === 'home' ? "h-screen overflow-hidden" : ""}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;