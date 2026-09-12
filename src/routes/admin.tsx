import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Dashboard | MAHA BINU Fire Fighters" },
      { name: "description", content: "Admin dashboard for viewing AMC registrations." },
    ],
  }),
});

function AdminPage() {
  const { user, isAdmin, loading, adminReady, signOut } = useAuth();
  const navigate = useNavigate();
  const redirected = useRef(false);

  // If a child route is active (e.g. /admin/login), render it via Outlet
  // and skip the auth guard — the guard only applies to /admin itself.
  const hasChildMatch = useRouterState({
    select: (s) => s.matches.some((m) => m.routeId === "/admin/login"),
  });

  if (hasChildMatch) {
    return <Outlet />;
  }

  useEffect(() => {
    if (loading || !adminReady) return;
    if (!user || !isAdmin) {
      if (!redirected.current) {
        redirected.current = true;
        navigate({ to: "/admin/login" });
      }
    } else {
      redirected.current = false;
    }
  }, [loading, adminReady, user, isAdmin]);

  if (loading || !adminReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="font-sans text-base text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <AdminDashboard signOut={signOut} />;
}

import { useState } from "react";
import { supabase, type Registration } from "@/lib/supabase";
import { LogOut, Search, Building2, Mail, Phone, User, Briefcase, Calendar } from "lucide-react";

function AdminDashboard({ signOut }: { signOut: () => Promise<void> }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function loadRegistrations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Failed to load registrations.");
    } else {
      setRegistrations((data as Registration[]) ?? []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("registrations")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus as Registration["status"] } : r))
      );
    }
  }

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      !search ||
      r.company_name.toLowerCase().includes(search.toLowerCase()) ||
      r.contact_person.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800",
      contacted: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return (
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status] ?? ""}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const buildingTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      institutions: "Institutions",
      hospitals: "Hospitals",
      industries: "Industries",
      warehouses: "Warehouses",
      commercial: "Commercial Complex",
      "high-rise-residential": "High-rise Residence",
      other: "Other",
    };
    return labels[type] ?? type;
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-12">
          <div>
            <h1 className="font-sans text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="font-sans text-sm text-on-surface-variant">AMC Registration Submissions</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              View Site
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-sans text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="font-sans text-sm text-on-surface-variant">Total Registrations</p>
            <p className="mt-1 font-sans text-3xl font-bold text-foreground">{registrations.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="font-sans text-sm text-on-surface-variant">Pending</p>
            <p className="mt-1 font-sans text-3xl font-bold text-amber-600">
              {registrations.filter((r) => r.status === "pending").length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="font-sans text-sm text-on-surface-variant">Completed</p>
            <p className="mt-1 font-sans text-3xl font-bold text-green-600">
              {registrations.filter((r) => r.status === "completed").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-[1280px] px-4 pb-4 md:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search by company, contact, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border-2 border-input bg-card py-2.5 pl-10 pr-4 font-sans text-sm text-foreground placeholder:text-on-surface-variant/60 outline-none focus:border-secondary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-2 border-input bg-card px-4 py-2.5 font-sans text-sm text-foreground outline-none focus:border-secondary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto max-w-[1280px] px-4 pb-12 md:px-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-sans text-base text-on-surface-variant">Loading registrations...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-sans text-base text-primary">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-sans text-base text-on-surface-variant">No registrations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-container text-left">
                  <th className="p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Company</th>
                  <th className="p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Contact</th>
                  <th className="p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Building Type</th>
                  <th className="p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Date</th>
                  <th className="p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border bg-card last:border-0">
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-on-surface-variant" />
                        <div>
                          <p className="font-sans text-sm font-semibold text-foreground">{r.company_name}</p>
                          {r.building_type_other && (
                            <p className="font-sans text-xs text-on-surface-variant">{r.building_type_other}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-on-surface-variant" />
                          <span className="font-sans text-sm text-foreground">{r.contact_person}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-on-surface-variant" />
                          <span className="font-sans text-xs text-on-surface-variant">{r.designation}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-on-surface-variant" />
                          <a href={`mailto:${r.email}`} className="font-sans text-xs text-secondary hover:underline">{r.email}</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-on-surface-variant" />
                          <a href={`tel:${r.mobile_number}`} className="font-sans text-xs text-secondary hover:underline">{r.mobile_number}</a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-sans text-sm text-foreground">{buildingTypeLabel(r.building_type)}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-on-surface-variant" />
                        <span className="font-sans text-xs text-on-surface-variant">{formatDate(r.created_at)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className="rounded-md border border-input bg-card px-2 py-1 font-sans text-xs text-foreground outline-none focus:border-secondary"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <div className="mt-1">{statusBadge(r.status)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
