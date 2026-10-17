import { fill, fix, lesson, mc, order } from "./build.js";

export const lessonsB1 = [
  lesson({
    id: "b1-01",
    level: "B1",
    minutes: 14,
    title: "Perfektum",
    titleEn: "The present perfect",
    concepts: ["tenses"],
    maal: "Du skiller har + partisipp fra preteritum.",
    husk: "Jeg har sendt rapporten. I går sendte jeg den.",
    intro: `Perfektum is har (or er, for a few verbs) plus the past participle. It links a past event to now: the result still matters, the time is not closed, or you are looking back from the present. Jeg har sendt rapporten means the report is now sent. Jeg har bodd i Norge i ti år includes the time up to today.

If the time is a finished, named point, use preteritum instead. I går sendte jeg rapporten, not "i går har jeg sendt". I 2019 tok jeg C1-kurset. Words like allerede, ennå and noensinne often travel with perfektum: Jeg har allerede sendt den. Har du noensinne jobbet i en lufthavn?

Participles to memorise with the verbs: sendt, skrevet, gjort, vært, hatt, bodd, kommet, sett, lest. Weak -te verbs often have a participle in -t: sende → sendt, while -et verbs keep -et: snakke → snakket. Har snakket is both the past and, with har, the perfect.`,
    examples: [
      { no: "Jeg har sendt rapporten til ledelsen.", en: "I have sent the report to management." },
      { no: "Hun har skrevet referatet, men hun har ikke sendt det.", en: "She has written the minutes, but she has not sent them." },
      { no: "Jeg har bodd i Norge i ti år.", en: "I have lived in Norway for ten years." },
    ],
    vocab: [
      ["å sende – sendt", "to send – sent", "Jeg har sendt vedlegget.", "I have sent the attachment.", "verb"],
      ["å skrive – skrevet", "to write – written", "Hun har skrevet utkastet.", "She has written the draft.", "verb"],
      ["allerede", "already", "Jeg har allerede lest e-posten.", "I have already read the email.", "adv"],
      ["ennå", "yet; still", "Jeg har ikke fått svar ennå.", "I have not received an answer yet.", "adv"],
      ["et utkast", "a draft", "Utkastet ligger i vedlegget.", "The draft is in the attachment.", "noun"],
      ["ledelsen", "management", "Rapporten går til ledelsen.", "The report goes to management.", "noun"],
      ["noensinne", "ever", "Har du noensinne bodd i Oslo?", "Have you ever lived in Oslo?", "adv"],
    ],
    exercises: [
      mc(
        "tenses",
        "Hvilken setning er riktig?",
        ["Jeg har sendt rapporten.", "Jeg har sendte rapporten.", "Jeg har sender rapporten.", "Jeg sendt har rapporten."],
        "Jeg har sendt rapporten.",
        "Har is the finite verb. The participle is sendt, not the preterite sendte and not the present sender.",
      ),
      fill(
        "tenses",
        "Fyll inn partisipp av «å skrive».",
        "Hun har ___ et utkast.",
        ["skrevet"],
        "Skrive → skrev in the simple past, but har skrevet in the perfect. The participle ends in -et.",
      ),
      mc(
        "tenses",
        "Hvilken tid passer?",
        ["I går sendte jeg rapporten.", "I går har jeg sendt rapporten.", "I går har jeg sendte rapporten.", "I går jeg sendte rapporten."],
        "I går sendte jeg rapporten.",
        "I går is a finished time, so preteritum is used. The last option also breaks V2.",
        "Which tense fits?",
      ),
      order(
        "tenses",
        "Bygg setningen.",
        ["Jeg", "har", "ikke", "fått", "svar", "ennå"],
        "Ikke stands after the finite verb har. Ennå usually comes late in the sentence.",
        [],
        "Build: I have not received an answer yet.",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Jeg har bodd i Norge i ti år i 2014.",
        ["Jeg bodde i Norge i ti år", "Jeg bodde i Norge i 2014"],
        "A closed year is preteritum. If you mean the ten years up to now, drop the finished year: Jeg har bodd i Norge i ti år.",
      ),
      fill(
        "tenses",
        "Fyll inn partisipp av «å være».",
        "Har du ___ på Gardermoen?",
        ["vært"],
        "Å være → har vært. The preterite is var, which cannot follow har.",
      ),
      mc(
        "tenses",
        "Hva uttrykker perfektum her: «Jeg har allerede sendt den»?",
        ["Resultatet gjelder nå.", "Hendelsen skjedde i et navngitt tidspunkt i går.", "Det er en plan for i morgen.", "Det er en vane i presens."],
        "Resultatet gjelder nå.",
        "Allerede + har + participle presents the result as relevant now. A named finished time would have pushed the sentence into preteritum.",
        "What does the perfect express here?",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Hun har skriver referatet.",
        ["Hun har skrevet referatet"],
        "The verb after har is the participle skrevet, not the present skriver.",
      ),
    ],
  }),
  lesson({
    id: "b1-02",
    level: "B1",
    minutes: 13,
    title: "Pluskvamperfektum",
    titleEn: "The past perfect",
    concepts: ["tenses"],
    maal: "Du bruker hadde + partisipp om noe som skjedde før et annet tidspunkt i fortid.",
    husk: "Jeg hadde sendt rapporten før møtet startet.",
    intro: `Pluskvamperfektum is hadde plus the past participle. It is "past before the past". Use it when one event was already finished at a later past moment. Jeg hadde sendt rapporten før møtet startet. The sending happened first. The start of the meeting is the reference point, in preteritum.

Do not use hadde just because an event feels distant. I 2016 bodde jeg i Oslo is preteritum if you are not comparing it with a later past event. The past perfect needs that second, later anchor, even if the anchor is only implied: Da hun kom, hadde jeg allerede lagt ved tallene.

The participle is the same form as in perfektum. Only the auxiliary changes: har sendt now, hadde sendt before some past point. Ikke still follows the finite auxiliary in a main clause: Jeg hadde ikke fått svaret da møtet begynte.`,
    examples: [
      { no: "Jeg hadde sendt rapporten før møtet startet.", en: "I had sent the report before the meeting started." },
      { no: "Da lederen kom, hadde vi allerede begynt.", en: "When the manager arrived, we had already started." },
      { no: "Hun hadde ikke lest utkastet da vi ringte.", en: "She had not read the draft when we called." },
    ],
    vocab: [
      ["før", "before", "Jeg sendte den før møtet.", "I sent it before the meeting.", "prep"],
      ["da", "when (single past event)", "Da møtet startet, manglet ett tall.", "When the meeting started, one figure was missing.", "subjunction"],
      ["å begynne – begynte – begynt", "to begin", "Vi hadde begynt da hun kom.", "We had started when she arrived.", "verb"],
      ["å legge ved", "to attach", "Jeg hadde lagt ved tallene.", "I had attached the figures.", "verb"],
      ["å mangle", "to be missing", "Ett vedlegg manglet.", "One attachment was missing.", "verb"],
      ["å ringe – ringte", "to call", "Vi ringte henne etterpå.", "We called her afterwards.", "verb"],
      ["etterpå", "afterwards", "Vi sendte referatet etterpå.", "We sent the minutes afterwards.", "adv"],
    ],
    exercises: [
      mc(
        "tenses",
        "Hvilken setning viser at sendingen skjedde først?",
        ["Jeg hadde sendt rapporten før møtet startet.", "Jeg har sendt rapporten før møtet starter.", "Jeg sendte rapporten da møtet startet, samtidig.", "Jeg sender rapporten før møtet."],
        "Jeg hadde sendt rapporten før møtet startet.",
        "Hadde sendt places the sending before another past event. The present perfect looks back from now, and the last sentence is a present plan.",
        "Which sentence shows that the sending happened first?",
      ),
      fill(
        "tenses",
        "Fyll inn riktig hjelpeverb.",
        "Da hun kom, ___ vi allerede begynt.",
        ["hadde"],
        "The arrival is the past reference point (kom). The beginning was earlier, so hadde begynt.",
      ),
      order(
        "tenses",
        "Bygg setningen.",
        ["Jeg", "hadde", "ikke", "lest", "utkastet"],
        "Hadde is the finite verb, ikke follows it, and the participle comes next.",
        [],
        "Build: I had not read the draft.",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Jeg hadde sendte rapporten før møtet.",
        ["Jeg hadde sendt rapporten før møtet"],
        "Hadde takes the participle sendt, not the preterite sendte.",
      ),
      mc(
        "tenses",
        "Hvilken tid skal det være i «I 2016 bodde jeg i Oslo», når du ikke sammenligner med et senere tidspunkt?",
        ["preteritum", "pluskvamperfektum", "perfektum", "presens"],
        "preteritum",
        "A past year on its own is preteritum. Pluskvamperfektum needs an earlier-than-that relationship.",
        "Which tense fits when there is no later past anchor?",
      ),
      fill(
        "tenses",
        "Fyll inn partisipp av «å legge».",
        "Jeg hadde ___ ved tallene.",
        ["lagt"],
        "Å legge → la in the simple past, and lagt as the participle. Ved stays with the verb: lagt ved.",
      ),
      order(
        "tenses",
        "Bygg setningen.",
        ["Da", "lederen", "kom", "hadde", "vi", "begynt"],
        "The da-clause is first, so the main clause inverts: hadde vi begynt. Da introduces a single event in the past.",
        [],
        "Build: When the manager arrived, we had started.",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Hun hadde ikke leste utkastet da vi ringte.",
        ["Hun hadde ikke lest utkastet da vi ringte"],
        "The participle of lese is lest. Leste is the simple past and cannot follow hadde.",
      ),
    ],
  }),
  lesson({
    id: "b1-03",
    level: "B1",
    minutes: 14,
    title: "Adjektiv i bestemt form",
    titleEn: "Definite adjectives",
    concepts: ["adjectives", "definite"],
    maal: "Du legger -e på adjektivet når substantivet er bestemt.",
    husk: "Den nye rapporten, det viktige møtet, de store avvikene.",
    intro: `A definite noun with an adjective in front needs two marks. The adjective takes -e, and a determiner appears: den for masculine and feminine singular, det for neuter singular, de for plural.

Den nye rapporten er sendt.
Det viktige møtet starter ni.
De store avvikene gjelder lisenser.

The noun keeps its definite ending. That double marking is the next lesson's focus; here the aim is the adjective itself. Ny → nye, stor → store, viktig → viktige. Adjectives that already end in -e do not add another one: det moderne systemet.

Liten is still irregular. The definite singular is lille, not "litene": den lille feilen. The plural remains små: de små feilene. God becomes gode in the definite and plural, and the neuter indefinite is godt: et godt resultat, det gode resultatet.

Do not use this pattern after a possessive that already defines the noun. Say min nye rapport, not "min nye rapporten".`,
    examples: [
      { no: "Den nye rapporten er kort.", en: "The new report is short." },
      { no: "Det viktige møtet varer en time.", en: "The important meeting lasts one hour." },
      { no: "De små feilene er rettet.", en: "The small errors have been corrected." },
    ],
    vocab: [
      ["den nye", "the new (m/f definite)", "Den nye rutinen gjelder fra mandag.", "The new routine applies from Monday.", "phrase"],
      ["det viktige", "the important (neuter definite)", "Det viktige punktet er kostnad.", "The important item is cost.", "phrase"],
      ["lille", "little (definite singular)", "Den lille feilen er rettet.", "The small error has been corrected.", "adj"],
      ["et resultat", "a result", "Resultatet er godt.", "The result is good.", "noun"],
      ["en rutine", "a routine", "Vi har en ny rutine.", "We have a new routine.", "noun"],
      ["å rette", "to correct", "Jeg retter feilen i dag.", "I am correcting the error today.", "verb"],
      ["å vare", "to last", "Møtet varer en time.", "The meeting lasts one hour.", "verb"],
    ],
    exercises: [
      mc(
        "adjectives",
        "Velg riktig frase.",
        ["den nye rapporten", "den ny rapporten", "det nye rapporten", "den nye rapport"],
        "den nye rapporten",
        "Rapport is masculine, so the determiner is den. The adjective takes -e, and the noun stays definite.",
      ),
      fill(
        "adjectives",
        "Fyll inn bestemt form av «viktig».",
        "Det ___ møtet starter ni.",
        ["viktige"],
        "Definite adjectives end in -e, including those in -ig: viktige. The neuter determiner det is already in the sentence.",
      ),
      mc(
        "adjectives",
        "Hvilken form passer i «___ feilen er rettet»?",
        ["Den lille", "Den lite", "Den små", "Det lille"],
        "Den lille",
        "Feil is masculine here (en feil, feilen). Definite singular of liten is lille. Små is plural, and det would be neuter.",
      ),
      order(
        "definite",
        "Bygg setningen.",
        ["De", "store", "avvikene", "gjelder", "lisenser"],
        "Plural definite: de + adjective in -e + definite plural noun.",
        [],
        "Build: The large variances concern licences.",
      ),
      fix(
        "adjectives",
        "Skriv frasen riktig.",
        "min nye rapporten",
        ["min nye rapport", "den nye rapporten min"],
        "After min, the noun is indefinite: min nye rapport. If you want the definite noun, use den nye rapporten, or den nye rapporten min.",
      ),
      fill(
        "adjectives",
        "Fyll inn bestemt form av «god» foran «resultatet».",
        "Det ___ resultatet overrasket oss.",
        ["gode"],
        "Definite neuter still uses the -e form of the adjective: det gode resultatet. Godt is only the indefinite neuter.",
      ),
      mc(
        "adjectives",
        "Hvilken setning er riktig?",
        ["Det moderne systemet er tregt.", "Det moderne systemet er tregt er.", "Det modernee systemet er tregt.", "Den moderne systemet er tregt."],
        "Det moderne systemet er tregt.",
        "Moderne already ends in -e, so it does not change. System is neuter: det systemet. The doubled last option in the source was a decoy; the correct sentence does not repeat the verb.",
      ),
      fix(
        "definite",
        "Skriv setningen riktig.",
        "De viktig avvikene er forklart.",
        ["De viktige avvikene er forklart"],
        "Plural definite adjectives need -e: viktige, and the determiner is de.",
      ),
    ],
  }),
  lesson({
    id: "b1-04",
    level: "B1",
    minutes: 14,
    title: "Dobbel bestemthet",
    titleEn: "Double definiteness",
    concepts: ["definite", "adjectives"],
    maal: "Du skriver den / det / de + adjektiv + bestemt substantiv.",
    husk: "Det nye budsjettet, ikke «det nye budsjett».",
    intro: `Double definiteness means the phrase is marked definite twice: once with den, det or de, and once with the ending on the noun. You need both when an adjective (or a participle used as an adjective) stands in front.

Det nye budsjettet er vedtatt.
Den vedlagte rapporten gjelder september.
De siste tallene kom i går.

Without an adjective, do not add den/det/de just to say "the": budsjettet, not "det budsjettet", unless you mean "that budget" as a demonstrative. Context usually makes that demonstrative reading clear because it contrasts two budgets.

These words already contain definiteness, so the pattern changes. Hele rapporten, neste møte, forrige uke. Etter en possessiv: mitt nye budsjett, not "mitt nye budsjettet". Denne and dette already point: denne nye rapporten is correct, because denne replaces den, and the noun stays definite.`,
    examples: [
      { no: "Det nye budsjettet gjelder neste år.", en: "The new budget applies to next year." },
      { no: "Den vedlagte rapporten viser et lite avvik.", en: "The attached report shows a small variance." },
      { no: "Jeg har lest hele rapporten.", en: "I have read the whole report." },
    ],
    vocab: [
      ["vedlagt", "attached", "Den vedlagte filen er oppdatert.", "The attached file has been updated.", "adj"],
      ["siste", "last; latest", "De siste tallene er kontrollert.", "The latest figures have been checked.", "adj"],
      ["neste", "next", "Neste møte er på tirsdag.", "The next meeting is on Tuesday.", "adj"],
      ["hel", "whole", "Jeg leste hele referatet.", "I read the whole set of minutes.", "adj"],
      ["å gjelde", "to apply; to concern", "Dette gjelder Q3.", "This concerns Q3.", "verb"],
      ["å vedta", "to adopt; to decide", "Styret vedtok budsjettet.", "The board adopted the budget.", "verb"],
      ["et styre", "a board", "Styret møtes i oktober.", "The board meets in October.", "noun"],
    ],
    exercises: [
      mc(
        "definite",
        "Hvilken frase er riktig?",
        ["det nye budsjettet", "det nye budsjett", "nye budsjettet", "den nye budsjettet"],
        "det nye budsjettet",
        "Neuter det, adjective in -e, and the definite noun budsjettet. All three pieces are required.",
      ),
      fill(
        "definite",
        "Fyll inn determinativen.",
        "___ vedlagte rapporten ligger i saken.",
        ["Den", "den"],
        "Rapporten is masculine singular, so den. The adjective vedlagte already has -e.",
      ),
      order(
        "definite",
        "Bygg setningen.",
        ["De", "siste", "tallene", "kom", "i", "går"],
        "De siste tallene: plural determiner, adjective in -e, definite plural noun.",
        [],
        "Build: The latest figures arrived yesterday.",
      ),
      fix(
        "definite",
        "Skriv frasen riktig.",
        "mitt nye budsjettet",
        ["mitt nye budsjett"],
        "A possessive replaces the den/det/de pattern. The noun is indefinite: mitt nye budsjett.",
      ),
      mc(
        "definite",
        "Hvilken setning er riktig?",
        ["Jeg har lest hele rapporten.", "Jeg har lest den hele rapporten.", "Jeg har lest hele den rapport.", "Jeg har lest hel rapporten."],
        "Jeg har lest hele rapporten.",
        "Hele stands directly before a definite noun and does not take den. Hel rapporten misses the -e.",
      ),
      fill(
        "adjectives",
        "Fyll inn. Ingen «den».",
        "___ møte er på tirsdag.",
        ["Neste", "neste"],
        "Neste møte is the ordinary phrase, with an indefinite noun and no den.",
      ),
      fix(
        "definite",
        "Skriv setningen riktig.",
        "Jeg sender det budsjett i dag.",
        ["Jeg sender budsjettet i dag"],
        "With no adjective, “the budget” is just budsjettet. Det budsjett is neither the double-definite pattern nor a complete demonstrative.",
      ),
      mc(
        "definite",
        "Hva er riktig med «denne»?",
        ["denne nye rapporten", "denne nye rapport", "den nye denne rapporten", "dette nye rapporten"],
        "denne nye rapporten",
        "Denne replaces den. The adjective still has -e, and the noun stays definite. Dette would be neuter.",
      ),
    ],
  }),
  lesson({
    id: "b1-05",
    level: "B1",
    minutes: 14,
    title: "Sin, hans og hennes",
    titleEn: "sin, hans and hennes",
    concepts: ["possessives"],
    maal: "Du lar sin peke på subjektet, og hans eller hennes på noen andre.",
    husk: "Lederen leste rapporten sin. Hun leste rapporten hans.",
    intro: `Sin, sitt and sine point back to the subject of the same clause. They agree with the object, just like min/mitt/mine. Lederen leste rapporten sin means the manager read their own report. Lederen avsluttet møtet sitt: møtet is neuter, so sitt. Lederen leste rapportene sine: plural, so sine.

Hans and hennes do not point to the subject. They point to another man or another woman. Lederen leste rapporten hans means the manager read some other man's report. If the subject is Anna, Anna sendte prognosen hennes means Anna sent another woman's forecast. Anna sendte prognosen sin means she sent her own.

The subject of the clause is what matters, not the subject of the previous sentence. Per sa at Anna hadde glemt rapporten sin: sin points to Anna, the subject of the at-clause. Per sa at Anna hadde glemt rapporten hans: hans can point to Per. In a simple sentence, if you are the subject and the owner, use min, not sin. Jeg leste rapporten min, never "jeg leste rapporten sin".`,
    examples: [
      { no: "Lederen sendte rapporten sin til styret.", en: "The manager sent their own report to the board." },
      { no: "Anna leste prognosen hans før møtet.", en: "Anna read his forecast before the meeting." },
      { no: "Per sa at Anna hadde glemt notatene sine.", en: "Per said that Anna had forgotten her own notes." },
    ],
    vocab: [
      ["sin", "his/her/their own (m/f)", "Hun avsluttet saken sin.", "She closed her own case.", "pronoun"],
      ["sitt", "his/her/their own (neuter)", "Han utsatte møtet sitt.", "He postponed his own meeting.", "pronoun"],
      ["sine", "his/her/their own (plural)", "De samlet notatene sine.", "They gathered their own notes.", "pronoun"],
      ["hans", "his (another man)", "Jeg leste rapporten hans.", "I read his report.", "pronoun"],
      ["hennes", "her (another woman)", "Vi fikk utkastet hennes i går.", "We received her draft yesterday.", "pronoun"],
      ["en prognose", "a forecast", "Prognosen er oppdatert.", "The forecast has been updated.", "noun"],
      ["å utsette", "to postpone", "Vi utsetter møtet.", "We are postponing the meeting.", "verb"],
    ],
    exercises: [
      mc(
        "possessives",
        "Lederen (kvinne) leste sin egen rapport. Hva er riktig?",
        ["Lederen leste rapporten sin.", "Lederen leste rapporten hennes.", "Lederen leste rapporten hans.", "Lederen leste sin rapporten."],
        "Lederen leste rapporten sin.",
        "The owner is the subject of the same clause, so sin. Hennes would mean another woman. The noun is definite before sin: rapporten sin.",
        "The manager read her own report.",
      ),
      mc(
        "possessives",
        "Anna leste Karis prognose. Kari er en kvinne. Anna er subjekt.",
        ["Anna leste prognosen hennes.", "Anna leste prognosen sin.", "Anna leste prognosen sitt.", "Anna leste hennes prognosen."],
        "Anna leste prognosen hennes.",
        "The owner is not the subject, so hennes. Sin would mean Anna's own forecast. Sitt would also be the wrong gender.",
      ),
      fill(
        "possessives",
        "Fyll inn. Møtet er intetkjønn, og subjektet eier det.",
        "Han utsatte møtet ___.",
        ["sitt"],
        "The owner is the subject, and møtet is neuter, so sitt.",
      ),
      fill(
        "possessives",
        "Fyll inn. «I» er subjekt og eier.",
        "Jeg har sendt rapporten ___.",
        ["min"],
        "Sin cannot point to jeg. When the subject is jeg, du, vi or dere, use min, din, vår or their inflected forms.",
      ),
      order(
        "possessives",
        "Bygg setningen. Anna glemte sine egne notater.",
        ["Anna", "glemte", "notatene", "sine"],
        "Plural object, owner is the subject: sine after the definite noun.",
        [],
        "Build: Anna forgot her own notes.",
      ),
      fix(
        "possessives",
        "Skriv setningen riktig. Det er Pers rapport, og Anna er subjekt.",
        "Anna sendte rapporten sin fra Per.",
        ["Anna sendte rapporten hans"],
        "Sin would make the report Anna's. Another man's report is hans. The added words fra Per are not needed once hans is in place.",
      ),
      mc(
        "possessives",
        "Hvem eier notatene? «Per sa at Anna hadde glemt notatene sine.»",
        ["Anna", "Per", "noen utenfor setningen", "både Per og Anna"],
        "Anna",
        "Sine stands in the at-clause, whose subject is Anna. It does not point all the way out to Per.",
        "Who owns the notes?",
      ),
      fix(
        "possessives",
        "Skriv setningen riktig.",
        "De samlet notatet sine.",
        ["De samlet notatene sine", "De samlet notatet sitt"],
        "Sine needs a plural noun: notatene sine. A single neuter note would be notatet sitt.",
      ),
    ],
  }),
  lesson({
    id: "b1-06",
    level: "B1",
    minutes: 14,
    title: "For, om, av, med og hos",
    titleEn: "for, om, av, med and hos",
    concepts: ["prepositions"],
    maal: "Du velger preposisjon i faste faglige uttrykk.",
    husk: "en rapport om, avviket i, ansvar for, hos revisor.",
    intro: `These prepositions are best learned in phrases, not as one English equivalent.

Om corresponds to "about" in snakke om, en rapport om, et møte om. Om also means "in" with a future delay: om to dager = in two days. Do not use om for a weekday; that is på fredag.

For often marks the person who receives a benefit or carries a responsibility: ansvar for budsjettet, en fordel for driften, vanskelig for oss. It is not the usual preposition for a recipient of a sent object. That is til: sende til ledelsen.

Av marks source or a partitive: en av rapportene, skrevet av Anna, et avvik på to prosent av budsjettet. Med means "with" and joins an instrument or an accompanying thing: med vedlegg, med vennlig hilsen, sammen med teamet.

Hos is "at the place of a person or organisation": hos revisor, hos legen. Employment is usually i: Jeg jobber i Avinor, not "hos Avinor", though hos occurs when you mean "at their office". Prefer i Avinor for the employer.`,
    examples: [
      { no: "Jeg skriver en rapport om lisenskostnadene.", en: "I am writing a report about the licence costs." },
      { no: "Anna har ansvar for budsjettet.", en: "Anna is responsible for the budget." },
      { no: "Tallene ligger hos revisor. Vi får svaret om to dager.", en: "The figures are with the auditor. We will get the answer in two days." },
    ],
    vocab: [
      ["ansvar for", "responsibility for", "Jeg har ansvar for oppfølgingen.", "I am responsible for the follow-up.", "phrase"],
      ["en rapport om", "a report on", "Rapporten om Q3 er kort.", "The report on Q3 is short.", "phrase"],
      ["om to dager", "in two days", "Fristen er om to dager.", "The deadline is in two days.", "phrase"],
      ["en av", "one of", "En av tallene stemmer ikke.", "One of the figures does not add up.", "phrase"],
      ["med vedlegg", "with an attachment", "Jeg sender e-posten med vedlegg.", "I am sending the email with an attachment.", "phrase"],
      ["hos", "at (someone's place)", "Tallene ligger hos revisor.", "The figures are with the auditor.", "prep"],
      ["en revisor", "an auditor", "Revisor stiller ett spørsmål.", "The auditor is asking one question.", "noun"],
    ],
    exercises: [
      fill(
        "prepositions",
        "Fyll inn preposisjon.",
        "Dette er en rapport ___ IT-kostnadene.",
        ["om"],
        "A report about a topic uses om. På would mean physically on top of the costs.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjon.",
        "Hun har ansvar ___ prognosen.",
        ["for"],
        "Ansvar styrer preposisjonen for. This is a fixed combination.",
      ),
      mc(
        "prepositions",
        "Hva betyr «om to dager»?",
        ["in two days", "about two days", "for two days", "two days ago"],
        "in two days",
        "With a time quantity looking forward, om means “in”. “For two days” of duration is i to dager. “Two days ago” is for to dager siden.",
        "What does om to dager mean?",
      ),
      order(
        "prepositions",
        "Bygg setningen.",
        ["En", "av", "tallene", "stemmer", "ikke"],
        "En av + definite plural. Ikke comes after the finite verb stemmer.",
        [],
        "Build: One of the figures does not add up.",
      ),
      fix(
        "prepositions",
        "Skriv setningen riktig.",
        "Jeg sender rapporten for ledelsen.",
        ["Jeg sender rapporten til ledelsen"],
        "The recipient of something you send is til. For ledelsen would mean “for the benefit of management”, which is a different claim.",
      ),
      mc(
        "prepositions",
        "Hvilken setning er mest naturlig om arbeidsgiver?",
        ["Jeg jobber i Avinor.", "Jeg jobber hos Avinor siden ti år.", "Jeg jobber om Avinor.", "Jeg jobber til Avinor."],
        "Jeg jobber i Avinor.",
        "Use i with the employer. The second option also uses a wrong time construction; “for ten years” up to now is i ti år.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjon.",
        "Filen ligger ___ revisor.",
        ["hos"],
        "Hos revisor means the file is with the auditor, at their end of the process.",
      ),
      fix(
        "prepositions",
        "Skriv setningen riktig.",
        "Vi snakket for budsjettet i en time.",
        ["Vi snakket om budsjettet i en time"],
        "Snakke om is the combination for a topic. I en time is the duration and can stay.",
      ),
    ],
  }),
  lesson({
    id: "b1-07",
    level: "B1",
    minutes: 13,
    title: "Og, men, eller og for",
    titleEn: "Coordinating conjunctions",
    concepts: ["conjunctions", "punctuation"],
    maal: "Du binder helsetninger uten å lage leddsetning ved en feil.",
    husk: "Jeg skriver, men hun sender. Komma når neste setning har eget subjekt.",
    intro: `Og, men, eller and for are coordinating conjunctions. They join two main clauses, and each main clause keeps ordinary V2 word order. There is no subordinate-clause pattern after them.

Jeg skriver utkastet, og hun sender det.
Tallene er klare, men prognosen mangler.
Vi kan utsette møtet, eller vi kan ta det på fredag.
Jeg blir på kontoret, for rapporten må ut i dag.

For here means "because", and it is more written than fordi. Fordi is a subordinator and starts a subordinate clause. For does not. A comma is used between main clauses when the second clause has its own subject and a finite verb. If the subject is shared and not repeated, there is no comma and no second subject: Jeg skriver og sender rapporten.

Eller and og follow the same comma rule. Men almost always has a comma, because the contrast introduces a new claim: Det er sent, men vi rekker det.`,
    examples: [
      { no: "Jeg skriver utkastet, og hun sender det.", en: "I write the draft, and she sends it." },
      { no: "Tallene er klare, men prognosen mangler.", en: "The figures are ready, but the forecast is missing." },
      { no: "Jeg blir på kontoret, for rapporten må ut i dag.", en: "I am staying at the office, because the report has to go out today." },
    ],
    vocab: [
      ["og", "and", "Jeg skriver og sender rapporten.", "I write and send the report.", "conjunction"],
      ["men", "but", "Kort, men tydelig.", "Short, but clear.", "conjunction"],
      ["eller", "or", "Mandag eller tirsdag passer.", "Monday or Tuesday works.", "conjunction"],
      ["for", "for; because (coordinating)", "Jeg ringer, for e-posten kom ikke frem.", "I am calling, because the email did not arrive.", "conjunction"],
      ["å rekke", "to make it; to reach in time", "Vi rekker fristen.", "We will meet the deadline.", "verb"],
      ["tydelig", "clear", "Konklusjonen er tydelig.", "The conclusion is clear.", "adj"],
      ["å mangle", "to be missing", "Ett bilag mangler.", "One voucher is missing.", "verb"],
    ],
    exercises: [
      mc(
        "punctuation",
        "Hvilken setning har riktig komma?",
        ["Jeg skriver utkastet, og hun sender det.", "Jeg skriver utkastet og hun sender det.", "Jeg skriver, og sender rapporten.", "Jeg skriver utkastet, og sender det hun."],
        "Jeg skriver utkastet, og hun sender det.",
        "Use a comma when og joins two main clauses with different subjects. Do not use a comma when the same subject is shared and omitted: Jeg skriver og sender rapporten.",
      ),
      order(
        "conjunctions",
        "Bygg setningen.",
        ["Tallene", "er", "klare", "men", "prognosen", "mangler"],
        "Each half is a main clause. Men does not cause inversion by itself; prognosen mangler has subject then verb.",
        [],
        "Build: The figures are ready, but the forecast is missing.",
      ),
      mc(
        "conjunctions",
        "Hva slags ord er «for» i «Jeg blir, for rapporten må ut»?",
        ["en konjunksjon som betyr fordi", "en preposisjon", "en subjunksjon med leddsetningsordstilling", "et adverb som krever inversjon"],
        "en konjunksjon som betyr fordi",
        "This for means because, but the clause after it is still a main clause. Fordi would be the subordinator.",
        "What is for in this sentence?",
      ),
      fill(
        "conjunctions",
        "Fyll inn konjunksjonen.",
        "Vi kan utsette saken, ___ vi kan ta den på fredag.",
        ["eller"],
        "Eller presents an alternative. The second clause keeps a subject, vi, so the comma stays.",
      ),
      fix(
        "punctuation",
        "Skriv setningen med riktig komma.",
        "Jeg skriver, og sender rapporten.",
        ["Jeg skriver og sender rapporten"],
        "The subject is shared and not repeated, so there is no comma before og.",
      ),
      fix(
        "conjunctions",
        "Skriv setningen riktig. Bruk konjunksjonen for.",
        "Jeg ringer for e-posten kom ikke frem.",
        ["Jeg ringer, for e-posten kom ikke frem"],
        "When for joins two main clauses, put a comma before it. The second clause still has subject before verb.",
      ),
      mc(
        "conjunctions",
        "Hvilken fortsettelse er en helsetning etter «men»?",
        ["men vi rekker fristen", "men at vi rekker fristen", "men rekker vi fristen som leddsetning", "men vi fristen rekker"],
        "men vi rekker fristen",
        "After men, a normal main clause follows: subject then verb. At would start a subordinate clause and is not required here.",
      ),
      order(
        "conjunctions",
        "Bygg setningen der subjektet ikke gjentas.",
        ["Jeg", "skriver", "og", "sender", "rapporten"],
        "One subject, two verbs, no comma. Rapporten is the object of sender.",
        [],
        "Build: I write and send the report.",
      ),
    ],
  }),
  lesson({
    id: "b1-08",
    level: "B1",
    minutes: 15,
    title: "At, fordi, hvis og når",
    titleEn: "Subordinate clauses",
    concepts: ["conjunctions", "adverb-sub", "v2"],
    maal: "Du kjenner igjen en leddsetning og starter helsetningen riktig etter den.",
    husk: "Fordi tallene manglet, utsatte vi møtet.",
    intro: `At, fordi, hvis, dersom, når and da are subordinators. The clause they start is not a main clause. Two consequences matter already.

First, if the subordinate clause stands in front, the whole clause is the first element of the main clause. The finite verb of the main clause comes next. Fordi tallene manglet, utsatte vi møtet. Not "Fordi tallene manglet, vi utsatte møtet".

Second, ikke wants a different place inside the subordinate clause. You will drill that next, at B2. For now, notice the contrast: Jeg kommer ikke (main) and Hun sier at hun ikke kommer (subordinate). Do not invert inside the subordinate clause. The subject stays before the verb there: at hun ikke kommer, not "at kommer hun ikke".

Når is used for the future and for repeated times. Da is used for a single event in the past. Når jeg sender rapporten, legger jeg ved tallene. Da møtet startet, manglet ett bilag. Hvis and dersom set a condition. Dersom is a little more formal and fits memos. At introduces what someone says, thinks or writes: Jeg ser at avviket er lite. No comma before that at.`,
    examples: [
      { no: "Jeg ser at avviket er lite.", en: "I see that the variance is small." },
      { no: "Fordi tallene manglet, utsatte vi møtet.", en: "Because the figures were missing, we postponed the meeting." },
      { no: "Når jeg sender rapporten, legger jeg ved prognosen.", en: "When I send the report, I attach the forecast." },
    ],
    vocab: [
      ["fordi", "because", "Jeg blir fordi rapporten ikke er klar.", "I am staying because the report is not ready.", "subjunction"],
      ["hvis", "if", "Hvis du vil, kan vi ta det på norsk.", "If you want, we can do it in Norwegian.", "subjunction"],
      ["dersom", "if (more formal)", "Dersom fristen ryker, varsler jeg.", "If the deadline is missed, I will give notice.", "subjunction"],
      ["når", "when (future or repeated)", "Når tallene er klare, sender jeg dem.", "When the figures are ready, I will send them.", "subjunction"],
      ["da", "when (one past event)", "Da jeg kom, hadde møtet startet.", "When I arrived, the meeting had started.", "subjunction"],
      ["å utsette", "to postpone", "Vi utsetter saken til fredag.", "We are postponing the item until Friday.", "verb"],
      ["å varsle", "to notify", "Jeg varsler ledelsen i dag.", "I am notifying management today.", "verb"],
    ],
    exercises: [
      order(
        "v2",
        "Bygg helsetningen etter leddsetningen.",
        ["Fordi", "tallene", "manglet", "utsatte", "vi", "møtet"],
        "The fordi-clause is the first element. The main-clause verb utsatte is next, then the subject vi.",
        [],
        "Build: Because the figures were missing, we postponed the meeting.",
      ),
      mc(
        "conjunctions",
        "Hvilken setning er riktig?",
        ["Jeg ser at avviket er lite.", "Jeg ser, at avviket er lite.", "Jeg ser at er avviket lite.", "Jeg ser at avviket lite er."],
        "Jeg ser at avviket er lite.",
        "No comma before a necessary at-clause. Inside it, the subject comes before the verb. There is no inversion.",
      ),
      mc(
        "conjunctions",
        "Velg riktig subjunksjon. Hendelsen skjedde én gang i fortid.",
        ["Da jeg kom, hadde møtet startet.", "Når jeg kom, hadde møtet startet.", "Hvis jeg kom, hadde møtet startet.", "At jeg kom, hadde møtet startet."],
        "Da jeg kom, hadde møtet startet.",
        "Da is the past, single-event “when”. Når would be repeated or future. Hvis would be a condition.",
        "The event happened once in the past.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn ikke på den plassen leddsetningen krever.",
        "Hun sier at hun ___ kommer.",
        ["ikke"],
        "In the subordinate clause, ikke stands before the verb. The main-clause pattern would have been Hun kommer ikke.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Hvis tallene kommer, vi sender rapporten.",
        ["Hvis tallene kommer, sender vi rapporten"],
        "After a fronted hvis-clause, invert the main clause. Sender is the second element of the whole sentence.",
      ),
      fill(
        "conjunctions",
        "Fyll inn den litt mer formelle subjunksjonen for «if».",
        "___ fristen ryker, varsler jeg ledelsen.",
        ["Dersom", "dersom"],
        "Dersom fits a memo or a report. Hvis would also be correct Norwegian, but this item asks for the more formal subordinator.",
      ),
      order(
        "conjunctions",
        "Bygg setningen.",
        ["Når", "tallene", "er", "klare", "sender", "jeg", "dem"],
        "Når-clause first, then inversion in the main clause: sender jeg dem.",
        [],
        "Build: When the figures are ready, I will send them.",
      ),
      fix(
        "conjunctions",
        "Skriv setningen riktig.",
        "Jeg blir fordi at rapporten ikke er klar.",
        ["Jeg blir fordi rapporten ikke er klar"],
        "Fordi already subordinates the clause. Do not add at after it. Ikke stays before the verb inside the subordinate clause.",
      ),
    ],
  }),
];
