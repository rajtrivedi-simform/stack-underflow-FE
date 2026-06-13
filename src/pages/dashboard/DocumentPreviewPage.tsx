import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../utils/cn';

/* ─── Required fields ────────────────────────────────────────── */
interface RequiredField {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  context: string; // snippet of surrounding text
}

const REQUIRED_FIELDS: RequiredField[] = [
  {
    id: 'bankName',
    label: 'Name of Your Bank',
    placeholder: 'e.g. State Bank of India',
    hint: 'Enter the full registered name of the bank branch.',
    context: 'The Branch Manager, [NAME OF YOUR BANK]',
  },
  {
    id: 'branchAddress',
    label: 'Branch Address',
    placeholder: 'e.g. 42, MG Road, Bangalore – 560001',
    hint: 'Enter the complete branch address including PIN code.',
    context: 'The Branch Manager, [NAME OF YOUR BANK], [BRANCH ADDRESS]',
  },
  {
    id: 'loanAmount',
    label: 'Loan Amount Requested',
    placeholder: 'e.g. ₹25,00,000',
    hint: 'Enter the loan amount as per your business requirement.',
    context: '...wish to apply for a term loan of [LOAN AMOUNT REQUESTED] for the purpose of business expansion.',
  },
  {
    id: 'companyRegNo',
    label: 'Company Registration Number',
    placeholder: 'e.g. U72200KA2021PTC123456',
    hint: "You can find this on your Certificate of Incorporation from MCA.",
    context: 'Our company, registered under CIN [COMPANY REGISTRATION NUMBER], is engaged in...',
  },
];

/* ─── Required Field Chip ────────────────────────────────────── */
const RequiredChip = ({ label, filled, onClick }: { label: string; filled?: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-medium transition-colors',
      filled
        ? 'bg-green-50 border-green-300 text-green-700'
        : 'bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100'
    )}
  >
    <span className="material-symbols-outlined text-[12px]">{filled ? 'check_circle' : 'edit'}</span>
    {filled ? filled : `REQUIRED: ${label}`}
  </button>
);

/* ─── Fill Blanks Modal ──────────────────────────────────────── */
interface FillModalProps {
  fields: RequiredField[];
  values: Record<string, string>;
  currentIndex: number;
  onNext: (value: string) => void;
  onPrev: () => void;
  onSkip: () => void;
  onClose: () => void;
}

