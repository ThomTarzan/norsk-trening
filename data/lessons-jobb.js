import { fill, fix, lesson, mc, order, rewrite } from "./build.js";

const track = "jobb";

export const lessonsJobb = [
  lesson({
    id: "jobb-01",
    level: "B2",
    track,
    minutes: 14,
    title: "E-post som blir lest",
    titleEn: "An email that gets read",
    concepts: ["register"],
    maal: "Du skriver en kort e-post med formål, vedlegg og én tydelig forespørsel.",
    husk: "Hei, formål, vedlegg, spørsmål, frist, Vennlig hilsen.",
    intro: `A Norwegian work email is short. The reader should know why you are writing before the second sentence. You do not need a translated courtesy paragraph about hoping the mail finds them well.

A reliable shape: Hei and the first name. Then Jeg viser til … or Som avtalt … if there is a hook. Then the point. Then one request, with innen and a day. Then Ta gjerne kontakt dersom noe er uklart. Then Vennlig hilsen and your name.

Vedlagt finner du … tells the reader there is a file. Se vedlagt is a little brusquer and still common. Prefer Vedlagt finner du in mail to management.

Write dates as 17. oktober, times as klokka 09.30, and amounts with a comma if you spell them out in a sentence: 4,5 prosent. In running text, fire og en halv prosent is even clearer. Do not open with Kjære, and do not use De.

Subject lines are noun phrases, not full letters: Status IT-kostnader september or Forslag til ny frist. The mailbox is part of the writing.`,
    examples: [
      { no: "Hei Kari. Jeg viser til ledermøtet 12. oktober.", en: "Hello Kari. I refer to the management meeting on 12 October." },
      { no: "Vedlagt finner du statusrapporten for september.", en: "Please find attached the status report for September." },
      { no: "Kunne du gi en tilbakemelding innen torsdag?", en: "Could you give me feedback by Thursday?" },
    ],
    vocab: [
      ["et emnefelt", "a subject line", "Emnefeltet bør være konkret.", "The subject line should be concrete.", "noun"],
      ["en tilbakemelding", "feedback; a reply", "Jeg ber om en kort tilbakemelding.", "I am asking for a short reply.", "noun"],
      ["å gi beskjed", "to let someone know", "Gi meg gjerne beskjed i dag.", "Please let me know today.", "verb"],
      ["som avtalt", "as agreed", "Som avtalt sender jeg utkastet.", "As agreed, I am sending the draft.", "phrase"],
      ["vedlagt", "attached", "Rapporten ligger vedlagt.", "The report is attached.", "adj"],
      ["en forespørsel", "a request", "Forespørselen står til slutt.", "The request comes at the end.", "noun"],
      ["Vennlig hilsen", "Kind regards", "Avslutt med Vennlig hilsen.", "Close with Kind regards.", "phrase"],
      ["innen torsdag", "by Thursday", "Kan du svare innen torsdag?", "Can you reply by Thursday?", "phrase"],
    ],
    exercises: [
      order(
        "register",
        "Bygg åpningen.",
        ["Jeg", "viser", "til", "ledermøtet"],
        "Jeg viser til is the standard way to point back to a meeting or an earlier mail.",
        [],
        "Build the opening.",
      ),
      mc(
        "register",
        "Hvilket emnefelt er best?",
        ["Status IT-kostnader september", "Hei Kari, her kommer en lang e-post om kostnader", "Rapport", "KJÆRE LEDELSE"],
        "Status IT-kostnader september",
        "A subject line is a compact noun phrase. It is not a greeting and not a single vague word if you can be specific.",
      ),
      rewrite(
        "register",
        "Skriv om til en høflig forespørsel med frist.",
        "Svar før torsdag er for sent, svar asap.",
        ["Kunne du svare innen torsdag", "Kan du gi en tilbakemelding innen torsdag"],
        "Innen torsdag is the deadline. Kunne du is enough courtesy. Asap does not belong in the sentence.",
        "Rewrite it as a polite request with a deadline.",
      ),
      fill(
        "register",
        "Fyll inn de to første ordene i den faste setningen.",
        "___ finner du statusrapporten.",
        ["Vedlagt"],
        "Vedlagt is the first element, and finner is already the verb in second place. The finished sentence is Vedlagt finner du statusrapporten.",
      ),
      fix(
        "register",
        "Skriv åpningen slik du kan sende den til lederen din.",
        "Kjære fru leder. De finner rapporten vedlagt.",
        ["Hei. Vedlagt finner du rapporten", "Hei Kari. Vedlagt finner du rapporten"],
        "Use Hei, du, and Vedlagt finner du. The polite De and Kjære fru do not belong in this workplace.",
      ),
      mc(
        "register",
        "Hvor bør selve forespørselen stå?",
        ["Etter poenget, før hilsenen", "I emnefeltet som en lang setning", "Før du har sagt hvorfor du skriver", "Bare i vedlegget"],
        "Etter poenget, før hilsenen",
        "Say why you are writing, then ask for one thing. The reader should not have to hunt for the question.",
        "Where should the actual request go?",
      ),
      order(
        "register",
        "Bygg avslutningen.",
        ["Ta", "gjerne", "kontakt", "dersom", "noe", "er", "uklart"],
        "This closing invites a reply without apologising for the mail.",
        [],
        "Build the closing.",
      ),
      rewrite(
        "register",
        "Skriv en komplett, kort åpning pluss poeng. Bruk «Som avtalt».",
        "Hei, husker du at jeg skulle sende greia?",
        ["Hei. Som avtalt sender jeg statusrapporten", "Som avtalt sender jeg statusrapporten"],
        "Som avtalt replaces the reminder about what was promised. Name the document.",
        "Write a short opening plus the point. Use Som avtalt.",
      ),
    ],
  }),
  lesson({
    id: "jobb-02",
    level: "B2",
    track,
    minutes: 15,
    title: "Status til ledelsen",
    titleEn: "A status update for management",
    concepts: ["register", "tenses"],
    maal: "Du skriver status med nå-situasjon, avvik og neste steg.",
    husk: "Status per i dag. Avviket skyldes … Neste steg er …",
    intro: `A status to management has three moves. Where things stand now. What is off, if anything, and why. What you recommend or what happens next. Two short paragraphs are enough. A wall of background is not a status.

Per i dag ligger IT-kostnadene innenfor rammen, med ett unntak. Lisenskostnaden har et negativt avvik på 4 prosent. Avviket skyldes en prisjustering i september. Jeg anbefaler at vi tar det opp i neste styringsmøte. Prognosen er at vi likevel holder årsrammen.

Tense: per i dag and har et avvik describe the open present. Skyldes is present. A finished cause in September can be preteritum in the next sentence: Prisen økte i september. Do not write the whole status in the past if the reader needs the current picture.

Negativt avvik means you are over the cost budget, or under the income budget: worse than planned. Positivt avvik is the favourable direction. Say which one, and say prosent or kroner. "Vi ligger bakpå" is spoken. "Vi ligger etter planen" is the written phrase. "Vi ligger foran planen" is the other direction.

End with a sentence the manager can act on. Jeg anbefaler at … or Neste steg er at jeg oppdaterer prognosen innen fredag.`,
    examples: [
      { no: "Per i dag ligger vi innenfor kostnadsrammen.", en: "As of today we are within the cost ceiling." },
      { no: "Lisenskostnaden har et negativt avvik på 4 prosent.", en: "The licence cost has an unfavourable variance of 4 percent." },
      { no: "Jeg anbefaler at vi tar avviket opp i neste styringsmøte.", en: "I recommend that we raise the variance at the next steering meeting." },
    ],
    vocab: [
      ["per i dag", "as of today", "Per i dag er prognosen uendret.", "As of today the forecast is unchanged.", "phrase"],
      ["innenfor rammen", "within the ceiling", "Prosjektet er innenfor rammen.", "The project is within the ceiling.", "phrase"],
      ["et negativt avvik", "an unfavourable variance", "Vi har et negativt avvik på lisenser.", "We have an unfavourable variance on licences.", "noun"],
      ["et positivt avvik", "a favourable variance", "Driften har et positivt avvik.", "Operations have a favourable variance.", "noun"],
      ["å ligge etter planen", "to be behind schedule", "Leveransen ligger etter planen.", "The delivery is behind schedule.", "phrase"],
      ["et styringsmøte", "a steering meeting", "Saken tas opp i styringsmøtet.", "The item will be raised at the steering meeting.", "noun"],
      ["neste steg", "the next step", "Neste steg er å oppdatere prognosen.", "The next step is to update the forecast.", "noun"],
      ["en prisjustering", "a price adjustment", "Avviket skyldes en prisjustering.", "The variance is due to a price adjustment.", "noun"],
    ],
    exercises: [
      order(
        "register",
        "Bygg åpningen.",
        ["Per", "i", "dag", "ligger", "vi", "innenfor", "rammen"],
        "Per i dag is the theme. Ligger is second, vi follows.",
        [],
        "Build the opening.",
      ),
      mc(
        "register",
        "Hva betyr et negativt kostnadsavvik?",
        ["Kostnaden er høyere enn budsjettert.", "Kostnaden er lavere enn budsjettert.", "Møtet er avlyst.", "Prognosen er slettet."],
        "Kostnaden er høyere enn budsjettert.",
        "For costs, negative means unfavourable: you have spent or expect to spend more than the budget. Say så if the number could be misread.",
        "What does a negative cost variance mean?",
      ),
      fill(
        "register",
        "Fyll inn verbet som betyr «is due to».",
        "Avviket ___ en prisjustering.",
        ["skyldes"],
        "Skyldes is the finite verb. Do not add er.",
      ),
      rewrite(
        "register",
        "Skriv om til rapportspråk.",
        "Vi ligger bakpå, men det går sikkert bra.",
        ["Vi ligger etter planen", "Leveransen ligger etter planen"],
        "Ligger etter planen is the written phrase. Drop the vague reassurance, or put a fact in a separate sentence.",
        "Rewrite it in report language.",
      ),
      mc(
        "tenses",
        "Hvilken tid passer i «Prisen ___ i september», når september er ferdig?",
        ["økte", "har økt i september i fjor som åpen tid", "øker i september i fortid", "er økte"],
        "økte",
        "A finished month takes preteritum. The current variance can still be perfektum or present in the surrounding sentences.",
      ),
      order(
        "register",
        "Bygg anbefalingen.",
        ["Jeg", "anbefaler", "at", "vi", "venter"],
        "Anbefaler at plus a present-tense verb. No extra bør.",
        [],
        "Build the recommendation.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Neste steg er at prognosen oppdateres av innen fredag.",
        ["Neste steg er at prognosen oppdateres innen fredag", "Neste steg er at jeg oppdaterer prognosen innen fredag"],
        "Innen fredag is the deadline. Av does not belong unless you name a person: oppdateres av controller.",
      ),
      rewrite(
        "register",
        "Skriv statussetningen slik at retningen er tydelig.",
        "Lisensene har et avvik på 4 prosent.",
        ["Lisenskostnaden har et negativt avvik på 4 prosent"],
        "Add negativt if the cost is over budget, so the reader does not have to guess the direction.",
        "Rewrite the status sentence so the direction is clear.",
      ),
    ],
  }),
  lesson({
    id: "jobb-03",
    level: "B2",
    track,
    minutes: 14,
    title: "Møtereferat",
    titleEn: "Minutes",
    concepts: ["register", "passive"],
    maal: "Du skriver referat med sak, vedtak, ansvar og frist.",
    husk: "Til stede, også i overskriften. Vedtak: … Ansvarlig: … Frist: …",
    intro: `Minutes are a list the organisation can reuse, not a transcript. Write what was decided, who does it, and by when. Leave out the jokes and most of the discussion. If the discussion matters, one sentence of background is enough: Saken ble drøftet. Vedtaket ble … 

A simple entry:

Sak 3 Status IT-kostnader
Orientering ved Tsvitana. Lisenskostnaden har et negativt avvik på 4 prosent.
Vedtak: Prognosen oppdateres innen fredag.
Ansvarlig: Tsvitana. Frist: fredag 24. oktober.

Til stede is two words, in a sentence and in a heading. Bokmålsordboka has only til stede. Tilstede as one word is a template habit, not the form to write. The person writing is referenten. Innkalling is the invitation sent before the meeting. Saksliste is the agenda.

Passive fits decisions because the decision belongs to the meeting, not to one speaker. Det ble vedtatt å utsette saken. Saken utsettes til 3. november. Use the s-passive for the resulting rule and ble for the event in the room.

Eventuelt is the last agenda item, for business not listed in advance. Do not put a decision there that needed preparation, if you can avoid it.`,
    examples: [
      { no: "Anna og Kari var til stede. Tsvitana var referent.", en: "Anna and Kari were present. Tsvitana took the minutes." },
      { no: "Vedtak: Prognosen oppdateres innen fredag.", en: "Decision: the forecast will be updated by Friday." },
      { no: "Saken ble utsatt til 3. november.", en: "The item was postponed until 3 November." },
    ],
    vocab: [
      ["et møtereferat", "minutes", "Referatet sendes samme dag.", "The minutes are sent the same day.", "noun"],
      ["en referent", "the person taking minutes", "Referenten sender utkastet.", "The minute-taker sends the draft.", "noun"],
      ["til stede", "present", "Lederen var til stede.", "The manager was present.", "phrase"],
      ["et vedtak", "a decision", "Vedtaket gjelder fristen.", "The decision concerns the deadline.", "noun"],
      ["en saksliste", "an agenda", "Sakslisten har fire saker.", "The agenda has four items.", "noun"],
      ["en innkalling", "a meeting invitation", "Innkallingen gikk ut mandag.", "The invitation went out on Monday.", "noun"],
      ["eventuelt", "any other business", "Eventuelt sto tomt.", "Any other business was empty.", "noun"],
      ["ansvarlig", "the person responsible", "Ansvarlig er Tsvitana.", "Tsvitana is responsible.", "noun"],
    ],
    exercises: [
      mc(
        "register",
        "Hva skriver du i løpende tekst?",
        ["Lederen var til stede.", "Lederen var tilstede.", "Lederen var til-stede.", "Lederen var stede til."],
        "Lederen var til stede.",
        "Til stede is two words everywhere, including headings. Tilstede is not the bokmål form.",
      ),
      order(
        "passive",
        "Bygg vedtaket.",
        ["Prognosen", "oppdateres", "innen", "fredag"],
        "The s-passive states what will happen as a result of the decision.",
        [],
        "Build the decision line.",
      ),
      fill(
        "passive",
        "Fyll inn hjelpeverbet i ble-passiv.",
        "I går ___ saken utsatt til 3. november.",
        ["ble"],
        "I går places the event in the past, so the auxiliary is ble. Blir, er and har would change the time or the construction, and they are not among the options. Utsatt is already in the sentence.",
      ),
      rewrite(
        "register",
        "Gjør om samtalen til et vedtak med ansvar.",
        "Kari sa at noen burde fikse prognosen en eller annen dag.",
        ["Vedtak: Prognosen oppdateres innen fredag. Ansvarlig: Kari."],
        "Name the action, the deadline and the person. Drop burde and noen.",
        "Turn the conversation into a decision with an owner.",
      ),
      mc(
        "register",
        "Hva er «eventuelt»?",
        ["siste sak, for ting som ikke sto på sakslisten", "det viktigste vedtaket", "en liste over hvem som var til stede", "en type kostnadsavvik"],
        "siste sak, for ting som ikke sto på sakslisten",
        "Eventuelt is any other business. It is a poor place for a decision that needed papers in advance.",
        "What is eventuelt?",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Tsvitana var tilstede referent.",
        ["Tsvitana var referent", "Tsvitana var til stede som referent"],
        "Referent is the role. Til stede is a separate phrase if you also need to say that she attended.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Innkallingen", "gikk", "ut", "på", "mandag"],
        "Gikk ut is the verb phrase for a notice that was sent. På mandag is the day.",
        [],
        "Build: The invitation went out on Monday.",
      ),
      mc(
        "passive",
        "Hvilken form passer i linjen «Vedtak»?",
        ["Saken utsettes til november.", "Saken utsatte til november.", "Vi synes saken kanskje utsettes.", "Saken ble utsette."],
        "Saken utsettes til november.",
        "A decision line states the resulting rule with the s-passive. The chatty alternative is not a vedtak.",
      ),
    ],
  }),
  lesson({
    id: "jobb-04",
    level: "C1",
    track,
    minutes: 15,
    title: "Budsjett, prognose og avvik",
    titleEn: "Budget, forecast and variance",
    concepts: ["register", "numbers", "tenses"],
    maal: "Du holder budsjett, regnskap og prognose fra hverandre.",
    husk: "Budsjettet er planen. Regnskapet er det som har skjedd. Prognosen er det du nå venter.",
    intro: `These three words are the spine of the job. Budsjettet is the plan, agreed in advance. Regnskapet is what has actually been recorded. Prognosen is what you now expect for the rest of the period, given the accounts so far. A status that says "budsjettet har økt" when you mean the forecast will confuse a manager who has to live with the original plan.

Avvik is the difference. Say from what, and in which direction. Et negativt avvik fra budsjettet på 0,4 millioner kroner. Norwegian decimals use a comma: 0,4 and 4,5. A space, not a comma, separates thousands: 1 250 000. Do not write 1,250,000.

Periodisering is an accrual: the cost is placed in the period it belongs to, even if the invoice arrives later. Vi periodiserer lisensen med 80 000 kroner i oktober. The verb is periodiserer. The noun is periodiseringen.

Kostnadssted is the cost centre. Føres på kostnadssted 410 means the amount is charged there. A comment in the report can be: Merknad: beløpet er periodisert, ikke betalt.

I fjor is closed, preteritum. Prognosen for i år is a present or future claim: Prognosen tilsier at vi holder rammen. Tilsier means "indicates". It is a calmer verb than "beviser".`,
    examples: [
      { no: "Budsjettet er uendret. Prognosen tilsier et lite avvik.", en: "The budget is unchanged. The forecast indicates a small variance." },
      { no: "Regnskapet for september viser 1 250 000 kroner.", en: "The accounts for September show 1,250,000 kroner." },
      { no: "Vi periodiserer 80 000 kroner i oktober.", en: "We are accruing 80,000 kroner in October." },
    ],
    vocab: [
      ["et budsjett", "a budget", "Budsjettet ble vedtatt i desember.", "The budget was adopted in December.", "noun"],
      ["et regnskap", "the accounts", "Regnskapet for september er lukket.", "The September accounts are closed.", "noun"],
      ["en prognose", "a forecast", "Prognosen oppdateres fredag.", "The forecast will be updated on Friday.", "noun"],
      ["å periodisere", "to accrue", "Vi periodiserer lisensen månedlig.", "We accrue the licence monthly.", "verb"],
      ["et kostnadssted", "a cost centre", "Beløpet føres på kostnadssted 410.", "The amount is charged to cost centre 410.", "noun"],
      ["å tilsi", "to indicate", "Tallene tilsier et lite avvik.", "The figures indicate a small variance.", "verb"],
      ["en merknad", "a note; a comment", "Merknaden står under tabellen.", "The note is under the table.", "noun"],
      ["uendret", "unchanged", "Rammen er uendret.", "The ceiling is unchanged.", "adj"],
    ],
    exercises: [
      mc(
        "register",
        "Hva er prognosen?",
        ["det du nå venter videre i perioden", "planen som ble vedtatt", "det som allerede er bokført", "et møtereferat"],
        "det du nå venter videre i perioden",
        "The forecast is the current expectation. The adopted plan is the budget. What has been recorded is the accounts.",
        "What is the forecast?",
      ),
      mc(
        "numbers",
        "Hvilken tallskriving er norsk?",
        ["1 250 000 kroner og 4,5 prosent", "1,250,000 kroner og 4.5 prosent", "1.250.000 kroner", "1250000, kroner"],
        "1 250 000 kroner og 4,5 prosent",
        "Space between thousands, comma as the decimal mark. The English comma and the English decimal point swap roles.",
      ),
      fill(
        "register",
        "Fyll inn verbet.",
        "Prognosen ___ at vi holder rammen.",
        ["tilsier"],
        "Tilsier is a cautious “indicates”. It does not claim that the future is already a fact.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Vi", "periodiserer", "lisensen", "i", "oktober"],
        "Periodiserer is the finite verb. The month is when the accrual is recognised, not necessarily when it is paid.",
        [],
        "Build: We accrue the licence in October.",
      ),
      fix(
        "register",
        "Skriv setningen slik at planen, ikke prognosen, er tema.",
        "Budsjettet har nå økt fordi vi tror kostnaden blir høyere.",
        ["Prognosen tilsier en høyere kostnad. Budsjettet er uendret"],
        "A belief about the rest of the year changes the forecast. The budget stays the adopted plan unless a formal decision changes it.",
      ),
      rewrite(
        "numbers",
        "Skriv beløpet med norsk tallform og ordet kroner.",
        "The accounts show 1250000 NOK.",
        ["Regnskapet viser 1 250 000 kroner"],
        "Use a space as the thousands separator and the word kroner. NOK can stay in a table header, but the sentence reads better with kroner.",
        "Write the amount in Norwegian number format and use kroner.",
      ),
      fill(
        "register",
        "Fyll inn substantivet for cost centre. Bestemt form entall.",
        "Beløpet føres på ___ 410.",
        ["kostnadssted", "kostnadsstedet"],
        "Both the bare cost-centre label and the definite noun occur in this phrase. Kostnadssted 410 is the usual heading style.",
      ),
      mc(
        "tenses",
        "Hvilken setning passer om et avsluttet regnskap?",
        ["Regnskapet for i fjor viste et lite avvik.", "Regnskapet for i fjor har vist et lite avvik.", "Regnskapet for i fjor viser i morgen.", "I fjor har regnskapet viser."],
        "Regnskapet for i fjor viste et lite avvik.",
        "I fjor closes the period, so preteritum. Har vist would pull the year into an open frame.",
      ),
    ],
  }),
  lesson({
    id: "jobb-05",
    level: "C1",
    track,
    minutes: 14,
    title: "Språk om drift og lufthavn",
    titleEn: "Language for operations and the airport",
    concepts: ["compounds", "prepositions", "register"],
    maal: "Du bruker Avinor-nære ord uten å blande dem med IT-hendelser.",
    husk: "En hendelse i IT er ikke det samme som et budsjettavvik. En innstilt avgang er et fly som ikke går.",
    intro: `Avinor operates airports. The useful nouns are concrete. En lufthavn, en terminal, en rullebane, en avganger-liste is not a compound you need; say avganger og ankomster. Punktlighet is punctuality. En innstilt avgang is a cancelled departure. En forsinkelse is a delay. Vinterdrift covers snow, ice and keeping the runway usable. Beredskap is preparedness for an unwanted event.

Prepositions in this landscape: på lufthavnen, på Gardermoen, i terminalen, på rullebanen when you mean out on the runway as a workplace. Reise til lufthavnen. Jobbe i Avinor.

Keep two "avvik" apart. In finance, et avvik is a variance from budget. In operations and quality, et avvik can be a nonconformity, something that did not follow the procedure. In IT, the usual word for an incident is en hendelse, not et avvik. If you write "vi hadde et avvik i systemet", a finance reader hears a number. Write "vi hadde en hendelse i systemet" for the incident, and "vi hadde et budsjettavvik" for the money.

Compounds you can trust: vinterdrift, rullebanen, punktlighetstall, driftsavbrudd, beredskapsplan. Driftsavbrudd is an interruption of operations. It is one word.`,
    examples: [
      { no: "Avgangen er innstilt på grunn av været.", en: "The departure has been cancelled because of the weather." },
      { no: "Punktligheten på lufthavnen var god i september.", en: "Punctuality at the airport was good in September." },
      { no: "Vi hadde en hendelse i tilgangssystemet, ikke et budsjettavvik.", en: "We had an incident in the access system, not a budget variance." },
    ],
    vocab: [
      ["en lufthavn", "an airport", "Jeg jobber i Avinor, på lufthavnen.", "I work at Avinor, at the airport.", "noun"],
      ["en rullebane", "a runway", "Rullebanen er åpen.", "The runway is open.", "noun"],
      ["en innstilt avgang", "a cancelled departure", "To avganger er innstilt.", "Two departures are cancelled.", "noun"],
      ["en forsinkelse", "a delay", "Forsinkelsen var på 20 minutter.", "The delay was 20 minutes.", "noun"],
      ["punktlighet", "punctuality", "Punktligheten rapporteres månedlig.", "Punctuality is reported monthly.", "noun"],
      ["vinterdrift", "winter operations", "Vinterdriften er i gang.", "Winter operations are under way.", "noun"],
      ["en hendelse", "an incident", "Hendelsen er lukket.", "The incident is closed.", "noun"],
      ["et driftsavbrudd", "an operational interruption", "Driftsavbruddet varte i en time.", "The interruption lasted one hour.", "noun"],
    ],
    exercises: [
      mc(
        "register",
        "Hvilket ord bruker du om et IT-incident?",
        ["en hendelse", "et budsjettavvik", "en innstilt avgang", "en periodisering"],
        "en hendelse",
        "Hendelse is the incident. Budsjettavvik is a financial variance. An innstilt avgang is a cancelled flight departure.",
      ),
      fill(
        "prepositions",
        "Fyll inn preposisjon.",
        "Punktligheten ___ lufthavnen var god.",
        ["på"],
        "På lufthavnen is the place phrase. I lufthavnen is less idiomatic for the airport as a workplace.",
      ),
      mc(
        "compounds",
        "Hva betyr «avgangen er innstilt»?",
        ["The departure is cancelled.", "The departure is on time.", "The runway is closed for the season.", "The invoice has been accrued."],
        "The departure is cancelled.",
        "Innstilt in this aviation phrase means cancelled, not “set up” and not “paused for a moment”. A delay is en forsinkelse.",
        "What does avgangen er innstilt mean?",
      ),
      order(
        "compounds",
        "Bygg setningen.",
        ["Driftsavbruddet", "varte", "i", "en", "time"],
        "Driftsavbrudd is one neuter compound. The definite form is driftsavbruddet. Varte is the past of vare.",
        [],
        "Build: The interruption lasted one hour.",
      ),
      fix(
        "register",
        "Skriv setningen slik at en økonomileser ikke misforstår.",
        "Vi hadde et avvik i tilgangssystemet i natt.",
        ["Vi hadde en hendelse i tilgangssystemet i natt"],
        "Use hendelse for the incident. Keep avvik for the budget or for a formal nonconformity that you then define.",
      ),
      fill(
        "compounds",
        "Velg sammensetningen for winter operations. Ett ord.",
        "___ er i gang fra november.",
        ["Vinterdrift", "vinterdriften", "Vinterdriften"],
        "One word. The definite vinterdriften also fits the blank.",
      ),
      rewrite(
        "prepositions",
        "Skriv setningen med riktig preposisjon og «innstilt».",
        "The flight to Oslo is cancelled because of snow.",
        ["Avgangen til Oslo er innstilt på grunn av snø"],
        "Avgang is the departure. På grunn av is the cause. Innstilt is the status.",
        "Write the sentence with the right preposition and innstilt.",
      ),
      mc(
        "prepositions",
        "Hvilken setning er naturlig om arbeidsgiveren?",
        ["Jeg jobber i Avinor.", "Jeg jobber på Avinor som by.", "Jeg jobber til Avinor siden 2016.", "Jeg jobber om Avinor."],
        "Jeg jobber i Avinor.",
        "I plus the organisation. På lufthavnen is the physical place, in a different sentence.",
      ),
    ],
  }),
  lesson({
    id: "jobb-06",
    level: "C1",
    track,
    minutes: 15,
    title: "Høflig og tydelig uenighet",
    titleEn: "Polite and clear disagreement",
    concepts: ["register", "modals"],
    maal: "Du er uenig uten å bli uklar, og du ber uten å bli stiv.",
    husk: "Jeg er uenig i vurderingen, fordi tallene viser noe annet. Kunne vi se på det sammen?",
    intro: `Disagreement in a Norwegian meeting is allowed, and it is clearest when you separate the person from the matter. Jeg er uenig i vurderingen. Jeg er ikke uenig med deg. Then give the reason in a fordi-clause, with subordinate word order: fordi tallene ikke viser den økningen.

A soft request that still has a spine: Kunne vi se på grunnlaget sammen før neste møte? Ville det være mulig å utsette vedtaket til fredag? These are questions, not hints. You may follow them with the reason.

When you have to say no, say what you can do. Jeg rekker ikke torsdag. Jeg kan sende notatet fredag før klokka tolv. Replacing no with silence costs more time than a short sentence.

Avoid intensifiers that weaken you: litt, bare, egentlig, på en måte, in every sentence. One litt is human. Five of them make the recommendation optional. Jeg anbefaler at vi venter is stronger and still polite.

If you need thinking time: La meg sjekke tallet og svare i ettermiddag. That is more professional than a vague "kanskje". And when you agree, say so in one line so the minutes are easy: Jeg støtter forslaget.`,
    examples: [
      { no: "Jeg er uenig i vurderingen, fordi tallene viser et mindre avvik.", en: "I disagree with the assessment, because the figures show a smaller variance." },
      { no: "Kunne vi se på grunnlaget sammen før møtet?", en: "Could we look at the basis together before the meeting?" },
      { no: "Jeg rekker ikke torsdag, men jeg kan sende notatet fredag.", en: "I cannot make Thursday, but I can send the note on Friday." },
    ],
    vocab: [
      ["uenig i", "in disagreement with a matter", "Jeg er uenig i forslaget.", "I disagree with the proposal.", "phrase"],
      ["å støtte", "to support", "Jeg støtter forslaget.", "I support the proposal.", "verb"],
      ["et grunnlag", "a basis", "Grunnlaget er tallene fra september.", "The basis is the September figures.", "noun"],
      ["å rekke", "to have time for; to make", "Jeg rekker ikke torsdag.", "I cannot make Thursday.", "verb"],
      ["la meg", "let me", "La meg sjekke tallet først.", "Let me check the figure first.", "phrase"],
      ["tydelig", "clear", "Vær tydelig på hva du kan gjøre.", "Be clear about what you can do.", "adj"],
      ["et vedtak", "a decision", "Vedtaket kan vente til fredag.", "The decision can wait until Friday.", "noun"],
      ["i ettermiddag", "this afternoon", "Jeg svarer i ettermiddag.", "I will reply this afternoon.", "phrase"],
    ],
    exercises: [
      order(
        "register",
        "Bygg setningen.",
        ["Jeg", "er", "uenig", "i", "vurderingen"],
        "Uenig i plus the matter. The verb er is second.",
        [],
        "Build: I disagree with the assessment.",
      ),
      fill(
        "modals",
        "Fyll inn ikke i leddsetningen.",
        "Jeg er uenig fordi tallene ___ viser den økningen.",
        ["ikke"],
        "Fordi-clause: ikke before the verb viser.",
      ),
      rewrite(
        "register",
        "Skriv om til en tydelig, høflig uenighet.",
        "Det der er helt feil, synes jeg egentlig litt.",
        ["Jeg er uenig i vurderingen, fordi tallene viser noe annet", "Jeg er uenig i det, fordi tallene viser noe annet"],
        "Name the disagreement and the reason. Drop helt, egentlig and litt when they only soften the sentence into fog.",
        "Rewrite it as clear, polite disagreement.",
      ),
      mc(
        "register",
        "Hvilken forespørsel er både høflig og konkret?",
        ["Kunne vi se på grunnlaget sammen før møtet?", "Kanskje noen kunne se på noe en gang.", "Se på det.", "De må behage å se på grunnlaget."],
        "Kunne vi se på grunnlaget sammen før møtet?",
        "Kunne vi plus a concrete object and a time. The last option is a stiff, translated courtesy that does not belong here.",
      ),
      rewrite(
        "register",
        "Si nei, og si hva du kan gjøre.",
        "Torsdag er dårlig.",
        ["Jeg rekker ikke torsdag, men jeg kan sende notatet fredag", "Jeg kan ikke torsdag. Jeg sender notatet fredag"],
        "A usable no includes the alternative. Fredag is the offer.",
        "Say no, and say what you can do.",
      ),
      order(
        "modals",
        "Bygg setningen.",
        ["La", "meg", "sjekke", "tallet", "først"],
        "La meg plus a bare infinitive buys time without sounding evasive, as long as you say when you will answer.",
        [],
        "Build: Let me check the figure first.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Jeg er uenig med forslaget, men jeg støtter deg ikke som person.",
        ["Jeg er uenig i forslaget"],
        "The matter takes i. You do not need to discuss the person. A clean sentence is enough.",
      ),
      mc(
        "register",
        "Hvilken setning gjør referatet lett?",
        ["Jeg støtter forslaget.", "Jeg er litt sånn enig, på en måte.", "Kanskje forslaget er mulig å like.", "La oss ikke konkludere med at jeg støtter det."],
        "Jeg støtter forslaget.",
        "Minutes need a sentence that can be copied. Jeg støtter forslaget is that sentence.",
      ),
    ],
  }),
];
