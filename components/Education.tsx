import React, { useState } from 'react';
import { UserType, EducationSection } from '../types';
import { ChevronDown, ChevronUp, Brain, Info, Activity, MessageCircle } from 'lucide-react';

interface EducationProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

// Hardcoded content based on PDF section 2.2.1
const educationalContent: EducationSection[] = [
  // Patient Content
  {
    id: 'p1',
    title: 'Understanding My Brain',
    category: 'patient',
    content: "Alzheimer's affects how brain cells talk to each other. Imagine a loose connection in a wire; sometimes the signal doesn't get through. This often happens first in the 'Hippocampus', the part of the brain that stores new memories. That's why you might remember your childhood clearly but forget what happened this morning. This is normal for your condition."
  },
  {
    id: 'p2',
    title: 'Daily Strategies',
    category: 'patient',
    content: "Routine is your friend. Keep keys and glasses in the same place. Use a calendar with large writing. If you feel confused, pause, take a deep breath, and ask for help. It is okay to ask. Listening to your favorite music can also help reset your mood if you feel overwhelmed."
  },
  {
    id: 'p3',
    title: 'Brain Health',
    category: 'patient',
    content: "What is good for your heart is good for your brain. Gentle walking, eating colorful vegetables, and staying hydrated help. Socializing is also exercise for the brain! Even a short chat counts."
  },
  // Carer Content
  {
    id: 'c1',
    title: 'The "Why" Behind Behavior',
    category: 'carer',
    content: "Behavior is communication. When a loved one is agitated, repetitive, or confused, they are often expressing an unmet need (pain, hunger, fear, boredom) that they cannot articulate verbally. Neurodegeneration affects the brain's ability to process the world, often making it feel overwhelming or scary. They are not doing this to annoy you intentionally."
  },
  {
    id: 'c2',
    title: 'Short-term vs. Long-term Memory',
    category: 'carer',
    content: "The 'file cabinet' for recent memories (Hippocampus) is damaged early on. However, the 'library' of old memories is often preserved much longer. This is why they may not know what they ate for lunch but can sing every word to a song from 1960. Use this! Connect through old music, photos, and stories."
  },
  {
    id: 'c3',
    title: 'Communication Strategies',
    category: 'carer',
    content: "1. **Validate, don't correct.** If they say they need to go to work (but retired 20 years ago), don't argue. Say 'You must miss work, tell me about your favorite colleague.'\n2. **Short, simple sentences.** Give one instruction at a time.\n3. **Watch non-verbal cues.** Your tone and facial expression convey more safety than your words."
  },
  {
    id: 'c4',
    title: 'Carer Wellbeing',
    category: 'carer',
    content: "You cannot pour from an empty cup. Carer burnout is real and common. Take 5 minutes for yourself when you can. Join a support group. Remember, their behavior is the disease, not the person."
  }
];

const Education: React.FC<EducationProps> = ({ userType, setUserType }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredContent = educationalContent.filter(c => c.category === userType);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 pb-6">
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-nhs-darkBlue">Education Centre</h1>
        <p className="text-lg text-gray-600">
          Understanding Alzheimer's is the first step to managing it.
        </p>
        
        {/* Toggle Switch */}
        <div className="flex justify-center mt-6">
          <div className="bg-gray-200 p-1 rounded-full flex w-full max-w-md">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 py-3 px-6 rounded-full text-base font-bold transition-all ${
                userType === 'patient' 
                  ? 'bg-white text-nhs-blue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              For Patients
            </button>
            <button
              onClick={() => setUserType('carer')}
              className={`flex-1 py-3 px-6 rounded-full text-base font-bold transition-all ${
                userType === 'carer' 
                  ? 'bg-white text-nhs-blue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              For Carers
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-4 mt-8">
        {filteredContent.map((section) => {
          const isExpanded = expandedId === section.id;
          return (
            <div 
              key={section.id} 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-nhs-lightBlue' : ''}`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:bg-blue-50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${isExpanded ? 'bg-nhs-blue text-white' : 'bg-blue-100 text-nhs-blue'}`}>
                    {section.category === 'patient' ? <Brain size={24} /> : <Activity size={24} />}
                  </div>
                  <span className="text-xl font-semibold text-gray-800">{section.title}</span>
                </div>
                {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              {isExpanded && (
                <div className="p-5 pt-0 text-gray-700 leading-relaxed text-lg border-t border-gray-100 mt-2 bg-blue-50/30">
                  <div className="prose max-w-none whitespace-pre-line pt-4">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="bg-nhs-paleBlue p-6 rounded-xl mt-8">
        <h3 className="font-bold text-nhs-darkBlue text-lg flex items-center gap-2 mb-2">
          <Info size={20}/> Did you know?
        </h3>
        <p className="text-gray-700">
          {userType === 'patient' 
            ? "Learning new things, like a new simple card game or listening to audiobooks, can help keep your brain active."
            : "Studies show that carers who join support groups and learn about the disease experience significantly less stress and depression."}
        </p>
      </div>
    </div>
  );
};

export default Education;