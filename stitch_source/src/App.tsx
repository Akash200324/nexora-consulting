import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { AssessmentSection } from './components/AssessmentSection';
import { SuccessStorySection } from './components/SuccessStorySection';
import { ThreeStepsSection } from './components/ThreeStepsSection';
import { ProgramsSection } from './components/ProgramsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

// Modals
import { AssessmentModal } from './components/AssessmentModal';
import { DiscoveryCallModal } from './components/DiscoveryCallModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { LegalModal } from './components/LegalModal';

export default function App() {
  // Modal states
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [assessmentStartIndex, setAssessmentStartIndex] = useState(0);
  const [assessmentInitialAnswers, setAssessmentInitialAnswers] = useState<Record<number, number>>({});

  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const handleOpenAssessment = (startIndex = 0, initialAnswers: Record<number, number> = {}) => {
    setAssessmentStartIndex(startIndex);
    setAssessmentInitialAnswers(initialAnswers);
    setAssessmentModalOpen(true);
  };

  const handleOpenProgram = (programId: string) => {
    setSelectedProgramId(programId);
  };

  const handleOpenCaseStudy = (caseStudyId: string) => {
    setSelectedCaseStudyId(caseStudyId);
  };

  const handleOpenLegalModal = (title: string) => {
    setLegalModalTitle(title);
  };

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#f2ede4] font-sans selection:bg-[#c86d51] selection:text-white">
      {/* Top Main Navigation */}
      <Navbar
        onOpenAssessment={() => handleOpenAssessment(0)}
        onOpenDiscovery={() => setDiscoveryModalOpen(true)}
        onOpenProgram={handleOpenProgram}
        onOpenWhatsApp={() => setWhatsAppModalOpen(true)}
      />

      {/* Main Page Sections matching Screenshot */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection onOpenAssessment={() => handleOpenAssessment(0)} />

        {/* 2. Philosophy & Value Proposition */}
        <PhilosophySection
          onOpenAssessment={() => handleOpenAssessment(0)}
          onOpenDiscovery={() => setDiscoveryModalOpen(true)}
        />

        {/* 3. Interactive Business Reality Assessment Section */}
        <AssessmentSection
          onStartFullAssessment={(idx, answers) => handleOpenAssessment(idx, answers)}
        />

        {/* 4. Featured Success Story / Case Study */}
        <SuccessStorySection onOpenCaseStudy={handleOpenCaseStudy} />

        {/* 5. 3-Step Process (Assess -> Discover -> Grow) */}
        <ThreeStepsSection
          onOpenAssessment={() => handleOpenAssessment(0)}
          onOpenDiscovery={() => setDiscoveryModalOpen(true)}
          onOpenPrograms={() => {
            const el = document.getElementById('programs-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Choose Your Path (Founders Growth Accelerator & Business Profit Accelerator) */}
        <ProgramsSection onOpenProgram={handleOpenProgram} />

        {/* 7. Client Testimonials & Social Proof */}
        <TestimonialsSection
          onOpenTestimonialDetail={() => setSelectedCaseStudyId('scaling-to-5m')}
        />
      </main>

      {/* 8. Footer & Sticky Bottom Assessment Bar */}
      <Footer
        onOpenAssessment={() => handleOpenAssessment(0)}
        onOpenDiscovery={() => setDiscoveryModalOpen(true)}
        onOpenProgram={handleOpenProgram}
        onOpenWhatsApp={() => setWhatsAppModalOpen(true)}
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Comprehensive Assessment Diagnostic Modal */}
      <AssessmentModal
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
        initialQuestionIndex={assessmentStartIndex}
        initialAnswers={assessmentInitialAnswers}
        onBookDiscovery={() => {
          setAssessmentModalOpen(false);
          setDiscoveryModalOpen(true);
        }}
        onOpenProgram={handleOpenProgram}
      />

      {/* 15-Minute Discovery Strategy Call Scheduler */}
      <DiscoveryCallModal
        isOpen={discoveryModalOpen}
        onClose={() => setDiscoveryModalOpen(false)}
        onOpenWhatsApp={() => {
          setDiscoveryModalOpen(false);
          setWhatsAppModalOpen(true);
        }}
      />

      {/* Program Syllabus & Application Modal */}
      <ProgramDetailModal
        isOpen={!!selectedProgramId}
        onClose={() => setSelectedProgramId(null)}
        programId={selectedProgramId}
        onBookDiscovery={() => {
          setSelectedProgramId(null);
          setDiscoveryModalOpen(true);
        }}
      />

      {/* Full Case Study Breakdown Modal */}
      <CaseStudyModal
        isOpen={!!selectedCaseStudyId}
        onClose={() => setSelectedCaseStudyId(null)}
        caseStudyId={selectedCaseStudyId}
        onBookDiscovery={() => {
          setSelectedCaseStudyId(null);
          setDiscoveryModalOpen(true);
        }}
      />

      {/* Direct WhatsApp Advisory Modal */}
      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      {/* Legal & Contact Info Modal */}
      <LegalModal
        isOpen={!!legalModalTitle}
        onClose={() => setLegalModalTitle(null)}
        title={legalModalTitle || ''}
      />
    </div>
  );
}
