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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Search, Eye, Trash2, Loader2 } from "lucide-react";

type Enquiry = Record<string, any>;

const FILTERS = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "RESOLVED", label: "Resolved" },
];

const STATUS_STYLE: Record<string, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-600",
  RESOLVED: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

export function EnquiriesManager({ kind }: { kind: "loan" | "company" }) {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [busy, setBusy] = useState(false);

  const base = `/api/admin/enquiries/${kind}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (q.trim()) params.set("q", q.trim());
      if (status) params.set("status", status);
      const res = await fetch(`${base}?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setRows(json.data);
      setTotalPages(json.pagination.totalPages);
      setTotal(json.pagination.total);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, [base, page, q, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateStatus = useCallback(
    async (row: Enquiry, next: string) => {
      setBusy(true);
      try {
        const res = await fetch(`${base}/${row.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        toast.success("Status updated");
        setSelected(null);
        fetchData();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Update failed");
      } finally {
        setBusy(false);
      }
    },
    [base, fetchData]
  );

  async function handleDelete() {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const res = await fetch(`${base}/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Enquiry deleted");
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error("Delete failed");
    } finally {
      setBusy(false);
    }
  }

  const detailFields = (e: Enquiry): { label: string; value: string }[] => {
    const baseFields = [
      { label: "Reference", value: e.refNumber },
      { label: "Name", value: e.name },
      { label: "Phone", value: e.phone },
      { label: "Email", value: e.email },
    ];
    const rest =
      kind === "loan"
        ? [
            { label: "Location", value: e.location },
            { label: "Loan product", value: e.productName },
            { label: "Amount requested", value: e.amountRequested },
            { label: "Purpose", value: e.purpose },
            { label: "Employment / business", value: e.employment },
            { label: "Preferred contact", value: e.preferredContact },
            { label: "Message", value: e.message },
          ]
        : [
            { label: "Category", value: e.category },
            { label: "Message", value: e.message },
          ];
    return [...baseFields, ...rest].filter((f) => f.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, reference…"
              className="h-10 rounded-xl border-slate-200 bg-white pl-9"
            />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="h-10 w-full rounded-xl border-slate-200 bg-white sm:w-40">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              {FILTERS.map((f) => (
                <SelectItem key={f.label} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-700">No {kind === "loan" ? "loan applicants" : "enquiries"} found</p>
          <p className="mt-1 text-xs text-slate-500">Try a different search or status filter.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 bg-slate-50/60 hover:bg-transparent">
                  <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Reference</TableHead>
                  <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicant</TableHead>
                  <TableHead className="hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:table-cell">
                    {kind === "loan" ? "Product" : "Category"}
                  </TableHead>
                  <TableHead className="hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:table-cell">Date</TableHead>
                  <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</TableHead>
                  <TableHead className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((e) => (
                  <TableRow key={e.id} className="border-slate-100 hover:bg-blue-50/40">
                    <TableCell className="px-4 py-3 font-mono text-xs font-bold text-[#034DA2]">{e.refNumber}</TableCell>
                    <TableCell className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{e.name}</p>
                      <p className="text-xs text-slate-500">{e.email}</p>
                    </TableCell>
                    <TableCell className="hidden px-4 py-3 text-sm text-slate-500 md:table-cell">
                      {kind === "loan" ? e.productName ?? "—" : e.category}
                    </TableCell>
                    <TableCell className="hidden px-4 py-3 text-sm text-slate-500 lg:table-cell">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge variant="outline" className={cn("rounded-lg text-[10px] font-bold uppercase tracking-wide", STATUS_STYLE[e.status] ?? "border-slate-200 text-slate-500")}>
                        {e.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" className="rounded-lg text-slate-500 hover:bg-blue-50 hover:text-[#034DA2]" onClick={() => setSelected(e)}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => setDeleteTarget(e)}>
                          <Trash2 className="size-4" />
                        </Button>
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
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-2xl overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.refNumber}</DialogTitle>
            <DialogDescription>
              {kind === "loan" ? "Loan applicant details" : "Company enquiry details"} — submitted {selected ? new Date(selected.createdAt).toLocaleString() : ""}
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {detailFields(selected).map((f) => (
                    <div key={f.label} className={f.value.length > 80 ? "sm:col-span-2" : ""}>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{f.label}</dt>
                      <dd className="mt-0.5 whitespace-pre-wrap break-words text-sm font-medium text-slate-900">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {kind === "loan" && selected.idImageUrl ? (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    National ID (front)
                  </p>
                  <a
                    href={String(selected.idImageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block"
                  >
                    <img
                      src={String(selected.idImageUrl)}
                      alt="National ID"
                      className="max-h-56 rounded-lg border border-slate-200 object-contain"
                    />
                  </a>
                </div>
              ) : null}

              <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select
                    value={selected.status}
                    onValueChange={(v) => updateStatus(selected, v)}
                    disabled={busy}
                  >
                    <SelectTrigger className="h-9 w-full rounded-xl border-slate-200 bg-white sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["PENDING", "RESOLVED"].map((s) => (
                        <SelectItem key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {busy && <Loader2 className="size-4 animate-spin text-slate-400" />}
                </div>
                <Button variant="outline" className="rounded-xl" onClick={() => setSelected(null)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => { if (!o) setDeleteTarget(null); }}
        title="Delete enquiry?"
        description={deleteTarget ? `This will permanently remove ${deleteTarget.refNumber} (${deleteTarget.name}).` : ""}
        confirmLabel="Delete"
        loading={busy}
        onConfirm={handleDelete}
      />
    </div>
  );
}
