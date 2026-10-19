# Norsk hver dag

Statisk øvelsesbok i bokmål, fra A1 til C1, med et eget jobbkurs og lesetekster med opplesning. Forklaringene er på engelsk. Selve øvelsene, eksemplene og grensesnittet er på norsk. Ingenting hentes fra et nettsted mens du øver. Alt ligger i filene.

Appen er laget for daglig øving på 10–15 minutter: en som har tatt norskkurs, men som jobber på engelsk og trenger både grammatikk og et ryddig, formelt skriftspråk.

## Slik bruker du den

1. Åpne appen og logg inn. Passordet er `Tsvitana`. Huk av «Husk meg på denne enheten» på telefonen, så slipper du å skrive det hver dag. Det er en enkel lås på siden, ikke en konto.
2. Første gang får du en nivåtest på omtrent 15–20 minutter, eller du velger nivå selv.
3. **I dag** foreslår én leksjon. Valget legger vekt på nivået ditt og emnene du kan minst.
4. Les den korte forklaringen, gå gjennom ordene, og svar på øvelsene. Du får fasit med én gang. Oppgavene er flervalg eller ord du trykker sammen. Du skal ikke skrive hele setninger selv.
5. **Repetisjon** blander omtrent 70 % fra svake emner med 30 % repetisjon. Ord og oppgaver du bommer på, kommer tilbake senere.
6. **Jobbnorsk** er én leksjon i uka: e-post, status, referat, tall og høflig uenighet.
7. **Lesing**, under Mer, har tekster med ferdig innspilt opplesning. Spill av lydfilen når du vil høre uttalen.
8. **Fremgang** viser rekke, antall leksjoner og mestring per grammatikk-emne.

Fremgangen lagres i nettleseren (`localStorage`). Den følger ikke med til en annen telefon av seg selv.

### Flytte fremgang

Under **Mer → Innstillinger**:

- **Eksporter JSON** laster ned en fil.
- **Importer JSON** leser den samme filen inn igjen.

Ta vare på filen hvis du bytter nettleser eller telefon.

### Nivå

Du kan ta testen på nytt, eller sette nivå manuelt. C2 kan komme ut av testen. Kurset har leksjoner til og med C1. På C2 prioriterer repetisjonen de vanskeligste emnene, og jobbleksjonene holder skriftspråket i gang.

## Kom i gang

Appen skal ligge på rot i repositoriet, slik at GitHub Pages kan servere `index.html` direkte fra `main`.

Lokalt må filene serveres over HTTP. Nettleseren blokkerer ES-moduler hvis du åpner filen rett fra disken.

```bash
python3 -m http.server 8765
```

Åpne deretter `http://127.0.0.1:8765/`.

Sjekk innholdet før du legger inn nye leksjoner:

```bash
node scripts/validate.mjs
```

Skriptet krever ingen installasjon. Det kontrollerer at hver øvelse har et fasitsvar, at ingen id er brukt to ganger, og at hvert grammatikk-emne finnes.

## Legge til en leksjon

Leksjonene ligger i `data/`, én fil per nivå:

| Fil | Innhold |
| --- | --- |
| `data/lessons-a1.js` | A1 |
| `data/lessons-a2.js` | A2 |
| `data/lessons-b1.js` | B1 |
| `data/lessons-b2.js` | B2 |
| `data/lessons-c1.js` | C1 |
| `data/lessons-jobb.js` | Jobbnorsk |

Hjelpefunksjonene `lesson`, `mc`, `fill`, `order`, `fix` og `rewrite` ligger i `data/build.js`. `fill`, `fix` og `rewrite` blir til flervalg når leksjonen bygges, slik at flere riktige formuleringer ikke blir markert feil. En leksjon ser slik ut:

```js
lesson({
  id: "b2-13",
  level: "B2",
  minutes: 12,
  title: "Kort tittel",
  titleEn: "Short English title",
  concepts: ["adverb-sub"],
  maal: "Én setning om hva man skal kunne etterpå.",
  husk: "Én norsk huskeregel.",
  intro: `To or three short paragraphs in English.

Second paragraph with a Norwegian example inside the prose if it helps.`,
  examples: [
    { no: "Hun sier at hun ikke kommer.", en: "She says that she is not coming." },
  ],
  vocab: [
    ["et ord", "a word", "Dette er et ord.", "This is a word.", "noun"],
  ],
  exercises: [
    mc("adverb-sub", "Hvilken leddsetning er riktig?", ["at hun ikke kommer", "at hun kommer ikke"], "at hun ikke kommer", "In a subordinate clause, ikke stands before the verb."),
  ],
})
```

Krav som valideringen håndhever:

- Ny, unik `id`. Bruk prefikset for nivået: `a1-`, `a2-`, `b1-`, `b2-`, `c1-` eller `jobb-`.
- `minutes` mellom 10 og 15.
- 5–10 ord. 8–12 øvelser.
- Hvert emne i `concepts` må finnes i `data/concepts.js`. Ikke finn på nye id-er uten å legge dem inn der.
- Hver øvelse må bruke et emne som også står på leksjonen.
- Fasit må være med. For flervalg må svaret være ett av alternativene. For ordfølge må hvert ord i løsningen finnes blant brikkene.
- Jobb-leksjoner får `track: "jobb"`.

Øvelsestyper som eleven ser:

- `mc` — ferdige svaralternativer
- `order` — sett sammen setningen ved å trykke på ordene som ligger i oppgaven

I kildefilene kan du fortsatt skrive `fill`, `fix` og `rewrite`. De blir lukket automatisk:

- `fill` blir flervalg for ordet som mangler. Legg alternativene i `data/gap-choices.js` med samme id som øvelsen, for eksempel `b2-01-e2`. Ikke legg en annen godkjent form inn som feil svar.
- `fix` og `rewrite` blir flervalg mellom den første godkjente setningen og utgangspunktet.

Lesetekster ligger i `data/readings.js`. Hver tekst har en mp3 i `audio/` med samme navn som id-en. Lydfilene er lest inn med den norske stemmen `nb-NO-PernilleNeural` og ligger i repositoriet, så de virker uten nett. Nye filer kan lages med `node scripts/build-audio.mjs` hvis `edge-tts` er installert.

Ekstra ord som ikke hører til én leksjon, legges i `data/vocab-bank.js`.

Når leksjonen er inne, kjør `node scripts/validate.mjs` på nytt.

## Emner som måles

V2 og inversjon, adverb i leddsetninger, bestemt form og dobbel bestemthet, adjektiv, sin/hans/hennes, preposisjoner, verbaltider, modalverb, passiv, relativsetninger, konjunksjoner og subjunksjoner, sammensetninger, formelt språk, komma, pluss det tidlige stoffet (pronomen, presens, kjønn, spørsmål, tall).

Mestringsprosenten tar hensyn til hvor mange ganger emnet er øvd. Ett tilfeldig riktig svar fyller ikke linjen.
