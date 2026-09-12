import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CsUR5_iZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./router-LRjvqdJv.mjs";
import { a as Phone, g as Briefcase, h as Building2, i as Search, m as Calendar, o as Mail, s as LogOut, t as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DtIoIe9k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const { user, isAdmin, loading, adminReady, signOut } = useAuth();
	const navigate = useNavigate();
	const redirected = (0, import_react.useRef)(false);
	const hasChildMatch = useRouterState({ select: (s) => s.matches.some((m) => m.routeId === "/admin/login") });
	(0, import_react.useEffect)(() => {
		if (hasChildMatch || loading || !adminReady) return;
		if (!user || !isAdmin) {
			if (!redirected.current) {
				redirected.current = true;
				navigate({ to: "/admin/login" });
			}
		} else redirected.current = false;
	}, [
		hasChildMatch,
		loading,
		adminReady,
		user,
		isAdmin
	]);
	if (hasChildMatch) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (loading || !adminReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-sans text-base text-on-surface-variant",
			children: "Loading..."
		})
	});
	if (!user || !isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, { signOut });
}
function AdminDashboard({ signOut }) {
	const [registrations, setRegistrations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		loadRegistrations();
	}, []);
	async function loadRegistrations() {
		setLoading(true);
		const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
		if (error) setError("Failed to load registrations.");
		else setRegistrations(data ?? []);
		setLoading(false);
	}
	async function updateStatus(id, newStatus) {
		const { error } = await supabase.from("registrations").update({ status: newStatus }).eq("id", id);
		if (!error) setRegistrations((prev) => prev.map((r) => r.id === id ? {
			...r,
			status: newStatus
		} : r));
	}
	const filtered = registrations.filter((r) => {
		const matchesSearch = !search || r.company_name.toLowerCase().includes(search.toLowerCase()) || r.contact_person.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === "all" || r.status === statusFilter;
		return matchesSearch && matchesStatus;
	});
	const statusBadge = (status) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${{
				pending: "bg-amber-100 text-amber-800",
				contacted: "bg-blue-100 text-blue-800",
				completed: "bg-green-100 text-green-800"
			}[status] ?? ""}`,
			children: status.charAt(0).toUpperCase() + status.slice(1)
		});
	};
	const formatDate = (iso) => {
		return new Date(iso).toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	const buildingTypeLabel = (type) => {
		return {
			institutions: "Institutions",
			hospitals: "Hospitals",
			industries: "Industries",
			warehouses: "Warehouses",
			commercial: "Commercial Complex",
			"high-rise-residential": "High-rise Residence",
			other: "Other"
		}[type] ?? type;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-sans text-xl font-bold text-foreground",
						children: "Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-sm text-on-surface-variant",
						children: "AMC Registration Submissions"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
							children: "View Site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: signOut,
							className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-sans text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign Out"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[1280px] px-4 py-6 md:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm text-on-surface-variant",
								children: "Total Registrations"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-sans text-3xl font-bold text-foreground",
								children: registrations.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm text-on-surface-variant",
								children: "Pending"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-sans text-3xl font-bold text-amber-600",
								children: registrations.filter((r) => r.status === "pending").length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm text-on-surface-variant",
								children: "Completed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-sans text-3xl font-bold text-green-600",
								children: registrations.filter((r) => r.status === "completed").length
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[1280px] px-4 pb-4 md:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search by company, contact, or email...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full rounded-md border-2 border-input bg-card py-2.5 pl-10 pr-4 font-sans text-sm text-foreground placeholder:text-on-surface-variant/60 outline-none focus:border-secondary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: statusFilter,
						onChange: (e) => setStatusFilter(e.target.value),
						className: "rounded-md border-2 border-input bg-card px-4 py-2.5 font-sans text-sm text-foreground outline-none focus:border-secondary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pending",
								children: "Pending"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "contacted",
								children: "Contacted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "completed",
								children: "Completed"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[1280px] px-4 pb-12 md:px-12",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-base text-on-surface-variant",
						children: "Loading registrations..."
					})
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-base text-primary",
						children: error
					})
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-center justify-center py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-base text-on-surface-variant",
						children: "No registrations found."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-surface-container text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant",
									children: "Company"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant",
									children: "Contact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant",
									children: "Building Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant",
									children: "Status"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-card last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "mt-0.5 h-4 w-4 shrink-0 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-sans text-sm font-semibold text-foreground",
											children: r.company_name
										}), r.building_type_other && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-sans text-xs text-on-surface-variant",
											children: r.building_type_other
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-sans text-sm text-foreground",
													children: r.contact_person
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-3.5 w-3.5 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-sans text-xs text-on-surface-variant",
													children: r.designation
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: `mailto:${r.email}`,
													className: "font-sans text-xs text-secondary hover:underline",
													children: r.email
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: `tel:${r.mobile_number}`,
													className: "font-sans text-xs text-secondary hover:underline",
													children: r.mobile_number
												})]
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-sans text-sm text-foreground",
										children: buildingTypeLabel(r.building_type)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-sans text-xs text-on-surface-variant",
											children: formatDate(r.created_at)
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: r.status,
										onChange: (e) => updateStatus(r.id, e.target.value),
										className: "rounded-md border border-input bg-card px-2 py-1 font-sans text-xs text-foreground outline-none focus:border-secondary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "pending",
												children: "Pending"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "contacted",
												children: "Contacted"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "completed",
												children: "Completed"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: statusBadge(r.status)
									})]
								})
							]
						}, r.id)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
