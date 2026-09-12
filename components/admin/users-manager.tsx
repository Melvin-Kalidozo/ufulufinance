"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { cn } from "@/lib/utils";
import {
  Plus,
  Pencil,
  Trash2,
  UserRound,
  ShieldCheck,
  Loader2,
} from "lucide-react";

type UserRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
};

type Filter = "ALL" | "ADMIN" | "CUSTOMER";

// Customer accounts are disabled on the live system — the /account portal is
// a future improvement. Creation is limited to ADMIN accounts here so no
// customer route entrances are generated. Re-enable the "Customer" option
// when the customer portal ships.
const CUSTOMER_SELF_SERVICE_ENABLED = false;

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "ADMIN",
};

export function UsersManager() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("ALL");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(data.users);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    await fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (!cancelled) setUsers(data.users);
      } catch {
        if (!cancelled) toast.error("Failed to load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initialLoad();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    filter === "ALL" ? users : users.filter((u) => u.role === filter);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(user: UserRow) {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      password: "",
      role: user.role,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (formRef.current && !formRef.current.reportValidity()) return;
    setSaving(true);
    try {
      if (editing) {
        const payload: Record<string, unknown> = {
          name: form.name,
          phone: form.phone,
          role: form.role,
        };
        if (form.password) payload.password = form.password;

        const res = await fetch(`/api/users/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        toast.success("User updated");
      } else {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        toast.success("User created");
      }
      setDialogOpen(false);
      loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(user: UserRow) {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(user.isActive ? "User deactivated" : "User activated");
      loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Operation failed");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("User deleted");
      setDeleteTarget(null);
      loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList className="h-10 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1">
            <TabsTrigger
              value="ALL"
              className="rounded-lg px-3 text-xs font-bold text-slate-500 data-active:bg-[#034DA2] data-active:text-white data-active:shadow-sm hover:text-[#034DA2]"
            >
              All
            </TabsTrigger>
            {/* <TabsTrigger
              value="ADMIN"
              className="rounded-lg px-3 text-xs font-bold text-slate-500 data-active:bg-[#034DA2] data-active:text-white data-active:shadow-sm hover:text-[#034DA2]"
            >
              <ShieldCheck className="size-4" />
              Admins
            </TabsTrigger> */}
            {/* <TabsTrigger
              value="CUSTOMER"
              className="rounded-lg px-3 text-xs font-bold text-slate-500 data-active:bg-[#034DA2] data-active:text-white data-active:shadow-sm hover:text-[#034DA2]"
            >
              <UserRound className="size-4" />
              Customers
            </TabsTrigger> */}
          </TabsList>
        </Tabs>

        <Button
          onClick={openCreate}
          className="rounded-xl bg-[#034DA2] text-white shadow-md shadow-blue-950/15 transition-all hover:scale-[1.02] hover:bg-[#023877]"
        >
          <Plus className="size-4" />
          Add user
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#034DA2]">
            <UserRound className="size-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            No users found in this category
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different filter or add a new user.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 bg-slate-50/60 hover:bg-transparent">
                <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Name
                </TableHead>
                <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email
                </TableHead>
                <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Phone
                </TableHead>
                <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Role
                </TableHead>
                <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </TableHead>
                <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Joined
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-slate-100 hover:bg-blue-50/40"
                >
                  <TableCell className="px-4 py-3.5 font-semibold text-slate-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-sm text-slate-500">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-sm text-slate-500">
                    {user.phone || "—"}
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "outline"}
                      className={cn(
                        "rounded-lg text-[10px] font-bold uppercase tracking-wide",
                        user.role === "ADMIN"
                          ? "bg-[#034DA2] text-white"
                          : "border-slate-200 bg-slate-50 text-slate-500",
                      )}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-semibold hover:underline",
                        user.isActive ? "text-[#00A3E0]" : "text-slate-400",
                      )}
                      title={
                        user.isActive
                          ? "Click to deactivate"
                          : "Click to activate"
                      }
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          user.isActive ? "bg-[#00A3E0]" : "bg-slate-300",
                        )}
                      />
                      {user.isActive ? "Active" : "Inactive"}
                    </button>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-sm text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-lg text-slate-500 hover:bg-blue-50 hover:text-[#034DA2]"
                        onClick={() => openEdit(user)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => setDeleteTarget(user)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit user" : "Add user"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the user's details. Leave password blank to keep it unchanged."
                : "Create a new admin account. Customer accounts are a future improvement."}
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v })}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem
                    value="CUSTOMER"
                    disabled={!CUSTOMER_SELF_SERVICE_ENABLED}
                  >
                    Customer
                    {!CUSTOMER_SELF_SERVICE_ENABLED
                      ? " (future improvement)"
                      : ""}
                  </SelectItem>
                </SelectContent>
              </Select>
              {!editing && !CUSTOMER_SELF_SERVICE_ENABLED && (
                <p className="text-xs text-slate-500">
                  Only Admin accounts can be created right now. The Customer
                  portal is disabled — it will return as a future improvement.
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password {editing ? "(optional)" : ""}
              </Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={
                  editing ? "Leave blank to keep current" : "Min 8 characters"
                }
                minLength={editing ? undefined : 8}
                required={!editing}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => handleSave()}
                disabled={saving}
                className="rounded-xl bg-[#034DA2] text-white shadow-md shadow-blue-950/15 hover:bg-[#023877]"
              >
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : editing ? (
                  "Save changes"
                ) : (
                  "Create user"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete user?"
        description={
          deleteTarget
            ? `This will permanently remove ${deleteTarget.name} (${deleteTarget.email}) and cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
