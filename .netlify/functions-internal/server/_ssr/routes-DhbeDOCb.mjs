import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CsUR5_iZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as ArrowRight, c as Lock, d as ClipboardCheck, f as CircleCheck, l as LoaderCircle, n as TriangleAlert, p as ChevronDown, r as ShieldCheck, u as Headphones } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DhbeDOCb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navItems = [{
	id: "about",
	label: "About",
	href: "#about"
}];
function SiteHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-1.5 px-2 md:h-16 md:gap-4 md:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "flex items-center gap-1",
					"aria-label": "MAHA BINU Fire Fighters home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/WhatsApp_Image_2026-08-15_at_10.34.51_PM.jpeg",
						alt: "MAHA BINU Fire Fighters logo",
						className: "h-8 w-8 shrink-0 object-contain md:h-12 md:w-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 flex-col leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans text-[11px] font-extrabold tracking-tight text-primary md:text-lg",
							children: "MAHA BINU FIRE FIGHTERS PVT LTD"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans text-[9px] font-medium uppercase tracking-[0.15em] text-foreground/60 md:text-xs",
							children: "Your trusted fire safety partner"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					"aria-label": "Primary",
					children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "border-b-2 border-transparent pb-0.5 font-sans text-[15px] font-medium text-foreground/80 transition-colors hover:text-primary",
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://www.mahabinufirefighters.com/contact-us/#wpcf7-f184-p22-o1",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex shrink-0 items-center justify-center rounded-md bg-secondary px-3 py-1.5 font-sans text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/90 md:px-5 md:py-2.5 md:text-sm",
					children: "Contact Us"
				})
			]
		})
	});
}
function HeroSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "plans",
		className: "bg-surface-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-12 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-balance font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Secure Your Facility."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "FREE FIRE SAFTEY INSPECTION"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-pretty font-sans text-lg leading-relaxed text-on-surface-variant",
					children: "Our certified technicians will visit your facility to perform a thorough, complimentary inspection of your fire protection systems"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#register",
					className: "mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 font-sans text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90",
					children: ["Claim Free Inspection", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/Screenshot_2026-09-12_at_4.35.51_PM.png",
					alt: "Fire safety alarm control panel mounted in a modern commercial building corridor",
					className: "aspect-[4/3] h-full w-full object-cover"
				})
			})]
		})
	});
}
var features = [
	{
		icon: Headphones,
		accent: "bg-secondary",
		iconWrap: "bg-secondary/10 text-secondary",
		title: "24/7 Priority Support",
		body: "Immediate dispatch capabilities and round-the-clock technical assistance ensure zero downtime for critical safety infrastructure."
	},
	{
		icon: ClipboardCheck,
		accent: "bg-primary",
		iconWrap: "bg-primary/10 text-primary",
		title: "Expert Inspections",
		body: "Quarterly exhaustive system audits conducted by certified engineers, adhering strictly to global fire safety codes."
	},
	{
		icon: ShieldCheck,
		accent: "bg-secondary",
		iconWrap: "bg-secondary/10 text-secondary",
		title: "Total Compliance",
		body: "Automated documentation, certificate generation, and compliance tracking specifically designed to satisfy local authority requirements."
	}
];
function WhyChooseSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1280px] px-4 pt-16 md:px-12 md:pt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-[32px]",
					children: "Why choose MAHA BINU'S INSPECTION?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-on-surface-variant",
					children: "Our preventive maintenance contracts guarantee your fire protection systems operate precisely when needed, mitigating risk and ensuring total compliance with national safety standards & NFPA standards."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 md:grid-cols-3",
					children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-1 w-full ${f.accent}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-5 p-6 md:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex h-12 w-12 items-center justify-center rounded-md ${f.iconWrap}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
										className: "h-6 w-6",
										strokeWidth: 2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-sans text-2xl font-semibold text-foreground",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-pretty font-sans text-base leading-relaxed text-on-surface-variant",
									children: f.body
								})
							]
						})]
					}, f.title))
				})
			]
		})
	});
}
function QuoteBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1280px] px-4 py-16 md:px-12 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/Screenshot_2026-08-29_at_5.09.20_PM.png",
					alt: "Fire safety engineers inspecting equipment inside an industrial warehouse, with the quote: Protecting lives and assets with structural integrity and unwavering operational excellence.",
					className: "h-auto w-full object-cover"
				})
			})
		})
	});
}
function FieldLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-2 block font-label text-[13px] font-bold text-foreground",
		children: [
			children,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: "*"
			})
		]
	});
}
var inputClass = "w-full rounded-md border-2 border-input bg-card px-4 py-3 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary";
var initialState = {
	company_name: "",
	contact_person: "",
	designation: "",
	mobile_number: "",
	email: "",
	building_type: "",
	building_type_other: ""
};
function RegistrationSection() {
	const [form, setForm] = (0, import_react.useState)(initialState);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	const isOther = form.building_type === "other";
	const update = (field, value) => {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		setMessage("");
		if (!form.company_name || !form.contact_person || !form.designation || !form.mobile_number || !form.email || !form.building_type) {
			setStatus("error");
			setMessage("Please fill in all required fields.");
			return;
		}
		if (!/^\d{10}$/.test(form.mobile_number)) {
			setStatus("error");
			setMessage("Mobile number must be exactly 10 digits.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setStatus("error");
			setMessage("Please enter a valid email address.");
			return;
		}
		if (form.building_type === "other" && !form.building_type_other.trim()) {
			setStatus("error");
			setMessage("Please specify your building type.");
			return;
		}
		const payload = {
			company_name: form.company_name.trim(),
			contact_person: form.contact_person.trim(),
			designation: form.designation.trim(),
			mobile_number: form.mobile_number.trim(),
			email: form.email.trim().toLowerCase(),
			building_type: form.building_type,
			building_type_other: form.building_type === "other" ? form.building_type_other.trim() : null
		};
		const { error } = await supabase.from("registrations").insert(payload);
		if (error) {
			if (error.code === "23505") {
				setStatus("error");
				setMessage("This email has already been registered. Each company email can only register once.");
			} else {
				setStatus("error");
				setMessage("Something went wrong. Please try again or contact us directly.");
			}
			return;
		}
		setStatus("success");
		setMessage("Registration successful! Our engineering team will contact you shortly.");
		setForm(initialState);
		try {
			if (!(await fetch(`https://ykwauaijddycdchcibex.supabase.co/functions/v1/send-registration-email`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrd2F1YWlqZGR5Y2RjaGNpYmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjI1NzksImV4cCI6MjEwNDUzODU3OX0.w2lb6rxg_pripaBSlT-ruYKwrRZG2jrX-8e-fLvgaXA`
				},
				body: JSON.stringify({
					email: payload.email,
					company_name: payload.company_name,
					contact_person: payload.contact_person,
					designation: payload.designation,
					mobile_number: payload.mobile_number,
					building_type: payload.building_type,
					building_type_other: payload.building_type_other
				})
			})).ok) console.warn("Confirmation email failed to send, but registration was saved.");
		} catch {
			console.warn("Confirmation email request failed, but registration was saved.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "register",
		className: "bg-surface-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1280px] items-start gap-12 px-4 py-16 md:grid-cols-2 md:px-12 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-[32px]",
						children: "Activate Your Free Maintenance Assessment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-on-surface-variant",
						children: "Complete the registration form to lock in your exclusive Synergy 2026 Expo offer. Our engineering team will contact you at the earliest to schedule the initial baseline assessment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 max-w-md border border-border border-l-4 border-l-alert-amber bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-alert-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-sans text-base font-bold text-foreground",
								children: "Limited Time Offer"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-pretty font-sans text-[15px] leading-relaxed text-on-surface-variant",
							children: "Registration closes strictly at the conclusion of the Expo 2026 event on October 10th. Late submissions will not qualify for the fee waiver."
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 w-full bg-primary",
					"aria-hidden": "true"
				}), status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-16 w-16 text-secondary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-sans text-2xl font-bold text-foreground",
							children: "Registration Complete!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm font-sans text-base leading-relaxed text-on-surface-variant",
							children: message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setStatus("idle");
								setMessage("");
							},
							className: "mt-2 inline-flex items-center justify-center rounded-md border-2 border-input bg-card px-6 py-3 font-sans text-base font-bold text-foreground transition-colors hover:bg-surface",
							children: "Register Another Company"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-6 p-6 md:p-8",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Company Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: inputClass,
							placeholder: "Enter your registered company name",
							value: form.company_name,
							onChange: (e) => update("company_name", e.target.value),
							disabled: status === "loading"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Contact Person Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: inputClass,
								placeholder: "Full Name",
								value: form.contact_person,
								onChange: (e) => update("contact_person", e.target.value),
								disabled: status === "loading"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Designation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: inputClass,
								placeholder: "e.g. Facility Manager",
								value: form.designation,
								onChange: (e) => update("designation", e.target.value),
								disabled: status === "loading"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Mobile Number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								className: inputClass,
								placeholder: "10-digit number",
								value: form.mobile_number,
								onChange: (e) => update("mobile_number", e.target.value),
								disabled: status === "loading"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Email ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								className: inputClass,
								placeholder: "official@company.com",
								value: form.email,
								onChange: (e) => update("email", e.target.value),
								disabled: status === "loading"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Type of Building" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: form.building_type,
									onChange: (e) => update("building_type", e.target.value),
									className: `${inputClass} appearance-none pr-10 text-on-surface-variant`,
									disabled: status === "loading",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "Select facility type"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "institutions",
											children: "Institutions"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hospitals",
											children: "Hospitals"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "industries",
											children: "Industries"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "warehouses",
											children: "Warehouses"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "commercial",
											children: "Commercial Complex"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "high-rise-residential",
											children: "High-rise Residence Buildings"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "other",
											children: "Other"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" })]
							}),
							isOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: `${inputClass} mt-4`,
								placeholder: "Please specify your building type",
								"aria-label": "Specific building type",
								value: form.building_type_other,
								onChange: (e) => update("building_type_other", e.target.value),
								disabled: status === "loading"
							})
						] }),
						status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm text-primary",
								children: message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: status === "loading",
							className: "mt-2 inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-sans text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60",
							children: status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Registering..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "h-5 w-5" }), "Register for Free AMC"] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center justify-center gap-2 font-sans text-sm text-on-surface-variant",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), "Your data is securely encrypted."]
						})
					]
				})]
			})]
		})
	});
}
var links = [
	"Privacy Policy",
	"Terms of Service",
	"Safety Standards",
	"Expo 2026"
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-footer text-footer-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1280px] px-4 py-14 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-sans text-xl font-bold leading-snug text-white",
						children: "MAHA BINU FIRE FIGHTERS.PVT.LTD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-pretty font-sans text-sm leading-relaxed text-footer-foreground/80",
						children: "Engineering safer environments through rigorous standards and unwavering commitment to protection."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-label text-sm font-bold text-white",
					children: "Legal & Resources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 flex flex-col gap-3",
					children: links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: `font-sans text-sm transition-colors hover:text-white ${i === links.length - 1 ? "font-semibold text-white underline underline-offset-4" : "text-footer-foreground/80"}`,
						children: link
					}) }, link))
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 border-t border-white/10 pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-xs leading-relaxed text-footer-foreground/70",
					children: "© 2026 MAHA BINU FIRE FIGHTERS.PVT.LTD. All rights reserved."
				})
			})]
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChooseSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteBanner, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationSection, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
