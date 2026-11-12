"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";
import { useTranslation } from "@/contexts/LanguageContext";
import type { DesignProps } from "@/components/guestPrompt/types";

// The streak card: every language's sign-up step, and v01 (the control) of the
// English message test. Strings are its own, like ReportExamQuestion; languages
// other than English are machine translations pending native review.

export type Copy = {
  badge: string;
  title: string;
  /** {{n}} is the visitor's answer count on this browser. */
  body: string;
  bodyFresh: string;
  benefits: [string, string, string];
  later: string;
};

export const EN: Copy = {
  badge: "Two in a row",
  title: "You're on a roll. Don't lose it.",
  body: "Your {{n}} answers live only on this browser. Clear it or switch devices and they're gone.",
  bodyFresh: "Your progress lives only on this browser. Clear it or switch devices and it's gone.",
  benefits: [
    "Pick up where you left off, on any device",
    "Missed questions come back until you get them",
    "Free account. No credit card.",
  ],
  later: "Maybe later",
};

export const COPY: Record<string, Copy> = {
  en: EN,
  es: {
    badge: "Dos seguidas",
    title: "Vas muy bien. No lo pierdas.",
    body: "Tus {{n}} respuestas solo están en este navegador. Si lo borras o cambias de dispositivo, se pierden.",
    bodyFresh: "Tu progreso solo está en este navegador. Si lo borras o cambias de dispositivo, se pierde.",
    benefits: ["Sigue donde lo dejaste, en cualquier dispositivo", "Las preguntas falladas vuelven hasta que las aciertes", "Cuenta gratis. Sin tarjeta."],
    later: "Quizás después",
  },
  vi: {
    badge: "Đúng hai câu liên tiếp",
    title: "Bạn đang làm rất tốt. Đừng để mất.",
    body: "{{n}} câu trả lời của bạn chỉ lưu trên trình duyệt này. Xóa trình duyệt hoặc đổi thiết bị là mất hết.",
    bodyFresh: "Tiến độ của bạn chỉ lưu trên trình duyệt này. Xóa trình duyệt hoặc đổi thiết bị là mất hết.",
    benefits: ["Học tiếp từ chỗ đã dừng, trên mọi thiết bị", "Câu sai sẽ quay lại cho đến khi bạn làm đúng", "Tài khoản miễn phí. Không cần thẻ."],
    later: "Để sau",
  },
  ko: {
    badge: "두 문제 연속 정답",
    title: "잘하고 있어요. 기록을 지키세요.",
    body: "답한 {{n}}개 문제는 이 브라우저에만 저장돼 있어요. 브라우저를 지우거나 기기를 바꾸면 사라집니다.",
    bodyFresh: "진행 상황은 이 브라우저에만 저장돼 있어요. 브라우저를 지우거나 기기를 바꾸면 사라집니다.",
    benefits: ["어떤 기기에서든 이어서 공부", "틀린 문제는 맞힐 때까지 다시 나와요", "무료 계정. 카드 필요 없음."],
    later: "나중에",
  },
  zh: {
    badge: "连续答对两题",
    title: "状态不错，别让进度丢了。",
    body: "你的 {{n}} 个答案只保存在这个浏览器里。清除浏览器或换设备就没了。",
    bodyFresh: "你的进度只保存在这个浏览器里。清除浏览器或换设备就没了。",
    benefits: ["在任何设备上接着练", "答错的题会反复出现，直到你答对", "免费账户，无需信用卡。"],
    later: "以后再说",
  },
  de: {
    badge: "Zwei richtig in Folge",
    title: "Du bist gut drauf. Verlier das nicht.",
    body: "Deine {{n}} Antworten sind nur in diesem Browser gespeichert. Browser geleert oder Gerät gewechselt, und sie sind weg.",
    bodyFresh: "Dein Fortschritt ist nur in diesem Browser gespeichert. Browser geleert oder Gerät gewechselt, und er ist weg.",
    benefits: ["Mach auf jedem Gerät dort weiter, wo du aufgehört hast", "Falsch beantwortete Fragen kommen wieder, bis sie sitzen", "Kostenloses Konto. Keine Kreditkarte."],
    later: "Vielleicht später",
  },
  fr: {
    badge: "Deux d'affilée",
    title: "Tu es sur une bonne lancée. Ne la perds pas.",
    body: "Tes {{n}} réponses ne sont enregistrées que sur ce navigateur. Si tu l'effaces ou changes d'appareil, elles disparaissent.",
    bodyFresh: "Ta progression n'est enregistrée que sur ce navigateur. Si tu l'effaces ou changes d'appareil, elle disparaît.",
    benefits: ["Reprends là où tu t'es arrêté, sur n'importe quel appareil", "Les questions ratées reviennent jusqu'à ce que tu les réussisses", "Compte gratuit. Sans carte bancaire."],
    later: "Plus tard",
  },
  it: {
    badge: "Due di fila",
    title: "Stai andando alla grande. Non perderlo.",
    body: "Le tue {{n}} risposte sono salvate solo in questo browser. Se lo cancelli o cambi dispositivo, spariscono.",
    bodyFresh: "I tuoi progressi sono salvati solo in questo browser. Se lo cancelli o cambi dispositivo, spariscono.",
    benefits: ["Riprendi da dove avevi lasciato, su qualsiasi dispositivo", "Le domande sbagliate tornano finché non le azzecchi", "Account gratuito. Nessuna carta di credito."],
    later: "Più tardi",
  },
  pl: {
    badge: "Dwie z rzędu",
    title: "Idzie ci świetnie. Nie strać tego.",
    body: "Twoje {{n}} odpowiedzi są zapisane tylko w tej przeglądarce. Wyczyść ją lub zmień urządzenie, a znikną.",
    bodyFresh: "Twoje postępy są zapisane tylko w tej przeglądarce. Wyczyść ją lub zmień urządzenie, a znikną.",
    benefits: ["Kontynuuj tam, gdzie skończyłeś, na każdym urządzeniu", "Błędne pytania wracają, aż je opanujesz", "Darmowe konto. Bez karty."],
    later: "Może później",
  },
  nl: {
    badge: "Twee op rij",
    title: "Je bent goed bezig. Raak het niet kwijt.",
    body: "Je {{n}} antwoorden staan alleen in deze browser. Wis je die of wissel je van apparaat, dan zijn ze weg.",
    bodyFresh: "Je voortgang staat alleen in deze browser. Wis je die of wissel je van apparaat, dan is hij weg.",
    benefits: ["Ga verder waar je was, op elk apparaat", "Foute vragen komen terug tot je ze goed hebt", "Gratis account. Geen creditcard."],
    later: "Misschien later",
  },
  pt: {
    badge: "Duas seguidas",
    title: "Estás a ir muito bem. Não percas isso.",
    body: "As tuas {{n}} respostas só estão guardadas neste navegador. Se o limpares ou mudares de dispositivo, perdem-se.",
    bodyFresh: "O teu progresso só está guardado neste navegador. Se o limpares ou mudares de dispositivo, perde-se.",
    benefits: ["Continua onde ficaste, em qualquer dispositivo", "As perguntas erradas voltam até acertares", "Conta gratuita. Sem cartão."],
    later: "Talvez mais tarde",
  },
  sv: {
    badge: "Två rätt i rad",
    title: "Du är på gång. Tappa inte det.",
    body: "Dina {{n}} svar finns bara i den här webbläsaren. Rensar du den eller byter enhet är de borta.",
    bodyFresh: "Dina framsteg finns bara i den här webbläsaren. Rensar du den eller byter enhet är de borta.",
    benefits: ["Fortsätt där du slutade, på vilken enhet som helst", "Frågor du missar kommer tillbaka tills du kan dem", "Gratis konto. Inget kort."],
    later: "Kanske senare",
  },
  da: {
    badge: "To rigtige i træk",
    title: "Du er godt i gang. Mist det ikke.",
    body: "Dine {{n}} svar ligger kun i denne browser. Rydder du den eller skifter enhed, er de væk.",
    bodyFresh: "Dine fremskridt ligger kun i denne browser. Rydder du den eller skifter enhed, er de væk.",
    benefits: ["Fortsæt hvor du slap, på enhver enhed", "Spørgsmål du misser, kommer igen, til du kan dem", "Gratis konto. Intet kort."],
    later: "Måske senere",
  },
  fi: {
    badge: "Kaksi oikein peräkkäin",
    title: "Hyvä vauhti. Älä menetä sitä.",
    body: "{{n}} vastaustasi on tallessa vain tässä selaimessa. Jos tyhjennät sen tai vaihdat laitetta, ne katoavat.",
    bodyFresh: "Edistymisesi on tallessa vain tässä selaimessa. Jos tyhjennät sen tai vaihdat laitetta, se katoaa.",
    benefits: ["Jatka siitä, mihin jäit, millä laitteella tahansa", "Väärin menneet kysymykset palaavat, kunnes osaat ne", "Ilmainen tili. Ei korttia."],
    later: "Ehkä myöhemmin",
  },
  hu: {
    badge: "Kettő egymás után",
    title: "Jól megy. Ne veszítsd el.",
    body: "A(z) {{n}} válaszod csak ebben a böngészőben van mentve. Ha törlöd vagy eszközt váltasz, elvesznek.",
    bodyFresh: "A haladásod csak ebben a böngészőben van mentve. Ha törlöd vagy eszközt váltasz, elveszik.",
    benefits: ["Folytasd ott, ahol abbahagytad, bármilyen eszközön", "A rontott kérdések visszajönnek, amíg meg nem tanulod őket", "Ingyenes fiók. Bankkártya nélkül."],
    later: "Talán később",
  },
  ro: {
    badge: "Două la rând",
    title: "Îți merge bine. Nu pierde asta.",
    body: "Cele {{n}} răspunsuri ale tale sunt salvate doar în acest browser. Dacă îl ștergi sau schimbi dispozitivul, dispar.",
    bodyFresh: "Progresul tău e salvat doar în acest browser. Dacă îl ștergi sau schimbi dispozitivul, dispare.",
    benefits: ["Continuă de unde ai rămas, pe orice dispozitiv", "Întrebările greșite revin până le știi", "Cont gratuit. Fără card."],
    later: "Poate mai târziu",
  },
  el: {
    badge: "Δύο στη σειρά",
    title: "Τα πας τέλεια. Μην το χάσεις.",
    body: "Οι {{n}} απαντήσεις σου υπάρχουν μόνο σε αυτό το πρόγραμμα περιήγησης. Αν το καθαρίσεις ή αλλάξεις συσκευή, χάνονται.",
    bodyFresh: "Η πρόοδός σου υπάρχει μόνο σε αυτό το πρόγραμμα περιήγησης. Αν το καθαρίσεις ή αλλάξεις συσκευή, χάνεται.",
    benefits: ["Συνέχισε από εκεί που σταμάτησες, σε οποιαδήποτε συσκευή", "Οι λάθος ερωτήσεις επιστρέφουν μέχρι να τις μάθεις", "Δωρεάν λογαριασμός. Χωρίς κάρτα."],
    later: "Ίσως αργότερα",
  },
};

