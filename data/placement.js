import { closeExercise, fill, fix, mc, order } from "./build.js";

const item = (id, exercise) => closeExercise({ ...exercise, id });

/** About 15–20 minutes. Discriminates A2 through C1; C2 is a very high score. */
export const placement = {
  minutes: 18,
  title: "Nivåtest",
  titleEn: "Placement test",
  intro:
    "Twenty questions, without hints along the way. The result is a suggestion. You can retake the test or choose a level yourself. Explanations are in English at the end.",
  items: [
    item(
      "pl-01",
      mc(
        "v2",
        "Hvilken helsetning er riktig?",
        ["I dag sender jeg rapporten.", "I dag jeg sender rapporten.", "I dag jeg rapporten sender.", "Sender jeg i dag rapporten til."],
        "I dag sender jeg rapporten.",
        "The time phrase is first, so the finite verb comes immediately after it.",
      ),
    ),
    item(
      "pl-02",
      mc(
        "adjectives",
        "Velg riktig frase.",
        ["et nytt budsjett", "et ny budsjett", "et nye budsjett", "en nytt budsjett"],
        "et nytt budsjett",
        "Budsjett is neuter, so ny becomes nytt. Viktig would not add -t, but the noun in that option is møte, and the option is only a distractor.",
      ),
    ),
    item(
      "pl-03",
      mc(
        "definite",
        "Hvilken frase har dobbel bestemthet?",
        ["det nye budsjettet", "det nye budsjett", "nye budsjettet", "et nytt budsjettet"],
        "det nye budsjettet",
        "Determiner det, adjective in -e, and the definite noun ending are all required.",
      ),
    ),
    item(
      "pl-04",
      mc(
        "tenses",
        "Hvilken setning passer med «i går»?",
        ["I går sendte jeg rapporten.", "I går har jeg sendt rapporten.", "I går jeg sendte rapporten.", "I går har jeg sendte rapporten."],
        "I går sendte jeg rapporten.",
        "A finished time takes preteritum, and the verb stays in second place.",
      ),
    ),
    item(
      "pl-05",
      mc(
        "possessives",
        "Anna leste sin egen rapport. Hva er riktig?",
        ["Anna leste rapporten sin.", "Anna leste rapporten hennes.", "Anna leste rapporten hans.", "Anna leste sin rapporten."],
        "Anna leste rapporten sin.",
        "Sin points back to the subject Anna. Hennes would be another woman.",
      ),
    ),
    item(
      "pl-06",
      mc(
        "prepositions",
        "Hvilken setning er riktig?",
        ["Jeg skriver en rapport om kostnadene.", "Jeg skriver en rapport på kostnadene.", "Jeg har ansvar om budsjettet.", "Jeg er uenig med forslaget."],
        "Jeg skriver en rapport om kostnadene.",
        "A report about a topic uses om. Ansvar takes for, and uenig i is used with a matter.",
      ),
    ),
    item(
      "pl-07",
      order(
        "conjunctions",
        "Bygg setningen.",
        ["Fordi", "tallene", "manglet", "utsatte", "vi", "møtet"],
        "The subordinate clause is the first element, so the main clause inverts.",
      ),
    ),
    item(
      "pl-08",
      mc(
        "adverb-sub",
        "Hvilken leddsetning er riktig?",
        ["at hun ikke har sendt rapporten", "at hun har ikke sendt rapporten", "at har hun ikke sendt rapporten", "at hun har sendt ikke rapporten"],
        "at hun ikke har sendt rapporten",
        "In a subordinate clause, ikke stands before the finite verb.",
      ),
    ),
    item(
      "pl-09",
      mc(
        "relatives",
        "Hvilken setning er riktig når «som» er subjekt?",
        ["Rapporten som kom i går, er lest.", "Rapporten kom i går, er lest.", "Rapporten der kom i går, er lest.", "Rapporten, kom i går er lest."],
        "Rapporten som kom i går, er lest.",
        "Subject-som cannot be omitted. Der is for place, not for a report that arrived.",
      ),
    ),
    item(
      "pl-10",
      mc(
        "passive",
        "Én hendelse i går. Hva er riktig?",
        ["Rapporten ble sendt i går.", "Rapporten sendes i går.", "Rapporten ble sendte i går.", "Rapporten er sendes i går."],
        "Rapporten ble sendt i går.",
        "A past event uses ble plus the participle, not the s-passive and not the preterite sendte.",
      ),
    ),
    item(
      "pl-11",
      mc(
        "passive",
        "En fast rutine. Hva er riktig?",
        ["Rapporten sendes hver fredag.", "Rapporten ble sendt hver fredag i morgen.", "Rapporten har sendes hver fredag.", "Rapporten sendte hver fredag."],
        "Rapporten sendes hver fredag.",
        "Habits and schedules take the present s-passive.",
      ),
    ),
    item(
      "pl-12",
      mc(
        "modals",
        "Hva betyr «Jeg burde ha varslet tidligere»?",
        ["Det var riktig å varsle, men jeg gjorde det ikke.", "Jeg varslet tidligere.", "Jeg må ha varslet.", "Jeg pleier å varsle."],
        "Det var riktig å varsle, men jeg gjorde det ikke.",
        "Burde ha plus the participle is a missed obligation. Må ha would be a conclusion that it happened.",
      ),
    ),
    item(
      "pl-13",
      mc(
        "punctuation",
        "Hvilken setning har riktig komma?",
        ["Når tallene er klare, sender jeg dem.", "Jeg ser, at avviket er lite.", "Jeg skriver, og sender notatet.", "Kostnader, inntekter, og avvik."],
        "Når tallene er klare, sender jeg dem.",
        "Comma after a fronted subordinate clause. A subordinate clause after the main clause normally takes a comma, but an at-clause used as the object does not. None when the subject is shared, and no comma before og in a list.",
      ),
    ),
    item(
      "pl-14",
      mc(
        "compounds",
        "Hvilken skrivemåte er riktig?",
        ["budsjettavvik", "budsjett avvik", "budsjett-avvik", "budsjetts avvik"],
        "budsjettavvik",
        "The compound is one word, without a space or a hyphen.",
      ),
    ),
    item(
      "pl-15",
      mc(
        "register",
        "Hvilken e-poståpning passer til lederen din?",
        ["Hei Kari. Vedlagt finner du statusrapporten.", "Kjære fru Kari. De finner vedlagt rapporten.", "Hei asap, fikser du det?", "Ærede ledelse."],
        "Hei Kari. Vedlagt finner du statusrapporten.",
        "Hei and a first name is respectful in Norwegian working life. Vedlagt finner du introduces the file.",
      ),
    ),
    item(
      "pl-16",
      fill(
        "prepositions",
        "Fyll inn. Du er uenig i selve saken.",
        "Jeg er uenig ___ vurderingen.",
        ["i"],
        "A matter takes i. Med is used with a person.",
      ),
    ),
    item(
      "pl-17",
      mc(
        "possessives",
        "Hvilken setning er tvetydig?",
        ["Per ba Anna sende rapporten sin.", "Anna sendte rapporten sin.", "Jeg sendte rapporten min.", "Per lovet å sende rapporten sin."],
        "Per ba Anna sende rapporten sin.",
        "Both Per and Anna can be read as the owner. The other sentences have one clear subject.",
      ),
    ),
    item(
      "pl-18",
      mc(
        "passive",
        "Hvilken setning beskriver tilstanden nå?",
        ["Tallene er avstemt.", "Tallene ble avstemt i går.", "Tallene avstemmes i går.", "Tallene har avstemmes."],
        "Tallene er avstemt.",
        "Er plus the participle is a resulting state. Ble tells the story of a past event.",
      ),
    ),
    item(
      "pl-19",
      mc(
        "tenses",
        "Hvilken setning er riktig?",
        ["Jeg har jobbet i Avinor siden 2016.", "Jeg jobber i Avinor siden 2016.", "I fjor har kostnaden økt.", "I går har jeg sendt rapporten."],
        "Jeg har jobbet i Avinor siden 2016.",
        "Siden, when the situation still holds, takes perfektum. Closed times such as i fjor and i går take preteritum.",
      ),
    ),
    item(
      "pl-20",
      fix(
        "v2",
        "Skriv setningen riktig.",
        "Imidlertid kostnaden økte i september.",
        ["Imidlertid økte kostnaden i september"],
        "Imidlertid in the first slot is followed by the finite verb.",
      ),
    ),
  ],
};
