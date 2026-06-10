import React, { useState, useEffect } from "react";
import {
    ShieldCheck,
    Check,
    ArrowRight,
    Lock,
    Award,
    Dumbbell,
    FileBadge,
    BookOpen,
    MonitorSmartphone,
    Briefcase,
    Users,
    Network,
    UserCheck,
    Activity,
    Medal,
    HeartPulse,
    Laptop,
    Rocket,
    Building,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    MessageCircle,
    Mail,
    Phone,
    ArrowLeft,
    FileCheck,
} from "lucide-react";
import fgiitLogo from "./assets/fgiit_logo.png";
import heroImage from "./assets/hero.jpeg";
import toast, { Toaster } from "react-hot-toast";
import { publicAxiosInstance } from "./config/api";
import apiConfig from "./config/apiConfig";

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const carouselRef = React.useRef(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        b_name: "",
        b_mobile: "",
        b_whatsapp: "",
        b_email: "",
        b_city: "",
        b_mode: "Online Learning",
        b_date: "",
        b_time: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalSteps = 3;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (targetStep) => {
        // Validation
        if (targetStep > step) {
            if (
                step === 1 &&
                (!formData.b_name ||
                    !formData.b_mobile ||
                    !formData.b_email ||
                    !formData.b_city)
            ) {
                toast.error("Please fill in all details.");
                return;
            }
            if (step === 3 && !formData.b_date) {
                toast.error("Please select a date.");
                return;
            }
        }
        setStep(targetStep);

        // Scroll to form header gently
        const header = document.getElementById("formHeader");
        if (header) {
            header.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };

    const submitFinal = () => {
        if (!formData.b_date) {
            toast.error("Please select a date.");
            return;
        }

        const options = {
            key: apiConfig.RAZORPAY_MERCHANT_ID, // RAZORPAY_FGIIT_KEY
            amount: 2700, // ₹27
            currency: "INR",
            name: "FGIIT",
            description: "Demo Class Booking",
            image: fgiitLogo,
            handler: async function (response) {
                try {
                    const loadingToast = toast.loading("Confirming booking...");
                    const res = await publicAxiosInstance.post(
                        "/guest-payment/book-fgiit-demo",
                        {
                            payment_id: response.razorpay_payment_id,
                            b_source: window.location.href,
                            ...formData,
                        },
                    );
                    toast.dismiss(loadingToast);
                    if (res.data) {
                        setIsModalOpen(true);
                    }
                } catch (error) {
                    toast.dismiss();
                    toast.error(
                        "Booking failed or verification error. Please contact support.",
                    );
                    console.error(error);
                }
            },
            prefill: {
                name: formData.b_name,
                email: formData.b_email,
                contact: formData.b_mobile,
            },
            theme: {
                color: "#cbe465",
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
            toast.error("Payment failed. Please try again.");
        });
        rzp.open();
    };

    const closeSuccess = () => {
        setIsModalOpen(false);
        setStep(1);
        setFormData({
            b_name: "",
            b_mobile: "",
            b_whatsapp: "",
            b_email: "",
            b_city: "",
            b_mode: "Online Learning",
            b_date: "",
            b_time: "",
        });
    };

    const getStepStatus = () => {
        const statuses = [
            "",
            "Getting Started",
            "Learning Preference",
            "Scheduling Date",
        ];
        if (step <= 3) return statuses[step];
        return "";
    };

    const getIndicator = () => {
        if (step <= 3) return `STEP ${step} OF 3`;
        return "";
    };

    const getProgress = () => {
        if (step <= 3) return (step / 3) * 100;
        return 100;
    };

    const renderDate = () => {
        if (!formData.b_date) return "-";
        const d = new Date(formData.b_date);
        return d.toLocaleDateString("en-IN", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="min-h-screen">
            <Toaster position="top-center" />
            <nav
                id="navbar"
                className={`fixed w-full z-50 glass-nav border-b border-brand-border transition-all duration-300 ${scrolled ? "shadow-sm" : "py-1"}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div
                            className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <img
                                src={fgiitLogo}
                                alt="FGIIT Logo"
                                className="h-10 w-auto"
                            />
                            <span className="font-bold text-xl tracking-tight text-brand-text">
                                FGIIT
                            </span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a
                                href="#why-us"
                                className="text-gray-600 hover:text-brand-primary font-medium text-sm transition-colors"
                            >
                                Why FGIIT
                            </a>
                            <a
                                href="#careers"
                                className="text-gray-600 hover:text-brand-primary font-medium text-sm transition-colors"
                            >
                                Career Opportunities
                            </a>
                            <a
                                href="#success"
                                className="text-gray-600 hover:text-brand-primary font-medium text-sm transition-colors"
                            >
                                Success Stories
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-600 hover:text-brand-primary font-medium text-sm transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                        <div className="flex items-center">
                            <a
                                href="#booking"
                                className="bg-brand-cta hover:bg-brand-ctahover text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm transform hover:-translate-y-0.5"
                            >
                                Book Demo Class
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-brand-bg relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="max-w-2xl animate-slide-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-alternate text-brand-primary text-sm font-semibold mb-6 border border-brand-primary/10">
                                <ShieldCheck className="w-4 h-4" />
                                <span>
                                    India's Trusted Fitness Education Institute
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-text mb-6 leading-[1.1]">
                                LOVE FITNESS?
                                <br />
                                <span className="text-brand-primary">
                                    TURN IT INTO A SUCCESSFUL CAREER.
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                                Learn from industry experts, gain practical
                                skills, earn recognised certification, and build
                                a rewarding career in the fitness industry.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10 text-gray-700 font-medium text-sm">
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-brand-cta" />{" "}
                                    Industry Expert Faculty
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-brand-cta" />{" "}
                                    Practical Training
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-brand-cta" />{" "}
                                    Online & Offline Learning
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-brand-cta" />{" "}
                                    Career Guidance
                                </div>
                                <div className="flex items-center gap-2 sm:col-span-2">
                                    <Check className="w-5 h-5 text-brand-cta" />{" "}
                                    Placement Support
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#booking"
                                    className="bg-brand-cta hover:bg-brand-ctahover text-white px-8 py-4 rounded-xl font-bold text-base lg:text-lg transition-all shadow-md hover:shadow-brand-cta/30 hover:shadow-lg text-center flex items-center justify-center gap-2 transform hover:-translate-y-1"
                                >
                                    BOOK MY DEMO CLASS
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://fggroup.in/fgiit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white hover:bg-brand-secondary text-brand-text border-2 border-brand-border hover:border-brand-primary/20 px-8 py-4 rounded-xl font-bold text-base lg:text-lg transition-all text-center flex items-center justify-center transform hover:-translate-y-1"
                                >
                                    EXPLORE FGIIT ACADEMY
                                </a>
                            </div>
                        </div>

                        <div
                            className="relative w-full aspect-[4/3] lg:aspect-square flex items-center justify-center animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-brand-border/50">
                                <img
                                    src={heroImage}
                                    alt="Fitness instructor demonstrating exercise"
                                    className="object-cover w-full h-full"
                                    onError={(e) =>
                                        (e.target.src =
                                            "https://placehold.co/1200x1200/F8FCF9/1C1C1C?text=Professional+Learning+Environment")
                                    }
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="booking"
                className="py-20 bg-brand-secondary border-y border-brand-border relative"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-4">
                            Book Your Career Discovery Session
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Take the first step towards your professional
                            fitness career. Complete this short form to schedule
                            your session.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-brand-border p-6 md:p-10 relative overflow-hidden">
                        <div className="mb-8" id="formHeader">
                            <div className="flex justify-between items-end mb-3">
                                <div
                                    className="text-sm font-bold tracking-widest text-brand-lightgreen uppercase"
                                    id="stepIndicator"
                                >
                                    {getIndicator()}
                                </div>
                                <div
                                    className="text-xs font-semibold text-gray-400"
                                    id="stepStatus"
                                >
                                    {getStepStatus()}
                                </div>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-cta transition-all duration-500 ease-out"
                                    style={{ width: `${getProgress()}%` }}
                                ></div>
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="min-h-[350px]"
                        >
                            {/* Step 1 */}
                            {step === 1 && (
                                <div className="step-container animate-fade-in">
                                    <h3 className="text-2xl font-bold text-brand-text mb-6">
                                        Let's Get To Know You
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="b_name"
                                                value={formData.b_name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-cta focus:border-brand-cta transition-all outline-none bg-gray-50 focus:bg-white"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    Mobile Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="b_mobile"
                                                    value={formData.b_mobile}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-cta focus:border-brand-cta transition-all outline-none bg-gray-50 focus:bg-white"
                                                    placeholder="10-digit mobile number"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="b_email"
                                                    value={formData.b_email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-cta focus:border-brand-cta transition-all outline-none bg-gray-50 focus:bg-white"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="b_city"
                                                value={formData.b_city}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-brand-border focus:ring-2 focus:ring-brand-cta focus:border-brand-cta transition-all outline-none bg-gray-50 focus:bg-white"
                                                placeholder="Enter your city"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            type="button"
                                            onClick={() => handleNextStep(2)}
                                            className="w-full bg-brand-text hover:bg-black text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
                                        >
                                            CONTINUE{" "}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <div className="step-container animate-fade-in">
                                    <h3 className="text-2xl font-bold text-brand-text mb-6">
                                        Choose Your Learning Preference
                                    </h3>
                                    <div className="mb-6 p-4 bg-brand-alternate/50 rounded-xl border border-brand-cta/20 text-brand-text font-medium text-sm flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-cta flex-shrink-0 mt-0.5" />
                                        <p>
                                            Demo classes are held between{" "}
                                            <span className="font-bold">
                                                3:00 PM to 3:30 PM every day
                                            </span>
                                            . Please select your preferred
                                            learning mode below.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            "Online Learning",
                                            "Offline Learning",
                                        ].map((mode) => (
                                            <label
                                                key={mode}
                                                className="block cursor-pointer relative"
                                            >
                                                <input
                                                    type="radio"
                                                    name="b_mode"
                                                    value={mode}
                                                    checked={
                                                        formData.b_mode === mode
                                                    }
                                                    onChange={handleChange}
                                                    className="radio-card sr-only"
                                                    required
                                                />
                                                <div className="p-5 border-2 border-brand-border rounded-xl transition-all flex items-center gap-4 hover:border-gray-300">
                                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                                                        <div className="radio-dot w-3 h-3 rounded-full bg-brand-cta opacity-0 transition-opacity"></div>
                                                    </div>
                                                    <div className="font-bold text-brand-text">
                                                        {mode}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => handleNextStep(1)}
                                            className="w-1/4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleNextStep(3)}
                                            className="w-3/4 bg-brand-text hover:bg-black text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
                                        >
                                            CONTINUE{" "}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 */}
                            {step === 3 && (
                                <div className="step-container animate-fade-in">
                                    <h3 className="text-2xl font-bold text-brand-text mb-6">
                                        Choose Your Preferred Date
                                    </h3>
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Interactive Calendar
                                        </label>
                                        <input
                                            type="date"
                                            name="b_date"
                                            value={formData.b_date}
                                            onChange={handleChange}
                                            min={today}
                                            required
                                            className="w-full p-4 rounded-xl border-2 border-brand-border focus:ring-2 focus:ring-brand-cta focus:border-brand-cta transition-all outline-none text-brand-text font-bold bg-white text-lg"
                                        />
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => handleNextStep(2)}
                                            className="w-1/4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={submitFinal}
                                            className="w-3/4 bg-brand-text hover:bg-black text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
                                        >
                                            CONFIRM BOOKING{" "}
                                            <Check className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            <section id="why-us" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text">
                            Why Students Choose FGIIT
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Industry Expert Faculty
                            </h3>
                            <p className="text-sm text-gray-600">
                                Learn directly from seasoned professionals
                                currently succeeding in the fitness industry.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <Dumbbell className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Practical Learning
                            </h3>
                            <p className="text-sm text-gray-600">
                                Move beyond textbooks with hands-on application
                                and real-world scenarios.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <FileBadge className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Professional Certification
                            </h3>
                            <p className="text-sm text-gray-600">
                                Earn credentials that are recognized and
                                respected by employers nationwide.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Career-Oriented Curriculum
                            </h3>
                            <p className="text-sm text-gray-600">
                                Syllabus designed specifically to meet current
                                market demands and job requirements.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <MonitorSmartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Online & Offline Learning
                            </h3>
                            <p className="text-sm text-gray-600">
                                Flexible learning modes to suit your schedule
                                and geographical location.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Placement Support
                            </h3>
                            <p className="text-sm text-gray-600">
                                Dedicated assistance to help you secure
                                interviews and land your dream job.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Mentorship
                            </h3>
                            <p className="text-sm text-gray-600">
                                Ongoing guidance to navigate your career path
                                even after course completion.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300 bg-brand-bg group">
                            <div className="w-12 h-12 bg-brand-alternate text-brand-primary rounded-xl flex items-center justify-center mb-4">
                                <Network className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-brand-text mb-2">
                                Student Community
                            </h3>
                            <p className="text-sm text-gray-600">
                                Join a growing network of alumni and fellow
                                aspiring fitness professionals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="careers" className="py-20 bg-brand-alternate">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text">
                            Build A Career In The Growing Fitness Industry
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { icon: UserCheck, title: "Personal Trainer" },
                            { icon: Users, title: "Fitness Coach" },
                            { icon: Activity, title: "Strength Coach" },
                            { icon: Medal, title: "Sports Performance Coach" },
                            { icon: HeartPulse, title: "Wellness Consultant" },
                            { icon: Laptop, title: "Online Coach" },
                            { icon: Rocket, title: "Fitness Entrepreneur" },
                            { icon: Building, title: "Gym Owner" },
                        ].map((career, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl text-center border border-brand-border/50 shadow-sm hover:shadow-md hover:-translate-y-2 hover:border-brand-primary/30 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 mx-auto bg-brand-secondary group-hover:bg-brand-alternate rounded-full flex items-center justify-center mb-4 transition-colors">
                                    <career.icon className="w-8 h-8 text-brand-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <h4 className="font-bold text-brand-text text-sm md:text-base">
                                    {career.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="success" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text">
                            Real Students. Real Success Stories.
                        </h2>
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() =>
                                    carouselRef.current.scrollBy({
                                        left: -400,
                                        behavior: "smooth",
                                    })
                                }
                                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-gray-50"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() =>
                                    carouselRef.current.scrollBy({
                                        left: 400,
                                        behavior: "smooth",
                                    })
                                }
                                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-gray-50"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar px-2 sm:px-4"
                    >
                        <div className="w-[85vw] sm:w-[350px] md:w-[400px] bg-brand-secondary rounded-2xl p-8 snap-center sm:snap-start border border-brand-border flex-shrink-0 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                                    alt="Student"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                    <h4 className="font-bold text-brand-text">
                                        Priya Sharma
                                    </h4>
                                    <p className="text-sm text-brand-primary font-medium">
                                        Certified Personal Trainer
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                "FGIIT completely changed my career trajectory.
                                The practical hands-on sessions gave me the
                                confidence to train clients professionally right
                                after graduation."
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                                <Award className="w-4 h-4 text-brand-cta" />{" "}
                                Placed at Gold's Gym
                            </div>
                        </div>

                        <div className="w-[85vw] sm:w-[350px] md:w-[400px] bg-brand-secondary rounded-2xl p-8 snap-center sm:snap-start border border-brand-border flex-shrink-0 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                                    alt="Student"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                    <h4 className="font-bold text-brand-text">
                                        Rahul Desai
                                    </h4>
                                    <p className="text-sm text-brand-primary font-medium">
                                        Fitness Entrepreneur
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                "The mentorship I received went beyond just
                                fitness knowledge. They taught me the business
                                aspect, which helped me launch my own successful
                                online coaching platform."
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                                <Award className="w-4 h-4 text-brand-cta" /> 50+
                                Active Online Clients
                            </div>
                        </div>

                        <div className="w-[85vw] sm:w-[350px] md:w-[400px] bg-brand-secondary rounded-2xl p-8 snap-center sm:snap-start border border-brand-border flex-shrink-0 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80"
                                    alt="Student"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                    <h4 className="font-bold text-brand-text">
                                        Anjali Menon
                                    </h4>
                                    <p className="text-sm text-brand-primary font-medium">
                                        Strength & Conditioning Coach
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                "Transitioning from a corporate job to fitness
                                seemed scary, but the structured curriculum and
                                expert faculty at FGIIT made the process
                                seamless and educational."
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                                <Award className="w-4 h-4 text-brand-cta" />{" "}
                                Training State-Level Athletes
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-brand-secondary border-t border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text">
                            Your Journey With FGIIT
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[27px] md:left-0 md:top-6 bottom-0 md:bottom-auto w-0.5 md:w-full h-full md:h-0.5 bg-brand-border"></div>
                        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
                            {[
                                {
                                    step: "1",
                                    title: "Book Demo Class",
                                    desc: "Reserve your discovery session.",
                                },
                                {
                                    step: "2",
                                    title: "Meet Expert Mentor",
                                    desc: "Get personalised career guidance.",
                                },
                                {
                                    step: "3",
                                    title: "Choose Programme",
                                    desc: "Select the right educational path.",
                                },
                                {
                                    step: "4",
                                    title: "Start Learning",
                                    desc: "Gain practical & theoretical skills.",
                                },
                                {
                                    step: "5",
                                    title: "Get Certified",
                                    desc: "Earn industry recognition.",
                                },
                                {
                                    step: "6",
                                    title: "Build Your Career",
                                    desc: "Launch as a professional.",
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex md:flex-col items-start md:items-center gap-4 text-left md:text-center group"
                                >
                                    <div
                                        className={`w-14 h-14 rounded-full ${item.active ? "bg-brand-primary border-brand-primary text-white" : "bg-white border-brand-border text-gray-400 group-hover:border-brand-cta group-hover:text-brand-cta"} border-2 flex items-center justify-center font-bold text-xl flex-shrink-0 z-10 shadow-sm transition-colors`}
                                    >
                                        {item.step}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-text mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 hidden md:block">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-brand-primary text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Your Fitness Career Starts With One Decision.
                    </h2>
                    <p className="text-xl text-brand-alternate/80 mb-10 max-w-2xl mx-auto">
                        Take the first step towards a rewarding future in the
                        fitness industry. Let our experts guide you to the right
                        path.
                    </p>
                    <a
                        href="#booking"
                        className="inline-block bg-white hover:bg-gray-100 text-brand-text px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
                    >
                        BOOK MY DEMO CLASS
                    </a>
                </div>
            </section>

            <footer
                id="contact"
                className="bg-[#1C1C1C] py-16 text-center md:text-left"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-12 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <img
                                    src={fgiitLogo}
                                    alt="FGIIT Logo"
                                    className="h-10 w-auto"
                                />
                                <span className="font-bold text-xl text-white">
                                    FGIIT
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm max-w-sm mx-auto md:mx-0">
                                Fitness With Gomzi International Institute of
                                Teaching. Building the next generation of
                                professional fitness experts in India.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <a
                                        href="#why-us"
                                        className="hover:text-white transition-colors"
                                    >
                                        Why FGIIT
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#careers"
                                        className="hover:text-white transition-colors"
                                    >
                                        Career Opportunities
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#success"
                                        className="hover:text-white transition-colors"
                                    >
                                        Success Stories
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#booking"
                                        className="hover:text-white transition-colors"
                                    >
                                        Book Demo
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">
                                Contact Information
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start justify-center md:justify-start gap-2">
                                    <Mail className="w-4 h-4 mt-0.5" />{" "}
                                    fgiitsurat@gmail.com
                                </li>
                                <li className="flex items-start justify-center md:justify-start gap-2">
                                    <Phone className="w-4 h-4 mt-0.5" /> +91
                                    7874601000
                                </li>
                                <li className="flex items-start justify-center md:justify-start gap-2">
                                    <svg
                                        className="w-4 h-4 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12.031 0C5.395 0 0 5.394 0 12.032c0 2.127.553 4.2 1.602 6.03L.055 24l6.103-1.602c1.782 1.01 3.8 1.543 5.873 1.543 6.636 0 12.031-5.394 12.031-12.031C24 5.394 18.667 0 12.031 0zm3.844 17.202c-.172.484-.985.938-1.454.985-.438.046-1.016.14-3.235-.78-2.656-1.11-4.343-3.829-4.468-3.985-.125-.172-1.063-1.422-1.063-2.704 0-1.282.656-1.922.89-2.188.235-.265.516-.328.688-.328.172 0 .344 0 .484.016.156.015.36-.063.563.421.218.516.734 1.797.8 1.938.062.14.109.312.015.5-.094.187-.14.312-.281.484-.141.172-.297.36-.422.485-.14.14-.297.297-.125.593.172.313.766 1.282 1.64 2.063.953.859 1.906 1.156 2.22 1.296.312.141.484.125.671-.093.188-.219.813-.938 1.032-1.266.218-.328.437-.281.718-.172.281.11 1.781.844 2.094 1.015.312.172.516.25.594.391.078.14.078.828-.094 1.312z" />
                                    </svg>
                                    +91 7874601000
                                </li>
                                <li className="flex items-start justify-center md:justify-start gap-2 text-left mt-2 border-t border-gray-800 pt-3">
                                    <FileBadge className="w-4 h-4 mt-0.5 flex-shrink-0" />{" "}
                                    FGIIT, Surat, Gujarat, India
                                </li>
                            </ul>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                                <a
                                    href="https://instagram.com/fgiit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-brand-cta transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://facebook.com/fgiit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-brand-cta transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://youtube.com/fgiit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-brand-cta transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                        <div>&copy; 2026 FGIIT. All Rights Reserved.</div>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Terms & Conditions
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Success Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg p-4 transition-opacity duration-300 animate-fade-in">
                    <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl border border-brand-border transform scale-100 transition-transform duration-300">
                        <div className="w-24 h-24 bg-brand-alternate rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <CheckCircle2 className="w-12 h-12 text-brand-primary" />
                        </div>

                        <h3 className="text-4xl font-extrabold text-brand-text mb-4">
                            Thank You!
                        </h3>
                        <p className="text-lg font-bold text-gray-700 mb-8">
                            Please check your email to confirm your slot.
                        </p>

                        <p className="text-sm font-medium text-gray-500 mb-8">
                            We look forward to helping you start your fitness
                            career journey with FGIIT.
                        </p>

                        <button
                            onClick={closeSuccess}
                            className="w-full bg-brand-cta hover:bg-brand-ctahover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:-translate-y-1"
                        >
                            Return to Homepage
                        </button>
                    </div>
                </div>
            )}
            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/917874601000"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 group"
            >
                <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12.031 0C5.395 0 0 5.394 0 12.032c0 2.127.553 4.2 1.602 6.03L.055 24l6.103-1.602c1.782 1.01 3.8 1.543 5.873 1.543 6.636 0 12.031-5.394 12.031-12.031C24 5.394 18.667 0 12.031 0zm3.844 17.202c-.172.484-.985.938-1.454.985-.438.046-1.016.14-3.235-.78-2.656-1.11-4.343-3.829-4.468-3.985-.125-.172-1.063-1.422-1.063-2.704 0-1.282.656-1.922.89-2.188.235-.265.516-.328.688-.328.172 0 .344 0 .484.016.156.015.36-.063.563.421.218.516.734 1.797.8 1.938.062.14.109.312.015.5-.094.187-.14.312-.281.484-.141.172-.297.36-.422.485-.14.14-.297.297-.125.593.172.313.766 1.282 1.64 2.063.953.859 1.906 1.156 2.22 1.296.312.141.484.125.671-.093.188-.219.813-.938 1.032-1.266.218-.328.437-.281.718-.172.281.11 1.781.844 2.094 1.015.312.172.516.25.594.391.078.14.078.828-.094 1.312z" />
                </svg>
            </a>
        </div>
    );
}
