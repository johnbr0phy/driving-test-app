"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { REPORT_REASONS, type ReportReason } from "@/lib/questionQuality";

// "Report this question" under an answered exam question (DMV and registry
// training sets, v2 drills). Posts to /api/questions/report; the report shows
// on the /admin Questions tab and feeds the weekly audit (scripts/question-audit.ts).
// A signed-in reporter sends their ID token, so the report carries their account
// email; a guest sees an optional email field. Either lets us reply.
// Strings live here rather than in i18n/* so the form needs no key in eleven
// dictionaries; languages other than English are machine translations.

type Copy = { open: string; what: string; note: string; email: string; send: string; sending: string; cancel: string; thanks: string; error: string; reasons: Record<ReportReason, string> };

const EN: Copy = {
  open: "Report this question",
  what: "What is wrong?",
  note: "What should it say? (optional)",
  email: "Your email, if you want a reply (optional)",
  send: "Send",
  sending: "Sending...",
  cancel: "Cancel",
  thanks: "Thanks. We check every report and fix the question if it is wrong.",
  error: "Could not send the report. Please try again.",
  reasons: Object.fromEntries(REPORT_REASONS.map((r) => [r.value, r.label])) as Record<ReportReason, string>,
};

const COPY: Record<string, Copy> = {
  en: EN,
  es: {
    open: "Reportar esta pregunta", what: "¿Qué está mal?", note: "¿Qué debería decir? (opcional)", email: "Tu correo, si quieres respuesta (opcional)", send: "Enviar", sending: "Enviando...", cancel: "Cancelar",
    thanks: "Gracias. Revisamos cada reporte y corregimos la pregunta si está mal.", error: "No se pudo enviar. Inténtalo de nuevo.",
    reasons: { wrong_answer: "La respuesta marcada es incorrecta", two_answers: "Hay más de una respuesta correcta", unclear: "La pregunta no es clara", outdated: "La regla o el dato está desactualizado", typo: "Hay un error de escritura", other: "Otra cosa" },
  },
  pt: {
    open: "Denunciar esta pergunta", what: "O que está errado?", note: "O que deveria dizer? (opcional)", email: "O seu email, se quiser resposta (opcional)", send: "Enviar", sending: "A enviar...", cancel: "Cancelar",
    thanks: "Obrigado. Verificamos cada denúncia e corrigimos a pergunta se estiver errada.", error: "Não foi possível enviar. Tente novamente.",
    reasons: { wrong_answer: "A resposta marcada está errada", two_answers: "Há mais de uma resposta certa", unclear: "A pergunta não é clara", outdated: "A regra ou o dado está desatualizado", typo: "Há um erro de escrita", other: "Outra coisa" },
  },
  de: {
    open: "Frage melden", what: "Was ist falsch?", note: "Was sollte dort stehen? (optional)", email: "Deine E-Mail, falls du eine Antwort möchtest (optional)", send: "Senden", sending: "Wird gesendet...", cancel: "Abbrechen",
    thanks: "Danke. Wir prüfen jede Meldung und korrigieren die Frage, wenn sie falsch ist.", error: "Senden fehlgeschlagen. Bitte versuch es noch einmal.",
    reasons: { wrong_answer: "Die markierte Antwort ist falsch", two_answers: "Mehr als eine Antwort ist richtig", unclear: "Die Frage ist unklar", outdated: "Die Regel oder Angabe ist veraltet", typo: "Da ist ein Tippfehler", other: "Etwas anderes" },
  },
  fr: {
    open: "Signaler cette question", what: "Quel est le problème ?", note: "Que devrait-elle dire ? (facultatif)", email: "Votre e-mail, si vous voulez une réponse (facultatif)", send: "Envoyer", sending: "Envoi...", cancel: "Annuler",
    thanks: "Merci. Nous vérifions chaque signalement et corrigeons la question si elle est fausse.", error: "Envoi impossible. Réessayez.",
    reasons: { wrong_answer: "La réponse indiquée est fausse", two_answers: "Plusieurs réponses sont justes", unclear: "La question n'est pas claire", outdated: "La règle ou l'information est dépassée", typo: "Il y a une faute de frappe", other: "Autre chose" },
  },
  it: {
    open: "Segnala questa domanda", what: "Cosa c'è che non va?", note: "Cosa dovrebbe dire? (facoltativo)", email: "La tua email, se vuoi una risposta (facoltativo)", send: "Invia", sending: "Invio...", cancel: "Annulla",
    thanks: "Grazie. Controlliamo ogni segnalazione e correggiamo la domanda se è sbagliata.", error: "Invio non riuscito. Riprova.",
    reasons: { wrong_answer: "La risposta indicata è sbagliata", two_answers: "Più di una risposta è giusta", unclear: "La domanda non è chiara", outdated: "La regola o il dato non è aggiornato", typo: "C'è un errore di battitura", other: "Altro" },
  },
  nl: {
    open: "Deze vraag melden", what: "Wat klopt er niet?", note: "Wat zou er moeten staan? (optioneel)", email: "Je e-mailadres, als je een antwoord wilt (optioneel)", send: "Versturen", sending: "Versturen...", cancel: "Annuleren",
    thanks: "Bedankt. We bekijken elke melding en verbeteren de vraag als die fout is.", error: "Versturen mislukt. Probeer het opnieuw.",
    reasons: { wrong_answer: "Het aangegeven antwoord is fout", two_answers: "Meer dan één antwoord is goed", unclear: "De vraag is onduidelijk", outdated: "De regel of het feit is verouderd", typo: "Er staat een typfout in", other: "Iets anders" },
  },
  pl: {
    open: "Zgłoś to pytanie", what: "Co jest nie tak?", note: "Co powinno być? (opcjonalnie)", email: "Twój e-mail, jeśli chcesz odpowiedź (opcjonalnie)", send: "Wyślij", sending: "Wysyłanie...", cancel: "Anuluj",
    thanks: "Dziękujemy. Sprawdzamy każde zgłoszenie i poprawiamy pytanie, jeśli jest błędne.", error: "Nie udało się wysłać. Spróbuj ponownie.",
    reasons: { wrong_answer: "Zaznaczona odpowiedź jest błędna", two_answers: "Więcej niż jedna odpowiedź jest poprawna", unclear: "Pytanie jest niejasne", outdated: "Przepis lub fakt jest nieaktualny", typo: "Jest literówka", other: "Coś innego" },
  },
  vi: {
    open: "Báo lỗi câu hỏi này", what: "Có gì sai?", note: "Nên ghi thế nào? (không bắt buộc)", email: "Email của bạn, nếu muốn được trả lời (không bắt buộc)", send: "Gửi", sending: "Đang gửi...", cancel: "Hủy",
    thanks: "Cảm ơn bạn. Chúng tôi xem từng báo cáo và sửa câu hỏi nếu sai.", error: "Không gửi được. Vui lòng thử lại.",
    reasons: { wrong_answer: "Đáp án được đánh dấu bị sai", two_answers: "Có hơn một đáp án đúng", unclear: "Câu hỏi không rõ ràng", outdated: "Quy định hoặc thông tin đã cũ", typo: "Có lỗi chính tả", other: "Vấn đề khác" },
  },
  ko: {
    open: "이 문제 신고하기", what: "무엇이 잘못되었나요?", note: "어떻게 되어야 하나요? (선택)", email: "답변을 원하시면 이메일 (선택)", send: "보내기", sending: "보내는 중...", cancel: "취소",
    thanks: "감사합니다. 모든 신고를 확인하고 틀린 문제는 고칩니다.", error: "보내지 못했습니다. 다시 시도해 주세요.",
    reasons: { wrong_answer: "표시된 정답이 틀렸어요", two_answers: "정답이 둘 이상이에요", unclear: "문제가 불분명해요", outdated: "규칙이나 정보가 오래되었어요", typo: "오타가 있어요", other: "기타" },
  },
  zh: {
    open: "报告此题", what: "哪里有问题?", note: "应该怎么写?(可选)", email: "如需回复,请留下邮箱(可选)", send: "发送", sending: "发送中...", cancel: "取消",
    thanks: "谢谢。我们会查看每一份报告,题目有误就会修正。", error: "发送失败,请重试。",
    reasons: { wrong_answer: "标出的答案是错的", two_answers: "不止一个答案正确", unclear: "题目不清楚", outdated: "规定或事实已过时", typo: "有错别字", other: "其他" },
  },
};

