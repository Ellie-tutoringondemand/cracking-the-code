import React, { useState } from 'react';
import { PatientProfile } from '../types';
import { User, Heart, Clock, ShieldAlert, ArrowRight, ArrowLeft, X, Check, Brain, CheckCircle2 } from 'lucide-react';

interface PersonalisationProps {
  profile: PatientProfile;
  setProfile: (profile: PatientProfile) => void;
}

type QuestionType = 'text' | 'textarea' | 'stage-select';

interface Question {
  field: keyof PatientProfile;
  question: string;
  helperText: string;
  type: QuestionType;
  placeholder?: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  themeColor: string; // Tailwind color name (e.g., 'blue', 'pink')
  questions: Question[];
}

const Personalisation: React.FC<PersonalisationProps> = ({ profile, setProfile }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const categories: Category[] = [
    {
      id: 'basics',
      title: 'The Basics',
      description: 'Name and current stage of the condition.',
      icon: User,
      themeColor: 'blue',
      questions: [
        {
          field: 'name',
          question: "What is the name of the person living with Alzheimer's?",
          helperText: "We'll use this to personalize all our advice.",
          type: 'text',
          placeholder: "e.g. Robert, Mom, or my name"
        },
        {
          field: 'stage',
          question: "Which stage best describes the condition?",
          helperText: "This helps us tailor the complexity of our strategies.",
          type: 'stage-select'
        }
      ]
    },
    {
      id: 'history',
      title: 'Life Story',
      description: 'Significant memories, hobbies, and history.',
      icon: Heart,
      themeColor: 'rose',
      questions: [
        {
          field: 'memories',
          question: "Significant Memories & History",
          helperText: "Think about jobs, childhood pets, weddings, or proudest moments. These serve as anchors.",
          type: 'textarea',
          placeholder: "e.g. Worked as a carpenter for 40 years, loved his dog 'Buster', grew up in Cornwall..."
        },
        {
          field: 'music',
          question: "Favorite Music & Activities",
          helperText: "Specific songs or artists can calm the brain instantly.",
          type: 'textarea',
          placeholder: "e.g. The Beatles, Frank Sinatra, Knitting, Gardening..."
        }
      ]
    },
    {
      id: 'daily',
      title: 'Daily Life',
      description: 'Routines and communication preferences.',
      icon: Clock,
      themeColor: 'amber',
      questions: [
        {
          field: 'routines',
          question: "Comforting Routines",
          helperText: "What small daily habits provide structure and safety?",
          type: 'textarea',
          placeholder: "e.g. A cup of tea at 3pm, watching the news at 6, morning walk..."
        },
        {
          field: 'communication',
          question: "Communication Style",
          helperText: "How do they best receive information or express themselves?",
          type: 'textarea',
          placeholder: "e.g. Needs short sentences, responds well to touch, speaks slowly..."
        }
      ]
    },
    {
      id: 'needs',
      title: 'Care Needs',
      description: 'Triggers, dislikes, and soothing strategies.',
      icon: ShieldAlert,
      themeColor: 'green',
      questions: [
        {
          field: 'dislikes',
          question: "Dislikes & Triggers",
          helperText: "What tends to cause agitation, fear, or distress?",
          type: 'textarea',
          placeholder: "e.g. Loud noises, being rushed, cold rooms, dark corners..."
        },
        {
          field: 'comforts',
          question: "Calming Strategies",
          helperText: "What works when things get tough?",
          type: 'textarea',
          placeholder: "e.g. Holding a specific cushion, walking in the garden, hand massage..."
        }
      ]
    }
  ];

  const handleCategoryClick = (id: string) => {
    setActiveCategoryId(id);
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setActiveCategoryId(null);
    setCurrentQuestionIndex(0);
  };

  const handleNext = () => {
    if (!activeCategory) return;
    if (currentQuestionIndex < activeCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      handleClose();
    }
  };

  const updateField = (field: keyof PatientProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const currentQuestion = activeCategory ? activeCategory.questions[currentQuestionIndex] : null;

  // --- FLASHCARD VIEW ---
  if (activeCategory && currentQuestion) {
    const isLastQuestion = currentQuestionIndex === activeCategory.questions.length - 1;
    const progress = ((currentQuestionIndex + 1) / activeCategory.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto p-4 min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg bg-${activeCategory.themeColor}-100 text-${activeCategory.themeColor}-600`}>
                <activeCategory.icon size={24} />
             </div>
             <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">{activeCategory.title}</h2>
                <p className="text-xs text-gray-400">Question {currentQuestionIndex + 1} of {activeCategory.questions.length}</p>
             </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600"/>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className={`h-full bg-${activeCategory.themeColor}-500 transition-all duration-300`} 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content Card */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {currentQuestion.question}
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              {currentQuestion.helperText}
            </p>

            {currentQuestion.type === 'text' && (
              <input
                type="text"
                autoFocus
                value={profile[currentQuestion.field] || ''}
                onChange={(e) => updateField(currentQuestion.field, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className={`w-full text-xl p-4 border-2 border-gray-200 rounded-xl focus:border-${activeCategory.themeColor}-500 focus:ring-4 focus:ring-${activeCategory.themeColor}-100 outline-none transition-all`}
              />
            )}

            {currentQuestion.type === 'textarea' && (
              <textarea
                autoFocus
                rows={4}
                value={profile[currentQuestion.field] || ''}
                onChange={(e) => updateField(currentQuestion.field, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className={`w-full text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-${activeCategory.themeColor}-500 focus:ring-4 focus:ring-${activeCategory.themeColor}-100 outline-none transition-all resize-none`}
              />
            )}

            {currentQuestion.type === 'stage-select' && (
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => updateField('stage', 'early')}
                  className={`p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                    profile.stage === 'early' 
                    ? 'border-nhs-green bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                   <div className="flex justify-between items-start mb-2">
                     <span className={`text-xl font-bold ${profile.stage === 'early' ? 'text-nhs-green' : 'text-gray-700'}`}>Early Stage</span>
                     {profile.stage === 'early' && <CheckCircle2 className="text-nhs-green" />}
                   </div>
                   <p className="text-gray-600 text-sm">Mild forgetfulness, repeating questions, still largely independent.</p>
                </button>

                <button
                  onClick={() => updateField('stage', 'late')}
                  className={`p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                    profile.stage === 'late' 
                    ? 'border-nhs-warmYellow bg-yellow-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                   <div className="flex justify-between items-start mb-2">
                     <span className={`text-xl font-bold ${profile.stage === 'late' ? 'text-yellow-700' : 'text-gray-700'}`}>Later Stage</span>
                     {profile.stage === 'late' && <CheckCircle2 className="text-yellow-700" />}
                   </div>
                   <p className="text-gray-600 text-sm">Confusion about time/place, needs help with daily tasks, potential behavioral changes.</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex justify-between items-center pt-4">
           <button
             onClick={handleBack}
             className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-colors"
           >
             <ArrowLeft size={20} />
             {currentQuestionIndex === 0 ? "Cancel" : "Back"}
           </button>

           <button
             onClick={handleNext}
             className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white shadow-lg transform active:scale-95 transition-all
               bg-${activeCategory.themeColor}-500 hover:bg-${activeCategory.themeColor}-600`}
           >
             {isLastQuestion ? "Finish" : "Next"}
             {isLastQuestion ? <Check size={20} /> : <ArrowRight size={20} />}
           </button>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-nhs-darkBlue mb-3">My Profile</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Help us "crack the code" by filling out these four areas. 
          The more we know, the better we can help.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          // Check if category is "complete" (naive check: is at least one field filled?)
          const isStarted = cat.questions.some(q => !!profile[q.field]);
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`group relative text-left p-8 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md
                ${isStarted 
                  ? `bg-white border-${cat.themeColor}-200` 
                  : 'bg-white border-gray-100'
                } hover:border-${cat.themeColor}-500`}
            >
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors
                bg-${cat.themeColor}-100 text-${cat.themeColor}-600 group-hover:bg-${cat.themeColor}-600 group-hover:text-white
              `}>
                <Icon size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-nhs-darkBlue">
                {cat.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex items-center font-bold text-sm">
                <span className={`text-${cat.themeColor}-600 flex items-center gap-2 group-hover:underline`}>
                  {isStarted ? "Edit Details" : "Start Section"} <ArrowRight size={16} />
                </span>
              </div>
              
              {isStarted && (
                <div className="absolute top-6 right-6">
                  <CheckCircle2 className={`text-${cat.themeColor}-500 opacity-20`} size={32} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Personalisation;