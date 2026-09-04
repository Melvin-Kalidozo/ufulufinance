"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Loader2,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Banknote,
  Layers,
  Sparkles,
} from "lucide-react";

// Structured loan catalogue — names must match loans/page.tsx LOAN_PRODUCTS exactly
export const LOAN_CATALOGUE: {
  name: string;
  minAmount: number;
  maxAmount: number;
}[] = [
  { name: "MSME QuickGrowth Working Capital",       minAmount: 100000,  maxAmount: 10000000 },
  { name: "Mlimi Harvest Input Booster",             minAmount: 150000,  maxAmount: 7500000  },
  { name: "Boma Civil Servant Express",              minAmount: 50000,   maxAmount: 2500000  },
  { name: "Tikondane Solidarity Cluster Credit",     minAmount: 50000,   maxAmount: 500000   },
  { name: "Commercial Asset & Equipment Credit",     minAmount: 500000,  maxAmount: 15000000 },
  // Generic fallback options for enquiries not originating from a card
  { name: "Family Emergency Relief Credit",          minAmount: 50000,   maxAmount: 1000000  },
  { name: "Commercial Trade & Invoice Bridge",       minAmount: 200000,  maxAmount: 20000000 },
];

// Legacy alias kept for any other consumers
export const LOAN_PRODUCTS = LOAN_CATALOGUE.map((p) => p.name);

interface LoanEnquiryDialogProps {
  triggerButton: React.ReactNode;
  defaultProduct?: string;
  defaultFacility?: string;
  defaultAmount?: string | number;
  defaultMinAmount?: number;
  defaultMaxAmount?: number;
}

