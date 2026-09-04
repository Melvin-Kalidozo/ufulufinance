"use client";

import { useState, useRef } from "react";
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
  Briefcase,
  MapPin,
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

export interface JobRoleSummary {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface JobApplicationDialogProps {
  triggerButton?: React.ReactNode;
  trigger?: React.ReactNode;
  job: JobRoleSummary;
}

export function JobApplicationDialog({
  triggerButton,
  trigger,
  job,
}: JobApplicationDialogProps) {
  const activeTrigger = triggerButton || trigger;
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: job.location.includes("Lilongwe") ? "Lilongwe" : job.location.includes("Blantyre") ? "Blantyre" : "National",
    experienceYears: "3-5",
    coverLetter: "",
  });

  const [cvFile, setCvFile] = useState<{ name: string; size: string } | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setCvError("");
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setCvError("File exceeds 5MB. Please upload a PDF under 5MB.");
      return;
    }

    // Validate type (strictly PDF)
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setCvError("Only PDF documents (.pdf) are accepted for CV uploads.");
      return;
    }

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setCvFile({
      name: file.name,
      size: sizeFormatted,
    });
  }

  function handleRemoveFile() {
    setCvFile(null);
    setCvError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Inline Validation
  const errors = {
    name: !form.name.trim()
      ? "Full legal name is required"
      : form.name.trim().length < 2
      ? "Name must be at least 2 characters"
      : "",
    email: !form.email.trim()
      ? "Email address is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? "Please enter a valid email address"
      : "",
    phone: !form.phone.trim()
      ? "Phone number is required"
      : form.phone.replace(/[^0-9]/g, "").length < 7
      ? "Please enter a valid phone number"
      : "",
    cv: !cvFile ? "CV / Resume (PDF) is required" : "",
    coverLetter:
      !form.coverLetter.trim()
        ? "Please provide a short cover note"
        : form.coverLetter.trim().length < 20
        ? `Please enter at least 20 characters (${20 - form.coverLetter.trim().length} more needed)`
        : "",
  };

  const isFormValid =
    !errors.name && !errors.email && !errors.phone && !errors.cv && !errors.coverLetter;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, cv: true, coverLetter: true });

    if (!isFormValid) {
      toast.error("Please fill in all required fields and attach your CV.");
      return;
    }

    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);

    const generatedRef = `UFL-JOB-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefId(generatedRef);
    setSent(true);
    toast.success("Application submitted successfully!");
  }

  function handleReset() {
    setSent(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      location: "Lilongwe",
      experienceYears: "3-5",
      coverLetter: "",
    });
    setCvFile(null);
    setCvError("");
    setTouched({});
    setOpen(false);
  }

  const inputBase =
    "w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{activeTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[580px] p-0 overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white max-h-[92vh] flex flex-col">
        {/* ── Dialog Header ── */}
        <div className="bg-[#0b1f14] px-6 py-5 shrink-0 relative overflow-hidden border-b border-emerald-900/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#a3e635] text-[10px] font-extrabold uppercase tracking-wider">
              <Briefcase className="size-3" />
              <span>Career Opportunity</span>
            </div>
            <DialogTitle className="text-xl font-extrabold text-white tracking-tight">
              Apply for {job.title}
            </DialogTitle>
            <DialogDescription className="text-emerald-100/70 text-xs flex items-center gap-2 pt-0.5">
              <span>{job.department}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3 text-[#a3e635]" /> {job.location}
              </span>
              <span>&bull;</span>
              <span>{job.type}</span>
            </DialogDescription>
          </div>
        </div>

        {/* ── Dialog Body ── */}
        <div className="p-6 overflow-y-auto flex-1">
          {sent ? (
            /* ── Success State ── */
            <div className="py-8 px-4 text-center space-y-5">
              <div className="size-16 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#1b4332] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="size-9 text-[#16a34a]" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Application Tracking Number
                </span>
                <span className="font-mono text-xl font-black text-[#1b4332] bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200 inline-block">
                  {refId}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-2">
                  Application Received!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{form.name}</strong>. Your application for <strong className="text-slate-900">{job.title}</strong> has been logged. Our Talent Acquisition team will review your CV and contact shortlisted candidates via <span className="font-semibold text-slate-900">{form.email}</span> within 5 business days.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* ── Application Form ── */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="e.g. Kondwani Chirwa"
                    className={`${inputBase} ${
                      touched.name && errors.name
                        ? "border-red-400 bg-red-50/20 focus:border-red-500"
                        : "border-slate-200 focus:border-[#1b4332]"
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="size-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="kondwani@example.com"
                    className={`${inputBase} ${
                      touched.email && errors.email
                        ? "border-red-400 bg-red-50/20 focus:border-red-500"
                        : "border-slate-200 focus:border-[#1b4332]"
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="size-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Primary Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                    placeholder="+265 99 123 4567"
                    className={`${inputBase} ${
                      touched.phone && errors.phone
                        ? "border-red-400 bg-red-50/20 focus:border-red-500"
                        : "border-slate-200 focus:border-[#1b4332]"
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="size-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Current Residential Hub
                  </label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className={`${inputBase} border-slate-200 focus:border-[#1b4332] bg-slate-50`}
                  >
                    <option value="Lilongwe">Lilongwe (Central Hub)</option>
                    <option value="Blantyre">Blantyre (Southern Hub)</option>
                    <option value="Mzuzu">Mzuzu (Northern Hub)</option>
                    <option value="Other / Relocating">Other Regional Center</option>
                  </select>
                </div>
              </div>

              {/* ── CV / Resume Upload (PDF Max 5MB) ── */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Curriculum Vitae (CV) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">PDF only, max 5MB</span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload-input"
                />

                {!cvFile ? (
                  <label
                    htmlFor="cv-upload-input"
                    className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-2xl bg-slate-50 hover:bg-emerald-50/30 transition-colors cursor-pointer text-center group ${
                      touched.cv && errors.cv ? "border-red-400" : "border-slate-200 hover:border-[#1b4332]"
                    }`}
                  >
                    <div className="size-8 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-slate-500 group-hover:text-[#1b4332] transition-colors">
                      <UploadCloud className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        Click or drag to attach your CV (PDF)
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Max file size: 5MB &bull; Comprehensive work history
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-10 rounded-lg bg-[#1b4332] text-white flex items-center justify-center shrink-0">
                        <FileText className="size-5 text-[#84cc16]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {cvFile.name}
                        </p>
                        <p className="text-[10px] text-emerald-800 font-medium">
                          {cvFile.size} &bull; Validated PDF ready to submit
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="size-7 rounded-full bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}

                {(cvError || (touched.cv && errors.cv)) && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="size-3" /> {cvError || errors.cv}
                  </p>
                )}
              </div>

              {/* Cover Letter / Motivation Note */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="job-cover" className="block text-xs font-bold text-slate-700">
                    Cover Letter &amp; Alignment <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Min 20 characters</span>
                </div>
                <textarea
                  id="job-cover"
                  name="coverLetter"
                  rows={3}
                  value={form.coverLetter}
                  onChange={handleChange}
                  onBlur={() => handleBlur("coverLetter")}
                  placeholder="Explain why your experience matches this role and how you will advance Ufulu's ethical credit mission..."
                  className={`${inputBase} ${
                    touched.coverLetter && errors.coverLetter
                      ? "border-red-400 bg-red-50/20 focus:border-red-500"
                      : "border-slate-200 focus:border-[#1b4332]"
                  } resize-none`}
                />
                {touched.coverLetter && errors.coverLetter && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="size-3" /> {errors.coverLetter}
                  </p>
                )}
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] active:bg-[#143d28] disabled:opacity-60 text-white py-3 text-xs font-bold transition-all shadow-md cursor-pointer hover:shadow-lg"
                >
                  {sending ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      Submit Job Application
                      <ArrowRight className="size-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                  <span>Equal Opportunity Employer</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3 text-[#16a34a]" />
                    Confidential HR Review
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
