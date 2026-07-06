"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, memo, useState } from "react";
import Galaxy from "./galaxy";
import styles from "./briefing-page.module.css";

const industries = [
  "Fuels & Lubricants",
  "Cement",
  "Steel",
  "Chemicals",
  "Industrial Gas",
  "Other",
];

const teamSizes = ["1–10", "11–50", "51–200", "200+"];
const steps = ["Market", "Operation", "Contact"];

const GalaxyField = memo(function GalaxyField({ reduced }: { reduced: boolean }) {
  return (
    <Galaxy
      density={1.25}
      starSpeed={0.28}
      speed={0.45}
      hueShift={24}
      saturation={0.68}
      glowIntensity={0.23}
      twinkleIntensity={0.16}
      rotationSpeed={0.015}
      repulsionStrength={0.7}
      mouseRepulsion
      mouseInteraction={!reduced}
      disableAnimation={reduced}
      transparent
    />
  );
});

function RadarMark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <span />
      <span />
      <i />
    </span>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg className={back ? styles.arrowBack : styles.arrow} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

type FormState = {
  industries: string[];
  geography: string;
  company: string;
  teamSize: string;
  objective: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  timeline: string;
  consent: boolean;
};

const initialForm: FormState = {
  industries: [],
  geography: "",
  company: "",
  teamSize: "",
  objective: "",
  name: "",
  email: "",
  role: "",
  phone: "",
  timeline: "",
  consent: false,
};

