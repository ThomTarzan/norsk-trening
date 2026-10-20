import { fix, lesson, mc, order, rewrite } from "./build.js";

export const lessonsC1Extra = [
  lesson({
    id: "c1-13",
    level: "C1",
    minutes: 14,
    title: "Partikkelverb",
    titleEn: "Particle verbs",
    concepts: ["particles", "v2"],
    maal: "Du holder partikkelen samlet med verbet, og du godtar begge vanlige plasseringer.",
    husk: "Jeg legger fram tallene. Jeg legger tallene fram.",
    intro: `A particle verb is a verb plus a small word that changes the meaning. Legge fram means to present. Legge fra is a different verb. Sette opp means to set up. Ta opp means to raise a matter. Gå gjennom means to go through.

Both Jeg legger fram tallene and Jeg legger tallene fram are ordinary. The particle is stressed. Do not treat one of those orders as the only correct one. What is wrong is to split the pair so the particle lands in a random slot: Jeg legger i møtet fram tallene først is hard to read.

Framlegge also exists as one formal verb: Jeg framlegger forslaget. Do not add the particle a second time. Jeg framlegger fram tallene stacks the same idea twice.

In a subordinate clause the particle stays with the verb, and ikke still stands before the verb: fordi vi ikke legger fram tallene i dag.`,
    examples: [
      { no: "Jeg legger fram tallene i møtet.", en: "I present the figures in the meeting." },
      { no: "Vi setter opp et møte på fredag.", en: "We are setting up a meeting on Friday." },
      { no: "Hun ba oss gå gjennom rapporten.", en: "She asked us to go through the report." },
    ],
    vocab: [
      ["å legge fram", "to present", "Jeg legger fram tallene.", "I present the figures.", "verb", "legger fram, la fram, har lagt fram"],
      ["å sette opp", "to set up", "Vi setter opp et møte.", "We set up a meeting.", "verb", "setter opp, satte opp, har satt opp"],
      ["å ta opp", "to raise", "Kari tar opp saken.", "Kari raises the matter.", "verb", "tar opp, tok opp, har tatt opp"],
      ["å se over", "to look over", "Kan du se over notatet?", "Can you look over the note?", "verb", "ser over, så over, har sett over"],
      ["å gå gjennom", "to go through", "Vi går gjennom avviket.", "We go through the variance.", "verb", "går gjennom, gikk gjennom, har gått gjennom"],
      ["å slå fast", "to establish", "Møtet slo fast fristen.", "The meeting established the deadline.", "verb", "slår fast, slo fast, har slått fast"],
      ["å komme inn på", "to get onto", "Vi kommer inn på budsjettet til slutt.", "We get onto the budget at the end.", "verb", "kommer inn på, kom inn på, har kommet inn på"],
    ],
    exercises: [
      mc(
        "particles",
        "Hvilken setning er riktig?",
        ["Jeg legger fram tallene i møtet.", "Jeg legger i møtet fram tallene først.", "Jeg framlegger fram tallene.", "Jeg legger fra tallene i møtet når jeg skal presentere."],
        "Jeg legger fram tallene i møtet.",
        "Legge fram means to present. The particle stays with the verb. Framlegge does not take an extra fram, and legge fra is another verb.",
      ),
      mc(
        "particles",
        "Hvilken setning er også riktig?",
        ["Jeg legger tallene fram i møtet.", "Jeg fram legger tallene.", "Jeg legger tallene i fram møtet.", "Jeg oppsetter møtet fram."],
        "Jeg legger tallene fram i møtet.",
        "The object may stand between the verb and the particle. That order is not a mistake.",
      ),
      order(
        "particles",
        "Bygg setningen.",
        ["Vi", "setter", "opp", "et", "møte", "på", "fredag"],
        "Sette opp means to arrange. På fredag is one coming Friday, not the habit på fredager.",
        [],
        "Build: We are setting up a meeting on Friday.",
      ),
      fix(
        "particles",
        "Skriv setningen riktig.",
        "Jeg framlegger fram forslaget i dag.",
        ["Jeg framlegger forslaget i dag", "Jeg legger fram forslaget i dag"],
        "Use either the single verb framlegge or the particle verb legge fram, not both particles at once.",
      ),
      mc(
        "v2",
        "Hvilken leddsetning er riktig?",
        ["fordi vi ikke legger fram tallene i dag", "fordi vi legger ikke fram tallene i dag", "fordi ikke vi legger fram tallene", "fordi vi fram ikke legger tallene"],
        "fordi vi ikke legger fram tallene i dag",
        "In a subordinate clause ikke stands before the verb. The particle stays with legge.",
      ),
      order(
        "particles",
        "Bygg setningen.",
        ["Kan", "du", "se", "over", "notatet"],
        "Se over means to look over. The particle over belongs with se.",
        ["på"],
        "Build: Can you look over the note?",
      ),
      rewrite(
        "particles",
        "Skriv om til en helsetning med «ta opp».",
        "Kari presenterer saken i møtet.",
        ["Kari tar opp saken i møtet", "I møtet tar Kari opp saken"],
        "Ta opp is the ordinary verb for raising a matter. Both the straight order and a fronted time phrase are fine.",
        "Rewrite as a main clause with ta opp.",
      ),
      mc(
        "particles",
        "Hva betyr «slå fast» her?",
        ["å slå fast en frist", "å slå på en lampe", "å slå seg ned", "å slå følge"],
        "å slå fast en frist",
        "Slå fast means to establish or state firmly. The other slå-verbs are different particles.",
      ),
    ],
    produce: {
      prompt: "Skriv tre korte setninger: legge fram, sette opp og gå gjennom.",
      promptEn: "Write three short sentences using legge fram, sette opp and gå gjennom.",
      model: "Jeg legger fram tallene i møtet. Vi setter opp et møte på fredag. Deretter går vi gjennom avviket.",
      modelEn: "I present the figures in the meeting. We set up a meeting on Friday. Then we go through the variance.",
      checks: ["Hvert partikkelverb er helt.", "På fredag er én bestemt fredag.", "Setningene kan leses høyt uten å stoppe."],
    },
  }),
  lesson({
    id: "c1-14",
    level: "C1",
    minutes: 14,
    title: "Faste preposisjoner",
    titleEn: "Fixed prepositions",
    concepts: ["verb-prep", "prepositions"],
    maal: "Du velger preposisjonen som verbet krever, ikke den engelske.",
    husk: "vente på, avhenge av, bidra til, enig i noe, enig med noen.",
    intro: `Many verbs keep one preposition. The English preposition is a poor guide. You wait for someone, but you venter på noen. A result depends on a file, so det avhenger av bilaget. A team contributes to a result: bidrar til. A report consists of sections: består av.

Enig splits in two. Enig i noe is agreement with a claim. Enig med noen is agreement with a person. Jeg er enig i forslaget. Jeg er enig med Kari.

Søke om is to apply for. Svare på is to reply to a question or a mail. Ta hensyn til means to take something into account. These pairs are not optional decoration. A different preposition often makes the sentence sound translated, even when the rest of the grammar is right.`,
    examples: [
      { no: "Vi venter på bilaget fra leverandøren.", en: "We are waiting for the voucher from the supplier." },
      { no: "Prognosen avhenger av den prisjusteringen.", en: "The forecast depends on that price adjustment." },
      { no: "Jeg er enig i forslaget, men ikke i konklusjonen om fristen.", en: "I agree with the proposal, but not with the conclusion about the deadline." },
    ],
    vocab: [
      ["å vente på", "to wait for", "Vi venter på svar.", "We are waiting for a reply.", "verb", "venter på, ventet på, har ventet på"],
      ["å avhenge av", "to depend on", "Det avhenger av bilaget.", "It depends on the voucher.", "verb", "avhenger av, avhang av, har avhengt av"],
      ["å bestå av", "to consist of", "Notatet består av tre avsnitt.", "The note consists of three paragraphs.", "verb", "består av, bestod av, har bestått av"],
      ["å bidra til", "to contribute to", "Tiltaket bidrar til lavere kostnad.", "The measure contributes to a lower cost.", "verb", "bidrar til, bidro til, har bidratt til"],
      ["å ta hensyn til", "to take into account", "Vi tar hensyn til fristen.", "We take the deadline into account.", "verb", "tar hensyn til, tok hensyn til, har tatt hensyn til"],
      ["enig i", "in agreement with a claim", "Jeg er enig i forslaget.", "I agree with the proposal.", "phrase"],
      ["enig med", "in agreement with a person", "Jeg er enig med Kari.", "I agree with Kari.", "phrase"],
      ["å søke om", "to apply for", "Hun søker om utsettelse.", "She is applying for a postponement.", "verb", "søker om, søkte om, har søkt om"],
    ],
    exercises: [
      mc(
        "verb-prep",
        "Hvilken setning er riktig?",
        ["Vi venter på bilaget.", "Vi venter for bilaget.", "Vi venter om bilaget.", "Vi venter til bilaget når vi bare venter."],
        "Vi venter på bilaget.",
        "Vente på is the pair. For and om are the English or a random preposition.",
      ),
      mc(
        "verb-prep",
        "Hvilken setning skiller sak og person?",
        ["Jeg er enig i forslaget og enig med Kari.", "Jeg er enig med forslaget og enig i Kari.", "Jeg er enig på forslaget.", "Jeg er enig av Kari."],
        "Jeg er enig i forslaget og enig med Kari.",
        "Enig i takes the claim. Enig med takes the person.",
      ),
      order(
        "verb-prep",
        "Bygg setningen.",
        ["Prognosen", "avhenger", "av", "bilaget"],
        "Avhenge takes av, not på.",
        ["på"],
        "Build: The forecast depends on the voucher.",
      ),
      fix(
        "prepositions",
        "Skriv setningen riktig.",
        "Resultatet består på tre poster.",
        ["Resultatet består av tre poster"],
        "Besta av is the fixed pair for consist of.",
      ),
      mc(
        "verb-prep",
        "Hvilket uttrykk betyr å søke om utsettelse?",
        ["å søke om utsettelse", "å søke på utsettelse", "å søke for utsettelse", "å søke av utsettelse"],
        "å søke om utsettelse",
        "Søke om is to apply for. Søke på is more like to search a surface or, in some jobs, to apply to a workplace, and it is the wrong pair here.",
      ),
      order(
        "verb-prep",
        "Bygg setningen.",
        ["Vi", "tar", "hensyn", "til", "fristen"],
        "Hensyn til is the fixed noun-plus-preposition. Til is not optional.",
        ["på"],
        "Build: We take the deadline into account.",
      ),
      rewrite(
        "verb-prep",
        "Skriv om slik at svaret knyttes til e-posten med riktig preposisjon.",
        "Jeg svarer e-posten i morgen.",
        ["Jeg svarer på e-posten i morgen"],
        "Svare på is the ordinary pair when the object is the message you answer.",
        "Rewrite so the reply is tied to the email with the right preposition.",
      ),
      mc(
        "prepositions",
        "Hvilken setning er riktig?",
        ["Tiltaket bidrar til lavere kostnad.", "Tiltaket bidrar på lavere kostnad.", "Tiltaket bidrar av lavere kostnad.", "Tiltaket bidrar om lavere kostnad."],
        "Tiltaket bidrar til lavere kostnad.",
        "Bidra til points at the result the measure helps to create.",
      ),
    ],
    produce: {
      prompt: "Skriv fire korte setninger med vente på, avhenge av, enig i og enig med.",
      promptEn: "Write four short sentences with vente på, avhenge av, enig i and enig med.",
      model: "Vi venter på bilaget. Prognosen avhenger av det bilaget. Jeg er enig i forslaget. Jeg er enig med Kari.",
      modelEn: "We are waiting for the voucher. The forecast depends on that voucher. I agree with the proposal. I agree with Kari.",
      checks: ["På, av, i og med er brukt slik verbet krever.", "Enig i peker på en sak.", "Enig med peker på en person."],
    },
  }),
  lesson({
    id: "c1-15",
    level: "C1",
    minutes: 13,
    title: "Høflige småord: jo, vel, nok",
    titleEn: "Modal particles",
    concepts: ["modal-particles", "register"],
    maal: "Du hører forskjellen på jo, vel, nok, da og visst, og du setter dem i midtfeltet.",
    husk: "Det er jo klart. Det blir vel ferdig. Det blir nok forsinket.",
    intro: `Modal particles do not add a new fact. They show how the speaker stands to the fact. They sit in the middle field, after the finite verb in a main clause: Det er jo klart. Not Det jo er klart.

Jo marks something the speaker treats as shared. Det er jo avtalt. You are not informing the reader. You are pointing at common ground.

Vel is a soft assumption or a polite guess. Det blir vel ferdig i dag. You think so, and you leave room.

Nok is probability, a little firmer than vel. Det blir nok forsinket. You expect the delay.

Da can appeal or mark a consequence in speech. Gjør det da. Send det da i dag. It is not the same word as the conjunction da.

Visst marks hearsay or an appearance. Hun kommer visst i morgen. You heard it. You have not checked it. In a formal note, name the source instead of hiding it in visst. A høflig e-post can still use vel, but it should not use visst when a name is available.`,
    examples: [
      { no: "Det er jo avtalt.", en: "That is agreed, as we both know." },
      { no: "Det blir nok forsinket.", en: "It will probably be delayed." },
      { no: "Hun kommer visst i morgen.", en: "She is apparently coming tomorrow." },
    ],
    vocab: [
      ["jo", "as we both know", "Det er jo avtalt.", "It is agreed, as we know.", "adv"],
      ["vel", "I suppose", "Det blir vel ferdig i dag.", "It will be done today, I suppose.", "adv"],
      ["nok", "probably", "Det blir nok forsinket.", "It will probably be delayed.", "adv"],
      ["da", "then; do, in an appeal", "Send det da i dag.", "Do send it today.", "adv"],
      ["visst", "apparently; so I hear", "Hun kommer visst i morgen.", "She is apparently coming tomorrow.", "adv"],
      ["i midtfeltet", "in the middle field", "Partikkelen står i midtfeltet.", "The particle stands in the middle field.", "phrase"],
    ],
    exercises: [
      mc(
        "modal-particles",
        "Hvilken setning har partikkelen i midtfeltet?",
        ["Det er jo avtalt.", "Det jo er avtalt.", "Jo er det avtalt.", "Det er avtalt jo i dag uten pause."],
        "Det er jo avtalt.",
        "Jo stands after the finite verb in a main clause. It does not stand before the verb, and it does not open the clause as a conjunction.",
      ),
      mc(
        "modal-particles",
        "Hvilket ord markerer at begge allerede vet det?",
        ["jo", "nok", "visst", "vel"],
        "jo",
        "Jo points at shared knowledge. Nok is probability, visst is hearsay, and vel is a soft guess.",
      ),
      order(
        "modal-particles",
        "Bygg setningen.",
        ["Det", "blir", "nok", "forsinket"],
        "Nok sits after blir and means probably.",
        ["jo"],
        "Build: It will probably be delayed.",
      ),
      fix(
        "modal-particles",
        "Skriv setningen riktig.",
        "Hun visst kommer i morgen.",
        ["Hun kommer visst i morgen"],
        "The particle follows the finite verb. Visst is not placed before kommer in a main clause.",
      ),
      mc(
        "register",
        "Hvilken formulering passer best i et notat til ledelsen?",
        ["Etter det teamet melder, kommer hun i morgen.", "Hun kommer visst i morgen.", "Hun visst kommer.", "Visst hun kommer i morgen."],
        "Etter det teamet melder, kommer hun i morgen.",
        "Visst hides the source. A note names it. The comma after the fronted clause is required.",
      ),
      order(
        "modal-particles",
        "Bygg setningen.",
        ["Det", "blir", "vel", "ferdig", "i", "dag"],
        "Vel softens the claim. It stands after blir.",
        ["nok"],
        "Build: It will be done today, I suppose.",
      ),
      mc(
        "modal-particles",
        "Hva gjør «da» i «Send det da i dag»?",
        ["Det er en oppfordring.", "Det er en leddsetning.", "Det betyr «siden».", "Det er et subjekt."],
        "Det er en oppfordring.",
        "Here da appeals to the listener. It is not the subordinating da that means when.",
      ),
      rewrite(
        "register",
        "Velg gjengivelsen der kilden er navngitt.",
        "Møtet blir visst utsatt.",
        ["Kari sier at møtet blir utsatt", "Etter det Kari sier, blir møtet utsatt"],
        "Name the person. Keep at-clause without a comma in the first version, and keep the comma after a fronted clause in the second.",
        "Rewrite the hearsay as a sentence with a source.",
      ),
    ],
    produce: {
      prompt: "Skriv tre setninger som skiller jo, nok og visst.",
      promptEn: "Write three sentences that separate jo, nok and visst.",
      model: "Det er jo avtalt. Leveransen blir nok forsinket. Hun kommer visst på fredag.",
      modelEn: "It is agreed, as we know. The delivery will probably be delayed. She is apparently coming on Friday.",
      checks: ["Partiklene står etter verbet.", "Jo er felles kunnskap.", "Visst er noe du har hørt, ikke sjekket."],
    },
  }),
  lesson({
    id: "c1-16",
    level: "C1",
    minutes: 13,
    title: "Ubetonte pronomen",
    titleEn: "Unstressed pronouns",
    concepts: ["clitics", "pronouns", "v2"],
    maal: "Du plasserer et lett pronomen foran ikke i en enkel helsetning.",
    husk: "Jeg så ham ikke. Jeg har ikke sett ham.",
    intro: `Norwegian object pronouns are light when they are unstressed: meg, deg, ham, henne, den, det, oss, dere, dem. In a simple main clause they prefer the slot before ikke. Jeg så ham ikke. Jeg kjenner henne ikke. The heavy phrase can stay after: Jeg så ikke den nye rapporten.

With a compound tense the pronoun usually follows the participle in ordinary prose. Jeg har ikke sett ham. Jeg har ham ikke sett is possible, but it sounds marked. Prefer the first when you write at work.

Han is the subject form. Ham is the object form in the written style this course uses. Jeg så han is common in speech and in some writing. In these exercises the written object form is ham. Do not put the subject after the verb just because the object is a pronoun. V2 still holds: I går så jeg ham ikke.`,
    examples: [
      { no: "Jeg så ham ikke i møtet.", en: "I did not see him in the meeting." },
      { no: "Jeg har ikke sett ham i dag.", en: "I have not seen him today." },
      { no: "I går ringte jeg henne ikke.", en: "Yesterday I did not call her." },
    ],
    vocab: [
      ["ham", "him", "Jeg så ham ikke.", "I did not see him.", "pronoun", "han som subjekt, ham som objekt"],
      ["henne", "her", "Jeg ringte henne ikke.", "I did not call her.", "pronoun", "hun som subjekt, henne som objekt"],
      ["dem", "them", "Jeg møtte dem ikke.", "I did not meet them.", "pronoun", "de som subjekt, dem som objekt"],
      ["meg", "me", "Hun så meg ikke.", "She did not see me.", "pronoun"],
      ["ubetont", "unstressed", "Pronomenet er ubetont.", "The pronoun is unstressed.", "adj"],
      ["etter ikke", "after ikke", "Den tunge frasen står etter ikke.", "The heavy phrase stands after ikke.", "phrase"],
    ],
    exercises: [
      mc(
        "clitics",
        "Hvilken setning har det lette pronomenet på den vanlige plassen?",
        ["Jeg så ham ikke.", "Jeg så ikke ham, som eneste mulige ordstilling.", "Jeg ham så ikke.", "Jeg så han ikke i skrift her."],
        "Jeg så ham ikke.",
        "The unstressed object stands before ikke. This course uses ham in writing. The second option claims to be the only possible order, which is too strong.",
      ),
      mc(
        "clitics",
        "Hvilken setning er den umarkerte med perfektum?",
        ["Jeg har ikke sett ham.", "Jeg har ham ikke sett, som vanlig prosa.", "Jeg har sett ikke ham.", "Jeg ikke har sett ham."],
        "Jeg har ikke sett ham.",
        "In ordinary prose the pronoun follows the participle. Ikke still stands after har.",
      ),
      order(
        "pronouns",
        "Bygg setningen.",
        ["Jeg", "kjenner", "henne", "ikke"],
        "Henne is the object form and stands before ikke.",
        ["hun"],
        "Build: I do not know her.",
      ),
      fix(
        "clitics",
        "Skriv setningen riktig for skrift.",
        "Jeg så han ikke i møtet.",
        ["Jeg så ham ikke i møtet"],
        "Use ham as the written object form in this course.",
      ),
      mc(
        "pronouns",
        "Hvilken setning er riktig når objektet er tungt?",
        ["Jeg så ikke den nye rapporten.", "Jeg så den nye rapporten ikke, som vanlig.", "Jeg den nye rapporten så ikke.", "Jeg så ikke ham rapporten."],
        "Jeg så ikke den nye rapporten.",
        "A full noun phrase usually follows ikke. The light pronoun is the one that moves in front.",
      ),
      order(
        "v2",
        "Bygg setningen.",
        ["I", "går", "ringte", "jeg", "henne", "ikke"],
        "The time phrase is first, so the verb is second, and the light pronoun still stands before ikke.",
        [],
        "Build: Yesterday I did not call her.",
      ),
      rewrite(
        "clitics",
        "Skriv om til en setning med ubetont objekt foran ikke.",
        "Jeg møtte ikke dem i går.",
        ["Jeg møtte dem ikke i går"],
        "Move the light pronoun in front of ikke. I går stays at the end here.",
        "Rewrite so the unstressed object stands before ikke.",
      ),
      mc(
        "pronouns",
        "Hvilket par er subjekt og objekt i skrift?",
        ["de / dem", "dem / de", "ham / han", "henne / hun"],
        "de / dem",
        "De is the subject and dem is the object in the written pairs this course uses. The same split holds for han/ham and hun/henne.",
      ),
    ],
    produce: {
      prompt: "Skriv to setninger: én med så ham ikke, og én med har ikke sett ham.",
      promptEn: "Write one sentence with så ham ikke and one with har ikke sett ham.",
      model: "Jeg så ham ikke i møtet. Jeg har ikke sett ham i dag.",
      modelEn: "I did not see him in the meeting. I have not seen him today.",
      checks: ["Ham er objektform.", "Ikke står etter så i den enkle setningen.", "I perfektum står ikke etter har."],
    },
  }),
  lesson({
    id: "c1-17",
    level: "C1",
    minutes: 14,
    title: "Indirekte tale og spørsmål",
    titleEn: "Reported speech and questions",
    concepts: ["indirect", "conjunctions", "punctuation"],
    maal: "Du gjengir et utsagn med at og et spørsmål uten inversjon.",
    husk: "Hun sa at rapporten var klar. Hun spurte om vi hadde sendt den.",
    intro: `Reported speech uses at, and the clause keeps subordinate order. Hun sa at rapporten var klar. There is no comma before at. Two at-clauses joined by og also have no comma between them: Hun sa at tallene stemmer og at avviket er lite.

A yes/no question is reported with om, not with inversion. Hun spurte om vi hadde sendt rapporten. Not Hun spurte om hadde vi sendt rapporten.

A question word stays, but the subject stays before the verb. Hun spurte når møtet startet. Not Hun spurte når startet møtet. The reported question does not end with a question mark when it is embedded in a statement.

If the content is still true, present is also possible: Hun sier at rapporten er klar. If you place the saying in the past and the content as a past fact, preteritum is the ordinary choice: Hun sa at rapporten var klar. Both can be right. The inversion is what this lesson rejects.`,
    examples: [
      { no: "Hun sa at rapporten var klar.", en: "She said that the report was ready." },
      { no: "Hun spurte om vi hadde sendt den.", en: "She asked whether we had sent it." },
      { no: "Hun spurte når møtet startet.", en: "She asked when the meeting started." },
    ],
    vocab: [
      ["å gjengi", "to report", "Jeg gjengir det hun sa.", "I report what she said.", "verb", "gjengir, gjenga, har gjengitt"],
      ["om", "whether", "Hun spurte om fristen holdt.", "She asked whether the deadline held.", "subjunction"],
      ["når", "when", "Hun spurte når møtet startet.", "She asked when the meeting started.", "subjunction"],
      ["at", "that", "Hun sa at tallene stemte.", "She said that the figures matched.", "subjunction"],
      ["uten inversjon", "without inversion", "Det indirekte spørsmålet står uten inversjon.", "The indirect question has no inversion.", "phrase"],
      ["en kilde", "a source", "Kilden står i helsetningen.", "The source is in the main clause.", "noun", "kilden, kilder, kildene"],
    ],
    exercises: [
      mc(
        "indirect",
        "Hvilken gjengivelse er riktig?",
        ["Hun sa at rapporten var klar.", "Hun sa, at rapporten var klar.", "Hun sa at var rapporten klar.", "Hun sa om rapporten var klar."],
        "Hun sa at rapporten var klar.",
        "No comma before at. The subject stays before the verb. Om is for a reported question, not for this statement.",
      ),
      mc(
        "indirect",
        "Hvilket indirekte spørsmål er riktig?",
        ["Hun spurte om vi hadde sendt rapporten.", "Hun spurte om hadde vi sendt rapporten.", "Hun spurte at vi hadde sendt rapporten?", "Hun spurte sendte vi rapporten."],
        "Hun spurte om vi hadde sendt rapporten.",
        "Om introduces the yes/no question, and the word order stays subordinate.",
      ),
      order(
        "indirect",
        "Bygg setningen.",
        ["Hun", "spurte", "når", "møtet", "startet"],
        "Når stays, but møtet stands before startet. There is no question mark.",
        ["?"],
        "Build: She asked when the meeting started.",
      ),
      fix(
        "punctuation",
        "Skriv setningen riktig.",
        "Hun sa at tallene stemmer, og at avviket er lite.",
        ["Hun sa at tallene stemmer og at avviket er lite"],
        "Do not put a comma between two at-clauses joined by og.",
      ),
      mc(
        "conjunctions",
        "Hvilken setning har komma etter innledende leddsetning?",
        ["At rapporten var klar, overrasket oss.", "At rapporten var klar overrasket oss.", "At, rapporten var klar, overrasket oss.", "Overrasket oss at rapporten var klar."],
        "At rapporten var klar, overrasket oss.",
        "A fronted subordinate clause takes a comma after it. The last option also breaks V2.",
      ),
      order(
        "indirect",
        "Bygg setningen.",
        ["Kari", "sier", "at", "rapporten", "er", "klar"],
        "The saying is present and the content is still true, so er is fine. No comma before at.",
        [","],
        "Build: Kari says that the report is ready.",
      ),
      rewrite(
        "indirect",
        "Gjør spørsmålet indirekte.",
        "Har dere sendt rapporten?",
        ["Hun spurte om vi hadde sendt rapporten", "Hun spør om vi har sendt rapporten"],
        "Both a past report and a present report are right. Neither inverts after om.",
        "Make the question indirect.",
      ),
      mc(
        "punctuation",
        "Hvilken setning følger kommaregelen?",
        ["Jeg blir fordi rapporten ikke er klar.", "Jeg blir, fordi rapporten ikke er klar.", "Jeg ser, at avviket er lite.", "Jeg ser at tallene stemmer, og at avviket er lite."],
        "Jeg blir fordi rapporten ikke er klar.",
        "A following subordinate clause normally has no comma. The comma before fordi is not required, and the comma before at or between at-clauses is the pattern to avoid.",
      ),
    ],
    produce: {
      prompt: "Gjengi ett utsagn med at og ett spørsmål med om. Ikke bruk komma foran at.",
      promptEn: "Report one statement with at and one question with om. Do not put a comma before at.",
      model: "Kari sa at rapporten var klar. Hun spurte om vi hadde sendt den.",
      modelEn: "Kari said that the report was ready. She asked whether we had sent it.",
      checks: ["Utsagnet har at og vanlig leddsetningsrekkefølge.", "Spørsmålet har om uten inversjon.", "Det står ikke komma foran at."],
    },
  }),
  lesson({
    id: "c1-18",
    level: "C1",
    minutes: 14,
    title: "Åpen hvis og hypotetisk fortid",
    titleEn: "If it had been so",
    concepts: ["hypothetical", "tenses", "punctuation"],
    maal: "Du skiller en åpen hvis-setning fra en hypotetisk fortid, og du setter komma etter den innledende leddsetningen.",
    husk: "Hvis vi hadde visst det, hadde vi ventet.",
    intro: `An open condition uses the present, and the main clause uses the present or skal. Hvis rapporten er klar, sender jeg den. The comma after the fronted hvis-clause is required. Hvis rapporten er klar sender jeg den misses that comma.

A counterfactual past uses hadde plus the participle in the hvis-clause. The main clause uses hadde plus the participle, or ville ha plus the participle. Hvis vi hadde visst det, hadde vi ventet. Hvis vi hadde visst det, ville vi ha ventet. Both are right. Hvis vi hadde visst det, venter vi i morgen mixes a closed past condition with a present result and reads as a mistake.

Do not put a comma when the hvis-clause follows. Vi hadde ventet hvis vi hadde visst det. The following clause does not take a comma in the ordinary rule.

Hadde we stands first only in the inverted main clause after the comma, or in a fronted question. It is not the first word of the hvis-clause.`,
    examples: [
      { no: "Hvis rapporten er klar, sender jeg den.", en: "If the report is ready, I will send it." },
      { no: "Hvis vi hadde visst det, hadde vi ventet.", en: "If we had known, we would have waited." },
      { no: "Vi hadde ventet hvis vi hadde visst det.", en: "We would have waited if we had known." },
    ],
    vocab: [
      ["hvis", "if", "Hvis fristen ryker, sier vi fra.", "If the deadline fails, we will say so.", "subjunction"],
      ["hadde visst", "had known", "Hvis jeg hadde visst det, hadde jeg ventet.", "If I had known, I would have waited.", "verb"],
      ["ville ha ventet", "would have waited", "Vi ville ha ventet.", "We would have waited.", "verb"],
      ["en åpen betingelse", "an open condition", "Hvis hun kommer, starter vi.", "If she comes, we start.", "phrase"],
      ["hypotetisk", "counterfactual", "Setningen er hypotetisk.", "The sentence is counterfactual.", "adj"],
      ["et komma", "a comma", "Kommaet står etter leddsetningen.", "The comma stands after the subordinate clause.", "noun", "kommaet, komma, kommaene"],
    ],
    exercises: [
      mc(
        "hypothetical",
        "Hvilken setning er en hypotetisk fortid?",
        ["Hvis vi hadde visst det, hadde vi ventet.", "Hvis vi vet det, venter vi.", "Hvis vi hadde visst det, venter vi i morgen.", "Hvis vi visste det, har vi ventet."],
        "Hvis vi hadde visst det, hadde vi ventet.",
        "Both clauses look back at a closed possibility. The open condition uses present. The mixed versions do not hold together.",
      ),
      mc(
        "punctuation",
        "Hvilken åpen betingelse har riktig komma?",
        ["Hvis rapporten er klar, sender jeg den.", "Hvis rapporten er klar sender jeg den.", "Hvis, rapporten er klar, sender jeg den.", "Rapporten hvis er klar, sender jeg den."],
        "Hvis rapporten er klar, sender jeg den.",
        "The fronted subordinate clause takes one comma after it, not before hvis and not inside the clause.",
      ),
      order(
        "hypothetical",
        "Bygg setningen. Ta med kommaet.",
        ["Hvis", "vi", "hadde", "visst", "det", ",", "hadde", "vi", "ventet"],
        "The comma is a required chip after the fronted clause. Hadde appears twice, once in each clause.",
        [],
        "Build: If we had known, we would have waited.",
      ),
      fix(
        "hypothetical",
        "Skriv setningen riktig.",
        "Hvis vi hadde visst det hadde vi ventet.",
        ["Hvis vi hadde visst det, hadde vi ventet", "Hvis vi hadde visst det, ville vi ha ventet"],
        "Add the comma after the fronted clause. Ville vi ha ventet is an equally good main clause.",
      ),
      mc(
        "tenses",
        "Hvilken setning er en åpen betingelse?",
        ["Hvis hun kommer, starter vi.", "Hvis hun hadde kommet, startet vi i går som en åpen plan.", "Hvis hun kommer starter vi.", "Hvis hun vil komme, hadde vi startet."],
        "Hvis hun kommer, starter vi.",
        "An open plan uses present in the hvis-clause and a comma after it.",
      ),
      order(
        "punctuation",
        "Bygg setningen uten komma.",
        ["Vi", "hadde", "ventet", "hvis", "vi", "hadde", "visst", "det"],
        "The hvis-clause follows the main clause, so there is no comma.",
        [","],
        "Build: We would have waited if we had known.",
      ),
      rewrite(
        "hypothetical",
        "Gjør betingelsen hypotetisk i fortid.",
        "Hvis vi vet det, venter vi.",
        ["Hvis vi hadde visst det, hadde vi ventet", "Hvis vi hadde visst det, ville vi ha ventet"],
        "Hadde plus the participle in both clauses, or ville ha in the main clause. Keep the comma.",
        "Make the condition counterfactual in the past.",
      ),
      mc(
        "punctuation",
        "Hvor står kommaet når hvis-setningen kommer etterpå?",
        ["Det står ikke komma.", "Det står komma foran hvis.", "Det står komma etter hvis.", "Det står komma foran hadde."],
        "Det står ikke komma.",
        "A following subordinate clause normally has no comma. Vi hadde ventet hvis vi hadde visst det.",
      ),
    ],
    produce: {
      prompt: "Skriv én åpen hvis-setning og én hypotetisk fortid. Sett komma bare der leddsetningen står først.",
      promptEn: "Write one open hvis-sentence and one counterfactual past. Use a comma only when the clause is fronted.",
      model: "Hvis rapporten er klar, sender jeg den. Hvis jeg hadde visst det, hadde jeg ventet.",
      modelEn: "If the report is ready, I will send it. If I had known, I would have waited.",
      checks: ["Den åpne setningen har presens.", "Den hypotetiske har hadde og partisipp.", "Komma står etter den innledende leddsetningen."],
    },
  }),
  lesson({
    id: "c1-19",
    level: "C1",
    minutes: 13,
    title: "Det kom en e-post",
    titleEn: "Presentative sentences",
    concepts: ["presentative", "v2"],
    maal: "Du åpner med det når den nye opplysningen skal komme etter verbet.",
    husk: "Det kom en e-post. Det ligger et avvik i rapporten.",
    intro: `A presentative sentence introduces something new. Det is a formal subject. The real noun follows the verb. Det kom en e-post i går. Det ligger et avvik i rapporten. Det finnes ennå ikke et bilag.

The verb is in second place, so a fronted adverb still triggers inversion around det. I går kom det en e-post. Not I går det kom en e-post.

Do not put the new noun first and det after as a copy. En e-post kom det i går is a different, marked pattern. The ordinary introduction is Det kom en e-post.

This det is not the same as a content det that points back. When you mean a known report, use the noun. Rapporten kom i går. Use det kom when the reader has not met the noun yet.

Det er viktig at vi venter is a related pattern: det holds the place, and the at-clause is the content. There is still no comma before at.`,
    examples: [
      { no: "Det kom en e-post fra leverandøren.", en: "An email arrived from the supplier." },
      { no: "Det ligger et avvik i rapporten.", en: "There is a variance in the report." },
      { no: "I går kom det en ny faktura.", en: "Yesterday a new invoice arrived." },
    ],
    vocab: [
      ["det", "formal there/it", "Det kom en e-post.", "An email arrived.", "pronoun"],
      ["å komme", "to arrive; to come", "Det kom en faktura.", "An invoice arrived.", "verb", "kommer, kom, har kommet"],
      ["å ligge", "to lie; to be located", "Det ligger et avvik her.", "There is a variance here.", "verb", "ligger, lå, har ligget"],
      ["å finnes", "to exist", "Det finnes ennå ikke et bilag.", "There is still no voucher.", "verb", "finnes, fantes, har funnes"],
      ["et formelt subjekt", "a formal subject", "Det er formelt subjekt.", "Det is a formal subject.", "phrase"],
      ["en ny opplysning", "a new piece of information", "Opplysningen kommer etter verbet.", "The new information follows the verb.", "noun", "opplysningen, opplysninger, opplysningene"],
    ],
    exercises: [
      mc(
        "presentative",
        "Hvilken setning introduserer noe nytt?",
        ["Det kom en e-post i går.", "En e-post det kom i går.", "Det en e-post kom i går.", "Kom det en e-post i går uten at det er et spørsmål."],
        "Det kom en e-post i går.",
        "Det opens, the verb is second, and the new noun follows. The last option is shaped like a question even though it claims not to be one.",
      ),
      mc(
        "v2",
        "Hvilken setning har tidsleddet først?",
        ["I går kom det en e-post.", "I går det kom en e-post.", "I går en e-post kom det.", "Det i går kom en e-post."],
        "I går kom det en e-post.",
        "The finite verb stays in second place, so kom follows i går, and det follows the verb.",
      ),
      order(
        "presentative",
        "Bygg setningen.",
        ["Det", "ligger", "et", "avvik", "i", "rapporten"],
        "Ligger agrees with the pattern det plus verb plus the new noun. Avvik is neuter, so et.",
        ["en"],
        "Build: There is a variance in the report.",
      ),
      fix(
        "presentative",
        "Skriv setningen riktig.",
        "Det finnes ennå ikke en bilag.",
        ["Det finnes ennå ikke et bilag"],
        "Bilag is neuter. The presentative frame stays.",
      ),
      mc(
        "presentative",
        "Når bruker du «Rapporten kom», ikke «Det kom en rapport»?",
        ["Når rapporten allerede er kjent.", "Når ordet er nytt for leseren.", "Når setningen er et spørsmål.", "Når verbet er ligge."],
        "Når rapporten allerede er kjent.",
        "A known noun can be the real subject. Det introduces what the reader has not been given yet.",
      ),
      order(
        "presentative",
        "Bygg setningen uten komma foran at.",
        ["Det", "er", "viktig", "at", "vi", "venter"],
        "Det holds the place. The at-clause has no comma in front of it, and ikke is not needed here.",
        [","],
        "Build: It is important that we wait.",
      ),
      rewrite(
        "presentative",
        "Skriv om slik at e-posten er ny informasjon.",
        "En e-post fra leverandøren kom i går.",
        ["Det kom en e-post fra leverandøren i går", "I går kom det en e-post fra leverandøren"],
        "Both presentative orders are right. The second fronts the time and keeps V2.",
        "Rewrite so the email is new information.",
      ),
      mc(
        "v2",
        "Hvilken setning er feil?",
        ["Det et avvik ligger i rapporten.", "Det ligger et avvik i rapporten.", "I rapporten ligger det et avvik.", "Det finnes et avvik."],
        "Det et avvik ligger i rapporten.",
        "The new noun cannot stand between det and the verb. The other three are ordinary.",
      ),
    ],
    produce: {
      prompt: "Skriv to presenteringssetninger, én med kom og én med ligger. Front tid i den ene.",
      promptEn: "Write two presentative sentences, one with kom and one with ligger. Front a time in one of them.",
      model: "I går kom det en e-post fra leverandøren. Det ligger et avvik i rapporten.",
      modelEn: "Yesterday an email arrived from the supplier. There is a variance in the report.",
      checks: ["Det er med.", "Den nye opplysningen står etter verbet.", "Den frontede setningen har verbet på plass to."],
    },
  }),
];
