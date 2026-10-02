'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Award,
  ArrowRight,
  Check,
  Download,
  LoaderCircle,
  LockKeyhole,
} from 'lucide-react';
import jsPDF from 'jspdf';

type Form = {
  name: string;
  email: string;
  organization: string;
  phone: string;
};

const TOTAL_QUESTIONS = 30;
const PASSING_SCORE = 21;

export default function Certificate() {
  const router = useRouter();

  const [score, setScore] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);

  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    organization: '',
    phone: '',
  });

  const [paying, setPaying] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [certificateId, setCertificateId] = useState<string>('');

  useEffect(() => {
    const storedScore = Number(
      sessionStorage.getItem('ai_exam_score') || '0'
    );

    setScore(storedScore);
    setReady(true);
  }, []);

  const passed = score >= PASSING_SCORE;

  const change = (key: keyof Form, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const safeName = form.name.trim() || 'Your Name';

  const generateCertificateId = (): string => {
    const random = Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase();

    return `VAI-${random}`;
  };

  const makePdf = (id: string): void => {
    const addWatermark = (doc: jsPDF) => {
      const watermark = process.env.NEXT_PUBLIC_SITE_URL || "VEYORA AI";

      doc.setTextColor(225, 228, 238);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);

      const marks = [
        [55, 55], [150, 55], [245, 55],
        [100, 105], [195, 105],
        [55, 155], [150, 155], [245, 155],
      ];

      marks.forEach(([x, y]) => {
        doc.text(watermark, x, y, {
          angle: 35,
          align: "center",
        });
      });
    };

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    addWatermark(doc);

    const W = 297;
    const H = 210;
    const CENTER = W / 2;

    /*
     * ---------------------------------------------------------
     * COLORS
     * ---------------------------------------------------------
     */

    const navy = [15, 23, 42];
    const dark = [30, 41, 59];
    const violet = [109, 93, 252];
    const violetDark = [79, 70, 229];
    const cyan = [6, 182, 212];
    const gold = [234, 179, 8];
    const white = [255, 255, 255];
    const background = [248, 250, 255];
    const muted = [100, 116, 139];
    const border = [203, 213, 225];
    const green = [5, 150, 105];

    const issueDate = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
      .format(new Date())
      .toUpperCase();

    const cleanName = safeName.trim() || 'Your Name';

    /*
     * ---------------------------------------------------------
     * BACKGROUND
     * ---------------------------------------------------------
     */

    doc.setFillColor(
      background[0],
      background[1],
      background[2]
    );

    doc.rect(0, 0, W, H, 'F');

    /*
     * Top header
     */

    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(0, 0, W, 27, 'F');

    doc.setFillColor(violet[0], violet[1], violet[2]);
    doc.rect(0, 27, W, 2, 'F');

    doc.setFillColor(cyan[0], cyan[1], cyan[2]);
    doc.rect(0, 29, W, 1, 'F');

    /*
     * Bottom footer
     */

    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(0, H - 13, W, 13, 'F');

    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.rect(0, H - 13, W, 2, 'F');

    /*
     * ---------------------------------------------------------
     * DECORATIVE CIRCLES
     * ---------------------------------------------------------
     */

    doc.setFillColor(237, 233, 254);
    doc.circle(25, 48, 25, 'F');

    doc.setFillColor(224, 242, 254);
    doc.circle(W - 24, H - 42, 27, 'F');

    doc.setFillColor(245, 243, 255);
    doc.circle(W - 42, 48, 16, 'F');

    /*
     * ---------------------------------------------------------
     * OUTER BORDER
     * ---------------------------------------------------------
     */

    doc.setDrawColor(
      violet[0],
      violet[1],
      violet[2]
    );

    doc.setLineWidth(1.3);

    doc.roundedRect(
      9,
      9,
      W - 18,
      H - 18,
      4,
      4,
      'S'
    );

    doc.setDrawColor(
      cyan[0],
      cyan[1],
      cyan[2]
    );

    doc.setLineWidth(0.35);

    doc.roundedRect(
      14,
      14,
      W - 28,
      H - 28,
      3,
      3,
      'S'
    );

    /*
     * Gold corner accents
     */

    doc.setDrawColor(
      gold[0],
      gold[1],
      gold[2]
    );

    doc.setLineWidth(0.7);

    doc.line(19, 22, 38, 22);
    doc.line(19, 22, 19, 34);

    doc.line(W - 19, 22, W - 38, 22);
    doc.line(W - 19, 22, W - 19, 34);

    doc.line(19, H - 22, 38, H - 22);
    doc.line(19, H - 22, 19, H - 34);

    doc.line(W - 19, H - 22, W - 38, H - 22);
    doc.line(W - 19, H - 22, W - 19, H - 34);

    /*
     * ---------------------------------------------------------
     * BRAND
     * ---------------------------------------------------------
     */

    doc.setTextColor(
      white[0],
      white[1],
      white[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);

    doc.text(
      'VEYORA AI',
      20,
      11
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);

    doc.setTextColor(203, 213, 225);

    doc.text(
      'AI SKILLS ASSESSMENT PLATFORM',
      20,
      17
    );

    /*
     * Digital certificate badge
     */

    doc.setFillColor(
      violet[0],
      violet[1],
      violet[2]
    );

    doc.roundedRect(
      W - 64,
      7,
      44,
      12,
      3,
      3,
      'F'
    );

    doc.setTextColor(
      white[0],
      white[1],
      white[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);

    doc.text(
      'DIGITAL CERTIFICATE',
      W - 42,
      14.5,
      {
        align: 'center',
      }
    );

    /*
     * ---------------------------------------------------------
     * CERTIFICATE LABEL
     * ---------------------------------------------------------
     */

    doc.setFillColor(238, 242, 255);

    doc.roundedRect(
      CENTER - 39,
      37,
      78,
      10,
      5,
      5,
      'F'
    );

    doc.setTextColor(
      violetDark[0],
      violetDark[1],
      violetDark[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);

    doc.text(
      'CERTIFICATE OF ACHIEVEMENT',
      CENTER,
      43.5,
      {
        align: 'center',
      }
    );

    /*
     * ---------------------------------------------------------
     * MAIN TITLE
     * ---------------------------------------------------------
     */

    doc.setTextColor(
      navy[0],
      navy[1],
      navy[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25);

    doc.text(
      'AI & AI Agents',
      CENTER,
      61,
      {
        align: 'center',
      }
    );

    doc.setTextColor(
      violetDark[0],
      violetDark[1],
      violetDark[2]
    );

    doc.setFontSize(12);

    doc.text(
      'SKILL ASSESSMENT',
      CENTER,
      69,
      {
        align: 'center',
      }
    );

    /*
     * Gold divider
     */

    doc.setDrawColor(
      gold[0],
      gold[1],
      gold[2]
    );

    doc.setLineWidth(0.9);

    doc.line(
      CENTER - 35,
      75,
      CENTER - 6,
      75
    );

    doc.line(
      CENTER + 6,
      75,
      CENTER + 35,
      75
    );

    doc.setFillColor(
      gold[0],
      gold[1],
      gold[2]
    );

    doc.circle(
      CENTER,
      75,
      2,
      'F'
    );

    /*
     * ---------------------------------------------------------
     * RECIPIENT
     * ---------------------------------------------------------
     */

    doc.setTextColor(
      muted[0],
      muted[1],
      muted[2]
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    doc.text(
      'This certificate is proudly presented to',
      CENTER,
      87,
      {
        align: 'center',
      }
    );

    /*
     * Dynamic name size
     */

    let nameSize = 24;

    if (cleanName.length > 24) {
      nameSize = 21;
    }

    if (cleanName.length > 34) {
      nameSize = 18;
    }

    if (cleanName.length > 45) {
      nameSize = 15;
    }

    doc.setTextColor(
      navy[0],
      navy[1],
      navy[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(nameSize);

    const nameLines = doc.splitTextToSize(
      cleanName,
      185
    );

    const nameY =
      nameLines.length > 1
        ? 99
        : 101;

    doc.text(
      nameLines,
      CENTER,
      nameY,
      {
        align: 'center',
        lineHeightFactor: 1.12,
      }
    );

    const nameHeight =
      nameLines.length > 1
        ? (nameLines.length - 1) * nameSize * 0.38
        : 0;

    const nameBottom =
      nameY + nameHeight;

    /*
     * Name underline
     */

    doc.setDrawColor(
      border[0],
      border[1],
      border[2]
    );

    doc.setLineWidth(0.45);

    doc.line(
      78,
      nameBottom + 6,
      W - 78,
      nameBottom + 6
    );

    /*
     * ---------------------------------------------------------
     * COMPLETION STATEMENT
     * ---------------------------------------------------------
     */

    doc.setTextColor(
      dark[0],
      dark[1],
      dark[2]
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    doc.text(
      'for successfully completing the Veyora AI & AI Agents Skill Assessment',
      CENTER,
      nameBottom + 16,
      {
        align: 'center',
      }
    );

    /*
     * ---------------------------------------------------------
     * METADATA CARDS
     * ---------------------------------------------------------
     */

    const cardY = 133;
    const cardW = 67;
    const cardH = 25;
    const cardGap = 6;

    const cardsTotal =
      cardW * 3 +
      cardGap * 2;

    const cardsStart =
      CENTER - cardsTotal / 2;

    const drawCard = (
      x: number,
      label: string,
      value: string
    ) => {
      doc.setFillColor(
        white[0],
        white[1],
        white[2]
      );

      doc.setDrawColor(
        border[0],
        border[1],
        border[2]
      );

      doc.setLineWidth(0.4);

      doc.roundedRect(
        x,
        cardY,
        cardW,
        cardH,
        3,
        3,
        'FD'
      );

      doc.setTextColor(
        violetDark[0],
        violetDark[1],
        violetDark[2]
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);

      doc.text(
        label,
        x + cardW / 2,
        cardY + 7,
        {
          align: 'center',
        }
      );

      doc.setTextColor(
        navy[0],
        navy[1],
        navy[2]
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);

      const valueLines =
        doc.splitTextToSize(
          value,
          cardW - 8
        );

      doc.text(
        valueLines,
        x + cardW / 2,
        cardY + 15,
        {
          align: 'center',
          lineHeightFactor: 1.15,
        }
      );
    };

    drawCard(
      cardsStart,
      'ASSESSMENT SCORE',
      `${score}/${TOTAL_QUESTIONS}`
    );

    drawCard(
      cardsStart + cardW + cardGap,
      'CERTIFICATE ID',
      id
    );

    drawCard(
      cardsStart +
        (cardW + cardGap) * 2,
      'DATE ISSUED',
      issueDate
    );

    /*
     * ---------------------------------------------------------
     * SIGNATURE / VERIFICATION AREA
     * ---------------------------------------------------------
     */

    const footerY = 170;

    /*
     * Left
     */

    doc.setDrawColor(
      muted[0],
      muted[1],
      muted[2]
    );

    doc.setLineWidth(0.35);

    doc.line(
      40,
      footerY,
      92,
      footerY
    );

    doc.setTextColor(
      muted[0],
      muted[1],
      muted[2]
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);

    doc.text(
      'AUTHORIZED BY',
      66,
      footerY + 5,
      {
        align: 'center',
      }
    );

    doc.setTextColor(
      navy[0],
      navy[1],
      navy[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);

    doc.text(
      'VEYORA AI',
      66,
      footerY + 9,
      {
        align: 'center',
      }
    );

    /*
     * Center verification seal
     */

    doc.setDrawColor(
      violet[0],
      violet[1],
      violet[2]
    );

    doc.setLineWidth(0.8);

    doc.circle(
      CENTER,
      footerY + 2,
      10,
      'S'
    );

    doc.setDrawColor(
      gold[0],
      gold[1],
      gold[2]
    );

    doc.setLineWidth(0.45);

    doc.circle(
      CENTER,
      footerY + 2,
      7.5,
      'S'
    );

    doc.setTextColor(
      violetDark[0],
      violetDark[1],
      violetDark[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);

    doc.text(
      'VERIFIED',
      CENTER,
      footerY + 1,
      {
        align: 'center',
      }
    );

    doc.setFontSize(4.5);

    doc.text(
      'AI SKILLS',
      CENTER,
      footerY + 4.5,
      {
        align: 'center',
      }
    );

    /*
     * Right
     */

    doc.setDrawColor(
      muted[0],
      muted[1],
      muted[2]
    );

    doc.setLineWidth(0.35);

    doc.line(
      W - 92,
      footerY,
      W - 40,
      footerY
    );

    doc.setTextColor(
      muted[0],
      muted[1],
      muted[2]
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);

    doc.text(
      'CERTIFICATE STATUS',
      W - 66,
      footerY + 5,
      {
        align: 'center',
      }
    );

    doc.setTextColor(
      green[0],
      green[1],
      green[2]
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);

    doc.text(
      'SUCCESSFULLY COMPLETED',
      W - 66,
      footerY + 9,
      {
        align: 'center',
      }
    );

    /*
     * ---------------------------------------------------------
     * FOOTER
     * ---------------------------------------------------------
     */

    doc.setTextColor(
      203,
      213,
      225
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);

    doc.text(
      'Issued by Veyora AI  |  Digital Certificate',
      CENTER,
      H - 6.5,
      {
        align: 'center',
      }
    );

    doc.setTextColor(
      148,
      163,
      184
    );

    doc.setFontSize(5);

    doc.text(
      'This certificate confirms successful completion of the Veyora AI Skills Assessment.',
      CENTER,
      H - 3,
      {
        align: 'center',
      }
    );

    /*
     * ---------------------------------------------------------
     * SAVE PDF
     * ---------------------------------------------------------
     */

    const filename =
      cleanName
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '') +
      '-Veyora-AI-Certificate.pdf';

    doc.save(filename);
  };

  /*
   * ---------------------------------------------------------
   * PAYMENT
   * ---------------------------------------------------------
   */

  const handlePayment = () => {
    if (!form.name.trim()) {
      setStatus(
        'Please enter your full name first.'
      );
      return;
    }

    if (!form.email.trim()) {
      setStatus(
        'Please enter your email address first.'
      );
      return;
    }

    const paymentLink =
      process.env.NEXT_PUBLIC_PHONEPE_PAYMENT_LINK;

    if (!paymentLink) {
      setStatus(
        'PhonePe payment is not configured yet. Add NEXT_PUBLIC_PHONEPE_PAYMENT_LINK to .env.local.'
      );
      return;
    }

    setPaying(true);
    setStatus('');

    window.open(
      paymentLink,
      '_blank',
      'noopener,noreferrer'
    );

    setTimeout(() => {
      setPaying(false);

      setStatus(
        'Complete the ₹19 payment in the new tab. After payment confirmation, your certificate will be generated.'
      );
    }, 1200);
  };

  /*
   * Development-only certificate testing
   */

  const confirmPaymentForDemo = () => {
    const id =
      generateCertificateId();

    setCertificateId(id);

    makePdf(id);

    setShowSuccess(true);
  };

  /*
   * ---------------------------------------------------------
   * LOADING
   * ---------------------------------------------------------
   */

  if (!ready) {
    return (
      <main className="loader-screen">
        <div>
          <div className="orb-loader" />

          <h3>
            Checking your result
          </h3>

          <div className="small">
            Preparing your certificate journey...
          </div>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * FAILED
   * ---------------------------------------------------------
   */

  if (!passed) {
    return (
      <main className="certificate">
        <div className="container">
          <section className="card success-box">
            <div className="success-icon">
              <Award size={34} />
            </div>

            <h2>
              Assessment completed
            </h2>

            <p className="small">
              Your score is{' '}
              <b>
                {score}/{TOTAL_QUESTIONS}
              </b>
              . You need at least{' '}
              {PASSING_SCORE} correct answers
              to qualify for the certificate.
            </p>

            <button
              className="primary"
              onClick={() =>
                router.push('/exam')
              }
            >
              Retake Assessment
              <ArrowRight size={17} />
            </button>
          </section>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * SUCCESS
   * ---------------------------------------------------------
   */

  if (showSuccess) {
    return (
      <main className="certificate">
        <div className="container">
          <section className="card success-box">
            <div className="success-icon">
              <Check size={38} />
            </div>

            <h2>
              Your certificate is ready!
            </h2>

            <p className="small">
              Your certificate has been
              generated successfully.
            </p>

            <button
              className="primary"
              onClick={() =>
                makePdf(certificateId)
              }
            >
              <Download size={17} />
              Download Again
            </button>
          </section>

          <CertificatePreview
            name={safeName}
            score={score}
            id={certificateId}
          />
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * CERTIFICATE FORM
   * ---------------------------------------------------------
   */

  return (
    <main className="certificate">
      <div className="container">

        <span className="eyebrow">
          <Award size={13} />
          ASSESSMENT PASSED ·{' '}
          {score}/{TOTAL_QUESTIONS}
        </span>

        <h1 className="cert-title">
          You've earned your certificate.
        </h1>

        <p className="small">
          Enter your details exactly as you
          want them printed on your certificate.
          You can preview the design before payment.
        </p>

        <div className="stepper">

          <div className="step active">
            <span className="step-dot">
              1
            </span>
            Details
          </div>

          <div className="step-line" />

          <div className="step">
            <span className="step-dot">
              2
            </span>
            Payment
          </div>

          <div className="step-line" />

          <div className="step">
            <span className="step-dot">
              3
            </span>
            Download
          </div>

        </div>

        <section className="card">

          <div className="form-grid">

            <div className="full">
              <label className="label">
                Full name *
              </label>

              <input
                className="input"
                autoComplete="name"
                placeholder="e.g. Malla Teja Akash"
                value={form.name}
                onChange={(event) =>
                  change(
                    'name',
                    event.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="label">
                Email *
              </label>

              <input
                className="input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(event) =>
                  change(
                    'email',
                    event.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="label">
                Phone / WhatsApp
              </label>

              <input
                className="input"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Optional"
                value={form.phone}
                onChange={(event) =>
                  change(
                    'phone',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="full">
              <label className="label">
                College / Organization
              </label>

              <input
                className="input"
                placeholder="Optional"
                value={form.organization}
                onChange={(event) =>
                  change(
                    'organization',
                    event.target.value
                  )
                }
              />
            </div>

          </div>

          <CertificatePreview
            name={safeName}
            score={score}
            id="Pending payment"
          />

          <div className="divider" />

          <div className="pay-box">

            <div>
              <div className="small">
                Certificate issuance fee
              </div>

              <div className="price">
                ₹19
              </div>

              <div className="secure">
                <LockKeyhole size={14} />
                Secure payment via PhonePe
              </div>
            </div>

            <div className="small">
              One-time fee
            </div>

          </div>

          {status && (
            <div className="toast">
              {status}
            </div>
          )}

          <button
            className="primary"
            style={{
              marginTop: 18,
            }}
            onClick={handlePayment}
            disabled={paying}
          >
            {paying ? (
              <>
                <LoaderCircle
                  size={18}
                  className="spin"
                />
                Opening PhonePe...
              </>
            ) : (
              <>
                Pay ₹19
                <ArrowRight size={17} />
              </>
            )}
          </button>

          <p
            className="small"
            style={{
              textAlign: 'center',
              marginTop: 11,
            }}
          >
            You will be redirected to
            the secure PhonePe payment page.
          </p>

          {true && (
            <button
              type="button"
              className="demo-payment"
              onClick={
                confirmPaymentForDemo
              }
            >
              Test: Generate Certificate
            </button>
          )}

        </section>
      </div>
    </main>
  );
}

/*
 * ============================================================
 * CERTIFICATE PREVIEW
 * ============================================================
 */

function CertificatePreview({
  name,
  score,
  id,
}: {
  name: string;
  score: number;
  id: string;
}) {
  const issueDate =
    new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
      .format(new Date())
      .toUpperCase();

  return (
    <div className="certificate-paper">
      <div className="paper">

        <span className="floating-glow one" />
        <span className="floating-glow two" />

        <div className="paper-content">

          <div className="paper-kicker">
            VEYORA AI · AI SKILLS
          </div>

          <h2>
            Certificate of Achievement
          </h2>

          <p>
            This certificate is proudly
            presented to
          </p>

          <div className="name">
            {name}
          </div>

          <div className="course">
            for successfully completing the
            AI & AI Agents Skill Assessment
          </div>

          <div className="paper-meta">

            <span>
              <b>SCORE</b>
              {score}/{TOTAL_QUESTIONS}
            </span>

            <span>
              <b>CERTIFICATE ID</b>
              {id}
            </span>

            <span>
              <b>ISSUED</b>
              {issueDate}
            </span>

          </div>

        </div>
      </div>
    </div>
  );
}







