import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./router-5NCBCtXM.mjs";
import { c as Lock, l as LoaderCircle, n as TriangleAlert, o as Mail } from "../_libs/lucide-react.mjs";
import { t as maha_binu_logo_png_asset_default } from "./maha-binu-logo.png.asset-D0nGwTT4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BxAErGn7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const { user, isAdmin, loading, adminReady, signIn } = useAuth();
	const navigate = useNavigate();
	const redirected = (0, import_react.useRef)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!loading && adminReady && user && isAdmin) {
			if (!redirected.current) {
				redirected.current = true;
				navigate({ to: "/admin" });
			}
		} else redirected.current = false;
	}, [
		loading,
		adminReady,
		user,
		isAdmin
	]);
	if (loading || !adminReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-sans text-base text-on-surface-variant",
			children: "Loading..."
		})
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setError("");
		const { error: signInError } = await signIn(email, password);
		if (signInError) {
			setError(signInError);
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-surface px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: maha_binu_logo_png_asset_default.url,
						alt: "MAHA BINU Fire Fighters logo",
						className: "h-16 w-16 object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-sans text-xl font-extrabold tracking-tight text-primary",
							children: "MAHA BINU FIRE FIGHTERS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/60",
							children: "Admin Panel"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full bg-primary",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex flex-col gap-6 p-6 md:p-8",
						onSubmit: handleSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-sans text-2xl font-bold text-foreground",
								children: "Sign In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm text-on-surface-variant",
								children: "Authorized personnel only. Use your staff credentials to access registrations."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mb-2 block font-label text-[13px] font-bold text-foreground",
								children: ["Email Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									className: "w-full rounded-md border-2 border-input bg-card py-3 pl-10 pr-4 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary",
									placeholder: "admin@mahabinu.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									disabled: submitting,
									required: true
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mb-2 block font-label text-[13px] font-bold text-foreground",
								children: ["Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									className: "w-full rounded-md border-2 border-input bg-card py-3 pl-10 pr-4 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary",
									placeholder: "Enter your password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									disabled: submitting,
									required: true
								})]
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-sm text-primary",
									children: error
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: submitting,
								className: "inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-sans text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60",
								children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Signing in..."] }) : "Sign In"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-sans text-sm text-on-surface-variant transition-colors hover:text-primary",
						children: "Back to website"
					})
				})
			]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