const FillModal = ({ fields, values, currentIndex, onNext, onPrev, onSkip, onClose }: FillModalProps) => {
  const [inputVal, setInputVal] = useState(values[fields[currentIndex].id] ?? '');
  const field = fields[currentIndex];
  const totalSteps = fields.length;
  const progress = ((currentIndex) / totalSteps) * 100;

  React.useEffect(() => {
    setInputVal(values[field.id] ?? '');
  }, [currentIndex, field.id, values]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Top progress bar */}
        <div className="h-1 bg-outline-variant/30">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/20">
          <button
            type="button"
            onClick={currentIndex === 0 ? onClose : onPrev}
            className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            {currentIndex === 0 ? 'Fill Document' : 'Fill Document'}
          </button>
          <span className="text-sm font-semibold text-on-surface-variant">
            Step {currentIndex + 1} of {totalSteps}
          </span>
        </div>

        {/* MSME Banner */}
        <div className="mx-5 mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
          <span className="material-symbols-outlined text-green-600 text-[16px]">auto_awesome</span>
          <p className="text-xs text-green-700 font-medium">
            VyaparSetu is ensuring your document meets official MSME guidelines.
          </p>
        </div>

        {/* Field Card */}
        <div className="m-5 rounded-2xl border border-outline-variant/40 p-5">
          <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">
            Field Label
          </p>
          <p className="text-sm font-bold text-on-surface mb-4">{field.label}</p>

          {/* Context quote */}
          <div className="bg-surface-container-low rounded-xl p-3 mb-4">
            <p className="text-xs text-on-surface-variant leading-relaxed italic">
              "...{field.context.split(`[${field.label.toUpperCase()}]`)[0]}
              <span className="font-bold text-primary not-italic">[REQUIRED: {field.label}]</span>
              {field.context.split(`[${field.label.toUpperCase()}]`)[1] ?? '...'}
              "
            </p>
          </div>

          {/* Input */}
          <div className="relative mb-2">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={field.placeholder}
              className="w-full h-11 px-md pr-10 rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/40 transition-all"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[18px]">
              verified_user
            </span>
          </div>
          <p className="text-xs text-on-surface-variant/60 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">info</span>
            {field.hint}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-5 pb-4">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center gap-1 h-10 px-4 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={() => onNext(inputVal)}
            className="flex items-center gap-1 h-10 px-5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors ml-auto"
          >
            {currentIndex < totalSteps - 1 ? 'Next' : 'Finish'}
            {currentIndex < totalSteps - 1 && (
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            )}
          </button>
        </div>

        {/* Skip */}
        <div className="text-center pb-4">
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-on-surface-variant/60 hover:text-on-surface-variant transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────── */
const DocumentPreviewPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { docType } = useParams<{ docType: string }>();

  const [showFillModal, setShowFillModal] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const filledCount = Object.keys(fieldValues).length;
  const totalFields = REQUIRED_FIELDS.length;

  const handleFillNext = (value: string) => {
    const fieldId = REQUIRED_FIELDS[currentFieldIndex].id;
    const updated = { ...fieldValues, [fieldId]: value };
    setFieldValues(updated);
    if (currentFieldIndex < REQUIRED_FIELDS.length - 1) {
      setCurrentFieldIndex(i => i + 1);
    } else {
      setShowFillModal(false);
      if (Object.keys(updated).length === REQUIRED_FIELDS.length) {
        navigate(`/dashboard/schemes/document/${docType}/ready`);
      }
    }
  };

  const handleFillPrev = () => {
    setCurrentFieldIndex(i => Math.max(0, i - 1));
  };

  const handleFillSkip = () => {
    if (currentFieldIndex < REQUIRED_FIELDS.length - 1) {
      setCurrentFieldIndex(i => i + 1);
    } else {
      setShowFillModal(false);
    }
  };

  const openFillAt = (index: number) => {
    setCurrentFieldIndex(index);
    setShowFillModal(true);
  };

  const val = (id: string) => fieldValues[id];

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Page Header */}
        <div className="flex items-center justify-between px-md py-3 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard/schemes')}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_back</span>
            </button>
            <div>
              <h1 className="text-[16px] font-bold text-primary">Scheme Application Letter</h1>
              <p className="text-[10px] text-on-surface-variant/60">DRAFT_CGTMSE_V1.PDF</p>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <div className="relative">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant/50 absolute left-2 top-1/2 -translate-y-1/2">search</span>
              <input
                className="h-8 pl-8 pr-3 text-xs rounded-lg border border-outline-variant/40 bg-surface-container-low outline-none w-32"
                placeholder="Search in document..."
              />
            </div>
            <div className="flex items-center gap-xs px-sm py-xs rounded-full border border-green-200 bg-green-50">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-label-sm text-green-700 font-semibold">92 Score</span>
            </div>
            <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">notifications</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
            </button>
          </div>
        </div>

        {/* AI Banner */}
        <div className="flex items-center justify-between bg-orange-50 border-b border-orange-200 px-md py-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-[18px]">smart_toy</span>
            <p className="text-xs text-orange-800">
              <span className="font-semibold">AI-generated draft</span>
              {' · '}Review and fill highlighted blanks before downloading
              {' · '}
              <span className="font-semibold text-orange-600">{totalFields - filledCount} fields need your input</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => openFillAt(filledCount < totalFields ? filledCount : 0)}
            className="h-7 px-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Jump to Next
          </button>
        </div>

        {/* Document */}
        <div className="flex-1 overflow-y-auto bg-surface-container-low p-6">
          <div className="max-w-[680px] mx-auto bg-white rounded-xl shadow-md p-10 relative min-h-[600px]">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <p className="text-[48px] font-black text-on-surface/5 rotate-[-35deg] tracking-widest">
                VYAPARSETU
              </p>
            </div>

            {/* Letter Content */}
            <div className="relative space-y-5 text-sm text-on-surface">
              {/* Subject */}
              <div>
                <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-1">Subject</p>
                <p className="font-medium leading-snug">
                  Application for Financial Assistance under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)
                </p>
              </div>

              {/* To */}
              <div>
                <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-2">To,</p>
                <p>The Branch Manager,</p>
                <div className="mt-1.5 space-y-1.5">
                  <RequiredChip
                    label="NAME OF YOUR BANK"
                    filled={val('bankName')}
                    onClick={() => openFillAt(0)}
                  />
                  <br />
                  <RequiredChip
                    label="BRANCH ADDRESS"
                    filled={val('branchAddress')}
                    onClick={() => openFillAt(1)}
                  />
                </div>
              </div>

              {/* Body */}
              <div>
                <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-2">Body</p>
                <p className="leading-relaxed">
                  I, the undersigned, representing <span className="font-semibold">VyaparSetu AI</span>, wish to apply for a term loan of{' '}
                  <RequiredChip
                    label="Loan Amount Requested"
                    filled={val('loanAmount')}
                    onClick={() => openFillAt(2)}
                  />{' '}
                  for the purpose of business expansion.{' '}
                  <span className="text-primary">Our current compliance health score is </span>
                  <span className="font-bold text-primary">84%</span>
                  <span className="text-primary">, and we meet all eligibility criteria for the scheme.</span>{' '}
                  We have consistently maintained a high credit performance and are looking to scale our logistics operations across the domestic circuit.
                </p>
              </div>

              <div>
                <p className="leading-relaxed">
                  Our company, registered under CIN{' '}
                  <RequiredChip
                    label="Company Registration Number"
                    filled={val('companyRegNo')}
                    onClick={() => openFillAt(3)}
                  />{' '}
                  is engaged in providing technology-enabled logistics services with a proven track record of timely delivery and compliance.
                </p>
              </div>

              <p className="leading-relaxed text-on-surface/60 italic">
                [Declaration clause, enclosures, and signatory section follow...]
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-surface-container-lowest border-t border-outline-variant/30 px-md py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-on-surface-variant">Fields Completed</span>
            <div className="w-32 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${(filledCount / totalFields) * 100}%` }}
              />
            </div>
            <span className="text-xs text-on-surface-variant/60">{filledCount}/{totalFields}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/schemes/document/${docType}/ready`)}
              className="h-9 px-4 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Download as-is
            </button>
            <button
              type="button"
              onClick={() => openFillAt(0)}
              className="flex items-center gap-1.5 h-9 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Fill Blanks
            </button>
          </div>
        </div>
      </div>

      {/* Fill Blanks Modal */}
      {showFillModal && (
        <FillModal
          fields={REQUIRED_FIELDS}
          values={fieldValues}
          currentIndex={currentFieldIndex}
          onNext={handleFillNext}
          onPrev={handleFillPrev}
          onSkip={handleFillSkip}
          onClose={() => setShowFillModal(false)}
        />
      )}
    </>
  );
};

export default DocumentPreviewPage;
