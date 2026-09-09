import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RecentUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
};

export function RecentUsers({ users }: { users: RecentUser[] }) {
  if (users.length === 0) {
    return (
      <p className="px-6 py-12 text-center text-sm text-slate-500">
        No users yet.
      </p>
    );
  }

  return (
    <div className="px-3 py-4 sm:px-6">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Name
            </TableHead>
            <TableHead className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email
            </TableHead>
            <TableHead className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Role
            </TableHead>
            <TableHead className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </TableHead>
            <TableHead className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Joined
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-slate-100 hover:bg-blue-50/40">
              <TableCell className="px-3 py-3.5 text-sm font-semibold text-slate-900">
                {user.name}
              </TableCell>
              <TableCell className="px-3 py-3.5 text-sm text-slate-500">
                {user.email}
              </TableCell>
              <TableCell className="px-3 py-3.5">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-lg border-blue-200 bg-blue-50 text-[10px] font-bold uppercase tracking-wide text-[#034DA2]",
                    user.role !== "ADMIN" && "border-slate-200 bg-slate-50 text-slate-500"
                  )}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="px-3 py-3.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-semibold",
                    user.isActive ? "text-[#00A3E0]" : "text-slate-400"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      user.isActive ? "bg-[#00A3E0]" : "bg-slate-300"
                    )}
                  />
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="px-3 py-3.5 text-sm text-slate-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
