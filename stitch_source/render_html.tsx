import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import path from 'react-dom/server'; // just for path, wait we need node 'path'
import * as pathNode from 'path';

import { Navbar } from './src/components/Navbar';
import { HeroSection } from './src/components/HeroSection';
import { PhilosophySection } from './src/components/PhilosophySection';
import { AssessmentSection } from './src/components/AssessmentSection';
import { SuccessStorySection } from './src/components/SuccessStorySection';
import { ThreeStepsSection } from './src/components/ThreeStepsSection';
import { ProgramsSection } from './src/components/ProgramsSection';
import { TestimonialsSection } from './src/components/TestimonialsSection';
import { Footer } from './src/components/Footer';

import { AssessmentModal } from './src/components/AssessmentModal';
import { DiscoveryCallModal } from './src/components/DiscoveryCallModal';
import { ProgramDetailModal } from './src/components/ProgramDetailModal';
import { WhatsAppModal } from './src/components/WhatsAppModal';
import { CaseStudyModal } from './src/components/CaseStudyModal';
import { LegalModal } from './src/components/LegalModal';

// Dummy functions for props
const dummyFn = () => {};
const dummyFnString = (s: string) => {};

function renderComponent(name: string, Component: any, props: any) {
    // Render to string
    let html = renderToStaticMarkup(React.createElement(Component, props));
    
    // Replace Lucide icons (which render as SVGs) with <i data-lucide="..."></i> if we want,
    // actually rendering the SVG is EVEN BETTER because it requires zero JS! 
    // Wait, the user said "Lucide icons are acceptable. Use one consistent icon implementation."
    // If we just keep the SVGs rendered by lucide-react, we don't even need the lucide CDN!
    // But let's check if the SVGs are fully rendered. Yes, renderToStaticMarkup renders the SVGs!
    
    // Save to file
    const outPath = pathNode.join(process.cwd(), '..', '..', 'templates', 'components', `${name.toLowerCase()}.html`);
    fs.mkdirSync(pathNode.dirname(outPath), { recursive: true });
    
    // Replace className with class
    html = html.replace(/className="/g, 'class="');
    
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`Rendered ${name}`);
    return html;
}

try {
    renderComponent('Navbar', Navbar, {
        onOpenAssessment: dummyFn,
        onOpenDiscovery: dummyFn,
        onOpenProgram: dummyFnString,
        onOpenWhatsApp: dummyFn
    });

    renderComponent('Footer', Footer, {
        onOpenAssessment: dummyFn,
        onOpenDiscovery: dummyFn,
        onOpenProgram: dummyFnString,
        onOpenWhatsApp: dummyFn,
        onOpenLegalModal: dummyFnString
    });

    const homeHtml = [
        renderToStaticMarkup(React.createElement(HeroSection, { onOpenAssessment: dummyFn })),
        renderToStaticMarkup(React.createElement(PhilosophySection, { onOpenAssessment: dummyFn, onOpenDiscovery: dummyFn })),
        renderToStaticMarkup(React.createElement(AssessmentSection, { onStartFullAssessment: dummyFn })),
        renderToStaticMarkup(React.createElement(SuccessStorySection, { onOpenCaseStudy: dummyFnString })),
        renderToStaticMarkup(React.createElement(ThreeStepsSection, { onOpenAssessment: dummyFn, onOpenDiscovery: dummyFn, onOpenPrograms: dummyFn })),
        renderToStaticMarkup(React.createElement(ProgramsSection, { onOpenProgram: dummyFnString })),
        renderToStaticMarkup(React.createElement(TestimonialsSection, { onOpenTestimonialDetail: dummyFn }))
    ].join('\n');

    const modalsHtml = [
        renderToStaticMarkup(React.createElement(AssessmentModal, { isOpen: true, onClose: dummyFn })),
        renderToStaticMarkup(React.createElement(DiscoveryCallModal, { isOpen: true, onClose: dummyFn })),
        renderToStaticMarkup(React.createElement(ProgramDetailModal, { isOpen: true, onClose: dummyFn, programId: 'fga' })),
        renderToStaticMarkup(React.createElement(ProgramDetailModal, { isOpen: true, onClose: dummyFn, programId: 'bpa' })),
        renderToStaticMarkup(React.createElement(WhatsAppModal, { isOpen: true, onClose: dummyFn })),
        renderToStaticMarkup(React.createElement(CaseStudyModal, { isOpen: true, onClose: dummyFn, caseStudyId: 'scaling-to-5m' })),
        renderToStaticMarkup(React.createElement(CaseStudyModal, { isOpen: true, onClose: dummyFn, caseStudyId: 'consultancy-exit-readiness' })),
        renderToStaticMarkup(React.createElement(LegalModal, { isOpen: true, onClose: dummyFn, title: 'Privacy Policy' }))
    ].join('\n');

    const finalModalsHtml = modalsHtml.replace(/className="/g, 'class="');
    const modalsPath = pathNode.join(process.cwd(), '..', '..', 'templates', 'components', 'modals.html');
    fs.writeFileSync(modalsPath, finalModalsHtml, 'utf-8');
    console.log('Rendered Modals');

    const finalHomeHtml = homeHtml.replace(/className="/g, 'class="');
    
    const homePath = pathNode.join(process.cwd(), '..', '..', 'templates', 'pages', 'home.html');
    fs.mkdirSync(pathNode.dirname(homePath), { recursive: true });
    
    const templateContent = `{% extends "base.html" %}
{% load static %}

{% block title %}Impact Wave - Profit & Mindset Coach{% endblock %}

{% block content %}
${finalHomeHtml}
{% endblock %}
`;
    
    fs.writeFileSync(homePath, templateContent, 'utf-8');
    console.log('Rendered Home sections');
    
} catch (e) {
    console.error(e);
}
