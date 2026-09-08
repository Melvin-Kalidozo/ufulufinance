"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Search, Eye, Trash2, ExternalLink, Loader2 } from "lucide-react";

type App = Record<string, any>;

const STATUSES = ["PENDING", "SHORTLISTED", "REJECTED", "HIRED"];

const STATUS_STYLE: Record<string, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-600",
  SHORTLISTED: "border-blue-200 bg-blue-50 text-[#034DA2]",
  REJECTED: "border-slate-200 bg-slate-100 text-slate-500",
  HIRED: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

export function JobApplicationsManager() {
  const [rows, setRows] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<App | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<App | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (q.trim()) params.set("q", q.trim());
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/job-applications?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setRows(json.data);
      setTotalPages(json.pagination.totalPages);
      setTotal(json.pagination.total);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [page, q, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function updateStatus(app: App, next: string) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/job-applications/${app.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Application status updated");
      setSelected(null);
      fetchData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/job-applications/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Application deleted");
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error("Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search applicants…" className="h-10 rounded-xl border-slate-200 bg-white pl-9" />
        </div>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger className="h-10 w-full rounded-xl border-slate-200 bg-white sm:w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-700">No applications yet</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 bg-slate-50/60 hover:bg-transparent">
                  <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicant</TableHead>
                  <TableHead className="hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:table-cell">Job</TableHead>
                  <TableHead className="hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:table-cell">Date</TableHead>
                  <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</TableHead>
                  <TableHead className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((a) => (
                  <TableRow key={a.id} className="border-slate-100 hover:bg-blue-50/40">
                    <TableCell className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{a.name}</p>
                      <p className="text-xs text-slate-500">{a.email}</p>
                    </TableCell>
                    <TableCell className="hidden px-4 py-3 text-sm text-slate-500 md:table-cell">{a.job?.title}</TableCell>
                    <TableCell className="hidden px-4 py-3 text-sm text-slate-500 sm:table-cell">{new Date(a.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge variant="outline" className={cn("rounded-lg text-[10px] font-bold uppercase tracking-wide", STATUS_STYLE[a.status] ?? "")}>{a.status}</Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" className="rounded-lg text-slate-500 hover:bg-blue-50 hover:text-[#034DA2]" onClick={() => setSelected(a)}><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon-sm" className="rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => setDeleteTarget(a)}><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
            <p className="text-xs text-slate-500">Page {page} of {totalPages} · {total} total</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" className="rounded-lg" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={selected !== null} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-xl overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>Application for {selected?.job?.title}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email</dt><dd className="text-slate-900">{selected.email}</dd></div>
                  <div><dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone</dt><dd className="text-slate-900">{selected.phone ?? "—"}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Submitted</dt><dd className="text-slate-900">{new Date(selected.createdAt).toLocaleString()}</dd></div>
                  {selected.coverNote && (
                    <div className="sm:col-span-2">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Cover note</dt>
                      <dd className="whitespace-pre-wrap text-slate-700">{selected.coverNote}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <a
                href={selected.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#034DA2] px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-[#023877]"
              >
                <ExternalLink className="size-4" /> Open CV
              </a>
              <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
                <Select value={selected.status} onValueChange={(v) => updateStatus(selected, v)} disabled={busy}>
                  <SelectTrigger className="h-9 w-full rounded-xl border-slate-200 bg-white sm:w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</SelectItem>)}
                  </SelectContent>
                </Select>
                {busy && <Loader2 className="size-4 animate-spin text-slate-400" />}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={deleteTarget !== null} onOpenChange={(o) => { if (!o) setDeleteTarget(null); }} title="Delete application?" description={deleteTarget ? `Remove ${deleteTarget.name}'s application?` : ""} confirmLabel="Delete" loading={busy} onConfirm={handleDelete} />
    </div>
  );
}
