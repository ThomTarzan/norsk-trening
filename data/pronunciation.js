/** Minimal pairs for listening. Audio is neural bokmål; tonelag is marked as unreliable. */
export const pronunciation = {
  intro:
    "Listen and choose the word you heard. The voice is the same synthetic bokmål as the rest of the app. Vowel length, y/ø/u, æ/e, kj/skj and silent letters are worth trusting. Tone pairs (tonelag) are included so you know the contrast, but this voice does not distinguish them reliably.",
  ukrainian:
    "Typical gaps for Ukrainian speakers: Norwegian y and ø are front rounded vowels, unlike и/і. æ is lower than e. kj and skj both collapse toward ш if you do not separate them. Many final consonants are silent (god, hjem, -ig). Compound stress sits on the first part: KOSTNADSsted, not kostnadsSTED.",
  groups: [
    {
      id: "vokal",
      title: "Lang og kort vokal",
      items: [
        { id: "p-tak", word: "tak", options: ["tak", "takk"], note: "Long a in tak (roof). Short a plus kk in takk (thanks)." },
        { id: "p-takk", word: "takk", options: ["tak", "takk"], note: "takk has a short vowel and a long consonant." },
        { id: "p-vise", word: "vise", options: ["vise", "visse"], note: "vise has a long i. visse has a short i." },
        { id: "p-hat", word: "hat", options: ["hat", "hatt"], note: "hat (hate) is long. hatt (hat) is short." },
      ],
    },
    {
      id: "rund",
      title: "y, ø og u",
      items: [
        { id: "p-lys", word: "lys", options: ["lys", "løs", "lus"], note: "y is a front rounded vowel. Say i and round the lips." },
        { id: "p-los", word: "løs", options: ["lys", "løs", "lus"], note: "ø is like e with rounded lips." },
        { id: "p-full", word: "full", options: ["full", "føl", "fyll"], note: "u is a back rounded vowel, not y." },
        { id: "p-syl", word: "syl", options: ["syl", "sol", "sel"], note: "syl (awl) uses y. sol uses o." },
      ],
    },
    {
      id: "ae",
      title: "æ og e",
      items: [
        { id: "p-vaer", word: "vær", options: ["vær", "ver"], note: "æ is more open than e." },
        { id: "p-ler", word: "lære", options: ["lære", "lere"], note: "lære has æ. lere is not the verb." },
        { id: "p-hest", word: "hest", options: ["hest", "hæst"], note: "hest has e. hæst is not the word." },
      ],
    },
    {
      id: "kj",
      title: "kj og skj",
      items: [
        { id: "p-kino", word: "kino", options: ["kino", "skino"], note: "k before i is the kj-sound, not skj." },
        { id: "p-skj", word: "ski", options: ["ski", "ki"], note: "sk before i is the skj-sound." },
        { id: "p-kjole", word: "kjole", options: ["kjole", "skole"], note: "kjole starts with kj. skole starts with sk." },
      ],
    },
    {
      id: "stum",
      title: "Stumme bokstaver",
      items: [
        { id: "p-god", word: "god", options: ["god", "gått"], note: "The d in god is silent. It sounds like go." },
        { id: "p-hjem", word: "hjem", options: ["hjem", "jem"], note: "The h in hjem is silent." },
        { id: "p-gjerne", word: "gjerne", options: ["gjerne", "jerne"], note: "The g in gjerne is silent." },
        { id: "p-deilig", word: "deilig", options: ["deilig", "deili"], note: "You hear deili. The spelling keeps a silent g: deilig." },
      ],
    },
    {
      id: "trykk",
      title: "Trykk i sammensatte ord",
      items: [
        { id: "p-kost", word: "kostnadssted", options: ["KOST-nads-sted", "kost-nads-STED"], note: "Stress the first part: KOSTNADSsted." },
        { id: "p-lisens", word: "lisenskostnad", options: ["LI-sens-kostnad", "lisens-kost-NAD"], note: "Stress the first part: LISENSkostnad." },
      ],
    },
    {
      id: "tone",
      title: "Tonelag",
      caution: "Den syntetiske stemmen skiller ikke tonelag pålitelig. Bruk paret til å vite at forskjellen finnes, ikke som fasit for melodien.",
      items: [
        { id: "p-bonder", word: "bønder", options: ["bønder", "bønner"], note: "bønder (farmers) and bønner (beans or prayers) differ in tone. Do not trust this recording for the melody." },
        { id: "p-anden", word: "anden", options: ["anden", "ånden"], note: "anden (the duck) and ånden (the spirit) are a classic pair. The synthetic voice is a weak guide here." },
      ],
    },
  ],
};

export function pronunciationItems() {
  return pronunciation.groups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title, caution: group.caution || "" })));
}
