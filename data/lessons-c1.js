import { fill, fix, lesson, mc, order, rewrite } from "./build.js";

export const lessonsC1 = [
  lesson({
    id: "c1-01",
    level: "C1",
    minutes: 14,
    title: "Tematisering",
    titleEn: "Thematisation and focus",
    concepts: ["v2"],
    maal: "Du legger riktig ledd først uten å bryte V2.",
    husk: "Dette avviket tar vi med. Det er kostnaden som øker.",
    intro: `The first slot of a main clause is the theme: the thing you want the reader to hold in mind. You may put an object, a prepositional phrase or a whole subordinate clause there. The finite verb still comes second.

Dette avviket tar vi med i rapporten.
I september økte lisenskostnaden.
At tallene stemmer, er det viktigste.

A cleft sentence with det er … som singles out one piece even more clearly. Det er lisenskostnaden som øker, ikke driftskostnaden. The som-clause identifies the focused element. Use a cleft when a plain fronted object would be hard to read, or when you are correcting a misunderstanding.

Do not front two separate elements. I september lisenskostnaden økte tries to put both the time and the subject before the verb. Choose one: I september økte lisenskostnaden, or Lisenskostnaden økte i september.

In a report, thematisation is how paragraphs stay coherent. The theme is often something already mentioned. New information comes later in the sentence. Dette avviket (known) tar vi med i notatet (new).`,
    examples: [
      { no: "Dette avviket tar vi med i notatet.", en: "This variance we will include in the note." },
      { no: "I september økte lisenskostnaden.", en: "In September the licence cost increased." },
      { no: "Det er lisenskostnaden som øker.", en: "It is the licence cost that is increasing." },
    ],
    vocab: [
      ["å tematisere", "to choose as the theme", "Vi tematiserer avviket i første setning.", "We make the variance the theme of the first sentence.", "verb"],
      ["en lisenskostnad", "a licence cost", "Lisenskostnaden økte i september.", "The licence cost increased in September.", "noun"],
      ["å fremheve", "to emphasise", "Setningen fremhever lisenskostnaden.", "The sentence emphasises the licence cost.", "verb"],
      ["det viktigste", "the most important thing", "Det viktigste er at tallene stemmer.", "The most important thing is that the figures add up.", "phrase"],
      ["ikke … men", "not … but", "Ikke driften, men lisensene økte.", "Not operations, but the licences increased.", "phrase"],
      ["allerede kjent", "already known", "Temaet bør være allerede kjent for leseren.", "The theme should already be known to the reader.", "phrase"],
      ["å øke", "to increase", "Kostnaden økte med fire prosent.", "The cost increased by four percent.", "verb"],
    ],
    exercises: [
      order(
        "v2",
        "Bygg setningen med objektet som tema.",
        ["Dette", "avviket", "tar", "vi", "med"],
        "The object is the first element. Tar is second, and the subject vi follows.",
        [],
        "Build the sentence with the object as theme.",
      ),
      mc(
        "v2",
        "Hvilken setning bryter V2?",
        ["I september lisenskostnaden økte.", "I september økte lisenskostnaden.", "Lisenskostnaden økte i september.", "Det er lisenskostnaden som økte."],
        "I september lisenskostnaden økte.",
        "Two elements stand before the verb. The time phrase and the subject cannot share the first slot.",
        "Which sentence breaks V2?",
      ),
      order(
        "v2",
        "Bygg utkløvet.",
        ["Det", "er", "lisenskostnaden", "som", "øker"],
        "Det er … som isolates lisenskostnaden as the thing that increases.",
        [],
        "Build the cleft.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig. Behold september som tema.",
        "I september lisenskostnaden økte med fire prosent.",
        ["I september økte lisenskostnaden med fire prosent"],
        "Keep the time in the first slot and place the verb immediately after it.",
      ),
      mc(
        "v2",
        "Hvilken formulering retter en misforståelse tydeligst?",
        ["Det er lisenskostnaden som øker, ikke driftskostnaden.", "Lisenskostnaden øker, og driftskostnaden er et ord.", "Øker lisenskostnaden ikke driftskostnaden.", "Som øker det er lisenskostnaden."],
        "Det er lisenskostnaden som øker, ikke driftskostnaden.",
        "The cleft plus ikke names the rejected alternative. That is the clearest correction.",
        "Which wording corrects a misunderstanding most clearly?",
      ),
      fill(
        "v2",
        "Fyll inn verbet slik at «at-setningen» er tema.",
        "At tallene stemmer, ___ det viktigste.",
        ["er"],
        "The whole at-clause is the first element, so er comes next. A comma closes the fronted clause.",
      ),
      order(
        "v2",
        "Bygg setningen.",
        ["Ikke", "driften", "men", "lisensene", "økte"],
        "When ikke + noun is the theme and men introduces the real subject, the verb follows that subject. Lisensene økte is the main clause. This pattern is fixed and should be learned as a whole.",
        [],
        "Build: Not operations, but the licences increased.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Dette avviket vi tar med i notatet.",
        ["Dette avviket tar vi med i notatet"],
        "A fronted object must be followed at once by the finite verb.",
      ),
    ],
  }),
  lesson({
    id: "c1-02",
    level: "C1",
    minutes: 14,
    title: "Preposisjoner som gjør teksten presis",
    titleEn: "Prepositions that make the text precise",
    concepts: ["prepositions"],
    maal: "Du bytter ut upresis «i forhold til» når et tydeligere uttrykk finnes.",
    husk: "Uenig i saken, uenig med personen. En økning på fire prosent.",
    intro: `I forhold til is everywhere in workplace Norwegian, and it is often doing the job of three different expressions. Compared with something, use sammenlignet med. About a topic, use om or når det gjelder. Relative to a rule, use i henhold til or etter. If you can name the relation, do.

Numbers have their own prepositions. An increase of four percent is en økning på fire prosent. An increase in the costs is en økning i kostnadene. A variance from the budget is et avvik fra budsjettet. A variance of four percent is et avvik på fire prosent. På names the size. Fra names the baseline.

Uenig i takes the matter: Jeg er uenig i vurderingen. Uenig med takes the person: Jeg er uenig med Kari. The same split holds for enig i and enig med.

Other phrases worth owning: på bakgrunn av tallene, i tråd med budsjettet, av hensyn til fristen, til tross for avviket. Til tross for is "despite". Av hensyn til is "out of consideration for", not "with regard to the content". For the content, når det gjelder or om is clearer.`,
    examples: [
      { no: "Kostnaden økte med fire prosent sammenlignet med august.", en: "The cost increased by four percent compared with August." },
      { no: "Jeg er uenig i vurderingen, men ikke uenig med Kari.", en: "I disagree with the assessment, but I do not disagree with Kari." },
      { no: "På bakgrunn av tallene anbefaler jeg å vente.", en: "On the basis of the figures I recommend waiting." },
    ],
    vocab: [
      ["sammenlignet med", "compared with", "Avviket er lite sammenlignet med i fjor.", "The variance is small compared with last year.", "phrase"],
      ["i henhold til", "in accordance with", "I henhold til budsjettet er vi innenfor rammen.", "In accordance with the budget we are within the ceiling.", "phrase"],
      ["når det gjelder", "as regards", "Når det gjelder lisensene, er avviket forklart.", "As regards the licences, the variance is explained.", "phrase"],
      ["på bakgrunn av", "on the basis of", "På bakgrunn av dette utsetter vi saken.", "On this basis we are postponing the item.", "phrase"],
      ["uenig i", "disagreeing with (a matter)", "Jeg er uenig i forslaget.", "I disagree with the proposal.", "phrase"],
      ["til tross for", "despite", "Til tross for avviket holder vi fristen.", "Despite the variance we are keeping the deadline.", "phrase"],
      ["en økning på", "an increase of", "En økning på fire prosent er forklart.", "An increase of four percent is explained.", "phrase"],
    ],
    exercises: [
      mc(
        "prepositions",
        "Hvilken formulering er mest presis om en sammenligning?",
        ["sammenlignet med august", "i forhold til august, når du mener sammenligning og vil være presis", "om august", "hos august"],
        "sammenlignet med august",
        "When you mean a comparison, sammenlignet med says so. I forhold til is understandable but less precise, and this item asks for the precise choice.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjonen for størrelsen.",
        "Vi har et avvik ___ fire prosent.",
        ["på"],
        "På names the size of the variance. Fra would name the baseline: avvik fra budsjettet.",
      ),
      fill(
        "prepositions",
        "Fyll inn. Du er uenig i selve vurderingen.",
        "Jeg er uenig ___ vurderingen.",
        ["i"],
        "A matter takes i. Med would be used with a person: uenig med Kari.",
      ),
      fix(
        "prepositions",
        "Skriv setningen mer presist. Meningen er «compared with last year».",
        "Avviket er lite i forhold til i fjor.",
        ["Avviket er lite sammenlignet med i fjor"],
        "Sammenlignet med is the explicit comparison. I fjor stays.",
      ),
      order(
        "prepositions",
        "Bygg setningen.",
        ["På bakgrunn av", "tallene", "anbefaler", "jeg", "å", "vente"],
        "The prepositional phrase is the first element, so anbefaler is second and jeg follows.",
        [],
        "Build: On the basis of the figures I recommend waiting.",
      ),
      mc(
        "prepositions",
        "Hva betyr «til tross for avviket»?",
        ["despite the variance", "because of the variance", "before the variance", "instead of the variance"],
        "despite the variance",
        "Til tross for concedes a fact and then continues against the expectation. Because of would be på grunn av.",
        "What does til tross for avviket mean?",
      ),
      fill(
        "prepositions",
        "Fyll inn uttrykket som betyr «in accordance with». Velg de tre ordene.",
        "___ budsjettet er vi innenfor rammen.",
        ["I henhold til", "i henhold til"],
        "The fixed expression is i henhold til. All three words belong in the blank: I henhold til budsjettet.",
      ),
      fix(
        "prepositions",
        "Skriv setningen riktig.",
        "Jeg er uenig med forslaget, men enig i Kari.",
        ["Jeg er uenig i forslaget, men enig med Kari"],
        "Swap the prepositions. The proposal is a matter (i). Kari is a person (med).",
      ),
    ],
  }),
  lesson({
    id: "c1-03",
    level: "C1",
    minutes: 14,
    title: "Sin i lengre setninger",
    titleEn: "sin in longer sentences",
    concepts: ["possessives"],
    maal: "Du finner subjektet som sin peker på, også i leddsetninger.",
    husk: "Sin peker på subjektet i sin egen setning. «Per ba Anna … sin» kan være tvetydig.",
    intro: `In a subordinate clause, sin points to the subject of that clause, not automatically to the subject of the sentence. Per sa at Anna hadde sendt rapporten sin. Sin points to Anna. Per sa at Anna hadde sendt rapporten hans. Hans can point to Per, because Per is masculine and is not the subject of the inner clause.

An infinitive has a understood subject. Per lovet å sende rapporten sin. The person who will send it is Per, so sin is Per's report. Per ba Anna sende rapporten sin is not so clear. Anna may be the understood subject of sende, which makes sin Anna's, but readers can also attach sin to Per. In a report, do not leave that ambiguity. Write rapporten hennes or rapporten til Anna if you mean Anna, and sin egen rapport or Pers rapport if you mean Per.

Sin still agrees with the noun it stands with, not with the owner: teamet forklarte avviket sitt (neuter), teamet forklarte tallene sine (plural). And jeg, du, vi, dere never take sin. Vi sendte rapporten vår.`,
    examples: [
      { no: "Per sa at Anna hadde sendt rapporten sin.", en: "Per said that Anna had sent her own report." },
      { no: "Per lovet å sende rapporten sin innen fredag.", en: "Per promised to send his own report by Friday." },
      { no: "Teamet forklarte avviket sitt i notatet.", en: "The team explained its own variance in the note." },
    ],
    vocab: [
      ["tvetydig", "ambiguous", "Setningen er tvetydig og bør skrives om.", "The sentence is ambiguous and should be rewritten.", "adj"],
      ["å love", "to promise", "Per lovet å varsle.", "Per promised to give notice.", "verb"],
      ["å be", "to ask", "Per ba Anna lese notatet.", "Per asked Anna to read the note.", "verb"],
      ["sitt", "its/his/her own (neuter)", "Teamet lukket avviket sitt.", "The team closed its own variance.", "pronoun"],
      ["vår", "our", "Vi sendte rapporten vår.", "We sent our report.", "pronoun"],
      ["å skrive om", "to rewrite", "Jeg skriver om setningen.", "I am rewriting the sentence.", "verb"],
      ["et team", "a team", "Teamet møtes på torsdag.", "The team meets on Thursday.", "noun"],
    ],
    exercises: [
      mc(
        "possessives",
        "Hvem eier rapporten? «Per sa at Anna hadde sendt rapporten sin.»",
        ["Anna", "Per", "både Per og Anna", "leseren"],
        "Anna",
        "Sin stands in the at-clause and points to that clause's subject, Anna.",
        "Who owns the report?",
      ),
      mc(
        "possessives",
        "Hvem sin rapport er det mest nærliggende å lese i «Per lovet å sende rapporten sin»?",
        ["Pers rapport", "Annas rapport", "en ukjent persons rapport", "rapporten til ledelsen"],
        "Pers rapport",
        "The understood subject of the infinitive is Per, the person who promised. Sin points to him.",
        "Whose report is the natural reading?",
      ),
      mc(
        "possessives",
        "Hvilken setning er tvetydig?",
        ["Per ba Anna sende rapporten sin.", "Per sendte rapporten sin.", "Anna sendte rapporten sin.", "Jeg sendte rapporten min."],
        "Per ba Anna sende rapporten sin.",
        "Both Per and Anna can be understood as the owner. The other sentences have one clear subject.",
        "Which sentence is ambiguous?",
      ),
      fill(
        "possessives",
        "Fyll inn. Teamet er subjekt, og avviket er intetkjønn.",
        "Teamet forklarte avviket ___.",
        ["sitt"],
        "The owner is the subject, and the noun is neuter, so sitt.",
      ),
      fix(
        "possessives",
        "Skriv setningen slik at det entydig er Annas rapport. Anna er ikke subjekt i helsetningen.",
        "Per sa at rapporten sin var sendt.",
        ["Per sa at rapporten hennes var sendt", "Per sa at Anna hadde sendt rapporten sin"],
        "The original sin has no feminine subject inside its clause. Name Anna as the subject, or use hennes if the owner is outside the clause.",
      ),
      order(
        "possessives",
        "Bygg setningen.",
        ["Vi", "sendte", "rapporten", "vår", "innen", "fredag"],
        "Vi takes vår, never sin. Rapporten vår is definite noun plus possessive.",
        [],
        "Build: We sent our report by Friday.",
      ),
      rewrite(
        "possessives",
        "Skriv om slik at eieren er entydig Anna.",
        "Per ba Anna sende rapporten sin.",
        [
          "Per ba Anna sende sin egen rapport",
          "Per ba Anna om å sende sin egen rapport",
          "Per ba Anna sende Annas rapport",
        ],
        "Sin egen next to the infinitive is read as Anna's, because she is the person asked to send it. Hennes also points to Anna if she has already been named. Avoid the bare ambiguous sin.",
        "Rewrite so that the owner is unambiguously Anna.",
      ),
      mc(
        "possessives",
        "Hvilken setning er ugrammatisk?",
        ["Jeg sendte rapporten sin.", "Jeg sendte rapporten min.", "Hun sendte rapporten sin.", "De sendte rapporten sin."],
        "Jeg sendte rapporten sin.",
        "Sin cannot refer to jeg. The last sentence is possible if sin refers to a shared report in careful style; de more often takes sine with a plural object, but the clearly ungrammatical one is jeg … sin.",
      ),
    ],
  }),
  lesson({
    id: "c1-04",
    level: "C1",
    minutes: 14,
    title: "Passiv i rapporter",
    titleEn: "Passive voice in reports",
    concepts: ["passive", "register"],
    maal: "Du velger ble, er og s-passiv etter hva slags informasjon det er.",
    husk: "Ble avstemt i går. Er avstemt nå. Avstemmes hver måned.",
    intro: `Reports need three different passives, and they are not interchangeable.

Ble + participle is an event in the past: Tallene ble avstemt 3. oktober.
Er + participle is a resulting state: Tallene er avstemt. You are describing how they stand now, not telling the story of the meeting.
S-passive is a rule or a repeated process: Tallene avstemmes hver måned. Anbefalingen omtales i kapittel 4.

A report that only uses s-passive becomes distant. A report that only uses jeg becomes a diary. Mix them. State the event when the time matters: Gjennomgangen ble gjennomført i september. State the result when the reader needs the current fact: Avviket er forklart. Use s-passive for the standing routine: Kostnadene føres på kostnadssted 410.

Skyldes is not a passive, but it belongs in the same paragraph. Avviket skyldes høyere lisenspriser. It means "is due to". Do not write "er skyldes".

Name the agent when the responsibility matters, and leave it out when the action is institutional. Tallene ble avstemt av controller. Kostnadene føres på kostnadsstedet.`,
    examples: [
      { no: "Tallene ble avstemt 3. oktober.", en: "The figures were reconciled on 3 October." },
      { no: "Tallene er avstemt, og avviket er forklart.", en: "The figures are reconciled, and the variance is explained." },
      { no: "Kostnadene føres på kostnadssted 410.", en: "The costs are charged to cost centre 410." },
    ],
    vocab: [
      ["å avstemme", "to reconcile", "Vi avstemmer tallene hver måned.", "We reconcile the figures every month.", "verb"],
      ["er avstemt", "has been reconciled; is in a reconciled state", "Filen er avstemt.", "The file is reconciled.", "phrase"],
      ["føres", "is entered; is charged", "Beløpet føres i oktober.", "The amount is recognised in October.", "verb"],
      ["et kostnadssted", "a cost centre", "Kostnadssted 410 gjelder lisenser.", "Cost centre 410 concerns licences.", "noun"],
      ["å skyldes", "to be due to", "Avviket skyldes lisensprisene.", "The variance is due to the licence prices.", "verb"],
      ["en gjennomgang", "a review", "Gjennomgangen ble ferdig i september.", "The review was finished in September.", "noun"],
      ["et beløp", "an amount", "Beløpet er lite.", "The amount is small.", "noun"],
    ],
    exercises: [
      mc(
        "passive",
        "Du vil fortelle at handlingen skjedde 3. oktober. Hva skriver du?",
        ["Tallene ble avstemt 3. oktober.", "Tallene avstemmes 3. oktober.", "Tallene er avstemt 3. oktober som hendelse.", "Tallene har avstemmes."],
        "Tallene ble avstemt 3. oktober.",
        "A dated event takes ble. Er avstemt describes the state. Avstemmes describes a habit and does not sit well with one date in the past.",
      ),
      mc(
        "passive",
        "Hvilken setning beskriver en tilstand nå?",
        ["Tallene er avstemt.", "Tallene ble avstemt i fjor, og det er poenget med er.", "Tallene avstemmes neste år som tilstand.", "Tallene avstemte."],
        "Tallene er avstemt.",
        "Er plus the participle presents the result as a current state. The reader is being told that the figures are in order now.",
      ),
      fill(
        "passive",
        "Fyll inn s-passiv av «å føre».",
        "Kostnadene ___ på kostnadssted 410.",
        ["føres"],
        "A standing accounting rule uses the s-passive: føres.",
      ),
      fix(
        "passive",
        "Skriv setningen riktig.",
        "Avviket er skyldes høyere lisenspriser.",
        ["Avviket skyldes høyere lisenspriser"],
        "Skyldes is already the finite verb. Do not put er in front of it.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Gjennomgangen", "ble", "gjennomført", "i", "september"],
        "Name the review as the subject and use ble for the finished event.",
        [],
        "Build: The review was carried out in September.",
      ),
      rewrite(
        "register",
        "Skriv om til en stående rutine, ikke én hendelse.",
        "Vi avstemte tallene i går.",
        ["Tallene avstemmes hver måned", "Tallene avstemmes månedlig"],
        "The s-passive states the routine. The original sentence is one past event and should not stay in preteritum if the meaning is a rule.",
        "Rewrite it as a standing routine, not one event.",
      ),
      mc(
        "register",
        "Når bør agenten være med?",
        ["Når ansvaret er poenget.", "Alltid, ellers er passiv forbudt.", "Aldri i en rapport.", "Bare i s-passiv."],
        "Når ansvaret er poenget.",
        "Add av plus the person when the reader needs to know who did it. Leave the agent out when the institution or the result matters more.",
        "When should the agent be included?",
      ),
      fix(
        "passive",
        "Skriv setningen slik at den beskriver tilstanden, ikke hendelsen i går.",
        "Filen ble avstemt, og det er alt leseren trenger å vite om status nå.",
        ["Filen er avstemt"],
        "For current status, er avstemt is enough. The story of yesterday belongs in a different sentence if you also need it.",
      ),
    ],
  }),
  lesson({
    id: "c1-05",
    level: "C1",
    minutes: 14,
    title: "Perfektum eller preteritum",
    titleEn: "Present perfect or simple past",
    concepts: ["tenses"],
    maal: "Du velger tid ut fra om perioden er åpen eller lukket.",
    husk: "I år har kostnaden økt. I fjor økte den. Jeg har jobbet her siden 2016.",
    intro: `The choice is about the time frame, not about how long ago something feels.

An open period that includes now takes perfektum. I år har lisenskostnaden økt. The year is not over. Jeg har jobbet i Avinor siden 2016. The job continues, and siden reaches from that year to now.

A closed period takes preteritum. I fjor økte kostnaden. Fra 2016 til 2019 jobbet jeg med et annet system. The end is stated or understood. I går, i 2019, da jeg tok kurset and forrige uke are closed.

Do not combine a closed time with har. Not "i fjor har kostnaden økt". Do not use preteritum with siden when the situation still holds. Jeg jobber her siden 2016 is a common transfer from English "I work here since". Norwegian uses har jobbet … siden.

Both tenses can appear in one paragraph because the frames differ. I fjor økte kostnaden med tre prosent. I år har den økt med fire. The reader should be able to see which period is closed.

Ennå and allerede usually go with perfektum when you are looking from now: Vi har ikke fått tallet ennå. Already in a past story goes with pluskvamperfektum: Da møtet startet, hadde vi allerede sendt notatet.`,
    examples: [
      { no: "I år har lisenskostnaden økt med fire prosent.", en: "This year the licence cost has increased by four percent." },
      { no: "I fjor økte den med tre prosent.", en: "Last year it increased by three percent." },
      { no: "Jeg har jobbet i Avinor siden 2016.", en: "I have worked at Avinor since 2016." },
    ],
    vocab: [
      ["i år", "this year", "I år har vi ett avvik.", "This year we have one variance.", "phrase"],
      ["i fjor", "last year", "I fjor var avviket større.", "Last year the variance was larger.", "phrase"],
      ["siden", "since", "Siden mars har kostnaden vært stabil.", "Since March the cost has been stable.", "prep"],
      ["forrige uke", "last week", "Forrige uke sendte jeg utkastet.", "Last week I sent the draft.", "phrase"],
      ["ennå ikke", "not yet", "Vi har ennå ikke fått bilaget.", "We have not yet received the voucher.", "phrase"],
      ["et bilag", "a voucher", "Bilaget mangler.", "The voucher is missing.", "noun"],
      ["stabil", "stable", "Kostnaden er stabil.", "The cost is stable.", "adj"],
    ],
    exercises: [
      mc(
        "tenses",
        "Hvilken setning er riktig?",
        ["I år har kostnaden økt.", "I år økte kostnaden, hvis året ikke er ferdig og du ser fra nå.", "I fjor har kostnaden økt.", "Jeg jobber her siden 2016."],
        "I år har kostnaden økt.",
        "The current year is an open frame, so perfektum. I fjor is closed and cannot take har. Siden needs har jobbet, not the present alone.",
      ),
      fill(
        "tenses",
        "Fyll inn riktig form av «å øke». Året er ferdig.",
        "I fjor ___ kostnaden med tre prosent.",
        ["økte"],
        "A finished year takes preteritum. Økte is the past of øke.",
      ),
      fill(
        "tenses",
        "Fyll inn hjelpeverbet.",
        "Jeg ___ jobbet i Avinor siden 2016.",
        ["har"],
        "Siden plus a situation that still holds takes perfektum: har jobbet.",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "I fjor har lisenskostnaden økt med tre prosent.",
        ["I fjor økte lisenskostnaden med tre prosent"],
        "Remove har and use the simple past. I fjor closes the period.",
      ),
      order(
        "tenses",
        "Bygg setningen.",
        ["Vi", "har", "ennå", "ikke", "fått", "bilaget"],
        "Ennå ikke belongs with perfektum when the gap is still open. Ikke stands after har; ennå can stand before ikke in this frequent pattern.",
        [],
        "Build: We have not yet received the voucher.",
      ),
      mc(
        "tenses",
        "Hvilken tid passer med «forrige uke»?",
        ["preteritum", "perfektum", "presens", "s-passiv"],
        "preteritum",
        "Forrige uke is a finished time. Forrige uke sendte jeg utkastet.",
        "Which tense fits forrige uke?",
      ),
      fix(
        "tenses",
        "Skriv setningen riktig.",
        "Jeg jobber i Avinor siden 2016.",
        ["Jeg har jobbet i Avinor siden 2016"],
        "Norwegian does not use the simple present with siden for a period that began in the past and continues.",
      ),
      rewrite(
        "tenses",
        "Skriv setningen på nytt slik at den gjelder i år, og året er ikke ferdig.",
        "Kostnaden økte i år.",
        ["I år har kostnaden økt", "Kostnaden har økt i år"],
        "If this year is still open, perfektum is the natural choice. Preteritum would suggest that you are treating the year as finished.",
        "Rewrite the sentence so that it is about this year, still open.",
      ),
    ],
  }),
  lesson({
    id: "c1-06",
    level: "C1",
    minutes: 14,
    title: "Imidlertid, derfor og likevel",
    titleEn: "However, therefore and nevertheless",
    concepts: ["conjunctions", "register", "v2"],
    maal: "Du binder setninger slik at argumentet kan leses uten å gjette.",
    husk: "Imidlertid økte kostnaden. Derfor anbefaler jeg å vente.",
    intro: `A report is a chain of claims. The first word of a sentence tells the reader how the new claim relates to the previous one. These adverbials do that job, and they trigger inversion when they stand first.

Imidlertid økte lisenskostnaden. However; a mild contrast.
Derimot gikk driftskostnaden ned. By contrast.
Derfor anbefaler jeg å vente. Therefore.
Følgelig må prognosen oppdateres. Consequently, a little heavier.
Likevel holder vi fristen. Nevertheless.
Dessuten mangler ett bilag. In addition.

Do not stack two of them. Imidlertid derfor økte kostnaden is noise. Pick the relation you mean. Og and men can still join clauses, but a new sentence with derfor is often easier to read than a very long men-sentence.

Punctuation: these words are not conjunctions. You cannot glue two main clauses with imidlertid the way you glue them with men. Kostnaden økte. Imidlertid holder vi fristen. Or Kostnaden økte, men vi holder fristen. Not "Kostnaden økte imidlertid vi holder fristen".

I all hovedsak and kort sagt are useful when you close a paragraph: Kort sagt er avviket forklart, men ikke lukket.`,
    examples: [
      { no: "Lisenskostnaden økte. Driftskostnaden gikk derimot ned.", en: "The licence cost increased. Operating costs, by contrast, went down." },
      { no: "Derfor anbefaler jeg å vente til oktober.", en: "I therefore recommend waiting until October." },
      { no: "Kort sagt er avviket forklart, men ikke lukket.", en: "In short, the variance is explained, but not closed." },
    ],
    vocab: [
      ["imidlertid", "however", "Imidlertid mangler ett bilag.", "However, one voucher is missing.", "adv"],
      ["derimot", "by contrast", "Inntektene økte derimot.", "Revenue, by contrast, increased.", "adv"],
      ["følgelig", "consequently", "Følgelig oppdaterer vi prognosen.", "Consequently we are updating the forecast.", "adv"],
      ["dessuten", "moreover; in addition", "Dessuten er fristen kort.", "In addition, the deadline is short.", "adv"],
      ["kort sagt", "in short", "Kort sagt anbefaler jeg å vente.", "In short, I recommend waiting.", "phrase"],
      ["i all hovedsak", "in all essentials; largely", "Tallene er i all hovedsak avstemt.", "The figures are largely reconciled.", "phrase"],
      ["å lukke", "to close", "Vi lukker avviket i oktober.", "We will close the variance in October.", "verb"],
    ],
    exercises: [
      order(
        "conjunctions",
        "Bygg setningen.",
        ["Derfor", "anbefaler", "jeg", "å", "vente"],
        "Derfor is first, so the verb anbefaler is second and the subject follows.",
        [],
        "Build: I therefore recommend waiting.",
      ),
      mc(
        "conjunctions",
        "Hvilken setning er riktig bundet?",
        ["Kostnaden økte, men vi holder fristen.", "Kostnaden økte imidlertid vi holder fristen.", "Kostnaden økte, imidlertid vi holder fristen.", "Kostnaden økte og imidlertid holder vi."],
        "Kostnaden økte, men vi holder fristen.",
        "Men can join two main clauses. Imidlertid cannot replace that comma-plus-conjunction. Start a new sentence: Imidlertid holder vi fristen.",
      ),
      fill(
        "register",
        "Fyll inn ordet som betyr en tydelig kontrast, ikke bare «men».",
        "Lisenskostnaden økte. Driftskostnaden gikk ___ ned.",
        ["derimot"],
        "Derimot marks a contrast with the previous sentence. It can stand in the adverb slot after the verb.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Imidlertid kostnaden økte i september.",
        ["Imidlertid økte kostnaden i september"],
        "The adverbial in the first slot must be followed by the verb.",
      ),
      mc(
        "register",
        "Hvilket ord betyr «consequently» og er litt tyngre enn «derfor»?",
        ["følgelig", "dessuten", "kort sagt", "i all hovedsak"],
        "følgelig",
        "Følgelig presents a consequence. Dessuten only adds a point. Kort sagt summarises.",
        "Which word means consequently and is a little heavier than derfor?",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Kort", "sagt", "er", "avviket", "forklart"],
        "Kort sagt is one adverbial in the first slot. Er is second.",
        [],
        "Build: In short, the variance is explained.",
      ),
      rewrite(
        "register",
        "Del opp i to setninger. Bruk «Imidlertid» i den andre.",
        "Kostnaden økte imidlertid vi holder fristen.",
        ["Kostnaden økte. Imidlertid holder vi fristen."],
        "Imidlertid starts the second main clause and causes inversion. Do not leave the two clauses joined without men.",
        "Split it into two sentences. Use Imidlertid in the second.",
      ),
      fill(
        "register",
        "Fyll inn uttrykket som betyr «largely». Velg de tre ordene.",
        "Tallene er ___ avstemt.",
        ["i all hovedsak"],
        "I all hovedsak softens a claim without hiding it. The figures are largely, not necessarily perfectly, reconciled.",
      ),
    ],
  }),
  lesson({
    id: "c1-07",
    level: "C1",
    minutes: 13,
    title: "Nominalisering uten å bli tung",
    titleEn: "Nominalisation without becoming heavy",
    concepts: ["compounds", "register"],
    maal: "Du gjør verb om til substantiv når rapporten trenger et begrep, og tilbake når setningen blir død.",
    husk: "Gjennomgangen ble ferdig. Ikke «det ble foretatt en gjennomføring av en gjennomgang».",
    intro: `Written reports often turn verbs into nouns: godkjenne becomes godkjenningen, øke becomes økningen, gjennomgå becomes gjennomgangen. The noun can then be the theme of the next sentence. Gjennomgangen ble ferdig i september. Den viste ett avvik.

That is useful. It becomes heavy when every verb is unpacked into "foreta en gjennomføring av". Prefer one noun, then a live verb. Etter gjennomgangen anbefaler jeg å vente. Not "Etter gjennomføringen av gjennomgangen av tallene blir det gitt en anbefaling om venting".

The noun is often a compound or a definite form you already know how to build: økningen, avstemmingen, utsendelsen, periodiseringen. Periodisering is the accounting noun for accruing a cost in the right period. Verbet er å periodisere.

A good test: if you can say the sentence aloud to your manager without running out of breath, the nominalisation is probably doing work. If not, turn one noun back into a verb. Vi gjennomgikk tallene i september. Anbefalingen er å vente.`,
    examples: [
      { no: "Etter gjennomgangen anbefaler jeg å vente.", en: "After the review I recommend waiting." },
      { no: "Økningen skyldes lisensprisene.", en: "The increase is due to the licence prices." },
      { no: "Periodiseringen hører til oktober.", en: "The accrual belongs to October." },
    ],
    vocab: [
      ["en gjennomgang", "a review", "Gjennomgangen tok to dager.", "The review took two days.", "noun"],
      ["en økning", "an increase", "Økningen er på fire prosent.", "The increase is four percent.", "noun"],
      ["en godkjenning", "an approval", "Vi venter på godkjenningen.", "We are waiting for the approval.", "noun"],
      ["en avstemming", "a reconciliation", "Avstemmingen er dokumentert.", "The reconciliation is documented.", "noun"],
      ["en periodisering", "an accrual", "Periodiseringen føres i oktober.", "The accrual is recognised in October.", "noun"],
      ["å periodisere", "to accrue", "Vi periodiserer lisensen over tolv måneder.", "We accrue the licence over twelve months.", "verb"],
      ["å foreta", "to carry out (often heavy)", "Unngå «foreta en vurdering» når «vurdere» holder.", "Avoid “foreta en vurdering” when “vurdere” is enough.", "verb"],
    ],
    exercises: [
      mc(
        "register",
        "Hvilken setning er lettest å lese, med samme innhold?",
        ["Etter gjennomgangen anbefaler jeg å vente.", "Etter gjennomføringen av gjennomgangen blir det gitt en anbefaling om venting.", "Det foretas en anbefaling etter en gjennomgangsgjennomføring.", "Venting blir anbefalt etter foretakelse."],
        "Etter gjennomgangen anbefaler jeg å vente.",
        "One precise noun and a finite verb. The other options stack nominalisations until the agent and the action disappear.",
      ),
      fill(
        "compounds",
        "Velg substantivet av «å øke» i bestemt form.",
        "___ skyldes lisensprisene.",
        ["Økningen", "økningen"],
        "Å øke → en økning → økningen. The definite noun can be the theme of the sentence.",
      ),
      mc(
        "register",
        "Hva er «periodisering»?",
        ["å føre en kostnad i riktig periode", "å slette et bilag", "å avlyse et møte", "å sammenligne to byer"],
        "å føre en kostnad i riktig periode",
        "Periodisering is accrual: placing the cost in the period it belongs to. The verb is å periodisere.",
        "What is periodisering?",
      ),
      rewrite(
        "register",
        "Skriv om til en lettere setning med verb.",
        "Det ble foretatt en gjennomgang av tallene i september.",
        ["Vi gjennomgikk tallene i september", "Tallene ble gjennomgått i september"],
        "Either name the people and use the verb, or use one passive of the verb. You do not need foreta plus a noun.",
        "Rewrite it as a lighter sentence with a verb.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Periodiseringen", "føres", "i", "oktober"],
        "The noun is the subject. Føres is the s-passive of a standing accounting treatment.",
        [],
        "Build: The accrual is recognised in October.",
      ),
      fix(
        "compounds",
        "Skriv setningen med riktig substantiv.",
        "Avstemming en er dokumentert i mappen.",
        ["Avstemmingen er dokumentert i mappen"],
        "One word, definite form: avstemmingen. The article does not stand after the noun.",
      ),
      fill(
        "register",
        "Fyll inn verbet som betyr å fordele kostnaden på riktige måneder.",
        "Vi ___ lisensen over tolv måneder.",
        ["periodiserer"],
        "The verb is periodiserer in the present. The noun periodisering is not the finite verb.",
      ),
      mc(
        "register",
        "Når er nominalisering et godt valg?",
        ["Når begrepet skal være tema i neste setning.", "Alltid, fordi rapporter skal være tunge.", "Aldri, verb er alltid bedre.", "Bare i overskrifter med utropstegn."],
        "Når begrepet skal være tema i neste setning.",
        "A noun gives you something to point back to. Use it when the next sentence needs that theme, not as decoration.",
        "When is nominalisation a good choice?",
      ),
    ],
  }),
  lesson({
    id: "c1-08",
    level: "C1",
    minutes: 14,
    title: "Komma i komplekse setninger",
    titleEn: "Commas in complex sentences",
    concepts: ["punctuation", "relatives"],
    maal: "Du setter komma i innskudd og etter tunge subjekt, og lar være ellers.",
    husk: "Tallene, som kom i går, stemmer. Jeg ser at de stemmer.",
    intro: `Complex sentences need the structural commas, not a comma before every at.

A fronted subordinate clause takes one comma at its end, even when the clause is long: Da vi hadde avstemt tallene og forklart avviket, sendte jeg notatet. A fronted at-clause is the same: At tallene stemmer, er godt nytt. Do not put a comma after da or after at alone.

The norm is a comma when a subordinate clause follows the main clause: Vi utsetter møtet, fordi tallene mangler. An at-clause used as the object is the exception and normally has no comma: Jeg ser at tallene stemmer. When two such object clauses are coordinated and at is repeated, put a comma before the second one: Jeg ser at tallene stemmer, og at avviket er lite.

A non-restrictive insertion has a comma on both sides: Tallene, som kom i går, stemmer. Anna, controlleren vår, sender notatet. Missing the second comma is the usual error.

A restrictive relative has no comma before som: Tallene som gjelder lisenser, stemmer. The comma before stemmer closes the subject. It is not a comma before som.

Do not separate a simple subject from its verb. Anbefalingen står ved lag. Not "Anbefalingen, står ved lag".`,
    examples: [
      { no: "Tallene, som kom i går, stemmer.", en: "The figures, which arrived yesterday, add up." },
      { no: "Tallene som gjelder lisenser, stemmer.", en: "The figures that concern licences add up." },
      { no: "Da vi hadde avstemt tallene, sendte jeg notatet.", en: "When we had reconciled the figures, I sent the note." },
    ],
    vocab: [
      ["å stå ved lag", "to stand; to remain valid", "Anbefalingen står ved lag.", "The recommendation still stands.", "phrase"],
      ["et innskudd", "an insertion", "Vi setter komma på begge sider av innskuddet.", "We put commas on both sides of the insertion.", "noun"],
      ["restriktiv", "restrictive", "Relativen er restriktiv og trenger ikke komma foran som.", "The relative is restrictive and needs no comma before som.", "adj"],
      ["controlleren", "the controller", "Anna, controlleren vår, har svart.", "Anna, our controller, has replied.", "noun"],
      ["å avstemme", "to reconcile", "Vi hadde avstemt tallene.", "We had reconciled the figures.", "verb"],
      ["et lisensgebyr", "a licence fee", "Lisensgebyret hører til oktober.", "The licence fee belongs to October.", "noun"],
      ["kort", "short", "De to at-setningene er korte.", "The two at-clauses are short.", "adj"],
    ],
    exercises: [
      fix(
        "punctuation",
        "Skriv setningen med begge kommaene.",
        "Tallene som kom i går stemmer.",
        ["Tallene, som kom i går, stemmer"],
        "If the relative clause only adds information, it needs a comma before som and a comma after går. The figures are already identified as tallene in a context where which figures is known; this item treats the clause as non-restrictive.",
      ),
      mc(
        "punctuation",
        "Hvilken setning har komma bare der subjektet med restriktiv relativ avsluttes?",
        ["Tallene som gjelder lisenser, stemmer.", "Tallene, som gjelder lisenser stemmer.", "Tallene som, gjelder lisenser, stemmer.", "Tallene, som gjelder, lisenser stemmer."],
        "Tallene som gjelder lisenser, stemmer.",
        "No comma before restrictive som. One comma before the main verb, because the subject contains a clause.",
      ),
      fix(
        "punctuation",
        "Skriv setningen med riktig komma.",
        "Da vi hadde avstemt tallene sendte jeg notatet.",
        ["Da vi hadde avstemt tallene, sendte jeg notatet"],
        "The comma closes the fronted da-clause. The main clause then inverts.",
      ),
      mc(
        "punctuation",
        "Hvilken setning er riktig om to korte at-setninger?",
        ["Jeg ser at tallene stemmer, og at avviket er lite.", "Jeg ser, at tallene stemmer, og at avviket er lite.", "Jeg ser at, tallene stemmer og at avviket er lite.", "Jeg ser, at tallene stemmer og at avviket er lite."],
        "Jeg ser at tallene stemmer, og at avviket er lite.",
        "No comma before the first at: that clause is the object. The norm is a comma before the second, coordinated at-clause, because at is repeated. A fronted at-clause would take its comma after the clause, not before at.",
      ),
      order(
        "punctuation",
        "Bygg innskuddet som egne ord. Komma øver du i de andre oppgavene.",
        ["Anna", "controlleren", "vår", "sender", "notatet"],
        "The apposition controlleren vår stands next to the name. In the written sentence it is between commas: Anna, controlleren vår, sender notatet.",
        [],
        "Build the words of: Anna, our controller, sends the note.",
      ),
      fix(
        "punctuation",
        "Skriv setningen riktig.",
        "Anbefalingen, står ved lag.",
        ["Anbefalingen står ved lag"],
        "A simple subject is not separated from the verb by a comma.",
      ),
      fill(
        "punctuation",
        "Velg JA hvis det skal være komma foran som, og NEI hvis det ikke skal det. Setningen er restriktiv: «Filen som ligger i mappen, er ny.»",
        "Svar: ___",
        ["NEI", "nei"],
        "Restrictive som has no comma in front of it. The comma in the given sentence, if you add one, belongs before er, not before som.",
      ),
      rewrite(
        "punctuation",
        "Skriv setningen med innskuddet riktig kommasatt.",
        "Notatet som for øvrig er kort sendes i dag.",
        ["Notatet, som for øvrig er kort, sendes i dag"],
        "For øvrig shows that the clause is an aside. Commas go on both sides. Sendes stays the main verb.",
        "Rewrite the sentence with the insertion punctuated.",
      ),
    ],
  }),
  lesson({
    id: "c1-09",
    level: "C1",
    minutes: 14,
    title: "Faste uttrykk i fagtekst",
    titleEn: "Fixed expressions in professional prose",
    concepts: ["register", "v2"],
    maal: "Du bruker ferdige uttrykk som betyr én bestemt ting.",
    husk: "Per i dag, i tråd med, med forbehold om, etter det jeg kan se.",
    intro: `Fixed expressions are quicker and safer than a paraphrase you invent in the moment. Learn them as whole pieces, including the preposition.

Per i dag er avviket på fire prosent. As of today. Not "per dags dato" unless you enjoy office clichés; per i dag is enough.
I tråd med budsjettet. In line with.
Med forbehold om at tallene fra terminalen kommer. With the reservation that.
Etter det jeg kan se, stemmer filen. As far as I can see.
Så vidt jeg vet, er saken lukket. As far as I know.
På sikt bør rutinen endres. In the longer term.
Blant annet mangler ett bilag. Among other things; it does not mean "for example" in every context, but it introduces one item of a larger set.
Det vil si at prognosen må oppdateres. That is to say.

Så langt looks like English "so far" and often means that, but så langt det er mulig means "as far as possible". Do not translate word by word the other way.

These phrases like the first slot and therefore inversion: Etter det jeg kan se, stemmer filen. Per i dag er avviket lite.`,
    examples: [
      { no: "Per i dag er avviket på fire prosent.", en: "As of today the variance is four percent." },
      { no: "Med forbehold om at bilaget kommer, sender jeg notatet.", en: "With the reservation that the voucher arrives, I am sending the note." },
      { no: "Etter det jeg kan se, stemmer filen.", en: "As far as I can see, the file adds up." },
    ],
    vocab: [
      ["per i dag", "as of today", "Per i dag mangler ett tall.", "As of today one figure is missing.", "phrase"],
      ["i tråd med", "in line with", "Forslaget er i tråd med budsjettet.", "The proposal is in line with the budget.", "phrase"],
      ["med forbehold om", "subject to; with the reservation", "Jeg svarer med forbehold om godkjenning.", "I reply subject to approval.", "phrase"],
      ["etter det jeg kan se", "as far as I can see", "Etter det jeg kan se, er saken lukket.", "As far as I can see, the case is closed.", "phrase"],
      ["så vidt jeg vet", "as far as I know", "Så vidt jeg vet, er fristen fredag.", "As far as I know, the deadline is Friday.", "phrase"],
      ["på sikt", "in the longer term", "På sikt bør vi endre rutinen.", "In the longer term we should change the routine.", "phrase"],
      ["blant annet", "among other things", "Vi mangler blant annet ett bilag.", "We are missing one voucher, among other things.", "phrase"],
    ],
    exercises: [
      mc(
        "register",
        "Hvilket uttrykk betyr «as of today» uten å bli en klisjé?",
        ["per i dag", "per dags dato i alle e-poster", "i dag per", "på dagen"],
        "per i dag",
        "Per i dag is the ordinary phrase. Per dags dato is a cliché you can retire.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Etter det", "jeg", "kan", "se", "stemmer", "filen"],
        "The whole expression is the first element. Stemmer is the finite verb of the main clause, so it comes before filen.",
        [],
        "Build: As far as I can see, the file adds up.",
      ),
      fill(
        "register",
        "Fyll inn uttrykket. Velg de tre ordene.",
        "Forslaget er ___ budsjettet.",
        ["i tråd med"],
        "I tråd med is the fixed prepositional expression. I henhold til is stricter, “in accordance with a rule”.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Jeg svarer med forbehold at godkjenningen kommer.",
        ["Jeg svarer med forbehold om at godkjenningen kommer"],
        "The expression is med forbehold om, and om is kept before at.",
      ),
      mc(
        "register",
        "Hva betyr «på sikt»?",
        ["i et lengre perspektiv", "innen klokka ni", "per i dag", "mot sin vilje"],
        "i et lengre perspektiv",
        "På sikt is the longer term, not a clock time. Innen klokka ni would be a deadline today.",
        "What does på sikt mean?",
      ),
      rewrite(
        "register",
        "Bruk «Så vidt jeg vet» først i setningen.",
        "Jeg tror fristen er fredag, men jeg er ikke sikker.",
        ["Så vidt jeg vet, er fristen fredag"],
        "The fixed expression replaces the hedge jeg tror … ikke sikker. It causes inversion: er fristen.",
        "Put Så vidt jeg vet first.",
      ),
      fill(
        "register",
        "Fyll inn. Velg de to ordene.",
        "Vi mangler ___ ett bilag.",
        ["blant annet"],
        "Blant annet introduces one example of a larger gap. It does not mean that the voucher is the only problem.",
      ),
      mc(
        "v2",
        "Hvorfor står verbet foran subjektet i «Per i dag er avviket lite»?",
        ["Fordi «per i dag» fyller førsteplassen.", "Fordi setningen er en leddsetning.", "Fordi er er et substantiv.", "Fordi avviket er intetkjønn."],
        "Fordi «per i dag» fyller førsteplassen.",
        "Ordinary V2. The fixed expression is one adverbial in the first slot.",
        "Why does the verb come before the subject?",
      ),
    ],
  }),
  lesson({
    id: "c1-10",
    level: "C1",
    minutes: 14,
    title: "Bør, får og pleier",
    titleEn: "bør, får and pleier",
    concepts: ["modals"],
    maal: "Du skiller råd, tillatelse, vane og forsiktig avstand.",
    husk: "Du bør vente. Du får sende den i morgen. Jeg pleier å sende den på fredag.",
    intro: `Bør gives a recommendation. Du bør vente til tallene er avstemt. It is stronger than a wish and weaker than må. Burde is softer, or it is counterfactual with ha: Du burde ha ventet. In a report, jeg anbefaler at is often clearer than a bare bør, but bør is excellent inside that clause: Jeg anbefaler at vi bør vente is too heavy. Write Jeg anbefaler at vi venter, or Vi bør vente.

Får plus infinitive can mean permission: Du får sende den i morgen. It can also mean "manage to" or "get to". Context decides. It is not the same as må. Får is not followed by å in this pattern: du får sende, not "du får å sende".

Pleier is not a modal of the kan/må type. It takes å: Jeg pleier å sende rapporten på fredag. The past is pleide å. Use it for a real habit, not for a rule you are introducing. A rule is sendes or skal.

Skal can mean a plan, an obligation, or a report of what you have heard. Hun skal være syk means "she is said to be ill", not that she ought to be ill. In a status report, avoid that hearsay skal unless you mark the source. Write Etter det teamet melder, er hun syk.

Trenger ikke means "need not", and there is no obligation. Du trenger ikke å sende den i dag. Å is often kept, and trenger ikke sende without å also occurs. These exercises accept both.`,
    examples: [
      { no: "Vi bør vente til tallene er avstemt.", en: "We should wait until the figures are reconciled." },
      { no: "Du får sende notatet i morgen.", en: "You may send the note tomorrow." },
      { no: "Jeg pleier å sende rapporten på fredag.", en: "I usually send the report on Friday." },
    ],
    vocab: [
      ["bør", "should; ought to", "Du bør sjekke bilaget.", "You should check the voucher.", "verb"],
      ["å pleie å", "to usually do", "Jeg pleier å kontrollere tallene to ganger.", "I usually check the figures twice.", "verb"],
      ["får", "may; get to", "Du får bruke mitt utkast.", "You may use my draft.", "verb"],
      ["trenger ikke", "need not", "Du trenger ikke å svare i kveld.", "You do not need to reply tonight.", "verb"],
      ["etter det teamet melder", "according to what the team reports", "Etter det teamet melder, er filen klar.", "According to the team, the file is ready.", "phrase"],
      ["en anbefaling", "a recommendation", "Anbefalingen er å vente.", "The recommendation is to wait.", "noun"],
      ["to ganger", "twice", "Jeg leste den to ganger.", "I read it twice.", "phrase"],
    ],
    exercises: [
      mc(
        "modals",
        "Hvilken setning er et råd, ikke et påbud?",
        ["Vi bør vente.", "Vi må vente.", "Vi får vente, lest som tillatelse.", "Vi pleier å vente."],
        "Vi bør vente.",
        "Bør recommends. Må obliges. Pleier describes a habit. Får, in the permission reading, allows.",
      ),
      fill(
        "modals",
        "Fyll inn. Vanen tar å.",
        "Jeg pleier ___ sende rapporten på fredag.",
        ["å"],
        "Pleier takes å before the infinitive. Modal verbs like må and bør do not.",
      ),
      mc(
        "modals",
        "Hva kan «Hun skal være syk» bety, som du bør være forsiktig med i en rapport?",
        ["Noen sier at hun er syk.", "Hun er forpliktet til å være syk.", "Hun bør bli syk.", "Hun pleide å være syk."],
        "Noen sier at hun er syk.",
        "Skal plus infinitive can be hearsay. Name the source instead of leaving skal to do that work in a status report.",
        "What can Hun skal være syk mean, a reading to treat carefully in a report?",
      ),
      fix(
        "modals",
        "Skriv setningen riktig.",
        "Du får å sende notatet i morgen.",
        ["Du får sende notatet i morgen"],
        "Får in this sense takes a bare infinitive, like må and kan.",
      ),
      order(
        "modals",
        "Bygg setningen.",
        ["Jeg", "anbefaler", "at", "vi", "venter"],
        "Do not add bør inside the at-clause when anbefaler already carries the recommendation. The verb is present: venter.",
        [],
        "Build: I recommend that we wait.",
      ),
      rewrite(
        "modals",
        "Skriv om hearsay-skal til en setning med kilde.",
        "Hun skal være syk.",
        ["Etter det teamet melder, er hun syk", "Teamet melder at hun er syk"],
        "Name the source and use er, so the reader can see whose information it is.",
        "Rewrite the hearsay skal as a sentence with a source.",
      ),
      fill(
        "modals",
        "Fyll inn uttrykket som betyr at det ikke er nødvendig. Velg de to ordene.",
        "Du ___ svare i kveld.",
        ["trenger ikke"],
        "Trenger ikke removes the obligation. The infinitive may follow with or without å; the blank is only the two words.",
      ),
      mc(
        "modals",
        "Hvilken setning beskriver en vane?",
        ["Jeg pleier å kontrollere tallene to ganger.", "Jeg bør kontrollere tallene.", "Jeg får kontrollere tallene.", "Jeg skal kontrollere tallene i morgen."],
        "Jeg pleier å kontrollere tallene to ganger.",
        "Pleier å is the habitual. The others are advice, permission or a plan.",
      ),
    ],
  }),
  lesson({
    id: "c1-11",
    level: "C1",
    minutes: 14,
    title: "Innskudd og relativ i samme setning",
    titleEn: "Insertions and relatives in the same sentence",
    concepts: ["relatives", "punctuation", "v2", "adverb-sub", "register"],
    maal: "Du leser og skriver en setning der innskuddet ikke flytter verbet.",
    husk: "Anna, som skrev utkastet, sender det i dag.",
    intro: `An insertion does not count as the first element, and it does not cancel V2. You have to see the skeleton under the commas.

Anna sender notatet i dag.
Anna, som skrev utkastet, sender notatet i dag.
Som skrev utkastet is extra. The finite verb of the main clause is still sender, in second place after the subject Anna.

If the whole subject-plus-insertion is not what you want in the first slot, you can still thematise something else: I dag sender Anna, som skrev utkastet, notatet. I dag is first, sender is second, and the insertion stays next to Anna.

The relative clause inside the commas is subordinate. Ikke goes before its verb: Anna, som ikke rakk møtet, sender et notat. Do not write "som rakk ikke".

For øvrig and i all hovedsak often live inside insertions or just after the verb. Notatet, som for øvrig er kort, sendes i dag. Keep for øvrig inside the clause it comments on. If it comments on the main claim, put it in the main clause: Notatet sendes for øvrig i dag.

When you edit, read the sentence without the commas. If that skeleton is a grammatical main clause, the insertion is probably in the right place.`,
    examples: [
      { no: "Anna, som skrev utkastet, sender det i dag.", en: "Anna, who wrote the draft, is sending it today." },
      { no: "I dag sender Anna, som skrev utkastet, notatet.", en: "Today Anna, who wrote the draft, is sending the note." },
      { no: "Notatet, som for øvrig er kort, sendes i dag.", en: "The note, which incidentally is short, will be sent today." },
    ],
    vocab: [
      ["for øvrig", "incidentally; moreover", "Notatet er for øvrig kort.", "The note is short, incidentally.", "phrase"],
      ["å rekke", "to make it; to have time for", "Jeg rakk ikke møtet.", "I did not make the meeting.", "verb"],
      ["et skjelett", "a skeleton (of a sentence)", "Les skjelettet uten innskuddet.", "Read the skeleton without the insertion.", "noun"],
      ["en apposisjon", "an apposition", "«Controlleren vår» er en apposisjon.", "“Our controller” is an apposition.", "noun"],
      ["å sløyfe", "to omit", "Sløyf innskuddet og les setningen på nytt.", "Leave out the insertion and read the sentence again.", "verb"],
      ["i dag", "today", "Notatet sendes i dag.", "The note is being sent today.", "phrase"],
      ["et utkast", "a draft", "Utkastet er klart.", "The draft is ready.", "noun"],
    ],
    exercises: [
      mc(
        "v2",
        "Hva er det finitte verbet i helsetningen?",
        ["sender", "skrev", "som", "utkastet"],
        "sender",
        "Skrev belongs to the relative insertion. The main clause is Anna sender det i dag.",
        "What is the finite verb of the main clause in «Anna, som skrev utkastet, sender det i dag»?",
      ),
      order(
        "relatives",
        "Bygg setningen.",
        ["Anna", "som", "skrev", "utkastet", "sender", "det", "i", "dag"],
        "The relative clause sits next to Anna. Sender is the main verb and is not inverted, because Anna is still the first element.",
        [],
        "Build: Anna, who wrote the draft, is sending it today.",
      ),
      order(
        "v2",
        "Bygg setningen med «I dag» først.",
        ["I dag", "sender", "Anna", "notatet"],
        "Without the insertion the skeleton is I dag sender Anna notatet. The insertion can be put back next to Anna afterwards.",
        [],
        "Build the skeleton with I dag first.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn ikke i relativsetningen.",
        "Anna, som ___ rakk møtet, sender et notat.",
        ["ikke"],
        "The som-clause is subordinate, so ikke stands before rakk.",
      ),
      fix(
        "punctuation",
        "Skriv setningen med innskuddet riktig plassert.",
        "Notatet som for øvrig er kort sendes i dag.",
        ["Notatet, som for øvrig er kort, sendes i dag"],
        "The aside needs commas on both sides. Sendes remains the main verb, immediately after the insertion.",
      ),
      mc(
        "register",
        "Hvor hører «for øvrig» hjemme hvis det kommenterer lengden, ikke utsendelsen?",
        ["inne i relativsetningen", "foran som, utenfor kommaene", "etter sendes, hvis det skal gjelde lengden", "i stedet for notatet"],
        "inne i relativsetningen",
        "The comment on length belongs in the clause about the note being short. Next to sendes it would comment on the sending.",
        "Where does for øvrig belong if it comments on the length, not on the dispatch?",
      ),
      fix(
        "v2",
        "Skriv skjelettet. Ta bort innskuddet.",
        "I dag Anna, som skrev utkastet, sender notatet.",
        ["I dag sender Anna notatet"],
        "The original also breaks V2. With I dag first, sender must be the next word. The insertion is optional and comes out in the skeleton.",
      ),
      rewrite(
        "relatives",
        "Legg inn relativsetningen «som ikke rakk møtet» etter Anna.",
        "Anna sender et notat.",
        ["Anna, som ikke rakk møtet, sender et notat"],
        "Commas on both sides, ikke before rakk, and the main verb sender stays where it was.",
        "Insert the relative clause som ikke rakk møtet after Anna.",
      ),
    ],
  }),
  lesson({
    id: "c1-12",
    level: "C1",
    minutes: 15,
    title: "Lang setning, ett skjelett",
    titleEn: "A long sentence, one skeleton",
    concepts: ["v2", "adverb-sub", "conjunctions"],
    maal: "Du holder V2 og leddsetningsregelen selv om setningen har flere ledd.",
    husk: "Denne risikoen tar vi ikke med, fordi den er lav.",
    intro: `A long sentence is still one main clause plus its attachments. Find the finite verb of the main clause before you edit anything else.

Denne risikoen tar vi ikke med i rapporten, fordi den er lav.
Skeleton: Denne risikoen tar vi ikke med. The fordi-clause is attached at the end, so it does not cause inversion, and inside it the word order is subject then verb: den er lav. There is no ikke in that clause. If there were, it would stand before the verb: fordi den ikke er høy.

A contrast can be a second main clause. I september økte lisenskostnaden, men driftskostnaden gikk ned. Men joins two main clauses. The second has its own subject and ordinary order, not subordinate order and not inversion.

Do not let a relative clause steal the verb. Risikoen som vi omtalte i går, tar vi ikke med. The first element is Risikoen plus the relative clause. Tar is the main verb and comes next. Inside the relative clause, omtalte is a different verb, and vi is its subject, with no inversion.

When a sentence fails, it is usually because two rules have been applied to the same clause. Either the clause is main, and the verb is second, or it is subordinate, and ikke stands before the verb. It is not both.`,
    examples: [
      { no: "Denne risikoen tar vi ikke med, fordi den er lav.", en: "We are not including this risk, because it is low." },
      { no: "I september økte lisenskostnaden, men driftskostnaden gikk ned.", en: "In September the licence cost increased, but the operating cost went down." },
      { no: "Risikoen som vi omtalte i går, tar vi ikke med.", en: "The risk that we discussed yesterday we are not including." },
    ],
    vocab: [
      ["en risiko", "a risk", "Risikoen er lav.", "The risk is low.", "noun"],
      ["å ta med", "to include", "Vi tar med ett forbehold.", "We are including one reservation.", "verb"],
      ["å omtale", "to mention; to discuss", "Vi omtalte risikoen i går.", "We discussed the risk yesterday.", "verb"],
      ["lav", "low", "Risikoen er lav.", "The risk is low.", "adj"],
      ["høy", "high", "Kostnaden er høy.", "The cost is high.", "adj"],
      ["et forbehold", "a reservation", "Jeg tar med et forbehold.", "I am including a reservation.", "noun"],
      ["et skjelett", "a skeleton", "Finn skjelettet før du retter komma.", "Find the skeleton before you correct the comma.", "noun"],
    ],
    exercises: [
      order(
        "v2",
        "Bygg skjelettet.",
        ["Denne", "risikoen", "tar", "vi", "ikke", "med"],
        "Object first, verb second, subject, then ikke, then the particle med.",
        [],
        "Build the skeleton.",
      ),
      fill(
        "adverb-sub",
        "Fyll inn ikke i leddsetningen.",
        "Vi tar den med, fordi den ___ er høy.",
        ["ikke"],
        "Fordi starts a subordinate clause. Ikke stands before er. The main clause keeps ikke after the finite verb if you negate that clause instead.",
      ),
      mc(
        "conjunctions",
        "Hvilken setning har to helsetninger?",
        ["I september økte lisenskostnaden, men driftskostnaden gikk ned.", "I september økte lisenskostnaden fordi driftskostnaden gikk ned.", "Risikoen som vi omtalte, tar vi med.", "At kostnaden økte, er nytt."],
        "I september økte lisenskostnaden, men driftskostnaden gikk ned.",
        "Men coordinates two main clauses. Fordi and som and at all introduce subordinate material.",
      ),
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Risikoen som vi omtalte i går vi tar ikke med.",
        ["Risikoen som vi omtalte i går, tar vi ikke med"],
        "After the subject and its relative clause, the main verb tar must come before vi.",
      ),
      order(
        "conjunctions",
        "Bygg setningen.",
        ["I september", "økte", "lisenskostnaden", "men", "driftskostnaden", "gikk", "ned"],
        "The first clause inverts after the time phrase. The clause after men does not invert: driftskostnaden gikk ned.",
        [],
        "Build: In September the licence cost increased, but the operating cost went down.",
      ),
      fix(
        "adverb-sub",
        "Skriv setningen riktig.",
        "Vi utelater risikoen fordi er den ikke høy.",
        ["Vi utelater risikoen, fordi den ikke er høy"],
        "No inversion in the fordi-clause, and ikke stands before the verb. A fordi-clause that follows the main clause normally takes a comma.",
      ),
      mc(
        "v2",
        "Hvilken regel hører til helsetningen, ikke til leddsetningen?",
        ["V2", "ikke foran verbet", "som kan ikke sløyfes når det er subjekt", "at uten komma foran"],
        "V2",
        "V2 is a main-clause rule. Ikke-before-the-verb is the subordinate pattern. The other options are also about subordinate or comma rules, not about the main-clause verb slot.",
        "Which rule belongs to the main clause, not the subordinate clause?",
      ),
      rewrite(
        "v2",
        "Slå sammen til én setning. Start med «Denne risikoen».",
        "Vi tar ikke med denne risikoen. Den er lav.",
        ["Denne risikoen tar vi ikke med, fordi den er lav"],
        "Front the object, keep ikke after vi, and attach the reason as a fordi-clause. No inversion inside fordi.",
        "Combine them into one sentence. Start with Denne risikoen.",
      ),
    ],
  }),
];
