import { closeExercise, fill, fix, mc, order } from "./build.js";

const item = (id, exercise, weight = 1, band = "B1") => ({ ...closeExercise({ ...exercise, id }), weight, band });

/** About 15–20 minutes. Discriminates A2 through C1; C2 is a very high score. */
export const placement = {
  minutes: 18,
  title: "Nivåtest",
  titleEn: "Placement test",
  intro:
    "The questions get harder, and the difficult ones count for more. The topic is not shown above the question. The result is a suggestion. You can retake the test or choose a level yourself. Explanations are in English at the end.",
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
        "Budsjett is neuter, so ny becomes nytt. Adjectives in -ig, such as viktig, do not add -t, but that is a different word.",
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
        "Comma after a fronted subordinate clause. A subordinate clause after the main clause normally has no comma, and an at-clause used as the object has none either. No comma when the subject is shared, and no comma before og in a list.",
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
    item(
      "pl-21",
      mc(
        "punctuation",
        "Hvilken setning følger hovedregelen for komma?",
        [
          "Jeg blir fordi rapporten ikke er klar.",
          "Jeg ser, at avviket er lite.",
          "Jeg ser at tallene stemmer, og at avviket er lite.",
          "Jeg skriver, og sender notatet.",
        ],
        "Jeg blir fordi rapporten ikke er klar.",
        "A subordinate clause after the main clause normally has no comma. No comma before an at-object, no comma between two at-clauses joined by og, and no comma when the subject is shared.",
      ),
    ),
    item(
      "pl-22",
      mc(
        "particles",
        "Hvilken setning bruker partikkelverbet riktig?",
        [
          "Jeg legger fram tallene i møtet.",
          "Jeg legger tallene fram i møtet er den eneste muligheten.",
          "Jeg framlegger tallene fram.",
          "Jeg legger i møtet fram tallene først.",
        ],
        "Jeg legger fram tallene i møtet.",
        "Legge fram means to present. The particle fram belongs with the verb. The second option claims to be the only possible order, which is too strong, and the others stack the particle twice or break the phrase.",
      ),
    ),
    item(
      "pl-23",
      mc(
        "hypothetical",
        "Hvilken setning er en hypotetisk fortid?",
        [
          "Hvis vi hadde visst det, hadde vi ventet.",
          "Hvis vi vet det, venter vi.",
          "Hvis vi hadde visst det, venter vi i morgen.",
          "Hvis vi visste det, har vi ventet.",
        ],
        "Hvis vi hadde visst det, hadde vi ventet.",
        "A counterfactual past uses hadde plus the participle in the hvis-clause, and hadde plus the participle in the main clause.",
      ),
    ),
    item(
      "pl-24",
      mc(
        "indirect",
        "Hvilken indirekte spørresetning er riktig?",
        [
          "Hun spurte om vi hadde sendt rapporten.",
          "Hun spurte om hadde vi sendt rapporten.",
          "Hun spurte at vi hadde sendt rapporten?",
          "Hun spurte sendte vi rapporten.",
        ],
        "Hun spurte om vi hadde sendt rapporten.",
        "An indirect question does not invert. Om introduces a yes/no question in reported speech, and the subject stays before the verb.",
      ),
    ),
  ],
};

const placementBand = {
  "pl-01": ["A2", 1],
  "pl-02": ["A2", 1],
  "pl-03": ["B1", 1],
  "pl-04": ["A2", 1],
  "pl-05": ["B1", 1],
  "pl-06": ["B1", 2],
  "pl-07": ["B1", 2],
  "pl-08": ["B2", 2],
  "pl-09": ["B2", 2],
  "pl-10": ["B1", 2],
  "pl-11": ["B2", 2],
  "pl-12": ["B2", 2],
  "pl-13": ["B2", 2],
  "pl-14": ["B1", 1],
  "pl-15": ["B2", 2],
  "pl-16": ["B2", 2],
  "pl-17": ["C1", 3],
  "pl-18": ["B2", 2],
  "pl-19": ["B2", 2],
  "pl-20": ["B2", 2],
  "pl-21": ["C1", 3],
  "pl-22": ["C1", 3],
  "pl-23": ["C1", 3],
  "pl-24": ["C1", 3],
};

for (const entry of placement.items) {
  const [band, weight] = placementBand[entry.id] || ["B1", 1];
  entry.band = band;
  entry.weight = weight;
}