export function LoanEnquiryDialog({
  triggerButton,
  defaultProduct = "",
  defaultFacility = "",
  defaultAmount = "",
  defaultMinAmount,
  defaultMaxAmount,
}: LoanEnquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const initialProduct = defaultFacility || defaultProduct || "";
  const [product, setProduct] = useState(initialProduct);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: initialProduct,
    amount: defaultAmount ? String(defaultAmount) : "",
    message: "",
  });

  const [idFile, setIdFile] = useState<{
    name: string;
    size: string;
    dataUrl?: string;
  } | null>(null);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Sync default facility if props change
  useEffect(() => {
    if (defaultFacility || defaultProduct) {
      const selected = defaultFacility || defaultProduct;
      setProduct(selected);
      setForm((prev) => ({ ...prev, product: selected }));
    }
    if (defaultAmount) {
      setForm((prev) => ({ ...prev, amount: String(defaultAmount) }));
    }
  }, [defaultFacility, defaultProduct, defaultAmount]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  // File upload processing
  function processFile(file: File) {
    setFileError("");

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File exceeds 5MB limit. Please upload an image or PDF under 5MB.");
      return;
    }

    // Validate type (images or pdf)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload a valid document (JPG, PNG, WebP or PDF).");
      return;
    }

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setIdFile({
          name: file.name,
          size: sizeFormatted,
          dataUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setIdFile({
        name: file.name,
        size: sizeFormatted,
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleRemoveFile() {
    setIdFile(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Derive the selected product's limits from the catalogue
  const selectedCatalogueEntry = LOAN_CATALOGUE.find((p) => p.name === form.product);
  const activeMin = selectedCatalogueEntry?.minAmount ?? defaultMinAmount;
  const activeMax = selectedCatalogueEntry?.maxAmount ?? defaultMaxAmount;

  // Inline Validation checks
  const amountRaw = Number(form.amount.replace(/[^0-9]/g, ""));
  const errors = {
    name: !form.name.trim()
      ? "Full legal name is required"
      : form.name.trim().length < 2
      ? "Name must be at least 2 characters"
      : "",
    phone: !form.phone.trim()
      ? "Phone number is required"
      : form.phone.replace(/[^0-9]/g, "").length < 7
      ? "Please enter a valid phone number"
      : "",
    email:
      form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ? "Please enter a valid email address"
        : "",
    product: !form.product ? "Please select a loan facility" : "",
    amount:
      form.amount.trim() && activeMin && activeMax && amountRaw > 0
        ? amountRaw < activeMin
          ? `Minimum for this facility is MWK ${activeMin.toLocaleString()}`
          : amountRaw > activeMax
          ? `Maximum for this facility is MWK ${activeMax.toLocaleString()}`
          : ""
        : "",
  };

  const isStep1Valid = !errors.name && !errors.phone && !errors.email;
  const isStep2Valid = !errors.product && !errors.amount;

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  function nextStep() {
    if (currentStep === 1) {
      setTouched((prev) => ({ ...prev, name: true, phone: true, email: true }));
      if (!isStep1Valid) {
        toast.error("Please complete required contact details first.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setTouched((prev) => ({ ...prev, product: true, amount: true }));
      if (!isStep2Valid) {
        toast.error("Please select a loan facility and verify amount.");
        return;
      }
      setCurrentStep(3);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  }

  async function handleFinalSubmit() {
    if (currentStep !== 3) return;

    if (!agreedTerms) {
      setTermsError(true);
      toast.error("Please check the box confirming you have read the loan information.");
      return;
    }

    setTouched({ name: true, phone: true, email: true, product: true, amount: true });

    if (!isStep1Valid || !isStep2Valid) {
      toast.error("Please complete all required fields correctly.");
      return;
    }

    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);

    // Generate reference code
    const randomRef = `UFL-LN-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefNumber(randomRef);
    setSent(true);
    toast.success("Enquiry received! An advisor will reach out within 24 hours.");
  }

  function handleReset() {
    setSent(false);
    setCurrentStep(1);
    setAgreedTerms(false);
    setTermsError(false);
    setForm({
      name: "",
      phone: "",
      email: "",
      product: initialProduct,
      amount: defaultAmount ? String(defaultAmount) : "",
      message: "",
    });
    setIdFile(null);
    setFileError("");
    setTouched({});
    setOpen(false);
  }

  const inputBaseClass =
    "w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden rounded-3xl shadow-2xl bg-white max-h-[92vh] flex flex-col">
        {/* ── Header without badge ── */}
        <div className="bg-[#0b1f14] px-6 py-5 shrink-0 relative overflow-hidden border-b border-emerald-900/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <DialogTitle className="text-xl font-extrabold text-white tracking-tight">
              Apply for Loan Facility
            </DialogTitle>
            <DialogDescription className="text-emerald-100/75 text-xs">
              Submit your preliminary requirements — guaranteed decision within 24 hours.
            </DialogDescription>
          </div>
        </div>

        {/* ── Step-by-Step Progress Track ── */}
        {!sent && (
          <div className="px-6 pt-4 pb-2 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: "Personal" },
                { step: 2, label: "Facility" },
                { step: 3, label: "Verification" },
              ].map((s, idx) => {
                const isActive = currentStep === s.step;
                const isCompleted = currentStep > s.step;

                return (
                  <div key={s.step} className="flex items-center flex-1 last:flex-none">
                    <button
                      type="button"
                      onClick={() => {
                        if (s.step === 1) setCurrentStep(1);
                        else if (s.step === 2 && isStep1Valid) setCurrentStep(2);
                        else if (s.step === 3 && isStep1Valid && isStep2Valid) setCurrentStep(3);
                      }}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className={`size-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                          isCompleted
                            ? "bg-[#1b4332] text-[#84cc16]"
                            : isActive
                            ? "bg-[#84cc16] text-slate-950 ring-3 ring-[#84cc16]/20 font-extrabold shadow-xs"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {isCompleted ? "✓" : s.step}
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          isActive
                            ? "text-[#1b4332] font-bold"
                            : isCompleted
                            ? "text-slate-800"
                            : "text-slate-600"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                    {idx < 2 && (
                      <div
                        className={`h-0.5 mx-3 flex-1 transition-colors rounded-full ${
                          currentStep > idx + 1 ? "bg-[#1b4332]" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Modal Body ── */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sent ? (
            /* ── Success State ── */
            <div className="py-6 px-2 text-center space-y-5">
              <div className="size-16 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#1b4332] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="size-9 text-[#16a34a]" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Enquiry Reference
                </span>
                <span className="font-mono text-xl font-black text-[#1b4332] bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200 inline-block">
                  {refNumber}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-1">
                  Enquiry Received Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{form.name}</strong>. Our designated loan officer has logged your enquiry for <strong className="text-slate-900">{form.product}</strong>. We will contact you at <span className="font-semibold text-slate-900">{form.phone}</span> within 24 hours.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <ShieldCheck className="size-4 text-[#16a34a]" />
                  <span>What happens next:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 pl-1">
                  <li>Our loan officer will review your preliminary details.</li>
                  <li>We confirm terms and required KYC verification documents.</li>
                  <li>Disbursements via Airtel Money, TNM Mpamba, or commercial bank.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Close &amp; Return
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* ── STEP 1: Personal & Contact Information ── */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in-50 duration-200">
                  <div className="space-y-1">
                    <label htmlFor="enq-name" className="block text-xs font-bold text-slate-700">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="enq-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Kondwani Chirwa"
                        className={`${inputBaseClass} pl-9 ${
                          touched.name && errors.name
                            ? "border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                        }`}
                      />
                      <User className="size-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="size-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-phone" className="block text-xs font-bold text-slate-700">
                      Phone (Airtel / TNM) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="enq-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+265 99 123 4567"
                        className={`${inputBaseClass} pl-9 ${
                          touched.phone && errors.phone
                            ? "border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                        }`}
                      />
                      <Phone className="size-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                    {touched.phone && errors.phone ? (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="size-3" />
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-600">
                        Malawi Airtel or TNM number where loan officer can call/SMS.
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-email" className="block text-xs font-bold text-slate-700">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="enq-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder="kondwani@example.com"
                        className={`${inputBaseClass} pl-9 ${
                          touched.email && errors.email
                            ? "border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                        }`}
                      />
                      <Mail className="size-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="size-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Loan Requirements & Facility ── */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in-50 duration-200">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Loan Facility Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={form.product}
                      onValueChange={(val) => {
                        setProduct(val);
                        setForm((prev) => ({ ...prev, product: val }));
                        setTouched((prev) => ({ ...prev, product: true }));
                      }}
                    >
                      <SelectTrigger
                        className={`w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none transition-all ${
                          touched.product && errors.product
                            ? "border-red-400 bg-red-50/20"
                            : "border-slate-200 focus:border-[#84cc16]"
                        }`}
                      >
                        <SelectValue placeholder="Select a loan facility" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-200 shadow-xl bg-white max-h-64">
                        {LOAN_PRODUCTS.map((prod) => (
                          <SelectItem
                            key={prod}
                            value={prod}
                            className="text-xs py-2.5 focus:bg-emerald-50 focus:text-[#1b4332] cursor-pointer rounded-lg font-medium"
                          >
                            {prod}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {touched.product && errors.product && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="size-3" />
                        {errors.product}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-amount" className="block text-xs font-bold text-slate-700">
                      Amount Needed (MWK) <span className="text-slate-400 font-normal">(Approximate)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="enq-amount"
                        name="amount"
                        type="text"
                        value={form.amount}
                        onChange={(e) => {
                          handleChange(e);
                          setTouched((prev) => ({ ...prev, amount: true }));
                        }}
                        onBlur={() => handleBlur("amount")}
                        placeholder={activeMin ? `e.g. ${activeMin.toLocaleString()}` : "e.g. 500,000"}
                        className={`${inputBaseClass} pl-9 ${
                          touched.amount && errors.amount
                            ? "border-red-400 bg-red-50/20 focus:ring-1 focus:ring-red-400"
                            : "border-slate-200 focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                        }`}
                      />
                      <Banknote className="size-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                    {touched.amount && errors.amount ? (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="size-3" />
                        {errors.amount}
                      </p>
                    ) : activeMin && activeMax ? (
                      <p className="text-[10px] text-slate-500">
                        Range for <span className="font-semibold text-[#1b4332]">{form.product}</span>:{" "}
                        MWK {activeMin.toLocaleString()} – MWK {activeMax.toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-500">
                        Select a facility above to see eligible amount range.
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enq-message" className="block text-xs font-bold text-slate-700">
                      Additional Details / Intended Use <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="enq-message"
                      name="message"
                      rows={2}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us briefly about your business, restocking plans, or loan purpose..."
                      className={`${inputBaseClass} resize-none border-slate-200 focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]`}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3: Verification & Review ── */}
              {currentStep === 3 && (
                <div className="space-y-3 animate-in fade-in-50 duration-200">
                  {/* Compact Summary Review Grid */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Applicant</span>
                      <span className="font-bold text-slate-900 truncate block">{form.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Phone</span>
                      <span className="font-semibold text-slate-900 truncate block">{form.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Loan Facility</span>
                      <span className="font-semibold text-[#1b4332] truncate block">{form.product}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Requested Amount</span>
                      <span className="font-bold text-slate-900 truncate block">
                        {form.amount
                          ? `MWK ${isNaN(Number(form.amount.replace(/,/g, ""))) ? form.amount : Number(form.amount.replace(/,/g, "")).toLocaleString()}`
                          : "Indicative / Flexible"}
                      </span>
                    </div>
                  </div>

                  {/* ID Upload Container - Compact layout */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700">
                        National ID / Passport Photo{" "}
                        <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">Max 5MB (JPG, PNG, PDF)</span>
                    </div>

                    {!idFile ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border border-dashed rounded-xl py-2.5 px-3.5 text-center cursor-pointer transition-all ${
                          isDragging
                            ? "border-[#84cc16] bg-emerald-50/50"
                            : "border-slate-200 hover:border-[#84cc16] bg-slate-50/60 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2.5">
                          <div className="size-7 rounded-lg bg-white border border-slate-200 text-slate-500 flex items-center justify-center shadow-2xs shrink-0">
                            <UploadCloud className="size-4 text-[#1b4332]" />
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold text-slate-800 block leading-tight">
                              Upload National ID or Passport
                            </span>
                            <span className="text-[10px] text-slate-500 block leading-tight">
                              Click or drag front side photo or document
                            </span>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2 rounded-xl border border-emerald-200 bg-emerald-50/60">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          {idFile.dataUrl ? (
                            <img
                              src={idFile.dataUrl}
                              alt="ID Preview"
                              className="size-8 rounded-lg object-cover border border-emerald-300 shrink-0"
                            />
                          ) : (
                            <div className="size-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                              <FileText className="size-4" />
                            </div>
                          )}
                          <div className="overflow-hidden text-left">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {idFile.name}
                            </p>
                            <p className="text-[10px] text-emerald-700 font-medium">
                              Ready &bull; {idFile.size}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="size-6 rounded-full bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center border border-slate-200 transition-colors cursor-pointer shrink-0 ml-2"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="size-3" />
                        {fileError}
                      </p>
                    )}
                  </div>

                  {/* Checkbox: User has read loan info */}
                  <div className="pt-0.5">
                    <label
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        termsError && !agreedTerms
                          ? "border-red-400 bg-red-50/40 ring-1 ring-red-400/40"
                          : agreedTerms
                          ? "border-emerald-300 bg-emerald-50/50"
                          : "border-slate-200 bg-slate-50/70 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => {
                          setAgreedTerms(e.target.checked);
                          if (e.target.checked) setTermsError(false);
                        }}
                        className="mt-0.5 size-4 rounded accent-[#1b4332] text-[#1b4332] focus:ring-[#84cc16] cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] text-slate-700 leading-snug">
                        I confirm that I have read the facility requirements for this loan and verify that my provided details are accurate.
                      </span>
                    </label>
                    {termsError && !agreedTerms && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1 pl-1">
                        <AlertCircle className="size-3" />
                        Please check this box to confirm you have read the loan info.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Action Buttons Footer ── */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    key={`continue-btn-${currentStep}`}
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143225] text-white text-xs font-bold transition-all hover:scale-[1.02] shadow-sm cursor-pointer ml-auto"
                  >
                    <span>Continue</span>
                    <ArrowRight className="size-3.5 text-[#84cc16]" />
                  </button>
                ) : (
                  <button
                    key="submit-btn-step-3"
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-slate-950 text-xs font-extrabold transition-all shadow-md hover:scale-[1.02] cursor-pointer disabled:opacity-50 ml-auto"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Loan Application</span>
                        <Send className="size-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
