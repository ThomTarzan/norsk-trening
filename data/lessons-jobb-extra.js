import { fix, lesson, mc, order, rewrite } from "./build.js";

const track = "jobb";

export const lessonsJobbExtra = [
  lesson({
    id: "jobb-07",
    level: "B2",
    track,
    minutes: 13,
    title: "Møte i Teams",
    titleEn: "A Teams meeting",
    concepts: ["register", "particles"],
    maal: "Du kan åpne, dele skjerm og parkere et punkt uten å bli utydelig.",
    husk: "Ser dere skjermen? Jeg noterer det. Vi tar det til slutt.",
    intro: `A short Teams meeting still needs a shape. Say who you are if someone new is there, then the purpose, then the order of the points. Kan dere høre meg? and Ser dere skjermen? are the two checks before you start the content.

Jeg deler skjermen. Jeg slutter å dele. If the screen is the wrong one, say Det var feil vindu and switch. Do not apologise for a whole minute.

Park a point instead of letting it eat the meeting. Vi tar det til slutt. Jeg noterer det. Then go back to the agenda. When you close, say what happens next and who does it: Kari sender referatet innen fredag.

The particle verbs are the same ones as in the grammar lesson. Sette opp et møte, ta opp en sak, legge fram et tall. One coming Friday is på fredag. A habit is på fredager.`,
    examples: [
      { no: "Ser dere skjermen?", en: "Can you see the screen?" },
      { no: "Jeg noterer det, og vi tar det til slutt.", en: "I will note that, and we will take it at the end." },
      { no: "Kari sender referatet innen fredag.", en: "Kari will send the minutes by Friday." },
    ],
    vocab: [
      ["å dele skjermen", "to share the screen", "Jeg deler skjermen nå.", "I am sharing the screen now.", "verb", "deler, delte, har delt"],
      ["et referat", "minutes", "Referatet sendes innen fredag.", "The minutes will be sent by Friday.", "noun", "referatet, referater, referatene"],
      ["en saksliste", "an agenda", "Sakslisten har tre punkter.", "The agenda has three items.", "noun", "sakslisten, sakslister, sakslistene"],
      ["å notere", "to note", "Jeg noterer forslaget.", "I am noting the proposal.", "verb", "noterer, noterte, har notert"],
      ["innen fredag", "by Friday", "Send det innen fredag.", "Send it by Friday.", "phrase"],
      ["å parkere et punkt", "to park an item", "Vi parkerer punktet.", "We park the item.", "verb", "parkerer, parkerte, har parkert"],
    ],
    exercises: [
      mc(
        "register",
        "Hva sier du før du går gjennom tallene?",
        ["Ser dere skjermen?", "Ser skjermen dere?", "Dere ser skjermen, som et sjekkspørsmål uten verb først.", "Skjermen ser dere?"],
        "Ser dere skjermen?",
        "A yes/no question starts with the verb. The check is about the screen, not about whether the screen sees them.",
      ),
      order(
        "particles",
        "Bygg setningen.",
        ["Jeg", "legger", "fram", "tallene", "nå"],
        "Legge fram is the particle verb for presenting. Nå stays at the end.",
        ["fra"],
        "Build: I am presenting the figures now.",
      ),
      mc(
        "register",
        "Hvordan parkerer du et punkt?",
        ["Jeg noterer det, og vi tar det til slutt.", "Vi glemmer det.", "Det er ikke viktig nok til referatet, så vi later som ingen sa det.", "Jeg avbryter Kari og bytter tema uten å si det."],
        "Jeg noterer det, og vi tar det til slutt.",
        "Parking a point means you keep it and give it a place. You do not pretend it was not said.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Referatet sendes innen på fredag.",
        ["Referatet sendes innen fredag"],
        "Innen fredag already means by Friday. På is extra here.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Kan", "dere", "høre", "meg"],
        "The question starts with the modal. Meg is the object.",
        ["jeg"],
        "Build: Can you hear me?",
      ),
      mc(
        "particles",
        "Hvilken setning setter opp møtet?",
        ["Vi setter opp et møte på fredag.", "Vi oppsetter et møte på fredager.", "Vi setter et møte på opp fredag.", "Vi setter opp møtet i fredag."],
        "Vi setter opp et møte på fredag.",
        "På fredag is the coming Friday. I fredag would mean last Friday. På fredager is a habit, and it is the wrong choice for one meeting.",
      ),
      rewrite(
        "register",
        "Skriv en tydelig avslutning med hvem som gjør hva.",
        "Noen sender vel noe etterpå.",
        ["Kari sender referatet innen fredag"],
        "Name the person, the document and the day.",
        "Write a clear close that says who does what.",
      ),
      mc(
        "register",
        "Hva betyr «Jeg slutter å dele»?",
        ["Skjermdelingen avsluttes.", "Møtet er ferdig.", "Referatet er sendt.", "Mikrofonen skrus av for godt."],
        "Skjermdelingen avsluttes.",
        "The phrase is about the screen share. The meeting can continue.",
      ),
    ],
    produce: {
      prompt: "Skriv åpningen til et Teams-møte på fire linjer: velkomst, formål, sjekk av lyd og skjerm, første punkt.",
      promptEn: "Write a four-line Teams opening: welcome, purpose, sound and screen check, first item.",
      model: "Hei, og velkommen. Vi skal gå gjennom avviket for september. Kan dere høre meg, og ser dere skjermen? Første punkt er lisenskostnaden.",
      modelEn: "Hello and welcome. We are going to go through the September variance. Can you hear me, and can you see the screen? The first item is the licence cost.",
      checks: ["Formålet kommer før detaljene.", "Det er et sjekkspørsmål om lyd eller skjerm.", "Første punkt er navngitt."],
    },
  }),
  lesson({
    id: "jobb-08",
    level: "B2",
    track,
    minutes: 13,
    title: "Telefon til leverandør",
    titleEn: "A call to a supplier",
    concepts: ["register", "numbers"],
    maal: "Du presenterer deg, sier hvorfor du ringer, og ber om å få nummeret gjentatt.",
    husk: "Hei, det er Tsvitana fra Avinor. Jeg ringer om fakturaen.",
    intro: `On the phone you have no subject line. The first sentence does that job. Hei, det er Tsvitana fra Avinor. Then why you are calling. Jeg ringer om faktura 10432. Then one request.

Numbers are easy to mishear. Read a reference in short groups, then ask Kan du gjenta nummeret? If you must wait, say Jeg venter mens du sjekker. Silence is harder on a phone than in a room.

Close with what you agreed and a thanks. Da oppdaterer dere forfallsdatoen, og jeg får en bekreftelse på e-post. Takk for hjelpen. You do not need to apologise for calling.

If the line is bad, say Linjen er dårlig. Kan jeg ringe deg opp igjen? Do not keep guessing at a number you did not hear.`,
    examples: [
      { no: "Hei, det er Tsvitana fra Avinor.", en: "Hello, this is Tsvitana from Avinor." },
      { no: "Kan du gjenta nummeret?", en: "Can you repeat the number?" },
      { no: "Jeg venter mens du sjekker.", en: "I will wait while you check." },
    ],
    vocab: [
      ["å ringe om", "to call about", "Jeg ringer om fakturaen.", "I am calling about the invoice.", "verb", "ringer, ringte, har ringt"],
      ["å gjenta", "to repeat", "Kan du gjenta nummeret?", "Can you repeat the number?", "verb", "gjentar, gjentok, har gjentatt"],
      ["et fakturanummer", "an invoice number", "Fakturanummeret er 10432.", "The invoice number is 10432.", "noun", "fakturanummeret, fakturanumre, fakturanumrene"],
      ["en forfallsdato", "a due date", "Forfallsdatoen er 30. april.", "The due date is 30 April.", "noun", "forfallsdatoen, forfallsdatoer, forfallsdatoene"],
      ["en bekreftelse", "a confirmation", "Jeg ber om en bekreftelse.", "I am asking for a confirmation.", "noun", "bekreftelsen, bekreftelser, bekreftelsene"],
      ["linjen", "the line", "Linjen er dårlig.", "The line is bad.", "noun"],
    ],
    exercises: [
      mc(
        "register",
        "Hvilken åpning er tydelig?",
        ["Hei, det er Tsvitana fra Avinor. Jeg ringer om fakturaen.", "Hei, det gjelder en ting.", "Du, jeg lurer på noe med en faktura et sted.", "God dag, herr leverandør."],
        "Hei, det er Tsvitana fra Avinor. Jeg ringer om fakturaen.",
        "Name yourself, the organisation and the topic. De and herr are the wrong register.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Kan", "du", "gjenta", "nummeret"],
        "The request is short and starts with the verb because it is a question.",
        ["om"],
        "Build: Can you repeat the number?",
      ),
      mc(
        "numbers",
        "Hvordan leser du forfallsdatoen 30. april?",
        ["trettiende april", "tretti april", "april tretti", "den 30 av april"],
        "trettiende april",
        "Dates in speech use the ordinal. Trettiende april is 30 April. Writing 30. april is still right on paper.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Jeg venter mens at du sjekker.",
        ["Jeg venter mens du sjekker"],
        "Mens does not take an extra at.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Da", "får", "jeg", "en", "bekreftelse", "på", "e-post"],
        "The agreement is concrete: a confirmation by email. Da here means then, as a consequence.",
        ["visst"],
        "Build: Then I will get a confirmation by email.",
      ),
      mc(
        "register",
        "Linjen er dårlig. Hva sier du?",
        ["Kan jeg ringe deg opp igjen?", "Jeg gjetter på nummeret.", "Vi legger på uten å si noe.", "Kan du hviske?"],
        "Kan jeg ringe deg opp igjen?",
        "Offer a new call instead of guessing a number you did not hear.",
      ),
      rewrite(
        "register",
        "Gjør henvendelsen kortere og konkret.",
        "Hei, jeg bare lurte på om dere kanskje kunne se på en faktura hvis dere har tid.",
        ["Hei, det er Tsvitana fra Avinor. Jeg ringer om faktura 10432"],
        "Cut the hedging. Keep the name and the invoice number.",
        "Make the request shorter and concrete.",
      ),
      mc(
        "numbers",
        "Hvilken setning ber om å få tallet kontrollert?",
        ["Kan du gjenta nummeret?", "Nummeret er sikkert riktig.", "Jeg skriver et annet nummer.", "Forfallsdatoen kan være hva som helst."],
        "Kan du gjenta nummeret?",
        "Repetition is the check. Guessing a different number is not.",
      ),
    ],
    produce: {
      prompt: "Skriv det du sier de første ti sekundene av samtalen.",
      promptEn: "Write what you say in the first ten seconds of the call.",
      model: "Hei, det er Tsvitana fra Avinor. Jeg ringer om faktura 10432. Forfallsdatoen står som 30. april. Stemmer det?",
      modelEn: "Hello, this is Tsvitana from Avinor. I am calling about invoice 10432. The due date is given as 30 April. Is that right?",
      checks: ["Navn og Avinor er med.", "Fakturaen er identifisert.", "Det er ett konkret spørsmål."],
    },
  }),
  lesson({
    id: "jobb-09",
    level: "B2",
    track,
    minutes: 14,
    title: "Å lese tall høyt",
    titleEn: "Reading numbers aloud",
    concepts: ["numbers", "register"],
    maal: "Du leser klokkeslett, dato, prosent og store beløp slik at en kollega kan skrive dem ned.",
    husk: "14.15 er fjorten femten. 4,5 prosent er fire komma fem prosent.",
    intro: `When you read a figure aloud, choose the form the listener can write down. 14.15 can be fjorten femten or kvart over to. Both are right. 07.32 is null sju tretti to or sju tretti to. Say null if the leading zero matters, for example in a reference.

Dates use the ordinal in speech. 1. januar is første januar. 30. april is trettiende april. On paper you still write 30. april.

Percent with a decimal uses komma in Norwegian. 4,5 prosent is fire komma fem prosent. A point is the English decimal mark, and it is easy to mishear as a thousands separator.

Large amounts are grouped. 1 250 000 is en million to hundre og femti tusen. Pause at the million and at the thousand. Then ask the listener to repeat the number back.

Tjue, tyve and tjuge are all allowed for 20. Tyv is not. In a meeting, pick one form and keep it.`,
    examples: [
      { no: "Møtet starter kvart over to.", en: "The meeting starts at a quarter past two." },
      { no: "Avviket er fire komma fem prosent.", en: "The variance is four point five percent." },
      { no: "Beløpet er en million to hundre og femti tusen.", en: "The amount is one million two hundred and fifty thousand." },
    ],
    vocab: [
      ["kvart over", "a quarter past", "Kvart over to er 14.15.", "A quarter past two is 14.15.", "phrase"],
      ["null sju", "zero seven", "Null sju tretti to er 07.32.", "Zero seven thirty-two is 07.32.", "phrase"],
      ["fire komma fem", "four point five", "Fire komma fem prosent.", "Four point five percent.", "phrase"],
      ["en million", "one million", "Beløpet er en million.", "The amount is one million.", "noun"],
      ["å gjenta tallet", "to repeat the figure", "Kan du gjenta tallet?", "Can you repeat the figure?", "verb"],
      ["et desimaltegn", "a decimal mark", "Desimaltegnet er komma.", "The decimal mark is a comma.", "noun", "desimaltegnet, desimaltegn, desimaltegnene"],
    ],
    exercises: [
      mc(
        "numbers",
        "Hvilke opplesninger passer til 14.15?",
        ["fjorten femten og kvart over to", "fjorten punkt femten", "to kvart over", "femten over fjorten"],
        "fjorten femten og kvart over to",
        "Both the digital reading and kvart over to are right. The point is not used in the time.",
      ),
      mc(
        "numbers",
        "Hvordan leser du 4,5 prosent?",
        ["fire komma fem prosent", "fire punkt fem prosent", "fire og fem prosent", "førtifem prosent"],
        "fire komma fem prosent",
        "The decimal mark is komma. Punkt is the English reading and is easy to confuse with a thousands mark.",
      ),
      order(
        "numbers",
        "Bygg opplesningen av 1. januar.",
        ["første", "januar"],
        "The date in speech uses the ordinal første, not en.",
        ["en"],
        "Build the spoken form of 1 January.",
      ),
      fix(
        "numbers",
        "Skriv setningen slik den skal sies.",
        "Beløpet er 1.250.000.",
        ["Beløpet er en million to hundre og femti tusen", "Beløpet er 1 250 000"],
        "Norwegian does not use a point as the thousands separator in this style. Words are clearest aloud. A space is the written grouping.",
      ),
      mc(
        "numbers",
        "Hvilken form er ikke bokmål for 20?",
        ["tyv", "tjue", "tyve", "tjuge"],
        "tyv",
        "Tjue, tyve and tjuge are allowed. Tyv is not the numeral.",
      ),
      order(
        "numbers",
        "Bygg setningen.",
        ["Kan", "du", "gjenta", "tallet"],
        "After a long amount, ask for the number back.",
        ["punkt"],
        "Build: Can you repeat the figure?",
      ),
      rewrite(
        "register",
        "Skriv beløpet og prosenten i ord.",
        "Avviket er 4.5% av 1250000.",
        ["Avviket er fire komma fem prosent av en million to hundre og femti tusen"],
        "Say komma, and group the large amount in millions and thousands.",
        "Write the amount and the percent in words.",
      ),
      mc(
        "numbers",
        "Hva kan 07.32 også sies som?",
        ["sju tretti to", "halv åtte", "sju og tretti", "null syv og en halv"],
        "sju tretti to",
        "The digital reading without null is fine when the context is a clock. Halv åtte is 07.30, not 07.32.",
      ),
    ],
    produce: {
      prompt: "Skriv med ord: møtet 14.15, avviket 4,5 prosent, beløpet 1 250 000. Be kollegaen gjenta.",
      promptEn: "Write in words: the meeting at 14.15, a variance of 4.5 percent, the amount 1,250,000. Ask a colleague to repeat.",
      model: "Møtet starter fjorten femten. Avviket er fire komma fem prosent. Beløpet er en million to hundre og femti tusen. Kan du gjenta tallet?",
      modelEn: "The meeting starts at fourteen fifteen. The variance is four point five percent. The amount is one million two hundred and fifty thousand. Can you repeat the figure?",
      checks: ["14.15 er fjorten femten eller kvart over to.", "Desimaltegnet er komma.", "Det store beløpet er gruppert."],
    },
  }),
  lesson({
    id: "jobb-10",
    level: "C1",
    track,
    minutes: 14,
    title: "Månedsavslutning",
    titleEn: "Month-end close",
    concepts: ["register", "tenses"],
    maal: "Du kan si hva som er avstemt, hva som gjenstår, og når perioden stenges.",
    husk: "To kontoer er ikke avstemt. Vi stenger perioden på fredag.",
    intro: `Month-end is a status, not a story. Start with the period and the decision. Vi stenger perioden på fredag. Then the exception. To kontoer er ikke avstemt. Then what you are waiting for. Vi venter på ett bilag.

Use er avstemt for the state now. Use ble avstemt i går only when the day matters. Do not say that a cost centre was reconciled if you mean the account. Kontoen avstemmes. Kostnadsstedet er et sted du fører på, not a balance you tick off.

Periodisering belongs in its own sentence if it explains a figure. Lisenskostnaden periodiseres over tolv måneder. The close itself is Vi stenger perioden. If something is late, say what is late and who owns it. Kari ettersender bilaget innen torsdag.

På fredag is the coming Friday. I fredag would be last Friday and would fight with the future verb stenger.`,
    examples: [
      { no: "Vi stenger perioden på fredag.", en: "We close the period on Friday." },
      { no: "To kontoer er ikke avstemt.", en: "Two accounts are not reconciled." },
      { no: "Lisenskostnaden periodiseres over tolv måneder.", en: "The licence cost is accrued over twelve months." },
    ],
    vocab: [
      ["å stenge perioden", "to close the period", "Vi stenger perioden på fredag.", "We close the period on Friday.", "verb", "stenger, stengte, har stengt"],
      ["avstemt", "reconciled", "Kontoen er avstemt.", "The account is reconciled.", "adj"],
      ["å periodisere", "to accrue", "Kostnaden periodiseres over året.", "The cost is accrued over the year.", "verb", "periodiserer, periodiserte, har periodisert"],
      ["et bilag", "a voucher", "Ett bilag mangler.", "One voucher is missing.", "noun", "bilaget, bilag, bilagene"],
      ["å ettersende", "to send on afterwards", "Kari ettersender bilaget.", "Kari will send the voucher afterwards.", "verb", "ettersender, ettersendte, har ettersendt"],
      ["en månedsavslutning", "a month-end close", "Månedsavslutningen er på fredag.", "The month-end close is on Friday.", "noun", "månedsavslutningen, månedsavslutninger, månedsavslutningene"],
    ],
    exercises: [
      mc(
        "register",
        "Hvilken status er presis?",
        ["To kontoer er ikke avstemt.", "To kostnadssteder er avstemt.", "Perioden er stengt i går, men vi stenger den på fredag i samme setning uten forklaring.", "Alle bilag mangler."],
        "To kontoer er ikke avstemt.",
        "You reconcile accounts. A cost centre is where you post, not the thing you tick off. Do not claim that every voucher is missing if one is missing.",
      ),
      order(
        "tenses",
        "Bygg setningen.",
        ["Vi", "stenger", "perioden", "på", "fredag"],
        "Stenger is present for a scheduled close. På fredag is the coming Friday.",
        ["i"],
        "Build: We close the period on Friday.",
      ),
      mc(
        "tenses",
        "Hvilken setning skiller tilstand og tidspunkt?",
        ["Kontoen er avstemt. Den ble avstemt i går.", "Kontoen ble avstemt, så den er ikke avstemt.", "Kontoen har avstemt i går.", "Kontoen avstemte i går."],
        "Kontoen er avstemt. Den ble avstemt i går.",
        "Er avstemt is the state. Ble avstemt i går is the event. The verb is avstemme, so the account does not avstemte by itself.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "Ett av kontoene mangler et bilag.",
        ["Én av kontoene mangler et bilag", "En av kontoene mangler et bilag"],
        "Konto is masculine or feminine, so en or én. Ett belongs with a neuter noun such as tall or bilag.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Kari", "ettersender", "bilaget", "innen", "torsdag"],
        "Name the person, the document and the day.",
        ["på"],
        "Build: Kari will send the voucher by Thursday.",
      ),
      mc(
        "tenses",
        "Hvilken setning om periodisering er riktig?",
        ["Lisenskostnaden periodiseres over tolv måneder.", "Lisenskostnaden periodiseres over tolv måned.", "Lisenskostnaden er periodisert over i går.", "Vi periodiserer kostnaden i fredag."],
        "Lisenskostnaden periodiseres over tolv måneder.",
        "Måneder is the plural. I fredag is not the coming Friday.",
      ),
      rewrite(
        "register",
        "Del opp i to setninger: tilstand og unntak.",
        "Vi er nesten ferdige men det er noe med noen kontoer.",
        ["Perioden stenges på fredag. To kontoer er ikke avstemt", "Vi stenger perioden på fredag. To kontoer er ikke avstemt"],
        "One sentence for the close, one for the exception. Both pairs are right.",
        "Split into two sentences: the state and the exception.",
      ),
      mc(
        "register",
        "Hva venter dere på?",
        ["Ett bilag.", "Et kostnadssted.", "En avstemt fredag.", "Periodiseringen som subjekt."],
        "Ett bilag.",
        "Bilag is neuter, so ett. The open item in this lesson is the missing voucher.",
      ),
    ],
    produce: {
      prompt: "Skriv en status på fire setninger til ledelsen om månedsavslutningen.",
      promptEn: "Write a four-sentence status to management about the month-end close.",
      model: "Vi stenger perioden på fredag. De fleste kontoene er avstemt. To kontoer er ikke avstemt, og vi venter på ett bilag. Kari ettersender bilaget innen torsdag.",
      modelEn: "We close the period on Friday. Most of the accounts are reconciled. Two accounts are not reconciled, and we are waiting for one voucher. Kari will send the voucher by Thursday.",
      checks: ["Stengedagen er med.", "Unntaket er konkret.", "Bilag er intetkjønn: ett bilag."],
    },
  }),
  lesson({
    id: "jobb-11",
    level: "C1",
    track,
    minutes: 14,
    title: "Når revisor spør",
    titleEn: "When the auditor asks",
    concepts: ["register", "passive"],
    maal: "Du svarer med dokumentasjon, forbehold og riktig verb for fakturaen.",
    husk: "Attestere er å kontrollere. Anvise er å godkjenne betaling. Vi tar forbehold.",
    intro: `An auditor asks for evidence, not for a mood. Svaret bør si hvilket bilag, hvilken periode og hvem som gjorde hva. Faktura 10432 er attestert av Kari og anvist av meg. Attestere means the invoice was checked. Anvise means payment was authorised. They are not synonyms.

Vi tar forbehold when a figure is not finished. There is no et in front of forbehold in that idiom. Forbeholdet gjelder det manglende bilaget, ikke hele regnskapet, unless that is what you mean. Say the scope.

S-passive is normal here, and av plus the person is allowed. Bilaget er gjennomgått av revisor. You do not have to switch to bli just because an agent is named.

If you do not have the file, say when it will exist. Vi ettersender dokumentasjonen innen torsdag. Do not write at dokumentasjonen visst finnes.`,
    examples: [
      { no: "Fakturaen er attestert av Kari.", en: "The invoice has been checked by Kari." },
      { no: "Beløpet er anvist.", en: "The amount has been authorised for payment." },
      { no: "Vi tar forbehold om det manglende bilaget.", en: "We reserve our position on the missing voucher." },
    ],
    vocab: [
      ["å attestere", "to check an invoice", "Kari attesterer fakturaen.", "Kari checks the invoice.", "verb", "attesterer, attesterte, har attestert"],
      ["å anvise", "to authorise payment", "Jeg anviser beløpet.", "I authorise the amount.", "verb", "anviser, anviste, har anvist"],
      ["et forbehold", "a reservation", "Vi tar forbehold.", "We make a reservation.", "noun", "forbeholdet, forbehold, forbeholdene"],
      ["en stikkprøve", "a sample check", "Revisor tar en stikkprøve.", "The auditor takes a sample.", "noun", "stikkprøven, stikkprøver, stikkprøvene"],
      ["dokumentasjon", "documentation", "Dokumentasjonen ettersendes.", "The documentation will be sent on.", "noun"],
      ["en revisor", "an auditor", "Revisor ber om bilaget.", "The auditor asks for the voucher.", "noun", "revisoren, revisorer, revisorene"],
    ],
    exercises: [
      mc(
        "register",
        "Hvilken setning skiller de to verbene?",
        ["Kari attesterer fakturaen, og jeg anviser beløpet.", "Kari anviser at fakturaen er riktig, og jeg attesterer betalingen, i denne rutinens betydning.", "Begge verb betyr det samme.", "Vi tar et forbehold om verbene."],
        "Kari attesterer fakturaen, og jeg anviser beløpet.",
        "Attestere is the check. Anvise authorises payment. Tar forbehold has no et.",
      ),
      order(
        "passive",
        "Bygg setningen.",
        ["Bilaget", "er", "gjennomgått", "av", "revisor"],
        "S-passive is not required. Er gjennomgått av names the agent, and av is allowed.",
        ["hos"],
        "Build: The voucher has been reviewed by the auditor.",
      ),
      mc(
        "register",
        "Hvilken formulering er idiomet?",
        ["Vi tar forbehold om bilaget.", "Vi tar et forbehold om bilaget.", "Vi tar forbeholde.", "Vi gjør forbeholdet på bilaget."],
        "Vi tar forbehold om bilaget.",
        "The idiom is tar forbehold, without et. Om names the scope.",
      ),
      fix(
        "passive",
        "Skriv setningen riktig.",
        "Fakturaen attesteres av Kari i går.",
        ["Fakturaen ble attestert av Kari i går", "Fakturaen er attestert av Kari"],
        "I går needs a past event, so ble attestert. The state now is er attestert, without i går.",
      ),
      order(
        "register",
        "Bygg setningen.",
        ["Vi", "ettersender", "dokumentasjonen", "innen", "torsdag"],
        "Say when the file will exist instead of hiding it.",
        ["visst"],
        "Build: We will send the documentation by Thursday.",
      ),
      mc(
        "passive",
        "Hvilken setning er faglig riktig?",
        ["Fakturaen er attestert, men ikke anvist.", "Fakturaen er anvist, derfor er den ikke kontrollert.", "Forbeholdet betyr at betalingen er utført.", "Stikkprøven erstatter hele bilaget."],
        "Fakturaen er attestert, men ikke anvist.",
        "Checked is not the same as authorised for payment. A sample does not replace the voucher.",
      ),
      rewrite(
        "register",
        "Velg et svar revisor kan arkivere.",
        "Vi har sikkert sett på den fakturaen.",
        ["Faktura 10432 er attestert av Kari og anvist av meg"],
        "Give the number and the two actions with the two people.",
        "Write a reply the auditor can file.",
      ),
      mc(
        "register",
        "Hva bør forbeholdet peke på?",
        ["Det som faktisk er uavklart.", "Hele året, for sikkerhets skyld.", "Navnet på revisor.", "At svaret er høflig."],
        "Det som faktisk er uavklart.",
        "A reservation covers the open item. A blanket reservation over the whole year is a different and much heavier claim.",
      ),
    ],
    produce: {
      prompt: "Skriv tre setninger til revisor: hva som er gjort, hvem som gjorde det, og ett forbehold.",
      promptEn: "Write three sentences to the auditor: what was done, who did it, and one reservation.",
      model: "Faktura 10432 er attestert av Kari og anvist av meg. Bilaget ligger vedlagt. Vi tar forbehold om periodiseringen, som ettersendes innen torsdag.",
      modelEn: "Invoice 10432 has been checked by Kari and authorised by me. The voucher is attached. We reserve our position on the accrual, which will be sent by Thursday.",
      checks: ["Attestert og anvist er ikke brukt som synonymer.", "En person er nevnt.", "Forbeholdet har et avgrenset omfang."],
    },
  }),
  lesson({
    id: "jobb-12",
    level: "B2",
    track,
    minutes: 12,
    title: "Lunsjprat",
    titleEn: "Lunch chat",
    concepts: ["register", "questions", "v2"],
    maal: "Du holder en kort, vanlig lunsjprat uten å bli for personlig.",
    husk: "Hva gjorde du i helgen? Skal du spise i kantina?",
    intro: `Lunch is not a meeting, and it is not an interview. A colleague expects a short question, an answer of one or two sentences, and a question back. Hva gjorde du i helgen? is ordinary. Hvor mye tjener du? is not.

Safe topics are the weekend, the food, the weather and a plan for the afternoon. Skal du spise i kantina? Det var kaldt i går. Jeg var på tur.

If you do not want to answer, you can stay general. Det ble en rolig helg. Then ask something else. You do not owe a medical story or a family story.

Keep the grammar light and correct. Questions still start with the verb or a question word. I helgen var jeg hjemme keeps the verb in second place. A habit is på søndager. One past Sunday in a story is Søndag var jeg hjemme. I søndags is not a Norwegian phrase.`,
    examples: [
      { no: "Hva gjorde du i helgen?", en: "What did you do at the weekend?" },
      { no: "Søndag var jeg på tur.", en: "On Sunday I went for a walk." },
      { no: "Skal du spise i kantina?", en: "Are you going to eat in the canteen?" },
    ],
    vocab: [
      ["i helgen", "at the weekend", "Hva gjorde du i helgen?", "What did you do at the weekend?", "phrase"],
      ["en kantine", "a canteen", "Lunsjen er i kantina.", "Lunch is in the canteen.", "noun", "kantina, kantiner, kantinene"],
      ["en tur", "a walk; a trip", "Jeg var på tur.", "I went for a walk.", "noun", "turen, turer, turene"],
      ["rolig", "quiet; calm", "Det ble en rolig helg.", "It was a quiet weekend.", "adj"],
      ["å spise lunsj", "to eat lunch", "Skal vi spise lunsj sammen?", "Shall we eat lunch together?", "verb", "spiser, spiste, har spist"],
      ["vær", "weather", "Været var kaldt.", "The weather was cold.", "noun"],
    ],
    exercises: [
      mc(
        "questions",
        "Hvilket spørsmål passer i lunsjen?",
        ["Hva gjorde du i helgen?", "Hvor mye tjener du?", "Hvorfor var du syk?", "Hvem stemmer du på?"],
        "Hva gjorde du i helgen?",
        "The weekend is ordinary small talk. Pay, illness and voting push too far.",
      ),
      order(
        "questions",
        "Bygg spørsmålet.",
        ["Skal", "du", "spise", "i", "kantina"],
        "A yes/no question starts with the verb.",
        ["om"],
        "Build: Are you going to eat in the canteen?",
      ),
      mc(
        "register",
        "Hvilket svar er høflig og kort når du ikke vil si mer?",
        ["Det ble en rolig helg. Og du?", "Det vil jeg ikke snakke om.", "Familien min har det vanskelig, og her er detaljene.", "Jeg var på jobb, det angår deg ikke."],
        "Det ble en rolig helg. Og du?",
        "A general answer plus a question back keeps the talk going without a speech.",
      ),
      fix(
        "register",
        "Skriv setningen riktig.",
        "I søndags var jeg hjemme.",
        ["Søndag var jeg hjemme", "I helgen var jeg hjemme"],
        "I søndags is not the phrase. Name the day and keep V2, or use i helgen.",
      ),
      order(
        "v2",
        "Bygg svaret.",
        ["Søndag", "var", "jeg", "på", "tur"],
        "The day is first, so var is second and jeg follows.",
        ["i"],
        "Build: On Sunday I went for a walk.",
      ),
      mc(
        "register",
        "Hvilken setning er en vane, ikke én dag?",
        ["På søndager går jeg tur.", "På søndag går jeg tur, om én bestemt søndag.", "I søndag går jeg tur.", "Søndager på går jeg tur."],
        "På søndager går jeg tur.",
        "The plural på søndager is the habit. One particular Sunday is på søndag or søndag.",
      ),
      rewrite(
        "questions",
        "Gjør påstanden om til et spørsmål til kollegaen.",
        "Du spiser i kantina.",
        ["Spiser du i kantina", "Skal du spise i kantina"],
        "Both a present question and a plan with skal are natural at lunch.",
        "Turn the statement into a question to a colleague.",
      ),
      mc(
        "questions",
        "Hva gjør du etter at du har svart?",
        ["Du stiller et kort spørsmål tilbake.", "Du holder en presentasjon.", "Du spør om lønn.", "Du forlater bordet med en gang."],
        "Du stiller et kort spørsmål tilbake.",
        "Small talk is an exchange. One answer and one question back is enough.",
      ),
    ],
    produce: {
      prompt: "Skriv en liten lunsjdialog på fire replikker, to fra deg og to fra en kollega.",
      promptEn: "Write a four-line lunch dialogue, two from you and two from a colleague.",
      model: "Hva gjorde du i helgen? Søndag var jeg på tur. Og du? Det ble en rolig helg. Skal du spise i kantina?",
      modelEn: "What did you do at the weekend? On Sunday I went for a walk. And you? It was a quiet weekend. Are you going to eat in the canteen?",
      checks: ["Spørsmålet er vanlig, ikke personlig.", "Et svar har verbet på plass to.", "Det kommer et spørsmål tilbake."],
    },
  }),
];