export function BriefingPage() {
  const reducedMotion = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  const setValue = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleIndustry = (industry: string) => {
    setValue(
      "industries",
      form.industries.includes(industry)
        ? form.industries.filter((item) => item !== industry)
        : [...form.industries, industry],
    );
  };

  const canContinue =
    step === 0
      ? form.industries.length > 0 && form.geography.trim().length > 1
      : step === 1
        ? form.company.trim().length > 1 && form.teamSize !== "" && form.objective.trim().length > 5
        : form.name.trim().length > 1 &&
          /\S+@\S+\.\S+/.test(form.email) &&
          form.role.trim().length > 1 &&
          form.timeline !== "" &&
          form.consent;

  const move = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    setSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <div className={styles.galaxy} aria-hidden="true">
        <GalaxyField reduced={reducedMotion} />
      </div>
      <div className={styles.atmosphere} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Udyog Radar home">
          <RadarMark />
          <span>UDYOG RADAR</span>
        </Link>
        <Link href="/" className={styles.returnLink}>
          Return to intelligence <Arrow back />
        </Link>
      </header>

      <div className={styles.layout}>
        <motion.aside
          className={styles.context}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.kicker}>Private market briefing</p>
          <h1>
            Let&apos;s map the signals
            <span>your market is leaving behind.</span>
          </h1>
          <p className={styles.intro}>
            This is not a generic product demo. We&apos;ll arrive with a focused
            view of your sectors, catalogue and sales territory.
          </p>

          <div className={styles.briefingReadout}>
            <div>
              <span>FORMAT</span>
              <strong>30 min · private</strong>
            </div>
            <div>
              <span>OUTPUT</span>
              <strong>Opportunity map</strong>
            </div>
            <div>
              <span>PREPARATION</span>
              <strong>Done by our team</strong>
            </div>
          </div>

          <div className={styles.signalNote}>
            <i />
            <p>
              Your information is used only to prepare and coordinate this
              briefing. No mailing lists. No noise.
            </p>
          </div>
        </motion.aside>

        <motion.section
          className={styles.formPlane}
          initial={reducedMotion ? false : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Request a briefing"
        >
          {!submitted ? (
            <>
              <div className={styles.formHeader}>
                <div>
                  <span>BRIEFING DOSSIER</span>
                  <strong>UR / {String(step + 1).padStart(2, "0")}</strong>
                </div>
                <div className={styles.progress} aria-label={`Step ${step + 1} of 3`}>
                  {steps.map((label, index) => (
                    <button
                      type="button"
                      key={label}
                      className={index === step ? styles.activeStep : index < step ? styles.pastStep : ""}
                      onClick={() => index < step && move(index)}
                      disabled={index > step}
                    >
                      <i>{index < step ? "✓" : `0${index + 1}`}</i>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={submit} className={styles.form}>
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={{
                      enter: (value: number) => ({ opacity: 0, x: value * 28, filter: "blur(5px)" }),
                      center: { opacity: 1, x: 0, filter: "blur(0px)" },
                      exit: (value: number) => ({ opacity: 0, x: value * -20, filter: "blur(4px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.stepContent}
                  >
                    {step === 0 && (
                      <>
                        <div className={styles.stepIntro}>
                          <span>01 / MARKET</span>
                          <h2>Where should the radar look?</h2>
                          <p>Select every sector that matters to your commercial team.</p>
                        </div>
                        <fieldset className={styles.fieldset}>
                          <legend>Priority sectors</legend>
                          <div className={styles.choiceGrid}>
                            {industries.map((industry, index) => (
                              <button
                                type="button"
                                key={industry}
                                aria-pressed={form.industries.includes(industry)}
                                onClick={() => toggleIndustry(industry)}
                              >
                                <span>0{index + 1}</span>
                                {industry}
                                <i>{form.industries.includes(industry) ? "×" : "+"}</i>
                              </button>
                            ))}
                          </div>
                        </fieldset>
                        <label className={styles.field}>
                          <span>Sales geography</span>
                          <input
                            value={form.geography}
                            onChange={(event) => setValue("geography", event.target.value)}
                            placeholder="e.g. West India, pan-India, Maharashtra"
                            autoComplete="off"
                          />
                        </label>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div className={styles.stepIntro}>
                          <span>02 / OPERATION</span>
                          <h2>Give us the operating context.</h2>
                          <p>Enough detail to make the conversation specific from minute one.</p>
                        </div>
                        <div className={styles.twoColumns}>
                          <label className={styles.field}>
                            <span>Company</span>
                            <input
                              value={form.company}
                              onChange={(event) => setValue("company", event.target.value)}
                              placeholder="Company name"
                              autoComplete="organization"
                            />
                          </label>
                          <fieldset className={styles.fieldset}>
                            <legend>Field sales team</legend>
                            <div className={styles.sizeChoices}>
                              {teamSizes.map((size) => (
                                <button
                                  type="button"
                                  key={size}
                                  aria-pressed={form.teamSize === size}
                                  onClick={() => setValue("teamSize", size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                        <label className={`${styles.field} ${styles.textareaField}`}>
                          <span>What should better intelligence change?</span>
                          <textarea
                            value={form.objective}
                            onChange={(event) => setValue("objective", event.target.value)}
                            placeholder="Tell us where your team currently loses time or arrives late..."
                            rows={4}
                          />
                          <small>{form.objective.length} / 500</small>
                        </label>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className={styles.stepIntro}>
                          <span>03 / CONTACT</span>
                          <h2>Who should be in the room?</h2>
                          <p>We&apos;ll use these details to coordinate the right briefing team.</p>
                        </div>
                        <div className={styles.contactGrid}>
                          <label className={styles.field}>
                            <span>Your name</span>
                            <input value={form.name} onChange={(e) => setValue("name", e.target.value)} autoComplete="name" />
                          </label>
                          <label className={styles.field}>
                            <span>Work email</span>
                            <input type="email" value={form.email} onChange={(e) => setValue("email", e.target.value)} autoComplete="email" />
                          </label>
                          <label className={styles.field}>
                            <span>Role</span>
                            <input value={form.role} onChange={(e) => setValue("role", e.target.value)} autoComplete="organization-title" />
                          </label>
                          <label className={styles.field}>
                            <span>Phone <i>optional</i></span>
                            <input type="tel" value={form.phone} onChange={(e) => setValue("phone", e.target.value)} autoComplete="tel" />
                          </label>
                        </div>
                        <fieldset className={styles.fieldset}>
                          <legend>Preferred timeline</legend>
                          <div className={styles.timelineChoices}>
                            {["This week", "Next 2 weeks", "This month"].map((item) => (
                              <button
                                type="button"
                                key={item}
                                aria-pressed={form.timeline === item}
                                onClick={() => setValue("timeline", item)}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                        <label className={styles.consent}>
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(event) => setValue("consent", event.target.checked)}
                          />
                          <i />
                          <span>I agree to be contacted about this private briefing.</span>
                        </label>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className={styles.formActions}>
                  <button type="button" className={styles.backButton} onClick={() => move(step - 1)} disabled={step === 0}>
                    <Arrow back /> Back
                  </button>
                  {step < 2 ? (
                    <button type="button" className={styles.nextButton} disabled={!canContinue} onClick={() => move(step + 1)}>
                      Continue <Arrow />
                    </button>
                  ) : (
                    <button type="submit" className={styles.nextButton} disabled={!canContinue}>
                      Request briefing <Arrow />
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <motion.div
              className={styles.success}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.successRadar}>
                <span />
                <span />
                <i>✓</i>
              </div>
              <p>REQUEST LOGGED · UR/BRIEF</p>
              <h2>Your market briefing is now on our radar.</h2>
              <span>
                We&apos;ll review your context and reach out at <strong>{form.email}</strong> to coordinate the session.
              </span>
              <Link href="/">Return to Udyog Radar <Arrow /></Link>
            </motion.div>
          )}
        </motion.section>
      </div>

      <footer className={styles.footer}>
        <span>Industrial intelligence · India</span>
        <span>Encrypted in transit</span>
        <Link href="mailto:hello@udyogradar.com">hello@udyogradar.com</Link>
      </footer>
    </main>
  );
}
