# Prawo wykroczeń (Kodeks wykroczeń, Kodeks postępowania w sprawach o wykroczenia).
SEG = "WYK"
CAT = "plapWykroczenia"
Q = [
    ("Ile trwa kara aresztu za wykroczenie?",
     "Od 5 do 30 dni", ["Od 1 do 30 dni", "Od 7 do 60 dni", "Od 5 do 90 dni"],
     "Art. 19 KW: kara aresztu trwa najkrócej 5, najdłużej 30 dni; wymierza się ją w dniach."),
    ("W jakich granicach co do zasady wymierza się grzywnę za wykroczenie?",
     "Od 20 do 5000 zł", ["Od 50 do 5000 zł", "Od 20 do 1000 zł", "Od 100 do 30 000 zł"],
     "Art. 24 § 1 KW: grzywnę wymierza się od 20 do 5000 złotych, chyba że ustawa stanowi inaczej. Wyższy próg do 30 000 zł dotyczy tylko wykroczeń wymienionych w § 1a."),
    ("Kiedy usiłowanie wykroczenia jest karalne?",
     "Tylko gdy przewiduje to ustawa", ["Zawsze, jak przy przestępstwie", "Gdy sprawca działał umyślnie", "Gdy szkoda przekracza 800 zł"],
     "Art. 11 § 2 KW: odpowiedzialność za usiłowanie wykroczenia zachodzi, gdy ustawa tak stanowi; przewiduje to np. art. 119 § 2 KW przy kradzieży."),
    ("Kiedy podżeganie i pomocnictwo do wykroczenia są karalne?",
     "Gdy przewiduje to ustawa i czyn dokonano", ["Zawsze przy działaniu umyślnym", "Gdy sprawca tylko usiłował czynu", "Tylko przy wykroczeniach drogowych"],
     "Art. 14 § 1 KW: odpowiedzialność za podżeganie i pomocnictwo zachodzi, gdy ustawa tak stanowi i tylko w razie dokonania czynu przez sprawcę."),
    ("Kiedy ustaje karalność wykroczenia, jeżeli nie wszczęto postępowania?",
     "Po roku od popełnienia czynu", ["Po 2 latach od popełnienia czynu", "Po 3 latach od popełnienia czynu", "Po 6 miesiącach od popełnienia czynu"],
     "Art. 45 § 1 KW: karalność ustaje po roku od popełnienia czynu; jeżeli w tym okresie wszczęto postępowanie, ustaje z upływem 2 lat od zakończenia tego roku."),
    ("Kradzież cudzej rzeczy ruchomej jest wykroczeniem, jeśli jej wartość nie przekracza:",
     "800 zł", ["500 zł", "250 zł", "600 zł"],
     "Art. 119 § 1 KW: kradzież lub przywłaszczenie rzeczy ruchomej o wartości nieprzekraczającej 800 złotych jest wykroczeniem; usiłowanie, podżeganie i pomocnictwo są karalne (§ 2)."),
    ("Za jakie wykroczenie nie można orzec nagany?",
     "O charakterze chuligańskim", ["Popełnione nieumyślnie", "Popełnione przez młodocianego", "Zagrożone tylko grzywną"],
     "Art. 36 § 2 KW: nie można orzec nagany za wykroczenie o charakterze chuligańskim. Poza tym nagana jest dopuszczalna, gdy wystarczy do wdrożenia sprawcy do poszanowania prawa (§ 1)."),
    ("Wykroczenie stwierdzono urządzeniem rejestrującym, a sprawcy nie schwytano na gorącym uczynku. Mandatu karnego nie można nałożyć po upływie:",
     "60 dni od ustalenia sprawcy", ["7 dni od ustalenia sprawcy", "30 dni od popełnienia czynu", "Roku od popełnienia czynu"],
     "Art. 97 § 1 pkt 3 KPW: gdy wykroczenie stwierdzono np. urządzeniem rejestrującym, a sprawcy nie schwytano na gorącym uczynku, mandat można nałożyć, jeśli nie ma wątpliwości co do sprawcy, ale nie po upływie 60 dni od dnia jego ustalenia."),
]
