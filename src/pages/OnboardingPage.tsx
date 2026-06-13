import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OnboardingFormData, Step1Data, Step2Data, Step3Data, Step4Data } from '../schemas/onboarding.schema';
import { Step1BusinessIdentity } from '../features/onboarding/steps/Step1BusinessIdentity';
import { Step2LocationDetails } from '../features/onboarding/steps/Step2LocationDetails';
import { Step3BusinessScale } from '../features/onboarding/steps/Step3BusinessScale';
import { Step4FounderDetails } from '../features/onboarding/steps/Step4FounderDetails';

const STEPS = [
  { number: 1, title: 'Business Assessment', time: '4 mins' },
  { number: 2, title: 'Business Assessment', time: '3 mins' },
  { number: 3, title: 'Business Assessment', time: '2 mins' },
  { number: 4, title: 'Founder Details', time: '2 mins' },
];

const PROGRESS = [20, 40, 60, 95];

const OnboardingPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({});

  const step = STEPS[currentStep - 1];
  const progress = PROGRESS[currentStep - 1];
  const isFinalStep = currentStep === STEPS.length;

  const handleNext = (stepData: Step1Data | Step2Data | Step3Data | Step4Data) => {
    const key = `step${currentStep}` as keyof OnboardingFormData;
    const updated = { ...formData, [key]: stepData };
    setFormData(updated);

    if (isFinalStep) {
      navigate('/onboarding/review', { state: { data: updated } });
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const formId = `step${currentStep}-form`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant/30 sticky top-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center h-14 gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-primary text-[22px]">store</span>
              <span className="font-bold text-on-surface text-sm tracking-tight">VyaparSetu</span>
            </div>

            {/* Step info + progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-on-surface-variant">
                  Step {currentStep} of {STEPS.length}
                  {currentStep < STEPS.length
                    ? ` • Estimated Time: ${step.time}`
                    : ' • Final Step'}
                </span>
                <span className="text-xs font-medium text-on-surface-variant">
                  {isFinalStep ? 'Final Step • ' : ''}Assessment Progress: {progress}%
                </span>
              </div>
              <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Save & Exit */}
            <button
              className="shrink-0 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
              onClick={() => navigate('/auth')}
            >
              Save & Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        {currentStep === 1 && (
          <Step1BusinessIdentity
            defaultValues={formData.step1}
            onNext={handleNext as (data: Step1Data) => void}
          />
        )}
        {currentStep === 2 && (
          <Step2LocationDetails
            defaultValues={formData.step2}
            onNext={handleNext as (data: Step2Data) => void}
          />
        )}
        {currentStep === 3 && (
          <Step3BusinessScale
            defaultValues={formData.step3}
            onNext={handleNext as (data: Step3Data) => void}
          />
        )}
        {currentStep === 4 && (
          <Step4FounderDetails
            defaultValues={formData.step4}
            onNext={handleNext as (data: Step4Data) => void}
          />
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-outline-variant/30 sticky bottom-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 h-11 px-5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back
              </button>
            ) : null}

            {currentStep === 1 && (
              <button
                type="button"
                onClick={() => navigate('/auth')}
                className="h-11 px-5 rounded-xl border border-outline-variant text-on-surface-variant font-semibold text-sm hover:bg-surface-container transition-colors"
              >
                Save & Continue Later
              </button>
            )}
          </div>

          <button
            type="submit"
            form={formId}
            className="flex items-center gap-1.5 h-11 px-6 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all shadow-md shadow-primary/20"
          >
            {isFinalStep ? 'Review My Profile' : 'Next Step'}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingPage;