export function ReportExamQuestion({ examId, questionId, picked }: { examId: string; questionId: string; picked?: number }) {
  const { language } = useTranslation();
  const { user } = useAuth();
  const c = COPY[language] ?? EN;
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>("wrong_answer");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (user) {
        const token = await user.getIdToken().catch(() => null);
        if (token) headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch("/api/questions/report", {
        method: "POST",
        headers,
        body: JSON.stringify({
          examId,
          questionId,
          reason,
          note,
          email: user ? undefined : email.trim() || undefined,
          lang: language,
          page: window.location.pathname,
          picked,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  if (sent) return <p role="status" className="text-center text-xs text-gray-500 dark:text-gray-400">{c.thanks}</p>;

  if (!open) {
    return (
      <div className="text-center">
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 underline">
          <Flag className="w-3 h-3" aria-hidden="true" /> {c.open}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="mx-auto max-w-sm rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 text-left space-y-3">
      <label className="block text-xs text-gray-600 dark:text-gray-300">
        {c.what}
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value as ReportReason)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-2 py-1.5 text-sm"
        >
          {REPORT_REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {c.reasons[r.value]}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-gray-600 dark:text-gray-300">
        {c.note}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
          rows={2}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-2 py-1.5 text-sm"
        />
      </label>
      {!user && (
        <label className="block text-xs text-gray-600 dark:text-gray-300">
          {c.email}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={200}
            autoComplete="email"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-2 py-1.5 text-sm"
          />
        </label>
      )}
      {error && <p role="alert" className="text-xs text-red-600 dark:text-red-400">{c.error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={busy} className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
          {busy ? c.sending : c.send}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          {c.cancel}
        </Button>
      </div>
    </form>
  );
}
