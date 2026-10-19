import { fill, fix, lesson, mc, order } from "./build.js";

export const lessonsA2 = [
  lesson({
    id: "a2-01",
    level: "A2",
    minutes: 13,
    title: "V2-regelen",
    titleEn: "The V2 rule",
    concepts: ["v2"],
    maal: "Du setter det finitte verbet på plass to i helsetninger.",
    husk: "I dag sender jeg rapporten. Ikke «I dag jeg sender».",
    intro: `In a Norwegian main clause, the finite verb is the second element. The first element can be the subject, but it can also be a time, a place or an object. Whatever stands first, the verb comes next.

Jeg sender rapporten i dag. Here jeg is first and sender is second.
I dag sender jeg rapporten. Here i dag is first, so sender is still second, and the subject jeg moves after the verb. That movement is called inversion.
I dag jeg sender rapporten is the usual English-based error, and it is not a Norwegian main clause.

Only one finite verb counts. In Jeg har sendt rapporten, har is the finite verb and stands in second place. Sendt is a participle and stays later. Questions you already know are the same rule: the verb is first only because the first slot is empty, or it is second after a question word.`,
    examples: [
      { no: "Jeg sender rapporten i dag.", en: "I am sending the report today." },
      { no: "I dag sender jeg rapporten.", en: "Today I am sending the report." },
      { no: "På fredag har vi et møte.", en: "On Friday we have a meeting." },
    ],
    vocab: [
      ["i dag", "today", "I dag sender jeg rapporten.", "Today I am sending the report.", "phrase"],
      ["i morgen", "tomorrow", "I morgen har vi møte.", "Tomorrow we have a meeting.", "phrase"],
      ["nå", "now", "Nå skriver jeg e-posten.", "Now I am writing the email.", "adv"],
      ["alltid", "always", "Jeg kommer alltid tidsnok.", "I always arrive in time.", "adv"],
      ["ofte", "often", "Vi har ofte møte på fredager.", "We often have a meeting on Fridays.", "adv"],
      ["å starte", "to start", "Møtet starter klokka ni.", "The meeting starts at nine.", "verb"],
    ],
    exercises: [
      mc(
        "v2",
        "Hvilken setning følger V2?",
        ["I dag sender jeg rapporten.", "I dag jeg sender rapporten.", "I dag jeg rapporten sender.", "Sender jeg i dag rapporten."],
        "I dag sender jeg rapporten.",
        "I dag occupies the first slot, so the finite verb sender must come immediately after it. The last option is a yes/no question, not a statement.",
      ),
      order(
        "v2",
        "Bygg setningen. Start med «I morgen».",
        ["I morgen", "har", "vi", "møte"],
        "Time first, finite verb har second, subject vi third.",
        [],
        "Build the sentence starting with I morgen.",
      ),
      order(
        "v2",
        "Bygg setningen. Start med «Nå».",
        ["Nå", "skriver", "jeg", "e-posten"],
        "Nå skriver jeg e-posten. The subject follows the verb because nå is first.",
      ),
      fill(
        "v2",
        "Sett inn verbet på riktig plass. Bruk «sender».",
        "På fredag ___ jeg rapporten.",
        ["sender"],
        "På fredag is first, so sender is the next word. Do not put jeg before the verb.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "I dag jeg er på kontoret.",
        ["I dag er jeg på kontoret"],
        "Er is the finite verb and must be the second element. The subject jeg comes after it.",
      ),
      mc(
        "v2",
        "Hva er plass to i setningen «På mandag starter møtet»?",
        ["starter", "På mandag", "møtet", "mandag"],
        "starter",
        "The whole phrase På mandag is one first element. The verb starter is therefore second, not third.",
        "Which word is in second position?",
      ),
      order(
        "v2",
        "Bygg setningen uten å flytte subjektet først.",
        ["Jeg", "sender", "rapporten", "i", "dag"],
        "When the subject is first, there is no inversion. The verb is still second.",
        [],
        "Build: I am sending the report today.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Ofte vi starter møtet klokka ni.",
        ["Ofte starter vi møtet klokka ni"],
        "Ofte is in the first slot, so the verb starter comes before the subject vi.",
      ),
    ],
  }),
  lesson({
    id: "a2-02",
    level: "A2",
    minutes: 13,
    title: "Inversjon etter ledd foran",
    titleEn: "Inversion after a fronted element",
    concepts: ["v2"],
    maal: "Du kjenner igjen inversjon når tid, sted eller objekt står først.",
    husk: "Rapporten sender jeg i morgen. Verbet følger med én gang.",
    intro: `Inversion is not a special tense. It is ordinary V2 when something other than the subject is fronted. Fronting lets you start with the piece of information you want the reader to notice.

Time: Etter lunsj skriver jeg referatet.
Place: I Oslo bor jeg i en leilighet.
Object: Rapporten sender jeg i morgen. This emphasises rapporten. The neutral order is Jeg sender rapporten i morgen. Both are correct. The verb still comes second, and the subject comes third.

Do not invert in a subordinate clause. That contrast comes in the B-level lessons. For now, every example is a main clause: one finite verb, in the second slot.`,
    examples: [
      { no: "Etter lunsj skriver jeg referatet.", en: "After lunch I will write the minutes." },
      { no: "I Oslo bor jeg nær kontoret.", en: "In Oslo I live near the office." },
      { no: "Rapporten sender jeg i morgen.", en: "The report, I will send tomorrow." },
    ],
    vocab: [
      ["etter", "after", "Etter møtet sender jeg e-posten.", "After the meeting I will send the email.", "prep"],
      ["før", "before", "Før lunsj leser jeg tallene.", "Before lunch I read the figures.", "prep"],
      ["et referat", "minutes of a meeting", "Jeg skriver referatet etter møtet.", "I write the minutes after the meeting.", "noun"],
      ["en leilighet", "a flat", "Jeg bor i en leilighet.", "I live in a flat.", "noun"],
      ["nær", "near", "Kontoret er nær Nationaltheatret.", "The office is near the National Theatre station.", "prep"],
      ["å lese", "to read", "Jeg leser e-posten først.", "I read the email first.", "verb"],
    ],
    exercises: [
      order(
        "v2",
        "Bygg setningen. Start med tidspunktet.",
        ["Etter lunsj", "skriver", "jeg", "referatet"],
        "The time phrase is one constituent. Skriver is second, and jeg follows.",
        [],
        "Start with Etter lunsj.",
      ),
      order(
        "v2",
        "Bygg setningen med objektet først.",
        ["Rapporten", "sender", "jeg", "i", "morgen"],
        "Fronting the object is correct when you want to emphasise it. The verb stays second.",
      ),
      mc(
        "v2",
        "Hvilken setning er en riktig helsetning?",
        ["I Oslo bor jeg.", "I Oslo jeg bor.", "I Oslo bor jeg bor.", "Bor i Oslo jeg."],
        "I Oslo bor jeg.",
        "Place first, verb second, subject third. The verb is not repeated.",
      ),
      fill(
        "v2",
        "Fyll inn subjektet på riktig plass. Hele svaret er ordet som mangler.",
        "Før lunsj leser ___ tallene.",
        ["jeg"],
        "Leser is already in second place, so the subject jeg comes after the verb.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Etter møtet jeg sender e-posten.",
        ["Etter møtet sender jeg e-posten"],
        "After a fronted time expression, invert: verb before subject.",
      ),
      mc(
        "v2",
        "Hvilken variant fremhever «referatet»?",
        ["Referatet skriver jeg i kveld.", "Jeg skriver referatet i kveld.", "I kveld jeg skriver referatet.", "Skriver referatet jeg i kveld."],
        "Referatet skriver jeg i kveld.",
        "Both the first and the second are grammatical, but only the first puts referatet in the stressed first slot. The third breaks V2, and the fourth is a question pattern.",
        "Which version puts the emphasis on referatet?",
      ),
      order(
        "v2",
        "Bygg setningen.",
        ["På kontoret", "leser", "jeg", "e-posten"],
        "På kontoret is the first element. Leser comes next.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Tallene jeg leser før lunsj.",
        ["Tallene leser jeg før lunsj"],
        "If tallene is fronted, the finite verb must follow at once. Tallene jeg leser is not a main clause.",
      ),
    ],
  }),
  lesson({
    id: "a2-03",
    level: "A2",
    minutes: 13,
    title: "Ikke i helsetninger",
    titleEn: "ikke in main clauses",
    concepts: ["negation", "v2"],
    maal: "Du plasserer ikke etter det finitte verbet i helsetninger.",
    husk: "Jeg sender ikke rapporten i dag.",
    intro: `In a main clause, ikke comes after the finite verb. If the subject has been inverted, ikke usually comes after that subject.

Jeg sender ikke rapporten i dag.
I dag sender jeg ikke rapporten.
Both are correct. Ikke does not take the second slot. The verb does.

With an auxiliary, the finite verb is the auxiliary. Ikke comes after it, and before the participle or infinitive: Jeg har ikke sendt rapporten. Jeg kan ikke komme. Not "jeg ikke har sendt" in a main clause, and not "jeg har sendt ikke".

Aldri, alltid and ofte are sentence adverbs in the same position when they comment on the whole clause: Jeg sender aldri rapporten på søndag. You will later see that subordinate clauses move these adverbs. This lesson is only about main clauses.`,
    examples: [
      { no: "Jeg sender ikke rapporten i dag.", en: "I am not sending the report today." },
      { no: "I dag har jeg ikke tid.", en: "Today I do not have time." },
      { no: "Vi starter aldri møtet før ni.", en: "We never start the meeting before nine." },
    ],
    vocab: [
      ["ikke", "not", "Jeg kommer ikke i dag.", "I am not coming today.", "adv"],
      ["aldri", "never", "Jeg glemmer aldri fristen.", "I never forget the deadline.", "adv"],
      ["å glemme", "to forget", "Ikke glem vedlegget.", "Do not forget the attachment.", "verb"],
      ["et vedlegg", "an attachment", "Rapporten ligger i vedlegget.", "The report is in the attachment.", "noun"],
      ["tid", "time", "Jeg har ikke tid før lunsj.", "I do not have time before lunch.", "noun"],
      ["å kunne", "can; to be able to", "Jeg kan ikke komme.", "I cannot come.", "verb"],
    ],
    exercises: [
      order(
        "negation",
        "Bygg setningen.",
        ["Jeg", "sender", "ikke", "rapporten"],
        "Finite verb sender, then ikke, then the object.",
        [],
        "Build: I am not sending the report.",
      ),
      order(
        "negation",
        "Bygg setningen. Start med «I dag».",
        ["I dag", "sender", "jeg", "ikke", "rapporten"],
        "Verb second, subject third, ikke after the inverted subject.",
      ),
      mc(
        "negation",
        "Hvor står «ikke» riktig?",
        ["Jeg har ikke sendt rapporten.", "Jeg ikke har sendt rapporten.", "Jeg har sendt ikke rapporten.", "Ikke jeg har sendt rapporten."],
        "Jeg har ikke sendt rapporten.",
        "Har is the finite verb. Ikke comes immediately after it, before the participle sendt. The first pattern is a main clause.",
      ),
      fill(
        "negation",
        "Fyll inn setningsadverbet.",
        "Vi starter ___ møtet før ni.",
        ["aldri"],
        "Aldri sits in the sentence-adverb slot, after the finite verb starter.",
        "Use aldri.",
      ),
      fill(
        "v2",
        "Velg ordet som skal inn på riktig plass.",
        "I morgen kan jeg ___ komme.",
        ["ikke"],
        "Kan is the finite verb. After inversion the order is kan jeg ikke komme.",
      ),
      fix(
        "negation",
        "Skriv setningen riktig.",
        "Jeg ikke glemmer vedlegget.",
        ["Jeg glemmer ikke vedlegget"],
        "In a main clause ikke cannot stand between the subject and the verb.",
      ),
      mc(
        "negation",
        "Hvilken setning er riktig?",
        ["Jeg kan ikke åpne vedlegget.", "Jeg ikke kan åpne vedlegget.", "Jeg kan åpne ikke vedlegget.", "Kan ikke jeg åpne vedlegget er."],
        "Jeg kan ikke åpne vedlegget.",
        "Modal verb kan, then ikke, then the infinitive åpne. The infinitive marker å is usually dropped after a modal: kan åpne, not kan å åpne.",
      ),
      fix(
        "negation",
        "Skriv setningen riktig.",
        "Hun har sendt ikke e-posten.",
        ["Hun har ikke sendt e-posten"],
        "Ikke belongs after the auxiliary har, not after the participle.",
      ),
    ],
  }),
  lesson({
    id: "a2-04",
    level: "A2",
    minutes: 14,
    title: "Adjektiv i ubestemt form",
    titleEn: "Adjectives in indefinite form",
    concepts: ["adjectives"],
    maal: "Du bøyer adjektiv i entall: stor, stort, store.",
    husk: "En ny rapport, et nytt budsjett, nye rapporter.",
    intro: `When an adjective stands before an indefinite noun, it agrees with that noun.

Masculine and feminine singular have no extra ending: en ny rapport, ei ny uke.
Neuter singular usually adds -t: et nytt budsjett, et stort møte. Ny doubles the consonant: nytt. Stor becomes stort.
Plural, for all genders, adds -e: nye rapporter, store møter, nye budsjett.

Some adjectives do not add -t. Those ending in -ig, -lig or -sk stay unchanged in the neuter: et viktig møte, et norsk ord, not "viktigt" and not "norskt". Adjectives that already end in -e, such as moderne, do not add another ending: et moderne system, moderne systemer.

Liten is irregular: en liten feil, et lite avvik, små feil. You only need to recognise it here. The definite adjective ending -e comes in a B1 lesson.`,
    examples: [
      { no: "Jeg skriver en ny rapport.", en: "I am writing a new report." },
      { no: "Vi har et nytt budsjett og et viktig møte.", en: "We have a new budget and an important meeting." },
      { no: "Det er små feil i de store tallene.", en: "There are small errors in the big figures. (De store tallene is definite and comes later.)" },
    ],
    vocab: [
      ["ny", "new", "Vi har en ny kollega.", "We have a new colleague.", "adj"],
      ["viktig", "important", "Dette er et viktig møte.", "This is an important meeting.", "adj"],
      ["stor", "big; large", "Det er et stort avvik.", "It is a large variance.", "adj"],
      ["liten", "small", "Det er en liten feil.", "It is a small error.", "adj"],
      ["en feil", "an error; a mistake", "Jeg fant en liten feil.", "I found a small error.", "noun"],
      ["et avvik", "a variance; a deviation", "Vi har et stort avvik.", "We have a large variance.", "noun"],
    ],
    exercises: [
      mc(
        "adjectives",
        "Velg riktig form foran «et budsjett».",
        ["et nytt budsjett", "et ny budsjett", "et nye budsjett", "et nytt budsjetten"],
        "et nytt budsjett",
        "Budsjett is neuter singular, so ny takes -t and doubles the consonant: nytt. The noun stays indefinite.",
      ),
      mc(
        "adjectives",
        "Velg riktig form.",
        ["et viktig møte", "et viktigt møte", "et viktige møte", "en viktig møte"],
        "et viktig møte",
        "Adjectives in -ig do not add -t in the neuter. Møte still takes et.",
      ),
      fill(
        "adjectives",
        "Fyll inn riktig form av «stor».",
        "Vi har ___ rapporter i år.",
        ["store"],
        "Plural adjectives end in -e: store rapporter.",
        "Plural of stor.",
      ),
      fill(
        "adjectives",
        "Fyll inn riktig form av «liten» i intetkjønn.",
        "Det er et ___ avvik.",
        ["lite"],
        "Liten is irregular. Neuter singular is lite: et lite avvik. Plural would be små.",
      ),
      order(
        "adjectives",
        "Bygg setningen.",
        ["Jeg", "skriver", "en", "ny", "rapport"],
        "Masculine indefinite: no ending on ny.",
      ),
      fix(
        "adjectives",
        "Skriv setningen riktig.",
        "Vi har et store møte.",
        ["Vi har et stort møte"],
        "Singular neuter is stort, not store. Store is the plural or the definite form.",
      ),
      mc(
        "adjectives",
        "Hvilken setning er riktig?",
        ["Det er små feil i rapporten.", "Det er lite feil i rapporten.", "Det er smått feil i rapporten.", "Det er liten feil i rapportene er."],
        "Det er små feil i rapporten.",
        "Feil is plural here (“errors”), and the plural of liten is små. Lite is neuter singular.",
      ),
      fix(
        "adjectives",
        "Skriv setningen riktig.",
        "Dette er et norskt ord.",
        ["Dette er et norsk ord"],
        "Norsk ends in -sk and does not take -t. Et norsk ord.",
      ),
    ],
  }),
  lesson({
    id: "a2-05",
    level: "A2",
    minutes: 14,
    title: "I, på og til",
    titleEn: "The prepositions i, på and til",
    concepts: ["prepositions"],
    maal: "Du velger i, på eller til for sted og bevegelse.",
    husk: "Jeg bor i Oslo. Jeg er på kontoret. Jeg reiser til Gardermoen.",
    intro: `I is used with countries, cities and many enclosed or abstract spaces: i Norge, i Oslo, i Ukraina, i rapporten, i vedlegget. Duration also uses i: i ti år, i en uke.

På is used with many workplaces, institutions, events and islands: på kontoret, på jobben, på møtet, på flyplassen, på universitetet. "At work" is på jobben. Being at a named meeting is på møtet.

Til marks a destination: reise til Oslo, gå til kontoret, sende rapporten til lederen. It is the direction, not the place where you already are. Jeg bor i Oslo, but Jeg reiser til Oslo.

Some combinations are fixed and must be learned as phrases: i dag, i morgen, i går, på fredag, på norsk, på kontoret. På fredag means on Friday. I fredag is wrong.`,
    examples: [
      { no: "Jeg bor i Oslo og jobber på kontoret.", en: "I live in Oslo and work at the office." },
      { no: "Vi er på møtet i ti minutter.", en: "We are in the meeting for ten minutes." },
      { no: "I morgen reiser jeg til Gardermoen.", en: "Tomorrow I am travelling to Gardermoen." },
    ],
    vocab: [
      ["i", "in; for (duration)", "Jeg har bodd i Norge i ti år.", "I have lived in Norway for ten years.", "prep"],
      ["på", "on; at", "Jeg er på kontoret.", "I am at the office.", "prep"],
      ["til", "to", "Jeg sender den til lederen.", "I am sending it to the manager.", "prep"],
      ["en leder", "a manager", "Lederen leser rapporten.", "The manager reads the report.", "noun"],
      ["på norsk", "in Norwegian", "Kan vi ta det på norsk?", "Can we do it in Norwegian?", "phrase"],
      ["i går", "yesterday", "Jeg sendte rapporten i går.", "I sent the report yesterday.", "phrase"],
    ],
    exercises: [
      mc(
        "prepositions",
        "Velg preposisjon. «She lives in Oslo.»",
        ["Hun bor i Oslo.", "Hun bor på Oslo.", "Hun bor til Oslo.", "Hun bor om Oslo."],
        "Hun bor i Oslo.",
        "Cities and countries take i when you are there. Til Oslo would be a destination.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjon.",
        "Jeg er ___ kontoret i dag.",
        ["på"],
        "På kontoret and på jobben are the fixed workplace phrases.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjon for retning.",
        "Vi reiser ___ Gardermoen i morgen.",
        ["til"],
        "Til marks movement towards a place. I Gardermoen would mean already being there, and is not the natural phrase; people say på Gardermoen once they have arrived.",
      ),
      mc(
        "prepositions",
        "Hvilken setning er riktig?",
        ["Møtet er på fredag.", "Møtet er i fredag.", "Møtet er til fredag.", "Møtet er om fredag."],
        "Møtet er på fredag.",
        "Weekdays take på: på fredag. I dag and i morgen are the exceptions among time words, because they are fixed phrases.",
      ),
      order(
        "prepositions",
        "Bygg setningen.",
        ["Jeg", "har", "bodd", "i", "Norge", "i", "ti", "år"],
        "The first i is place. The second i is duration: for ten years.",
        [],
        "Build: I have lived in Norway for ten years.",
      ),
      fix(
        "prepositions",
        "Skriv setningen riktig.",
        "Jeg sender rapporten i lederen.",
        ["Jeg sender rapporten til lederen"],
        "The recipient is a destination: til lederen. I lederen would mean “inside the manager”.",
      ),
      mc(
        "prepositions",
        "Hva betyr «på møtet»?",
        ["at the meeting", "to the meeting", "about the meeting", "before the meeting"],
        "at the meeting",
        "På møtet is location at an event. Movement towards it is til møtet. About the meeting would be om møtet.",
        "What does på møtet mean?",
      ),
      fix(
        "prepositions",
        "Skriv setningen riktig.",
        "Jeg skriver rapporten i norsk.",
        ["Jeg skriver rapporten på norsk"],
        "På norsk means “in Norwegian”. I norsk is not the phrase.",
      ),
    ],
  }),
  lesson({
    id: "a2-06",
    level: "A2",
    minutes: 14,
    title: "Preteritum",
    titleEn: "The simple past",
    concepts: ["tenses"],
    maal: "Du bruker preteritum om avgrensede hendelser i fortid.",
    husk: "I går sendte jeg rapporten. Jeg bodde, jeg skrev, jeg var.",
    intro: `Preteritum is the simple past. Use it for a finished event at a stated time, or a period that is over: I går sendte jeg rapporten. I 2016 bodde jeg i Oslo. The time can be implicit, but the event is presented as finished and placed in the past.

Weak verbs usually take -et or -te. Snacke → snakket. Jobbe → jobbet. If the stem ends in a voiced consonant after a long vowel, the ending is often -te: bo → bodde (also a consonant change), sende → sendte, lede → ledet or ledte is rarer; you need sendte and bodde now.

Strong and irregular verbs change the vowel, and there is no -et ending: skrive → skrev, være → var, ha → hadde, gjøre → gjorde, komme → kom, gå → gikk, si → sa. Present -r disappears. Do not say "skrevde" or "gikkete".

Perfektum (har + participle) comes in the next level. If you name a finished clock time such as i går or i 2019, preteritum is the safe choice.`,
    examples: [
      { no: "I går sendte jeg rapporten til lederen.", en: "Yesterday I sent the report to the manager." },
      { no: "Jeg bodde i Oslo da jeg tok kurset.", en: "I lived in Oslo when I took the course." },
      { no: "Hun skrev referatet etter møtet.", en: "She wrote the minutes after the meeting." },
    ],
    vocab: [
      ["å sende – sendte", "to send – sent", "Jeg sendte e-posten i går.", "I sent the email yesterday.", "verb"],
      ["å bo – bodde", "to live – lived", "Jeg bodde i Oslo i to år.", "I lived in Oslo for two years.", "verb"],
      ["å skrive – skrev", "to write – wrote", "Hun skrev referatet.", "She wrote the minutes.", "verb"],
      ["å være – var", "to be – was", "Møtet var kort.", "The meeting was short.", "verb"],
      ["å gjøre – gjorde", "to do – did", "Vi gjorde jobben ferdig.", "We finished the work.", "verb"],
      ["i går", "yesterday", "I går var jeg på kontoret.", "Yesterday I was at the office.", "phrase"],
    ],
    exercises: [
      mc(
        "tenses",
        "Preteritum av «å sende»?",
        ["sendte", "sendet", "sendt", "sender"],
        "sendte",
        "Sende is a weak verb with -te in the past: sendte. Sendt is the participle, used with har.",
      ),
      mc(
        "tenses",
        "Preteritum av «å skrive»?",
        ["skrev", "skrivet", "skrevde", "skriver"],
        "skrev",
        "Skrive is strong. The past is skrev, with a vowel change and no dental ending.",
      ),
      fill(
        "tenses",
        "Fyll inn preteritum av «å være».",
        "Møtet ___ kort i går.",
        ["var"],
        "å være → var. The time expression i går confirms a finished past event.",
      ),
      fill(
        "tenses",
        "Fyll inn preteritum av «å bo».",
        "Jeg ___ i Norge i 2018.",
        ["bodde"],
        "A finished year takes preteritum: bodde, not har bodd, when the year is presented as over.",
      ),
      order(
        "tenses",
        "Bygg setningen.",
        ["I går", "sendte", "jeg", "rapporten"],
        "I går is first, so the past verb sendte is second and the subject follows.",
        [],
        "Build: Yesterday I sent the report.",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Hun skrevde referatet.",
        ["Hun skrev referatet"],
        "Do not add a weak ending onto a strong past. Skrev already is the past tense.",
      ),
      mc(
        "tenses",
        "Hvilken setning passer best?",
        ["I går var jeg på kontoret.", "I går har jeg vært på kontoret.", "I går er jeg på kontoret.", "I går jeg var på kontoret."],
        "I går var jeg på kontoret.",
        "I går names a finished time, so preteritum is the natural tense. The last sentence also breaks V2.",
        "Which sentence fits best?",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Vi gjørte jobben ferdig i går.",
        ["Vi gjorde jobben ferdig i går"],
        "Gjøre → gjorde. There is no gjørte.",
      ),
    ],
  }),
  lesson({
    id: "a2-07",
    level: "A2",
    minutes: 13,
    title: "Kan, vil, skal og må",
    titleEn: "The modal verbs kan, vil, skal and må",
    concepts: ["modals"],
    maal: "Du bruker modalverb med infinitiv uten å.",
    husk: "Jeg må sende rapporten. Ikke «må å sende».",
    intro: `Modal verbs are followed by a bare infinitive, without å. Jeg må sende rapporten. Jeg kan komme. Hun skal skrive referatet. Vil du lese det?

The core meanings at this level:
kan = can, am able to, or a polite possibility
vil = want to
skal = shall, am going to, or a scheduled plan
må = must, have to

Present forms are the same for all persons: jeg kan, hun kan, de kan. Past forms, for recognition now, are kunne, ville, skulle, måtte. Do not put å between the modal and the next verb. Å returns if the verb is not hanging on the modal: Jeg liker å skrive. Liker is not a modal.

Ikke goes after the modal in a main clause: Jeg kan ikke komme i morgen.`,
    examples: [
      { no: "Jeg må sende rapporten før fredag.", en: "I have to send the report before Friday." },
      { no: "Kan du lese referatet?", en: "Can you read the minutes?" },
      { no: "Vi skal ha møte på torsdag.", en: "We are going to have a meeting on Thursday." },
    ],
    vocab: [
      ["å måtte", "to have to", "Jeg må gå nå.", "I have to go now.", "verb"],
      ["å skulle", "to be going to", "Vi skal møtes på torsdag.", "We are going to meet on Thursday.", "verb"],
      ["å ville", "to want to", "Jeg vil lære flere faste uttrykk.", "I want to learn more fixed expressions.", "verb"],
      ["å kunne", "to be able to", "Jeg kan ta møtet på norsk.", "I can take the meeting in Norwegian.", "verb"],
      ["før", "before", "Send den før fredag.", "Send it before Friday.", "prep"],
      ["å lære", "to learn", "Jeg lærer bokmål hver dag.", "I study bokmål every day.", "verb"],
    ],
    exercises: [
      mc(
        "modals",
        "Hvilken setning er riktig?",
        ["Jeg må sende rapporten.", "Jeg må å sende rapporten.", "Jeg må sender rapporten.", "Jeg måtte sende er rapporten."],
        "Jeg må sende rapporten.",
        "After må, use the infinitive without å and without the present -r.",
      ),
      fill(
        "modals",
        "Fyll inn modalverbet som betyr «want to».",
        "Jeg ___ lese referatet i kveld.",
        ["vil"],
        "Vil expresses a wish or intention. Skal would be a plan or obligation, and må would be necessity.",
      ),
      order(
        "modals",
        "Bygg spørsmålet.",
        ["Kan", "du", "lese", "referatet"],
        "The modal is the finite verb, so it comes first in a yes/no question. The infinitive lese has no å.",
        [],
        "Build: Can you read the minutes?",
      ),
      mc(
        "modals",
        "Hva betyr «Vi skal ha møte på torsdag»?",
        ["We are scheduled to have a meeting on Thursday.", "We must have had a meeting on Thursday.", "We want a meeting sometime.", "We had a meeting on Thursday."],
        "We are scheduled to have a meeting on Thursday.",
        "Skal + infinitive often states a plan or an arrangement. It is not the past.",
        "What does the sentence mean?",
      ),
      fix(
        "modals",
        "Skriv setningen riktig.",
        "Hun kan ikke å komme.",
        ["Hun kan ikke komme"],
        "Drop å after the modal. Ikke still sits after kan.",
      ),
      fill(
        "modals",
        "Fyll inn «must».",
        "Du ___ svare før klokka tolv.",
        ["må"],
        "Må is necessity. The infinitive svare comes later, without å.",
      ),
      order(
        "modals",
        "Bygg setningen.",
        ["Jeg", "vil", "ikke", "avlyse", "møtet"],
        "Modal, then ikke, then the bare infinitive. Avlyse means to cancel.",
        [],
        "Build: I do not want to cancel the meeting.",
      ),
      fix(
        "modals",
        "Skriv setningen riktig.",
        "Vi skal å skrive referatet i morgen.",
        ["Vi skal skrive referatet i morgen"],
        "Skal is a modal. The next verb is a bare infinitive.",
      ),
    ],
  }),
  lesson({
    id: "a2-08",
    level: "A2",
    minutes: 14,
    title: "Min, mitt og mine",
    titleEn: "Min, mitt and mine",
    concepts: ["possessives"],
    maal: "Du bøyer eiendomsord og kjenner mønsteret før sin.",
    husk: "Rapporten min, mitt budsjett, mine møter.",
    intro: `Possessives agree with the thing owned, not with the owner. Min rapport is masculine, mitt budsjett is neuter, mine møter is plural. The same pattern is din/ditt/dine and vår/vårt/våre.

There are two correct orders. Min rapport uses the indefinite noun after the possessive. Rapporten min uses the definite noun before it. Both mean "my report". The second is very common in speech and in relaxed writing. Do not mix them: not "min rapporten" and not "rapporten mitt".

Sin, sitt and sine are different: they point back to the subject of the same clause. This lesson only fixes the agreement of min, din and vår. The next level separates sin from hans and hennes, which is the distinction that matters in longer sentences.`,
    examples: [
      { no: "Rapporten min er kort.", en: "My report is short." },
      { no: "Mitt budsjett har et lite avvik.", en: "My budget has a small variance." },
      { no: "Mine kollegaer jobber på Gardermoen.", en: "My colleagues work at Gardermoen.", "note": "" },
    ],
    vocab: [
      ["min", "my (masculine/feminine)", "Kollegaen min jobber i Oslo.", "My colleague works in Oslo.", "pronoun"],
      ["mitt", "my (neuter)", "Budsjettet mitt er klart.", "My budget is ready.", "pronoun"],
      ["mine", "my (plural)", "Mine notater ligger her.", "My notes are here.", "pronoun"],
      ["et notat", "a note", "Jeg skriver et notat.", "I am writing a note.", "noun"],
      ["vår", "our", "Lederen vår er på reise.", "Our manager is travelling.", "pronoun"],
      ["din", "your (singular)", "E-posten din kom i går.", "Your email arrived yesterday.", "pronoun"],
    ],
    exercises: [
      mc(
        "possessives",
        "Velg riktig form.",
        ["mitt budsjett", "min budsjett", "mine budsjett", "mitt budsjetten"],
        "mitt budsjett",
        "Budsjett is neuter singular, so the possessive is mitt. The noun stays indefinite after mitt.",
      ),
      mc(
        "possessives",
        "Hvilken setning er riktig?",
        ["Rapporten min er klar.", "Rapporten mitt er klar.", "Min rapporten er klar.", "Mine rapport er klar."],
        "Rapporten min er klar.",
        "When the possessive follows, the noun is definite: rapporten min. It agrees with the feminine/masculine noun, so min, not mitt.",
      ),
      fill(
        "possessives",
        "Fyll inn flertallsformen.",
        "___ kollegaer er på møtet.",
        ["Mine", "mine"],
        "Kollegaer is plural, so mine. The capital letter is optional here because the blank may start the sentence; both are accepted.",
      ),
      fill(
        "possessives",
        "Fyll inn «our» i intetkjønn.",
        "___ møte starter klokka ni.",
        ["Vårt", "vårt"],
        "Et møte is neuter, so vår → vårt møte. Våre møter would be plural.",
      ),
      order(
        "possessives",
        "Bygg setningen.",
        ["E-posten", "din", "kom", "i", "går"],
        "Definite noun plus possessive after it: e-posten din.",
        [],
        "Build: Your email arrived yesterday.",
      ),
      fix(
        "possessives",
        "Skriv setningen riktig.",
        "Jeg sender min rapporten i dag.",
        ["Jeg sender rapporten min i dag", "Jeg sender min rapport i dag"],
        "Either rapporten min or min rapport. Do not put a definite ending on the noun after min.",
      ),
      mc(
        "possessives",
        "Hva styrer formen min / mitt / mine?",
        ["Ordet som eies", "Personen som eier", "Verbet", "Preposisjonen"],
        "Ordet som eies",
        "Agreement follows the gender and number of the possessed noun. The owner can be the same person in all three sentences.",
        "What decides min, mitt or mine?",
      ),
      fix(
        "possessives",
        "Skriv setningen riktig.",
        "Budsjettet min har et avvik.",
        ["Budsjettet mitt har et avvik"],
        "Budsjettet is neuter, so the following possessive is mitt.",
      ),
    ],
  }),
];
