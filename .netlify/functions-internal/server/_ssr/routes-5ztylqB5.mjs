import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CsUR5_iZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as ArrowRight, d as Headphones, f as Flame, h as ChevronDown, i as ShieldCheck, m as CircleCheck, p as ClipboardCheck, r as TriangleAlert, t as X, u as LoaderCircle, y as Ban } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-5ztylqB5.js
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
					"data-tour": "contact",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex shrink-0 items-center justify-center rounded-md bg-secondary px-3 py-1.5 font-sans text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/90 md:px-5 md:py-2.5 md:text-sm",
					children: "Contact Us"
				})
			]
		})
	});
}
var MAX_REGISTRATIONS = 99;
function useRemainingSpots() {
	const [remaining, setRemaining] = (0, import_react.useState)(null);
	const [isFull, setIsFull] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function fetchRemaining() {
			const { data, error } = await supabase.rpc("get_remaining_spots");
			if (cancelled) return;
			if (error) {
				setRemaining(null);
				return;
			}
			const value = data;
			setRemaining(value);
			setIsFull(value <= 0);
		}
		fetchRemaining();
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		remaining,
		isFull,
		MAX_REGISTRATIONS
	};
}
function HeroSection() {
	const { remaining, isFull, MAX_REGISTRATIONS } = useRemainingSpots();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "plans",
		className: "bg-surface-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-12 md:py-16",
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
							children: "FIRE SAFETY INSPECTION"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-pretty font-sans text-lg leading-relaxed text-on-surface-variant",
					children: "Our certified technicians will visit your facility to perform a thorough inspection of your fire protection systems"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex w-full max-w-md flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex w-fit items-center gap-2 rounded-full bg-alert-amber px-4 py-2 font-sans text-xs font-extrabold uppercase tracking-[0.08em] text-foreground sm:text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
								className: "h-4 w-4 fill-current",
								"aria-hidden": "true"
							}),
							"Limited to first ",
							MAX_REGISTRATIONS,
							" registrations"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-tour": "status",
						className: "flex h-[120px] w-[355px] max-w-full items-center rounded-lg border border-outline-variant border-t-4 border-t-primary bg-card px-7 shadow-md",
						children: isFull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans text-2xl font-extrabold uppercase leading-tight text-primary sm:text-3xl",
							children: "Registration closed"
						}) : remaining !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans text-6xl font-extrabold leading-none text-primary sm:text-7xl",
							children: remaining
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-5 font-sans text-base font-extrabold uppercase leading-tight tracking-wide text-on-surface-variant sm:text-lg",
							children: "Spots remaining"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans text-base font-extrabold uppercase tracking-wide text-on-surface-variant sm:text-lg",
							children: "Loading availability..."
						})
					})]
				}),
				isFull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: true,
					className: "mt-7 inline-flex cursor-not-allowed items-center gap-3 rounded-md bg-primary px-7 py-4 font-sans text-base font-bold text-primary-foreground opacity-60",
					children: "REGISTRATION CLOSED"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#register",
					"data-tour": "register",
					className: "mt-7 inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 font-sans text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90",
					children: ["Claim Your Inspection", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
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
	const { isFull, MAX_REGISTRATIONS } = useRemainingSpots();
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
		const registrationData = {
			company_name: form.company_name.trim(),
			contact_person: form.contact_person.trim(),
			designation: form.designation.trim(),
			mobile_number: form.mobile_number.trim(),
			email: form.email.trim().toLowerCase(),
			building_type: form.building_type,
			building_type_other: form.building_type === "other" ? form.building_type_other.trim() : null
		};
		const supabaseUrl = "https://ykwauaijddycdchcibex.supabase.co";
		const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrd2F1YWlqZGR5Y2RjaGNpYmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjI1NzksImV4cCI6MjEwNDUzODU3OX0.w2lb6rxg_pripaBSlT-ruYKwrRZG2jrX-8e-fLvgaXA";
		try {
			const submitResponse = await fetch(`${supabaseUrl}/functions/v1/submit-free-registration`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${supabaseAnonKey}`
				},
				body: JSON.stringify({ registration: registrationData })
			});
			if (!submitResponse.ok) {
				const errorBody = await submitResponse.json().catch(() => ({}));
				setStatus("error");
				if (submitResponse.status === 409) setMessage(errorBody.error ?? "All 99 registration spots have been claimed.");
				else setMessage(errorBody.error ?? "Registration failed. Please try again.");
				return;
			}
			const responseData = await submitResponse.json();
			setStatus("success");
			setMessage("Registration successful! Our engineering team will contact you shortly.");
			setForm(initialState);
			try {
				await fetch(`${supabaseUrl}/functions/v1/send-registration-email`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${supabaseAnonKey}`
					},
					body: JSON.stringify({ registration_id: responseData.registration_id })
				});
			} catch {
				console.warn("Confirmation email failed to send, but registration was saved.");
			}
		} catch {
			setStatus("error");
			setMessage("Network error during registration. Please try again.");
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
						children: "Activate Your Maintenance Assessment"
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
							children: "Registration closes strictly at the conclusion of the Expo 2026 event on October 10th. Late submissions will not qualify for the inspection."
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
				}) : isFull ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-16 w-16 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-sans text-2xl font-bold text-foreground",
							children: "Registration Closed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "max-w-sm font-sans text-base leading-relaxed text-on-surface-variant",
							children: [
								"All ",
								MAX_REGISTRATIONS,
								" registration spots have been claimed. Thank you for your interest."
							]
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
							"data-tour": "payment",
							disabled: status === "loading",
							className: "mt-2 inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-sans text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60",
							children: status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Processing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "h-5 w-5" }), "Submit Registration"] })
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
var TOUR_STORAGE_KEY = "hasSeenWebsiteTour";
var steps = [
	{
		target: "register",
		title: "Register Now",
		description: "Start your registration here."
	},
	{
		target: "payment",
		title: "Payment",
		description: "Complete your registration securely through Razorpay."
	},
	{
		target: "status",
		title: "Registration Status",
		description: "Check your registration status and details here."
	},
	{
		target: "contact",
		title: "Contact Us",
		description: "Need help? Reach our team directly."
	}
];
function getTarget(target) {
	return document.querySelector(`[data-tour="${target}"]`);
}
function getTargetRect(element) {
	const rect = element.getBoundingClientRect();
	return {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height
	};
}
function WebsiteTour() {
	const [stepIndex, setStepIndex] = (0, import_react.useState)(null);
	const [targetRect, setTargetRect] = (0, import_react.useState)(null);
	const [tooltipStyle, setTooltipStyle] = (0, import_react.useState)({});
	const tooltipRef = (0, import_react.useRef)(null);
	const previousTargetRef = (0, import_react.useRef)(null);
	const previousTargetStylesRef = (0, import_react.useRef)({
		position: "",
		zIndex: "",
		scrollMarginTop: ""
	});
	const isActive = stepIndex !== null;
	const currentStep = stepIndex === null ? null : steps[stepIndex];
	const closeTour = () => {
		window.localStorage.setItem(TOUR_STORAGE_KEY, "true");
		setStepIndex(null);
	};
	(0, import_react.useEffect)(() => {
		try {
			if (window.localStorage.getItem(TOUR_STORAGE_KEY) !== "true") {
				const timer = window.setTimeout(() => setStepIndex(0), 350);
				return () => window.clearTimeout(timer);
			}
		} catch {
			const timer = window.setTimeout(() => setStepIndex(0), 350);
			return () => window.clearTimeout(timer);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") closeTour();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isActive]);
	(0, import_react.useEffect)(() => {
		if (!isActive || !currentStep) return;
		let retryCount = 0;
		let retryTimer;
		const updatePosition = () => {
			const target = getTarget(currentStep.target);
			if (!target) {
				if (retryCount < 10) {
					retryCount += 1;
					retryTimer = window.setTimeout(updatePosition, 100);
				}
				return;
			}
			if (previousTargetRef.current !== target) {
				if (previousTargetRef.current) {
					previousTargetRef.current.style.position = previousTargetStylesRef.current.position;
					previousTargetRef.current.style.zIndex = previousTargetStylesRef.current.zIndex;
					previousTargetRef.current.style.scrollMarginTop = previousTargetStylesRef.current.scrollMarginTop;
				}
				previousTargetStylesRef.current = {
					position: target.style.position,
					zIndex: target.style.zIndex,
					scrollMarginTop: target.style.scrollMarginTop
				};
				previousTargetRef.current = target;
				target.style.position = target.style.position || "relative";
				target.style.zIndex = "60";
				target.style.scrollMarginTop = "96px";
			}
			const rect = getTargetRect(target);
			setTargetRect(rect);
			target.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		};
		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);
		return () => {
			if (retryTimer) window.clearTimeout(retryTimer);
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [currentStep, isActive]);
	(0, import_react.useEffect)(() => {
		if (!isActive || !targetRect || !tooltipRef.current) return;
		const tooltip = tooltipRef.current.getBoundingClientRect();
		const gap = 16;
		const margin = 16;
		const belowTop = targetRect.top + targetRect.height + gap;
		const aboveTop = targetRect.top - tooltip.height - gap;
		const top = belowTop + tooltip.height <= window.innerHeight - margin ? belowTop : aboveTop >= margin ? aboveTop : Math.max(margin, window.innerHeight - tooltip.height - margin);
		const left = Math.min(Math.max(margin, targetRect.left + targetRect.width / 2 - tooltip.width / 2), window.innerWidth - tooltip.width - margin);
		setTooltipStyle({
			top,
			left
		});
	}, [targetRect, stepIndex]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (previousTargetRef.current) {
				previousTargetRef.current.style.position = previousTargetStylesRef.current.position;
				previousTargetRef.current.style.zIndex = previousTargetStylesRef.current.zIndex;
				previousTargetRef.current.style.scrollMarginTop = previousTargetStylesRef.current.scrollMarginTop;
			}
		};
	}, [isActive]);
	if (!isActive || !currentStep || !targetRect) return null;
	const goBack = () => setStepIndex((current) => current === null ? null : Math.max(0, current - 1));
	const goNext = () => {
		if (stepIndex === steps.length - 1) {
			closeTour();
			return;
		}
		setStepIndex((current) => current === null ? 0 : current + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40",
		"aria-label": "Website tour",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-foreground/60",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute rounded-lg ring-2 ring-white/90 transition-[top,left,width,height] duration-200 motion-reduce:transition-none",
				style: {
					top: targetRect.top - 8,
					left: targetRect.left - 8,
					width: targetRect.width + 16,
					height: targetRect.height + 16,
					boxShadow: "0 0 0 9999px rgb(0 0 0 / 0.58)"
				},
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: tooltipRef,
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "website-tour-title",
				className: "absolute w-[min(360px,calc(100vw-32px))] rounded-xl border border-border bg-card p-5 text-foreground shadow-2xl transition-[top,left] duration-200 motion-reduce:transition-none",
				style: tooltipStyle,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: closeTour,
						"aria-label": "Close website tour",
						className: "absolute right-3 top-3 rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pr-6 font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary",
						children: [
							stepIndex + 1,
							" of ",
							steps.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "website-tour-title",
						className: "mt-2 font-sans text-xl font-bold leading-tight",
						children: currentStep.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-sans text-sm leading-relaxed text-on-surface-variant",
						children: currentStep.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: closeTour,
							className: "rounded-md px-2 py-2 font-sans text-sm font-semibold text-on-surface-variant transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
							children: "Skip Tour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [stepIndex > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: goBack,
								className: "rounded-md border border-border px-3 py-2 font-sans text-sm font-bold text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: goNext,
								className: "rounded-md bg-primary px-4 py-2 font-sans text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
								children: stepIndex === steps.length - 1 ? "Finish" : "Next"
							})]
						})]
					})
				]
			})
		]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteTour, {})
		]
	});
}
//#endregion
export { Index as component };