/** The translated card every language gets, and v01 of the English test. */
export function StreakCard({ c, n, headingRef, isNative, busy, onGoogle, signupHref, onEmail, onLater }: DesignProps & { c: Copy }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-brand-border-light bg-gradient-to-b from-brand-light to-white dark:to-gray-900 p-5 sm:p-6 text-center shadow-sm">
      <span className="inline-flex items-center gap-1 rounded-full bg-white/80 dark:bg-gray-900/80 px-3 py-1 text-xs font-bold text-brand-dark">
        <span aria-hidden="true">🔥</span> {c.badge}
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="focus-in-parent mt-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 leading-tight outline-none">
        {c.title}
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-200">
        {n > 0 ? c.body.replace("{{n}}", String(n)) : c.bodyFresh}
      </p>

      <ul className="mt-4 space-y-2 text-left max-w-sm mx-auto">
        {c.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-gray-800 dark:text-gray-100">
            <Check className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-400 shrink-0" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 max-w-sm mx-auto">
        {/* Hidden in the native app, like the signup page (Google blocks OAuth in WebViews). */}
        {!isNative && (
          <WebViewGoogleWarning onGoogleSignIn={onGoogle} disabled={busy} className="h-12 text-base font-semibold shadow-md !border-gray-900 dark:!border-gray-100" />
        )}
        <Button
          asChild
          className={`w-full h-11 text-sm font-semibold ${isNative ? "bg-brand text-white hover:bg-brand-hover" : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
        >
          <Link href={signupHref} onClick={onEmail}>
            {isNative ? t("guestSave.createCta") : t("guestSave.emailCta")}
          </Link>
        </Button>
      </div>

      <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
        {t("common.alreadyHaveAccount")}{" "}
        <Link href={signupHref.replace(/^\/signup/, "/login")} className="font-semibold text-brand-dark hover:underline">
          {t("common.logIn")}
        </Link>
      </p>
      <button
        type="button"
        onClick={onLater}
        className="mt-3 text-sm text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-200 py-2 px-4"
      >
        {c.later}
      </button>
    </div>
  );
}
