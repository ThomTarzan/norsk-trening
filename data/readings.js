import { moreReadings } from "./readings-more.js";
import { rq, sentencesOf, readingPlain } from "./reading-build.js";

const question = rq;

/** Short texts with a matching recording. Questions are multiple choice. */
const coreReadings = [
  {
    id: "les-a2-01",
    level: "A2",
    minutes: 6,
    title: "Mandag morgen",
    titleEn: "Monday morning",
    audio: "audio/les-a2-01.mp3",
    voice: "nb-NO-PernilleNeural",
    dictation: [
      "Møtet starter klokka ni.",
      "Hun skriver det på norsk.",
      "Hun tar toget hjem klokka fire.",
    ],
    paragraphs: [
      [
        "Tsvitana står opp klokka sju.",
        "Hun spiser frokost og drikker kaffe.",
        "Så tar hun toget til jobben.",
        "Hun jobber i Avinor, og kontoret ligger i Oslo.",
      ],
      [
        "På kontoret hilser hun på kollegaene.",
        "«God morgen», sier hun.",
        "Møtet starter klokka ni.",
        "Tsvitana åpner kalenderen.",
        "Hun har tre møter i dag.",
      ],
      [
        "Etter lunsj skal hun skrive et kort notat.",
        "Hun skriver det på norsk.",
        "Om ettermiddagen er hun litt sliten, men hun er fornøyd.",
        "Hun tar toget hjem klokka fire.",
        "I kveld vil hun lese litt og legge seg tidlig.",
      ],
    ],
    questions: [
      question(
        "les-a2-01-q1",
        "verb-present",
        "Når starter møtet?",
        ["Klokka ni.", "Klokka sju.", "Klokka fire.", "Etter lunsj."],
        "Klokka ni.",
        "The meeting starts at nine. Seven is when she gets up, and four is when she takes the train home.",
      ),
      question(
        "les-a2-01-q2",
        "tenses",
        "Hva skal hun gjøre etter lunsj?",
        ["Skrive et kort notat.", "Ta toget til jobben.", "Spise frokost.", "Legge seg."],
        "Skrive et kort notat.",
        "After lunch she is going to write a short note. The train to work and breakfast are earlier.",
      ),
      question(
        "les-a2-01-q3",
        "verb-present",
        "Hvilken setning stemmer med teksten?",
        [
          "Hun tar toget hjem klokka fire.",
          "Hun tar toget hjem klokka ni.",
          "Hun kjører bil til jobben.",
          "Hun skriver notatet på engelsk.",
        ],
        "Hun tar toget hjem klokka fire.",
        "She takes the train home at four, and she writes the note in Norwegian.",
      ),
    ],
  },
  {
    id: "les-b1-01",
    level: "B1",
    minutes: 7,
    title: "En kort e-post",
    titleEn: "A short e-mail",
    audio: "audio/les-b1-01.mp3",
    voice: "nb-NO-PernilleNeural",
    dictation: [
      "Prognosen er ellers uendret.",
      "Kan du se på vedlegget før møtet på torsdag?",
      "Jeg oppdaterer statusen så snart bilaget er funnet.",
    ],
    paragraphs: [
      [
        "Hei Kari.",
        "Jeg sender et kort notat om status.",
        "Vi har gått gjennom tallene for september.",
        "De fleste kontoene er avstemt, men én konto mangler et bilag.",
      ],
      [
        "Jeg har bedt teamet om å finne bilaget innen onsdag.",
        "Hvis vi ikke finner det, tar jeg det med i statusen til ledelsen.",
        "Prognosen er ellers uendret.",
      ],
      [
        "Kan du se på vedlegget før møtet på torsdag?",
        "Gi gjerne beskjed hvis noe er uklart.",
        "Jeg oppdaterer statusen så snart bilaget er funnet.",
        "Vennlig hilsen, Tsvitana.",
      ],
    ],
    questions: [
      question(
        "les-b1-01-q1",
        "nouns-gender",
        "Hva mangler?",
        ["Et bilag.", "Hele prognosen.", "Møtet på torsdag.", "Hilsenen."],
        "Et bilag.",
        "One cost centre is missing a document. The forecast is otherwise unchanged.",
      ),
      question(
        "les-b1-01-q2",
        "prepositions",
        "Når skal Kari se på vedlegget?",
        ["Før møtet på torsdag.", "Innen onsdag.", "I september.", "Etter ledelsens møte."],
        "Før møtet på torsdag.",
        "Wednesday is the team's deadline for the document. Kari is asked to look before Thursday's meeting.",
      ),
      question(
        "les-b1-01-q3",
        "tenses",
        "Hvilken setning stemmer med e-posten?",
        ["Prognosen er uendret.", "Prognosen er slettet.", "Ingen tall er gjennomgått.", "Alle bilag mangler."],
        "Prognosen er uendret.",
        "The figures have been reviewed, and the forecast is otherwise unchanged.",
      ),
    ],
  },
  {
    id: "les-b1-02",
    level: "B1",
    minutes: 7,
    title: "Et kort referat",
    titleEn: "Short minutes",
    audio: "audio/les-b1-02.mp3",
    voice: "nb-NO-PernilleNeural",
    dictation: [
      "Tsvitana sa at utkastet er klart.",
      "Filene ligger hos Per.",
      "Vedtak: Tsvitana sender utkastet innen fredag.",
    ],
    paragraphs: [
      ["Referat fra et kort møte tolvte oktober.", "Til stede var Kari, Per og Tsvitana."],
      [
        "Sak 1 var status på rapporten.",
        "Tsvitana sa at utkastet er klart.",
        "Kari ba henne sende det innen fredag.",
      ],
      [
        "Sak 2 var møtet med revisor.",
        "Per har snakket med revisor, og de møtes neste uke.",
        "Filene ligger hos Per.",
      ],
      [
        "Vedtak: Tsvitana sender utkastet innen fredag.",
        "Per kaller inn til møtet med revisor.",
        "Neste statusmøte er om to uker.",
        "Da går vi gjennom kommentarene fra revisor.",
        "Kari leder møtet og skriver referatet.",
      ],
    ],
    questions: [
      question(
        "les-b1-02-q1",
        "pronouns",
        "Hvem sender utkastet?",
        ["Tsvitana.", "Per.", "Revisor.", "Kari."],
        "Tsvitana.",
        "Kari asked her to send it, and the decision names Tsvitana.",
      ),
      question(
        "les-b1-02-q2",
        "prepositions",
        "Hvor ligger filene?",
        ["Hos Per.", "Hos revisor.", "Hos Kari.", "I statusen til ledelsen."],
        "Hos Per.",
        "Hos is used for a person who has the files. Per has spoken to the auditor, but the files are with Per.",
      ),
      question(
        "les-b1-02-q3",
        "prepositions",
        "Hva er fristen for utkastet?",
        ["Innen fredag.", "Neste uke.", "Tolvte oktober.", "Innen onsdag."],
        "Innen fredag.",
        "Next week is the meeting with the auditor. The draft is due by Friday, and Friday is included.",
      ),
    ],
  },
  {
    id: "les-b2-01",
    level: "B2",
    minutes: 8,
    title: "Status til ledelsen",
    titleEn: "Status to management",
    audio: "audio/les-b2-01.mp3",
    voice: "nb-NO-PernilleNeural",
    dictation: [
      "Det skyldes en prisjustering, ikke et nytt kjøp.",
      "Jeg sender et oppdatert utkast innen torsdag.",
      "Den er ikke høy, men den er reell.",
    ],
    paragraphs: [
      [
        "Status per 16. oktober.",
        "Leveransen av månedsrapporten ligger etter planen.",
        "Utkastet skulle ha vært ferdig i går, men vi mangler avstemming av lisenskostnaden.",
        "Avviket er på omtrent fire prosent sammenlignet med budsjettet.",
        "Det skyldes en prisjustering, ikke et nytt kjøp.",
      ],
      [
        "Vi holder likevel fristen mot ledelsen.",
        "Jeg sender et oppdatert utkast innen torsdag.",
        "Prognosen tilsier at vi fortsatt er innenfor rammen for året, dersom prisjusteringen ikke blir større i november.",
      ],
      [
        "Risikoen er at bilaget kommer sent.",
        "Jeg tar den med i notatet.",
        "Den er ikke høy, men den er reell.",
      ],
    ],
    questions: [
      question(
        "les-b2-01-q1",
        "register",
        "Hva skyldes avviket?",
        ["En prisjustering.", "Et nytt kjøp.", "En stengt rullebane.", "En sen frist mot ledelsen."],
        "En prisjustering.",
        "The variance is a price adjustment, not a new purchase.",
      ),
      question(
        "les-b2-01-q2",
        "prepositions",
        "Når kommer det oppdaterte utkastet?",
        ["Innen torsdag.", "I går.", "I november.", "16. oktober."],
        "Innen torsdag.",
        "16 October is the date of the status. The draft is promised by Thursday, Thursday included.",
      ),
      question(
        "les-b2-01-q3",
        "adverb-sub",
        "Hvilken leddsetning gjengir teksten riktig?",
        [
          "at avviket ikke skyldes et nytt kjøp",
          "at avviket skyldes ikke et nytt kjøp",
          "at ikke avviket skyldes et nytt kjøp",
          "at skyldes avviket ikke et nytt kjøp",
        ],
        "at avviket ikke skyldes et nytt kjøp",
        "In the subordinate clause, ikke stands before the verb skyldes.",
      ),
    ],
  },
  {
    id: "les-c1-01",
    level: "C1",
    minutes: 9,
    title: "Notat om et avvik",
    titleEn: "A note on a variance",
    audio: "audio/les-c1-01.mp3",
    voice: "nb-NO-PernilleNeural",
    dictation: [
      "Økningen skyldes en prisjustering hos leverandøren.",
      "Inntil videre tilsier prognosen at vi holder årsrammen.",
      "Jeg anbefaler at vi ikke endrer budsjettet nå.",
    ],
    paragraphs: [
      [
        "Notat til ledelsen.",
        "I september lå lisenskostnaden fire prosent over budsjettet.",
        "Økningen skyldes en prisjustering hos leverandøren.",
        "Kostnaden føres på kostnadssted 410 og periodiseres over tolv måneder, i tråd med budsjettet.",
      ],
      [
        "Avviket er i all hovedsak forklart.",
        "Ett bilag er likevel ikke mottatt.",
        "Når bilaget kommer, oppdaterer jeg prognosen.",
        "Inntil videre tilsier prognosen at vi holder årsrammen.",
      ],
      [
        "Jeg anbefaler at vi ikke endrer budsjettet nå.",
        "En endring ville blande en prisjustering sammen med et nytt vedtak.",
        "Jeg svarer med forbehold om at bilaget bekrefter beløpet.",
      ],
    ],
    questions: [
      question(
        "les-c1-01-q1",
        "register",
        "Hva anbefaler notatet?",
        [
          "At budsjettet ikke endres nå.",
          "At budsjettet økes med fire prosent.",
          "At kostnadssted 410 legges ned.",
          "At prognosen slettes.",
        ],
        "At budsjettet ikke endres nå.",
        "A price adjustment should not be mixed with a new budget decision.",
      ),
      question(
        "les-c1-01-q2",
        "passive",
        "Hvilken setning stemmer?",
        [
          "Økningen skyldes en prisjustering.",
          "Økningen er et nytt vedtak.",
          "Bilaget er mottatt.",
          "Årsrammen er allerede brutt.",
        ],
        "Økningen skyldes en prisjustering.",
        "The document has not arrived, and the forecast still says the yearly frame holds.",
      ),
      question(
        "les-c1-01-q3",
        "prepositions",
        "Hvilken formulering bruker notatet om sammenligningen?",
        ["sammenlignet med budsjettet", "i forhold til budsjettet", "ifølge til budsjettet", "på grunn av budsjettet"],
        "sammenlignet med budsjettet",
        "The note says sammenlignet med budsjettet. Avvik i forhold til budsjett is ordinary controller language, so that phrase is not treated as an error; it is simply not the wording of this note. Ifølge til is not a Norwegian phrase.",
      ),
    ],
  },
  {
    id: "les-c1-02",
    level: "C1",
    minutes: 9,
    title: "Lufthavn og IT",
    titleEn: "Airport operations and IT",
    audio: "audio/les-c1-02.mp3",
    voice: "nb-NO-PernilleNeural",
    dictation: [
      "Rullebanen var ikke stengt.",
      "Hendelsen er lukket.",
      "Den var ikke et budsjettavvik, og den påvirket ikke flytrafikken.",
    ],
    paragraphs: [
      [
        "Mandag morgen var punktligheten på lufthavnen god, selv om det hadde snødd i natt.",
        "Vinterdriften var i gang, og avgangen til Oslo gikk som planlagt.",
        "Rullebanen var ikke stengt.",
      ],
      [
        "Samtidig hadde IT-avdelingen en hendelse i tilgangssystemet.",
        "To medarbeidere fikk ikke logget på mellom klokka sju og åtte.",
        "Hendelsen er lukket.",
        "Den var ikke et budsjettavvik, og den påvirket ikke flytrafikken.",
      ],
      [
        "I statusen skiller jeg derfor mellom driften på lufthavnen og hendelsen i systemet.",
        "Ledelsen får begge deler i samme notat, men under hvert sitt punkt.",
        "Slik blir det tydelig hva som krever oppfølging, og hva som allerede er løst.",
      ],
    ],
    questions: [
      question(
        "les-c1-02-q1",
        "register",
        "Hva skjedde i IT-systemet?",
        [
          "En hendelse i tilgangssystemet.",
          "Et budsjettavvik på fire prosent.",
          "En stengt rullebane.",
          "En innstilt avgang til Oslo.",
        ],
        "En hendelse i tilgangssystemet.",
        "An IT incident is a hendelse. It is not a budget variance, and the flight to Oslo departed.",
      ),
      question(
        "les-c1-02-q2",
        "passive",
        "Hva stemmer om flytrafikken?",
        [
          "Avgangen til Oslo gikk som planlagt.",
          "Rullebanen var stengt.",
          "Punktligheten var dårlig.",
          "Vinterdriften var ikke i gang.",
        ],
        "Avgangen til Oslo gikk som planlagt.",
        "Punctuality was good, winter operations had started, and the runway stayed open.",
      ),
      question(
        "les-c1-02-q3",
        "conjunctions",
        "Hvorfor står de to sakene under hvert sitt punkt?",
        [
          "Fordi de ikke er samme type sak.",
          "Fordi ledelsen bare skal lese om IT.",
          "Fordi flytrafikken ble innstilt.",
          "Fordi hendelsen fortsatt er åpen.",
        ],
        "Fordi de ikke er samme type sak.",
        "Airport operations and the closed IT incident are reported together, but kept apart so the follow-up is clear.",
      ),
    ],
  },
];

export const readings = [...coreReadings, ...moreReadings];

export function readingMap() {
  return new Map(readings.map((reading) => [reading.id, reading]));
}

export { sentencesOf, readingPlain };
