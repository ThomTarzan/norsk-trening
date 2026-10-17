import { fill, fix, lesson, mc, order, rewrite } from "./build.js";

export const lessonsB2 = [
  lesson({
    id: "b2-01",
    level: "B2",
    minutes: 14,
    title: "Ikke og aldri i leddsetninger",
    titleEn: "ikke and aldri in subordinate clauses",
    concepts: ["adverb-sub"],
    maal: "Du setter ikke og aldri foran verbet når setningen er en leddsetning.",
    husk: "Hun sier at hun ikke kommer. I helsetning: Hun kommer ikke.",
    intro: `Sentence adverbs such as ikke, aldri and alltid stand after the finite verb in a main clause, but before the finite verb in a subordinate clause.

Main clause: Jeg har ikke sendt rapporten. Hun reiser aldri på søndag.
Subordinate clause: Hun sier at hun ikke har sendt rapporten. Jeg visste at hun aldri reiste på søndag.

The subordinate markers you already know are at, fordi, hvis, dersom, når, da, selv om and som. After them, the subject still comes first inside that clause. Then the sentence adverb, then the verb. Not "at hun har ikke sendt", and not "at har hun ikke sendt".

When there is an auxiliary, ikke stands before the auxiliary, not before the participle. At jeg ikke har sendt den. Both adverbs can appear, with the frequency adverb often before ikke: at hun vanligvis ikke sender rapporten på fredag.

This is the single most useful word-order correction if your written Norwegian is already fluent but still follows English "has not" in every clause.`,
    examples: [
      { no: "Hun sier at hun ikke kommer på møtet.", en: "She says that she is not coming to the meeting." },
      { no: "Jeg visste at han aldri hadde sett tallene.", en: "I knew that he had never seen the figures." },
      { no: "Det er et problem at vi ikke har fått prognosen.", en: "It is a problem that we have not received the forecast." },
    ],
    vocab: [
      ["en leddsetning", "a subordinate clause", "At-setningen er en leddsetning.", "The at-clause is a subordinate clause.", "noun"],
      ["selv om", "even though", "Selv om det er sent, sender jeg den.", "Even though it is late, I am sending it.", "subjunction"],
      ["vanligvis", "usually", "Jeg sender den vanligvis på fredag.", "I usually send it on Friday.", "adv"],
      ["å innse", "to realise", "Jeg innså at tallet ikke stemte.", "I realised that the figure did not add up.", "verb"],
      ["å stemme", "to add up; to be correct", "Tallet stemmer ikke.", "The figure does not add up.", "verb"],
      ["en helsetning", "a main clause", "Helsetningen har V2.", "The main clause has V2.", "noun"],
      ["aldri", "never", "Jeg har aldri sett dette avviket før.", "I have never seen this variance before.", "adv"],
    ],
    exercises: [
      mc(
        "adverb-sub",
        "Hvilken leddsetning har riktig ordstilling?",
        ["at hun ikke kommer", "at hun kommer ikke", "at ikke hun kommer", "at kommer hun ikke"],
        "at hun ikke kommer",
        "Subject, then ikke, then the verb. Ikke does not jump in front of the subject, and the verb does not come before the subject.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn adverbene i riktig rekkefølge som ett svar.",
        "Jeg visste at han ___ hadde sett tallene.",
        ["aldri"],
        "Aldri stands before the auxiliary hadde inside the at-clause.",
      ),
      order(
        "adverb-sub",
        "Bygg leddsetningen slik den står etter «hun sier».",
        ["at", "hun", "ikke", "har", "sendt", "rapporten"],
        "Ikke comes before har, and sendt stays at the end of the verb group.",
        [],
        "Build the clause after “she says”.",
      ),
      fix(
        "adverb-sub",
        "Skriv setningen riktig.",
        "Det er et problem at vi har ikke fått prognosen.",
        ["Det er et problem at vi ikke har fått prognosen"],
        "The at-clause is subordinate, so ikke moves in front of har. The main clause Det er et problem is already correct.",
      ),
      mc(
        "adverb-sub",
        "Hvilken setning er en riktig helsetning, ikke en leddsetning?",
        ["Hun kommer ikke.", "At hun ikke kommer.", "Fordi hun ikke kommer.", "Selv om hun ikke kommer."],
        "Hun kommer ikke.",
        "Only the first is a main clause, with ikke after the verb. The others are subordinate fragments and correctly put ikke before the verb.",
      ),
      order(
        "adverb-sub",
        "Bygg setningen.",
        ["Selv om", "det", "er", "sent", "sender", "jeg", "den"],
        "Inside the subordinate clause there is no ikke. The main clause still inverts after the fronted clause: sender jeg.",
        [],
        "Build: Even though it is late, I am sending it.",
      ),
      fix(
        "adverb-sub",
        "Skriv setningen riktig.",
        "Hun sier at vanligvis hun ikke sender rapporten på fredag.",
        ["Hun sier at hun vanligvis ikke sender rapporten på fredag"],
        "The subject stays before the sentence adverbs. Vanligvis comes before ikke, and both come before the verb.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn de to adverbene. Skriv dem med mellomrom.",
        "Anna sier at hun ___ sender utkastet på søndag.",
        ["vanligvis ikke"],
        "Frequency adverb, then ikke, then the verb: vanligvis ikke sender.",
      ),
    ],
  }),
  lesson({
    id: "b2-02",
    level: "B2",
    minutes: 13,
    title: "Alltid, dessverre og likevel",
    titleEn: "More sentence adverbs",
    concepts: ["adverb-sub", "v2"],
    maal: "Du plasserer flere setningsadverb likt i hoved- og leddsetning.",
    husk: "Jeg kan dessverre ikke komme. Hun sier at hun dessverre ikke kan komme.",
    intro: `Dessverre, kanskje, derfor, likevel and alltid are sentence adverbs. In a main clause they take the same slot as ikke, after the finite verb: Jeg kan dessverre ikke komme. Therefore often likes the first slot instead, and then the verb follows: Derfor utsetter vi møtet. Likevel can do the same: Likevel sender jeg den i dag.

Inside a subordinate clause they move in front of the verb, together with ikke. The usual order is a commenting adverb, then ikke: at hun dessverre ikke kan komme. Derfor is less happy inside a short at-clause; Norwegians often start the next main clause with Derfor instead.

Kanskje is a small exception in main clauses. It can be followed by inversion or by subject-verb order: Kanskje kommer hun. Kanskje hun kommer. Both are used. In a subordinate clause there is no choice: at hun kanskje kommer, with the subject first.

Do not put these adverbs in the empty slot between the subject and the verb of a main clause. Jeg dessverre kan ikke komme is wrong.`,
    examples: [
      { no: "Jeg kan dessverre ikke komme på møtet.", en: "Unfortunately I cannot come to the meeting." },
      { no: "Hun skriver at hun dessverre ikke kan komme.", en: "She writes that unfortunately she cannot come." },
      { no: "Likevel sender jeg et kort notat i dag.", en: "Even so, I am sending a short note today." },
    ],
    vocab: [
      ["dessverre", "unfortunately", "Jeg kan dessverre ikke delta.", "Unfortunately I cannot attend.", "adv"],
      ["kanskje", "perhaps", "Kanskje kommer tallene i morgen.", "Perhaps the figures will arrive tomorrow.", "adv"],
      ["likevel", "even so; nevertheless", "Likevel holder vi fristen.", "Even so, we will keep the deadline.", "adv"],
      ["derfor", "therefore", "Derfor utsetter vi saken.", "Therefore we are postponing the item.", "adv"],
      ["å delta", "to attend", "Kan du delta digitalt?", "Can you attend online?", "verb"],
      ["et notat", "a note", "Jeg skriver et kort notat.", "I am writing a short note.", "noun"],
      ["å holde fristen", "to meet the deadline", "Vi holder fristen.", "We are meeting the deadline.", "phrase"],
    ],
    exercises: [
      order(
        "adverb-sub",
        "Bygg helsetningen.",
        ["Jeg", "kan", "dessverre", "ikke", "komme"],
        "The modal kan is the finite verb. Dessverre and ikke follow it, before the infinitive.",
        [],
        "Build the main clause.",
      ),
      order(
        "adverb-sub",
        "Bygg leddsetningen.",
        ["at", "hun", "dessverre", "ikke", "kan", "komme"],
        "In the subordinate clause both adverbs stand before the finite verb kan.",
        [],
        "Build the subordinate clause.",
      ),
      mc(
        "v2",
        "Hvilken helsetning er riktig?",
        ["Derfor utsetter vi møtet.", "Derfor vi utsetter møtet.", "Derfor utsetter møtet vi.", "Vi derfor utsetter møtet."],
        "Derfor utsetter vi møtet.",
        "Derfor in the first slot causes inversion. The adverb cannot sit between vi and utsetter in a main clause.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn ordene som mangler, i riktig rekkefølge.",
        "Han sier at han ___ delta.",
        ["dessverre ikke kan"],
        "In the subordinate clause the adverbs stand before the modal: dessverre ikke kan delta.",
      ),
      fix(
        "adverb-sub",
        "Skriv setningen riktig.",
        "Jeg dessverre kan ikke delta.",
        ["Jeg kan dessverre ikke delta"],
        "In a main clause the finite verb stays in second place. The adverbs follow kan.",
      ),
      mc(
        "adverb-sub",
        "Hvilken «kanskje»-setning er ikke akseptabel?",
        ["At hun kanskje ikke kommer, er nytt.", "Kanskje kommer hun.", "Kanskje hun kommer.", "Hun sier at kanskje kommer hun."],
        "Hun sier at kanskje kommer hun.",
        "Kanskje may invert a main clause, but not a subordinate clause. After at, the subject comes first: at hun kanskje kommer.",
        "Which kanskje sentence is not acceptable?",
      ),
      order(
        "v2",
        "Bygg setningen.",
        ["Likevel", "holder", "vi", "fristen"],
        "Likevel first, verb second, subject third.",
        [],
        "Build: Even so, we will meet the deadline.",
      ),
      fix(
        "adverb-sub",
        "Skriv setningen riktig.",
        "Hun skriver at hun kan dessverre ikke komme.",
        ["Hun skriver at hun dessverre ikke kan komme"],
        "Move the whole adverb group, including the modal, so that dessverre ikke stands before kan.",
      ),
    ],
  }),
  lesson({
    id: "b2-03",
    level: "B2",
    minutes: 14,
    title: "Relativsetninger med som",
    titleEn: "Relative clauses with som",
    concepts: ["relatives", "adverb-sub", "punctuation"],
    maal: "Du bruker som, og du lar ikke falle bort når det er subjekt.",
    husk: "Rapporten som kom i går, er lest. Ikke «rapporten kom i går».",
    intro: `Som is the normal relative particle. It can be the subject or the object of the relative clause, and it does not change for gender or number.

Subject: Rapporten som kom i går, er lest. Som cannot be left out when it is the subject. "Rapporten kom i går, er lest" is not a sentence.
Object: Rapporten som jeg sendte i går, er lest. In the object reading, som may be left out in many clauses: Rapporten jeg sendte i går, er lest. Keeping som is never wrong, and it is clearer in formal writing. These exercises keep som.

The relative clause is subordinate, so ikke comes before the verb: avviket som vi ikke kan forklare. There is no inversion after som.

A restrictive relative identifies which thing you mean and has no comma before som. When the whole subject ends with that relative clause, put a comma before the main verb: Tallene som gjelder Q3, viser et lite avvik. A non-restrictive addition, extra information the reader does not need to identify the noun, has commas around it: Q3-rapporten, som er vedlagt, viser et lite avvik.`,
    examples: [
      { no: "Rapporten som kom i går, er lest.", en: "The report that arrived yesterday has been read." },
      { no: "Tallene som gjelder Q3, viser et lite avvik.", en: "The figures that concern Q3 show a small variance." },
      { no: "Q3-rapporten, som er vedlagt, viser et lite avvik.", en: "The Q3 report, which is attached, shows a small variance." },
    ],
    vocab: [
      ["som", "that; which; who", "Kollegaen som skrev utkastet, er borte.", "The colleague who wrote the draft is away.", "particle"],
      ["restriktiv", "restrictive", "En restriktiv relativ er nødvendig for å peke ut hvem eller hva.", "A restrictive relative is needed to identify who or what.", "adj"],
      ["vedlagt", "attached", "Filen som er vedlagt, er oppdatert.", "The file that is attached has been updated.", "adj"],
      ["å gjelde", "to concern", "Dette gjelder bare Q3.", "This only concerns Q3.", "verb"],
      ["å forklare", "to explain", "Kan du forklare avviket?", "Can you explain the variance?", "verb"],
      ["et avvik", "a variance", "Avviket er lite.", "The variance is small.", "noun"],
      ["Q3", "the third quarter", "Q3-rapporten er sendt.", "The Q3 report has been sent.", "noun"],
    ],
    exercises: [
      mc(
        "relatives",
        "Hvilken setning er riktig? «Som» er subjekt.",
        ["Rapporten som kom i går, er lest.", "Rapporten kom i går, er lest.", "Rapporten som i går kom, er lest.", "Rapporten, kom i går, er lest."],
        "Rapporten som kom i går, er lest.",
        "When som is the subject, it cannot be omitted. The verb of the relative clause follows som directly here, because nothing is fronted inside it.",
      ),
      order(
        "relatives",
        "Bygg setningen.",
        ["Tallene", "som", "gjelder", "Q3", "viser", "et", "lite", "avvik"],
        "The relative clause ends before the main verb viser. Som is the subject of gjelder.",
        [],
        "Build: The figures that concern Q3 show a small variance.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn ikke.",
        "Dette er avviket som vi ___ kan forklare.",
        ["ikke"],
        "The som-clause is subordinate. Ikke stands before the finite verb kan.",
      ),
      mc(
        "punctuation",
        "Hvilken komma-bruk passer når rapporten allerede er kjent, og vedlegget bare er ekstra informasjon?",
        ["Q3-rapporten, som er vedlagt, viser et lite avvik.", "Q3-rapporten som er vedlagt viser et lite avvik uten komma.", "Q3-rapporten som, er vedlagt, viser et avvik.", "Q3-rapporten er vedlagt som, viser et avvik."],
        "Q3-rapporten, som er vedlagt, viser et lite avvik.",
        "Extra, non-restrictive information is set off with commas on both sides. The relative clause does not identify which report; the name Q3-rapporten already does.",
        "The report is already identified, and the attachment is extra information.",
      ),
      fix(
        "relatives",
        "Skriv setningen riktig.",
        "Kollegaen skrev utkastet, er borte i dag.",
        ["Kollegaen som skrev utkastet, er borte i dag"],
        "Som is the missing subject of the relative clause. Without it, two finite verbs are competing in one main clause.",
      ),
      order(
        "relatives",
        "Bygg setningen der «som» er objekt.",
        ["Rapporten", "som", "jeg", "sendte", "i", "går", "er", "lest"],
        "Som is the object, jeg is the subject, and there is no inversion. A comma before er is the comma after a subject that contains a clause.",
        [],
        "Build: The report that I sent yesterday has been read.",
      ),
      fix(
        "adverb-sub",
        "Skriv setningen riktig.",
        "Avviket som vi kan ikke forklare, står i notatet.",
        ["Avviket som vi ikke kan forklare, står i notatet"],
        "Inside the relative clause, ikke comes before kan.",
      ),
      mc(
        "relatives",
        "Når kan «som» oftest sløyfes i formelt språk likevel med fordel beholdes?",
        ["Når som er objekt", "Når som er subjekt", "Aldri, som finnes ikke", "Bare foran et egennavn"],
        "Når som er objekt",
        "Object-som can be omitted. Subject-som cannot. In formal writing, keeping object-som is still the clearer choice, and these lessons keep it.",
        "When can som most often be left out, even if formal style prefers to keep it?",
      ),
    ],
  }),
  lesson({
    id: "b2-04",
    level: "B2",
    minutes: 13,
    title: "Der og hvor",
    titleEn: "der and hvor for place",
    concepts: ["relatives", "prepositions"],
    maal: "Du bruker der eller hvor om sted, og som når relativen ikke er sted.",
    husk: "Byen der jeg bor. Rapporten som jeg sendte. Ikke «rapporten der jeg sendte».",
    intro: `Der and hvor introduce a relative clause of place: byen der jeg bor, kontoret hvor vi sitter. Hvor is also the question word "where". In a relative clause, der and hvor are both correct. Der is slightly more traditional in writing; hvor is extremely common and fully acceptable.

You can also use som plus a preposition at the end: byen som jeg bor i. All three patterns are good Norwegian. Do not use der when the relative is not about a place. Rapporten som jeg sendte, not "rapporten der jeg sendte". Der would mean "the report where I sent", which does not make sense.

In questions, hvor is the normal choice: Hvor bor du? Der as a short answer means "there": Bor du i Oslo? Ja, jeg bor der.

Prepositions stay in the combination you already know. Jeg bor i Oslo. Jeg er på kontoret. The relative does not change the preposition: kontoret som jeg er på, byen som jeg bor i.`,
    examples: [
      { no: "Oslo er byen der jeg bor.", en: "Oslo is the city where I live." },
      { no: "Kontoret hvor vi sitter, ligger nær Nationaltheatret.", en: "The office where we sit is near the National Theatre station." },
      { no: "Rapporten som jeg sendte i går, ligger i mappen.", en: "The report that I sent yesterday is in the folder." },
    ],
    vocab: [
      ["der", "where; there", "Byen der jeg bor, er Oslo.", "The city where I live is Oslo.", "particle"],
      ["hvor", "where", "Hvor ligger kontoret?", "Where is the office?", "word"],
      ["en mappe", "a folder", "Filen ligger i mappen.", "The file is in the folder.", "noun"],
      ["å ligge", "to be located; to lie", "Kontoret ligger i Oslo.", "The office is in Oslo.", "verb"],
      ["nær", "near", "Vi sitter nær møterommet.", "We sit near the meeting room.", "prep"],
      ["et møterom", "a meeting room", "Møterommet er opptatt.", "The meeting room is occupied.", "noun"],
      ["en by", "a city", "Byen er stille på søndag.", "The city is quiet on Sunday.", "noun"],
    ],
    exercises: [
      mc(
        "relatives",
        "Hvilken setning bruker relativen om sted riktig?",
        ["Byen der jeg bor, er Oslo.", "Rapporten der jeg sendte, er lest.", "Byen som jeg bor, er Oslo.", "Der byen jeg bor er Oslo."],
        "Byen der jeg bor, er Oslo.",
        "Der fits a place. Rapporten is not a place, so it needs som. Som jeg bor needs the preposition i if you choose the som-pattern: som jeg bor i.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjonen som hører til «bo».",
        "Oslo er byen som jeg bor ___.",
        ["i"],
        "Bo i a city. The preposition can stand at the end of a som-relative.",
      ),
      order(
        "relatives",
        "Bygg setningen.",
        ["Kontoret", "hvor", "vi", "sitter", "ligger", "i", "Oslo"],
        "Hvor introduces the place relative. The main verb ligger comes after that clause.",
        [],
        "Build: The office where we sit is in Oslo.",
      ),
      fix(
        "relatives",
        "Skriv setningen riktig.",
        "Rapporten der jeg sendte i går, ligger i mappen.",
        ["Rapporten som jeg sendte i går, ligger i mappen"],
        "The report is the object of sendte, not a place. Use som.",
      ),
      mc(
        "relatives",
        "Hvilket spørsmål er riktig?",
        ["Hvor bor du?", "Der bor du?", "Som bor du?", "Hvor du bor?"],
        "Hvor bor du?",
        "A direct question uses hvor plus the verb in second place. Der is not the question word. Hvor du bor is a subordinate clause, not a question.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjon.",
        "Møterommet som vi sitter ___, er lite.",
        ["på", "i"],
        "Both på and i are possible with a meeting room. På møterommet is very common for the place of a meeting; i møterommet stresses being inside the room.",
        "på or i.",
      ),
      order(
        "relatives",
        "Bygg setningen.",
        ["Filen", "som", "ligger", "i", "mappen", "er", "ny"],
        "Som is the subject of ligger. The main clause is Filen … er ny.",
        [],
        "Build: The file that is in the folder is new.",
      ),
      fix(
        "relatives",
        "Skriv setningen riktig.",
        "Byen som jeg bor, heter Oslo.",
        ["Byen som jeg bor i, heter Oslo", "Byen der jeg bor, heter Oslo"],
        "Either add i, or switch to der. Som alone cannot carry the place of bo.",
      ),
    ],
  }),
  lesson({
    id: "b2-05",
    level: "B2",
    minutes: 14,
    title: "Passiv med bli",
    titleEn: "The bli passive",
    concepts: ["passive", "tenses"],
    maal: "Du bruker blir, ble og har blitt med partisipp.",
    husk: "Rapporten ble sendt i går. Den blir sendt i morgen.",
    intro: `The bli-passive describes an event. Someone does something to the subject, even if you do not name them. The participle does not agree with the subject.

Present: Rapporten blir sendt i morgen.
Past: Rapporten ble sendt i går.
Perfect: Rapporten har blitt sendt. Er blitt sendt is also correct written bokmål. These exercises use har blitt, which is the form you will also say.

The participle is the same one you know from perfektum: sendt, skrevet, lest, gjort, vedtatt, utsatt. Not the preterite. Ble sendt, not "ble sendte".

Use this passive when the action happened, happens, or will happen as an event. Rapporten ble godkjent i går names an event. If you instead want a habit, an instruction or a more formal general rule, the s-passive in the next lesson is often better: Rapporten sendes hver fredag.

The agent, if you need one, is marked with av: Rapporten ble skrevet av Anna.`,
    examples: [
      { no: "Rapporten blir sendt i morgen.", en: "The report will be sent tomorrow." },
      { no: "Rapporten ble godkjent i går.", en: "The report was approved yesterday." },
      { no: "Møtet har blitt utsatt.", en: "The meeting has been postponed." },
    ],
    vocab: [
      ["å bli", "to become; passive auxiliary", "Rapporten blir sendt.", "The report is being sent / will be sent.", "verb"],
      ["å godkjenne – godkjent", "to approve", "Utkastet ble godkjent.", "The draft was approved.", "verb"],
      ["å utsette – utsatt", "to postpone", "Møtet blir utsatt.", "The meeting is being postponed.", "verb"],
      ["av", "by (the agent)", "Referatet ble skrevet av Anna.", "The minutes were written by Anna.", "prep"],
      ["en godkjenning", "an approval", "Vi venter på godkjenningen.", "We are waiting for the approval.", "noun"],
      ["å vente på", "to wait for", "Jeg venter på tallene.", "I am waiting for the figures.", "verb"],
      ["i morgen", "tomorrow", "Den blir sendt i morgen.", "It will be sent tomorrow.", "phrase"],
    ],
    exercises: [
      mc(
        "passive",
        "Velg riktig passiv om en hendelse i går.",
        ["Rapporten ble sendt i går.", "Rapporten sendes i går.", "Rapporten er sendte i går.", "Rapporten ble sendte i går."],
        "Rapporten ble sendt i går.",
        "A past event uses ble plus the participle. Sendes is the present s-passive and does not combine with i går. Sendte is a preterite, not a participle.",
      ),
      fill(
        "passive",
        "Fyll inn hjelpeverbet.",
        "Møtet ___ utsatt i går ettermiddag.",
        ["ble"],
        "I går ettermiddag is a finished time, so ble utsatt.",
      ),
      order(
        "passive",
        "Bygg setningen.",
        ["Referatet", "ble", "skrevet", "av", "Anna"],
        "The agent comes at the end with av. The participle does not get an extra ending.",
        [],
        "Build: The minutes were written by Anna.",
      ),
      fix(
        "passive",
        "Skriv setningen riktig.",
        "Rapporten har blitt sendte til ledelsen.",
        ["Rapporten har blitt sendt til ledelsen"],
        "After blitt, use the participle sendt.",
      ),
      mc(
        "tenses",
        "Hvilken form passer om et resultat som gjelder nå, uten å navngi et tidspunkt i går?",
        ["Rapporten har blitt godkjent.", "Rapporten ble godkjent i går kveld, som perfektum.", "Rapporten blir godkjent i går.", "Rapporten godkjente har."],
        "Rapporten har blitt godkjent.",
        "Har blitt plus the participle is the perfect passive: the approval is presented as a result now. I går would rather take ble.",
      ),
      fill(
        "passive",
        "Fyll inn partisipp av «å utsette».",
        "Møtet blir ___ til fredag.",
        ["utsatt"],
        "Bli-passive uses the participle. Å utsette → utsatt.",
      ),
      fix(
        "passive",
        "Skriv setningen riktig.",
        "De store avvikene ble forklarte i notatet.",
        ["De store avvikene ble forklart i notatet"],
        "The participle after ble does not take plural -e. Agreement belongs to the adjective use, not to this passive.",
      ),
      order(
        "passive",
        "Bygg setningen.",
        ["Rapporten", "blir", "sendt", "i", "morgen"],
        "Blir sendt covers a future or ongoing event. I morgen makes the future reading clear.",
        [],
        "Build: The report will be sent tomorrow.",
      ),
    ],
  }),
  lesson({
    id: "b2-06",
    level: "B2",
    minutes: 14,
    title: "S-passiv",
    titleEn: "The s-passive",
    concepts: ["passive", "register"],
    maal: "Du bruker s-passiv om vane, regel og formelt språk.",
    husk: "Rapporten sendes hver fredag. I går ble den sendt.",
    intro: `The s-passive adds -s to the infinitive stem in the present: sende → sendes, holde → holdes, gjøre → gjøres, godkjenne → godkjennes. It is common for habits, schedules, instructions and formal prose.

Rapporten sendes hver fredag.
Møtet holdes klokka ni.
Det anbefales at tallene kontrolleres før utsendelse.

Do not force the s-passive into the past. "Rapporten sendtes i går" sounds archaic. Use ble: Rapporten ble sendt i går. The perfect is also bli, not s: Rapporten har blitt sendt.

S-passive has no named agent in ordinary prose. If you need "by Anna", prefer ble skrevet av Anna. Some verbs dislike the s-form in everyday speech; if the s-form sounds odd to you, bli is a safe event-passive. In reports, sendes, vises, omtales, kreves and anbefales are all natural.

Det + s-passive is a useful impersonal pattern: Det vises til e-posten av 2. oktober. In ordinary email, Jeg viser til e-posten av 2. oktober is warmer and usually better. The next register lessons practise that choice.`,
    examples: [
      { no: "Rapporten sendes hver fredag.", en: "The report is sent every Friday." },
      { no: "Møtet holdes klokka ni i møterommet.", en: "The meeting is held at nine in the meeting room." },
      { no: "Det anbefales at avviket forklares i notatet.", en: "It is recommended that the variance be explained in the note." },
    ],
    vocab: [
      ["sendes", "is sent (habit or rule)", "Rapporten sendes til ledelsen.", "The report is sent to management.", "verb"],
      ["holdes", "is held", "Møtet holdes digitalt.", "The meeting is held online.", "verb"],
      ["anbefales", "is recommended", "Det anbefales å vente.", "It is recommended to wait.", "verb"],
      ["kreves", "is required", "Signatur kreves.", "A signature is required.", "verb"],
      ["omtales", "is referred to; is described", "Saken omtales i kapittel 2.", "The matter is discussed in chapter 2.", "verb"],
      ["en utsendelse", "a dispatch; sending out", "Utsendelsen skjer på fredag.", "The dispatch happens on Friday.", "noun"],
      ["å kontrollere", "to check", "Kontroller tallene før utsendelse.", "Check the figures before they go out.", "verb"],
    ],
    exercises: [
      mc(
        "passive",
        "Hvilken form passer om en fast rutine?",
        ["Rapporten sendes hver fredag.", "Rapporten ble sendt hver fredag i morgen.", "Rapporten har sendes hver fredag.", "Rapporten sendte hver fredag."],
        "Rapporten sendes hver fredag.",
        "A repeated schedule takes the present s-passive. Har cannot combine with sendes.",
      ),
      fill(
        "passive",
        "Fyll inn s-passiv av «å holde».",
        "Møtet ___ klokka ni.",
        ["holdes"],
        "Infinitive holde plus -s: holdes. This is a schedule, not one past event.",
      ),
      mc(
        "passive",
        "Hva bruker du om én hendelse i går?",
        ["Rapporten ble sendt i går.", "Rapporten sendes i går.", "Rapporten sendtes i går.", "Rapporten er sendes i går."],
        "Rapporten ble sendt i går.",
        "Past events take ble + participle. The old s-form in the past is not the form to use in modern reports.",
      ),
      order(
        "register",
        "Bygg den formelle setningen.",
        ["Det", "anbefales", "at", "tallene", "kontrolleres"],
        "Det anbefales at … is a standard formal recommendation. The at-clause can contain another s-passive.",
        [],
        "Build: It is recommended that the figures be checked.",
      ),
      fix(
        "passive",
        "Skriv setningen riktig.",
        "Signatur er kreves på skjemaet.",
        ["Signatur kreves på skjemaet"],
        "The s-passive already contains the finite verb. Do not add er in front of kreves.",
      ),
      fill(
        "passive",
        "Fyll inn s-passiv av «å omtale».",
        "Avviket ___ i kapittel 2.",
        ["omtales"],
        "Omtale → omtales. This fits a report that describes where something is discussed.",
      ),
      fix(
        "passive",
        "Skriv setningen slik at agenten kan være med.",
        "Rapporten sendes av Anna i går.",
        ["Rapporten ble sendt av Anna i går"],
        "A named agent and a finished time belong with ble, not with the habitual s-passive.",
      ),
      mc(
        "register",
        "Hvilken formulering er varmest i en vanlig e-post?",
        ["Jeg viser til e-posten din av 2. oktober.", "Det vises til e-posten av 2. oktober.", "E-posten vises til.", "Det blir vist til e-posten din hit."],
        "Jeg viser til e-posten din av 2. oktober.",
        "Det vises til is correct but stiff. In email, an active sentence with jeg is the normal polite choice. You will reuse Jeg viser til in Jobbnorsk.",
        "Which wording is the warmest in an ordinary email?",
      ),
    ],
  }),
  lesson({
    id: "b2-07",
    level: "B2",
    minutes: 14,
    title: "Modalverb i fortid",
    titleEn: "Modal verbs in the past",
    concepts: ["modals", "tenses"],
    maal: "Du skiller skulle, kunne, ville og måtte, også med ha + partisipp.",
    husk: "Jeg skulle sende den i går. Jeg burde ha sendt den.",
    intro: `The past forms are kunne, ville, skulle and måtte. They still take a bare infinitive. Jeg skulle sende rapporten i går often implies a plan that did not happen, or a past obligation. Jeg måtte utsette møtet means I had to, and I did.

Burde is the past form of bør, and it is also used as a softer present recommendation. You meet bør properly at C1. Already now: Jeg burde ha sendt den i går means "I ought to have sent it" and did not. The pattern is modal past + ha + participle.

Kunne ha sendt means it was possible, and often that it did not happen. Må ha sendt is different: it is a conclusion. Hun må ha sendt den means "she must have sent it", from the evidence. Do not confuse that with Hun måtte sende den, which means she was obliged to send it.

Skulle ha vært ferdig means it was supposed to be finished. The participle of være is vært. There is no å before ha in these combinations: burde ha sendt, not "burde å ha sendt".`,
    examples: [
      { no: "Jeg skulle sende rapporten i går, men tallene manglet.", en: "I was going to send the report yesterday, but the figures were missing." },
      { no: "Jeg burde ha varslet tidligere.", en: "I ought to have given notice earlier." },
      { no: "Hun må ha sendt den, for filen ligger i mappen.", en: "She must have sent it, because the file is in the folder." },
    ],
    vocab: [
      ["skulle", "was going to; should (past)", "Jeg skulle ringe i går.", "I was supposed to call yesterday.", "verb"],
      ["kunne", "could", "Jeg kunne ikke åpne filen.", "I could not open the file.", "verb"],
      ["måtte", "had to", "Vi måtte utsette saken.", "We had to postpone the item.", "verb"],
      ["burde ha", "ought to have", "Jeg burde ha sjekket tallet.", "I ought to have checked the figure.", "verb"],
      ["må ha", "must have (conclusion)", "Tallet må ha blitt dobbeltført.", "The figure must have been entered twice.", "verb"],
      ["å varsle", "to notify", "Jeg varsler med én gang.", "I will notify you straight away.", "verb"],
      ["tidligere", "earlier", "Kan du sende den tidligere?", "Can you send it earlier?", "adv"],
    ],
    exercises: [
      mc(
        "modals",
        "Hvilken setning betyr at planen trolig ikke ble gjennomført?",
        ["Jeg skulle sende rapporten i går.", "Jeg sendte rapporten i går.", "Jeg har sendt rapporten.", "Jeg må ha sendt rapporten."],
        "Jeg skulle sende rapporten i går.",
        "Skulle + infinitive about a past time often means a plan or duty that was not carried out. Må ha is a conclusion that it did happen.",
        "Which sentence means the plan was probably not carried out?",
      ),
      fill(
        "modals",
        "Fyll inn. Betydningen er «ought to have».",
        "Jeg ___ varslet tidligere.",
        ["burde ha"],
        "Burde ha plus the participle: the right action did not happen. Write both words.",
      ),
      mc(
        "modals",
        "Hva betyr «Hun må ha sendt den»?",
        ["Jeg konkluderer med at hun sendte den.", "Hun var forpliktet til å sende den.", "Hun skal sende den i morgen.", "Hun vil ikke sende den."],
        "Jeg konkluderer med at hun sendte den.",
        "Må ha + participle is epistemic: a conclusion from evidence. Obligation in the past is måtte + infinitive.",
        "What does Hun må ha sendt den mean?",
      ),
      order(
        "modals",
        "Bygg setningen.",
        ["Vi", "måtte", "utsette", "møtet"],
        "Måtte is the past of må and takes a bare infinitive. The postponement happened.",
        [],
        "Build: We had to postpone the meeting.",
      ),
      fix(
        "modals",
        "Skriv setningen riktig.",
        "Jeg burde å ha sjekket tallet.",
        ["Jeg burde ha sjekket tallet"],
        "No å between burde and ha. The participle is sjekket.",
      ),
      fill(
        "tenses",
        "Fyll inn partisipp av «å være».",
        "Rapporten skulle ha ___ ferdig i går.",
        ["vært"],
        "Skulle ha vært ferdig: it was supposed to be finished. Vært is the participle.",
      ),
      fix(
        "modals",
        "Skriv setningen slik at den betyr forpliktelse, ikke konklusjon.",
        "Hun må ha sendt rapporten i går, ellers fikk hun ikke gå.",
        ["Hun måtte sende rapporten i går"],
        "An obligation in the past is måtte plus the infinitive. The clause about evidence does not belong in that reading.",
      ),
      mc(
        "modals",
        "Hvilken setning betyr at det var mulig, men skjedde ikke nødvendigvis?",
        ["Jeg kunne ha ventet til fredag.", "Jeg måtte vente til fredag.", "Jeg har ventet til fredag.", "Jeg venter til fredag."],
        "Jeg kunne ha ventet til fredag.",
        "Kunne ha + participle often describes a past possibility that was not taken. Måtte means the waiting actually was necessary.",
      ),
    ],
  }),
  lesson({
    id: "b2-08",
    level: "B2",
    minutes: 14,
    title: "Komma som leseren trenger",
    titleEn: "Commas the reader needs",
    concepts: ["punctuation"],
    maal: "Du setter komma etter innledende leddsetning, rundt innskudd og mellom helsetninger.",
    husk: "Når tallene er klare, sender jeg dem. Ingen komma foran at.",
    intro: `These lessons follow one consistent comma practice, close to what Norwegian courses teach and to Språkrådet's main rules.

Put a comma after a subordinate clause that stands first: Når tallene er klare, sender jeg dem.
Put commas around an insertion or a non-restrictive relative: Rapporten, som er vedlagt, gjelder september.
Put a comma between two main clauses joined by og, men, eller or for when the second clause has its own subject: Jeg skriver notatet, og hun sender det.
Do not put a comma before og when the subject is shared and omitted: Jeg skriver og sender notatet.
Do not put a comma before a necessary at-clause or a restrictive som-clause that follows the main verb: Jeg ser at avviket er lite. Filen som ligger vedlagt, er ny.

When the subject itself contains a subordinate clause, keep the comma before the main verb: Tallene som kom i går, stemmer. That comma closes the clause. It is not a comma between subject and verb in a simple sentence. In a simple sentence there is no comma: Tallene stemmer.

Lists of three do not take a comma before og: kostnader, inntekter og avvik.`,
    examples: [
      { no: "Når tallene er klare, sender jeg dem.", en: "When the figures are ready, I will send them." },
      { no: "Jeg ser at avviket er lite.", en: "I see that the variance is small." },
      { no: "Jeg skriver notatet, og hun sender det.", en: "I write the note, and she sends it." },
    ],
    vocab: [
      ["et komma", "a comma", "Kommaet står etter leddsetningen.", "The comma comes after the subordinate clause.", "noun"],
      ["et innskudd", "an insertion", "Innskuddet har komma på begge sider.", "The insertion has commas on both sides.", "noun"],
      ["en oppregning", "a list", "Vi trenger kostnader, inntekter og avvik.", "We need costs, income and variances.", "noun"],
      ["å stemme", "to add up", "Tallene stemmer.", "The figures add up.", "verb"],
      ["en inntekt", "an income; revenue", "Inntektene økte i Q3.", "Revenue increased in Q3.", "noun"],
      ["en kostnad", "a cost", "Kostnaden er budsjettert.", "The cost is budgeted.", "noun"],
      ["vedlagt", "attached", "Rapporten, som er vedlagt, er kort.", "The report, which is attached, is short.", "adj"],
    ],
    exercises: [
      mc(
        "punctuation",
        "Hvilken setning har riktig komma?",
        ["Når tallene er klare, sender jeg dem.", "Når tallene er klare sender jeg dem.", "Når, tallene er klare, sender jeg dem.", "Når tallene, er klare, sender jeg dem."],
        "Når tallene er klare, sender jeg dem.",
        "One comma, after the whole fronted subordinate clause. Do not split når from its clause.",
      ),
      mc(
        "punctuation",
        "Hvilken setning skal ikke ha komma foran at?",
        ["Jeg ser at avviket er lite.", "Jeg ser, at avviket er lite.", "At avviket er lite, er godt nytt.", "Avviket, som er lite, er forklart."],
        "Jeg ser at avviket er lite.",
        "A necessary at-clause at the end has no comma in front of at. The third sentence correctly has a comma because the at-clause is the fronted subject. The fourth is a non-restrictive insertion.",
        "Which sentence should have no comma before at?",
      ),
      fix(
        "punctuation",
        "Skriv setningen med riktig komma. Dette er en tegnsettingsoppgave.",
        "Jeg skriver notatet og hun sender det.",
        ["Jeg skriver notatet, og hun sender det"],
        "Two main clauses, two subjects, so a comma before og.",
      ),
      fix(
        "punctuation",
        "Skriv setningen med riktig komma.",
        "Jeg skriver, og sender notatet.",
        ["Jeg skriver og sender notatet"],
        "Shared subject, no comma before og.",
      ),
      order(
        "punctuation",
        "Bygg setningen. Komma er ikke et eget ord her; plasseringen øver du i de andre oppgavene.",
        ["Rapporten", "som", "er", "vedlagt", "gjelder", "september"],
        "This is the restrictive reading if the som-clause identifies the report, and the comma before gjelder is the one that closes a subject clause. The words themselves stay in this order.",
        [],
        "Build the words of: The report that is attached concerns September.",
      ),
      mc(
        "punctuation",
        "Hvilken oppregning er riktig?",
        ["kostnader, inntekter og avvik", "kostnader, inntekter, og avvik", "kostnader inntekter og avvik", "kostnader, inntekter, avvik"],
        "kostnader, inntekter og avvik",
        "Comma between the listed items, but not before og. The last option misses og.",
      ),
      fix(
        "punctuation",
        "Skriv setningen med riktige komma.",
        "Q3-rapporten som er vedlagt gjelder september.",
        ["Q3-rapporten, som er vedlagt, gjelder september"],
        "The name already identifies the report, so the relative clause is extra information and needs commas on both sides.",
      ),
      fill(
        "punctuation",
        "Skriv JA hvis setningen trenger komma etter leddsetningen, og NEI hvis den ikke gjør det: «Hvis du vil kan vi ta det på norsk.»",
        "Svar: ___",
        ["JA", "ja"],
        "The hvis-clause stands first, so a comma is required before kan: Hvis du vil, kan vi ta det på norsk.",
      ),
    ],
  }),
  lesson({
    id: "b2-09",
    level: "B2",
    minutes: 13,
    title: "Sammensatte ord",
    titleEn: "Compound words",
    concepts: ["compounds"],
    maal: "Du skriver sammensetninger som ett ord og kjenner noen faste fagord.",
    husk: "Ett ord: statusrapport, budsjettavvik, møtereferat.",
    intro: `Norwegian compounds are written as one word. Statusrapport, not "status rapport". Budsjettavvik, møtereferat, kvartalsrapport, kostnadsramme, nøkkeltall. The first part narrows the second. A statusrapport is a kind of rapport. English often uses two words or a hyphen where Norwegian uses none.

A linking -s- appears in many compounds and has to be learned with the word. It is not optional decoration, and it is not present everywhere. Ukesrapport and årsrapport take -s. Møtereferat does not add an extra -s, because møte already ends in -e and the established word has no fuge-s. Driftskostnad and investeringsbudsjett do take -s. When you are unsure, look the whole word up; do not invent a compound by translating each English word separately.

Abbreviations and some loans keep a hyphen: IT-kostnad, e-post, Q3-rapport. The hyphen belongs to that fixed pattern. It does not mean that ordinary compounds should be hyphenated.

Plural and definite endings go on the end of the whole compound: statusrapporten, budsjettavvikene, nøkkeltallene. Nøkkeltall is neuter and often unchanged in the indefinite plural: flere nøkkeltall, de viktigste nøkkeltallene.`,
    examples: [
      { no: "Statusrapporten viser ett budsjettavvik.", en: "The status report shows one budget variance." },
      { no: "Møtereferatet ligger i Q3-mappen.", en: "The minutes are in the Q3 folder." },
      { no: "Driftskostnadene er innenfor kostnadsrammen.", en: "The operating costs are within the cost ceiling." },
    ],
    vocab: [
      ["en statusrapport", "a status report", "Statusrapporten er på to sider.", "The status report is two pages long.", "noun"],
      ["et budsjettavvik", "a budget variance", "Budsjettavviket er lite.", "The budget variance is small.", "noun"],
      ["et møtereferat", "minutes of a meeting", "Jeg skriver møtereferatet.", "I am writing the minutes.", "noun"],
      ["en kvartalsrapport", "a quarterly report", "Kvartalsrapporten sendes fredag.", "The quarterly report will be sent on Friday.", "noun"],
      ["en kostnadsramme", "a cost ceiling", "Vi holder oss innenfor kostnadsrammen.", "We are staying within the cost ceiling.", "noun"],
      ["et nøkkeltall", "a key figure", "Nøkkeltallene står på side 2.", "The key figures are on page 2.", "noun"],
      ["en driftskostnad", "an operating cost", "Driftskostnadene økte litt.", "Operating costs increased a little.", "noun"],
    ],
    exercises: [
      mc(
        "compounds",
        "Hvilken skrivemåte er riktig?",
        ["statusrapport", "status rapport", "status-rapport", "statusrapporten rapport"],
        "statusrapport",
        "Ordinary compounds are one word, without a hyphen. The hyphen in the third option is not used for this noun.",
      ),
      fill(
        "compounds",
        "Skriv sammensetningen av «budsjett» og «avvik».",
        "Vi har et lite ___.",
        ["budsjettavvik"],
        "One word, no extra -s between budsjett and avvik: budsjettavvik. The noun is neuter: et budsjettavvik.",
      ),
      mc(
        "compounds",
        "Hvilket ord er riktig skrevet?",
        ["møtereferat", "møte referat", "møtesreferat", "møte-referat"],
        "møtereferat",
        "The established compound is møtereferat, without a linking -s and without a hyphen or a space.",
      ),
      fix(
        "compounds",
        "Skriv setningen med riktige sammensetninger.",
        "Kvartal rapporten viser ett budsjett avvik.",
        ["Kvartalsrapporten viser ett budsjettavvik"],
        "Kvartalsrapport has a linking -s. Budsjettavvik is one word. Ett emphasises the number one before a neuter noun.",
      ),
      fill(
        "compounds",
        "Fyll inn ordet for «operating costs» i bestemt flertall.",
        "___ økte litt i september.",
        ["Driftskostnadene", "driftskostnadene"],
        "Drift + s + kostnad, then the definite plural ending -ene on the whole word.",
      ),
      mc(
        "compounds",
        "Hvor skal bindestreken stå?",
        ["IT-kostnad og e-post", "IT kostnad og e post", "ITkostnad og epost uten unntak", "IT-kost-nad"],
        "IT-kostnad og e-post",
        "IT- and e- keep a hyphen. That does not licence a hyphen inside kostnad.",
      ),
      order(
        "compounds",
        "Bygg setningen.",
        ["Nøkkeltallene", "står", "på", "side", "2"],
        "The definite plural ending is on the compound as a whole. Står is the verb in second place.",
        [],
        "Build: The key figures are on page 2.",
      ),
      fix(
        "compounds",
        "Skriv setningen riktig.",
        "Vi holder oss innenfor kostnads rammen.",
        ["Vi holder oss innenfor kostnadsrammen"],
        "One word: kostnadsrammen, with the definite ending at the end. Innenfor is also one word.",
      ),
    ],
  }),
  lesson({
    id: "b2-10",
    level: "B2",
    minutes: 15,
    title: "Fra uformelt til tydelig",
    titleEn: "From informal to clear professional Norwegian",
    concepts: ["register"],
    maal: "Du skriver en høflig, direkte e-post uten å bli stiv.",
    husk: "Hei Kari. Kunne du sende tallene innen fredag?",
    intro: `Norwegian workplace language is polite and direct. It is not the stiff courtesy of a translated official letter, and it is not chat. Hei plus a first name is respectful, including when you write to a manager. Kjære herr or Kjære fru sounds archaic. De as a polite pronoun is old-fashioned in modern Norway; use du.

Soften a request with kunne or ville, and with gjerne. Kunne du sende tallene innen fredag? is polite and clear. Kan du fikse det asap is both too blunt and full of English. Asap becomes så snart som mulig. Fikse becomes se på, rette or utbedre, depending on the job.

Useful frames you can reuse: Jeg viser til møtet i går. Vedlagt finner du statusrapporten. Som avtalt sender jeg tallene. Ta gjerne kontakt dersom noe er uklart. The close is Vennlig hilsen. Med vennlig hilsen is a step more formal and still correct. Mvh is common, but write the words out in a report or a first mail to someone senior.

Innen fredag means by Friday. Før fredag means before Friday, so Thursday at the latest. Do not write "innen på fredag".`,
    examples: [
      { no: "Hei Kari, kunne du sende tallene innen fredag?", en: "Hello Kari, could you send the figures by Friday?" },
      { no: "Vedlagt finner du statusrapporten for september.", en: "Please find attached the status report for September." },
      { no: "Ta gjerne kontakt dersom noe bør forklares nærmere.", en: "Please get in touch if anything should be explained more fully." },
    ],
    vocab: [
      ["så snart som mulig", "as soon as possible", "Kan du svare så snart som mulig?", "Can you reply as soon as possible?", "phrase"],
      ["innen", "by (a deadline)", "Send den innen fredag.", "Send it by Friday.", "prep"],
      ["vedlagt finner du", "please find attached", "Vedlagt finner du notatet.", "Please find the note attached.", "phrase"],
      ["jeg viser til", "I refer to", "Jeg viser til e-posten din.", "I refer to your email.", "phrase"],
      ["som avtalt", "as agreed", "Som avtalt sender jeg tallene.", "As agreed, I am sending the figures.", "phrase"],
      ["dersom noe er uklart", "if anything is unclear", "Si ifra dersom noe er uklart.", "Let me know if anything is unclear.", "phrase"],
      ["Vennlig hilsen", "Kind regards", "Vennlig hilsen Tsvitana", "Kind regards, Tsvitana", "phrase"],
    ],
    exercises: [
      rewrite(
        "register",
        "Skriv om til en høflig jobb-e-post. Behold meningen.",
        "Hei, fikser du tallene asap?",
        [
          "Hei, kunne du sende tallene så snart som mulig",
          "Hei, kunne du rette tallene så snart som mulig",
          "Hei, kan du sende tallene så snart som mulig",
        ],
        "Replace fikse and asap. Kunne du is the polite request. Så snart som mulig is the Norwegian phrase.",
        "Rewrite it as a polite work email. Keep the meaning.",
      ),
      mc(
        "register",
        "Hvilken hilsen passer til lederen din i en vanlig e-post?",
        ["Hei Kari,", "Kjære fru Kari,", "Ærede ledelse,", "De herr Kari,"],
        "Hei Kari,",
        "Hei and a first name is the normal respectful opening in Norway. The other options sound translated or archaic.",
      ),
      fill(
        "register",
        "Fyll inn preposisjonen som betyr «by Friday», altså senest fredag.",
        "Send tallene ___ fredag.",
        ["innen"],
        "Innen fredag includes Friday. Før fredag would exclude Friday. På is only “on Friday” and does not set a deadline by itself.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Vedlagt", "finner", "du", "statusrapporten"],
        "This is a fixed opening for an attachment. The verb is second after Vedlagt.",
        [],
        "Build: Please find the status report attached.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Jeg viser til på e-posten din av i går.",
        ["Jeg viser til e-posten din av i går"],
        "Jeg viser til is followed directly by the noun. There is no extra preposition.",
      ),
      rewrite(
        "register",
        "Skriv om til en rolig avslutning.",
        "Rop ut hvis du ikke skjønner no.",
        [
          "Ta gjerne kontakt dersom noe er uklart",
          "Gi gjerne beskjed dersom noe er uklart",
        ],
        "Ta gjerne kontakt and dersom noe er uklart are the professional pair. Skjønner no is spoken and very informal.",
        "Rewrite it as a calm closing line.",
      ),
      mc(
        "register",
        "Hva er forskjellen på «innen fredag» og «før fredag»?",
        ["Innen inkluderer fredag, før gjør det ikke.", "De betyr det samme.", "Før inkluderer fredag, innen gjør det ikke.", "Innen betyr på fredag morgen."],
        "Innen inkluderer fredag, før gjør det ikke.",
        "Use innen when Friday is an acceptable delivery day. Use før only when the file must arrive earlier than Friday.",
        "What is the difference?",
      ),
      mc(
        "register",
        "Hvilken avslutning er et godt standardvalg?",
        ["Vennlig hilsen", "Kjære hilsen", "Med ærbødighet", "Hei hei"],
        "Vennlig hilsen",
        "Vennlig hilsen is the standard close. Med vennlig hilsen is a little more formal. Hei hei is for friends.",
      ),
    ],
  }),
];
