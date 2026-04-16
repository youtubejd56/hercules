import React from 'react';

export default function TermsConditions() {
  const sections = [
    { title: "Membership Eligibility", content: "All members must be at least 15 years old. Minors require parental consent." },
    { title: "Payment Terms", content: "Monthly fees must be paid within 5 days of the due date. A late fee may apply otherwise." },
    { title: "Liability Waiver", content: "Hercules GYMPALA is not responsible for injuries or lost belongings within the premises." },
    { title: "Conduct Policy", content: "Abusive behavior towards staff or other members will result in immediate cancellation of membership." },
    { title: "Cancellation", content: "You may cancel your membership at any time, but no refunds will be given for partially unused months." },
  ];

  return (
    <div className="py-20 px-6 md:px-12 max-w-4xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16 px-4">
        <h1 className="md:text-6xl text-3xl font-extrabold mb-4 uppercase italic tracking-tighter">TERMS & <span className="text-primary italic">CONDITIONS</span></h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
        <p className="mt-6 text-gray-400 text-lg">Legal guidelines for your membership.</p>
      </div>

      <div className="space-y-12">
        {sections.map((s, idx) => (
          <div key={idx} className="border-l-4 border-primary pl-8 py-4">
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">{s.title}</h3>
            <p className="text-gray-400 leading-relaxed font-medium">{s.content}</p>
          </div>
        ))}

        <div className="pt-12 text-center text-gray-600 text-sm italic">
          Last updated: April 16, 2026. Subject to change without prior notice.
        </div>
      </div>
    </div>
  );
}
