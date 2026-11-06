"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { useTranslation } from "@/contexts/LanguageContext";
import { readStudyReminder, setStudyReminder, type StudyReminder } from "@/lib/nativeFeatures";

// The card's own strings: it only shows inside the iOS and Android apps.
const COPY: Record<string, { title: string; note: string; on: string; off: string; at: string; denied: string; pushTitle: string; pushBody: string }> = {
  en: { title: "Daily study reminder", note: "A nudge each day to do a few questions.", on: "Remind me", off: "Turn off", at: "Every day at", denied: "Notifications are off for Tigertest. Turn them on in your phone's Settings.", pushTitle: "Time to practice", pushBody: "A few questions today keeps you on track for test day." },
  es: { title: "Recordatorio diario", note: "Un aviso cada día para hacer unas preguntas.", on: "Recuérdamelo", off: "Desactivar", at: "Todos los días a las", denied: "Las notificaciones de Tigertest están desactivadas. Actívalas en los Ajustes del teléfono.", pushTitle: "Hora de practicar", pushBody: "Unas preguntas hoy te mantienen listo para el examen." },
  de: { title: "Tägliche Lern-Erinnerung", note: "Jeden Tag ein kurzer Anstoß für ein paar Fragen.", on: "Erinnere mich", off: "Ausschalten", at: "Jeden Tag um", denied: "Mitteilungen für Tigertest sind aus. Schalte sie in den Einstellungen deines Handys ein.", pushTitle: "Zeit zum Üben", pushBody: "Ein paar Fragen heute halten dich auf Kurs für die Prüfung." },
  fr: { title: "Rappel quotidien", note: "Un rappel chaque jour pour faire quelques questions.", on: "Me le rappeler", off: "Désactiver", at: "Tous les jours à", denied: "Les notifications de Tigertest sont désactivées. Activez-les dans les Réglages du téléphone.", pushTitle: "C'est l'heure de s'entraîner", pushBody: "Quelques questions aujourd'hui pour rester prêt le jour de l'examen." },
  it: { title: "Promemoria giornaliero", note: "Un promemoria ogni giorno per fare qualche domanda.", on: "Ricordamelo", off: "Disattiva", at: "Ogni giorno alle", denied: "Le notifiche di Tigertest sono disattivate. Attivale nelle Impostazioni del telefono.", pushTitle: "È ora di esercitarsi", pushBody: "Qualche domanda oggi ti tiene pronto per l'esame." },
  nl: { title: "Dagelijkse herinnering", note: "Elke dag een seintje om een paar vragen te doen.", on: "Herinner me", off: "Uitzetten", at: "Elke dag om", denied: "Meldingen voor Tigertest staan uit. Zet ze aan in de Instellingen van je telefoon.", pushTitle: "Tijd om te oefenen", pushBody: "Een paar vragen vandaag houden je klaar voor het examen." },
  pl: { title: "Codzienne przypomnienie", note: "Codzienna zachęta, by zrobić kilka pytań.", on: "Przypominaj mi", off: "Wyłącz", at: "Codziennie o", denied: "Powiadomienia Tigertest są wyłączone. Włącz je w Ustawieniach telefonu.", pushTitle: "Czas na naukę", pushBody: "Kilka pytań dziś i jesteś gotowy na egzamin." },
  pt: { title: "Lembrete diário", note: "Um lembrete por dia para fazer algumas perguntas.", on: "Lembrar-me", off: "Desligar", at: "Todos os dias às", denied: "As notificações do Tigertest estão desligadas. Ative-as nas Definições do telemóvel.", pushTitle: "Hora de praticar", pushBody: "Algumas perguntas hoje mantêm-no pronto para o exame." },
  vi: { title: "Nhắc học mỗi ngày", note: "Mỗi ngày một lời nhắc làm vài câu hỏi.", on: "Nhắc tôi", off: "Tắt", at: "Mỗi ngày lúc", denied: "Thông báo của Tigertest đang tắt. Hãy bật trong Cài đặt của điện thoại.", pushTitle: "Đến giờ luyện tập", pushBody: "Vài câu hỏi hôm nay giúp bạn sẵn sàng cho ngày thi." },
  ko: { title: "매일 학습 알림", note: "매일 몇 문제씩 풀도록 알려 드립니다.", on: "알림 받기", off: "끄기", at: "매일", denied: "Tigertest 알림이 꺼져 있습니다. 휴대폰 설정에서 켜 주세요.", pushTitle: "연습할 시간입니다", pushBody: "오늘 몇 문제만 풀어도 시험 준비가 됩니다." },
  zh: { title: "每日学习提醒", note: "每天提醒你做几道题。", on: "提醒我", off: "关闭", at: "每天", denied: "Tigertest 的通知已关闭。请在手机设置中开启。", pushTitle: "该练习了", pushBody: "今天做几道题，考试那天更有把握。" },
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The apps' daily study reminder (a local notification, nothing sent to a
 * server). Renders nothing on the web.
 */
export function StudyReminderCard({ className = "" }: { className?: string }) {
  const native = useIsNativeApp();
  const { language } = useTranslation();
  const c = COPY[language] ?? COPY.en;
  const [reminder, setReminder] = useState<StudyReminder>(null);
  const [time, setTime] = useState("19:00");
  const [busy, setBusy] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!native) return;
    const r = readStudyReminder();
    setReminder(r);
    if (r) setTime(`${pad(r.hour)}:${pad(r.minute)}`);
  }, [native]);

  if (!native) return null;

  const apply = async (next: StudyReminder) => {
    setBusy(true);
    const result = await setStudyReminder(next, { title: c.pushTitle, body: c.pushBody });
    setBusy(false);
    setDenied(result === "denied");
    if (result === "on") setReminder(next);
    if (result === "off") setReminder(null);
  };

  const parsed = (): StudyReminder => {
    const [h, m] = time.split(":").map(Number);
    return Number.isFinite(h) && Number.isFinite(m) ? { hour: h, minute: m } : { hour: 19, minute: 0 };
  };

  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 ${className}`}>
      <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
        <Bell className="h-5 w-5" />
        {c.title}
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{c.note}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
          {c.at}
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              if (reminder) {
                const [h, m] = e.target.value.split(":").map(Number);
                if (Number.isFinite(h) && Number.isFinite(m)) void apply({ hour: h, minute: m });
              }
            }}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1"
          />
        </label>
        <button
          type="button"
          disabled={busy}
          onClick={() => void apply(reminder ? null : parsed())}
          className={`rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50 ${
            reminder
              ? "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50"
              : "bg-brand text-white hover:bg-brand-hover"
          }`}
        >
          {reminder ? c.off : c.on}
        </button>
      </div>
      {denied && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{c.denied}</p>}
    </div>
  );
}
