# 📊 RAPORT ANALITYCZNY: PROJEKT ORIENTAL & ROZSZERZENIA

## 1. THE SYNDICATE (Klasyczne Hashish Empire)
**Archetyp:** *High Risk / High Reward (Adrenaline Clicker)*
**Profil:** Speed: 9 | Stability: 3 | Efficiency: 6 | Harmony: 1

### Analiza Drzewa Rozwoju
*   **Produkcja (The Street):** Skupia się na fizycznej, "brudnej" logistyce.
    *   *Krzywa:* Bardzo stroma na początku (`The Runner` jest tani), ale szybko napotyka "ściany kosztowe" przy przejściu na skalę międzynarodową (`Port Access`).
*   **Dystrybucja (The Shadow):** Opiera się na unikaniu wykrycia (`Burner Phones`, `Darknet`).
    *   *Mechanika:* Mnożniki są wysokie, ale wymagają ciągłego inwestowania w `Influence` (łapówki), aby kontrować niską *Stabilność* (3/10).
*   **Wpływ (Corruption):** Niezbędny do przetrwania. Bez `Police Bribes`, gracz z tak niską stabilnością będzie często tracil zasoby w eventach losowych.

### Prognoza Grywalności (Flow)
*   **Early Game (0-15 min):** **Eksplozywny.** Gracz czuje się jak król ulicy. Szybkie kliki, tanie ulepszenia. Bardzo wysoka retencja początkowa dzięki parametrowi *Speed: 9*.
*   **Mid Game (15 min - 2h):** **Stresujący.** Gracz zaczyna zarabiać dużo, ale ryzyko "Nalotu" (Police Raid) jest realne. Wymaga aktywnej gry i zarządzania ryzykiem. To moment, gdzie gracze typu "Casual" mogą odpaść, a gracze "Hardcore" się wciągną.
*   **Late Game (Prestige+):** **Dominacja.** Po odblokowaniu `The Illumination`, gra zmienia się w zarządzanie globalnym kartelem. Satysfakcja płynie z poczucia władzy ("Jestem nietykalny").

---

## 2. NEXUS CORP (Technokracja)
**Archetyp:** *Exponential Growth / Engine Builder*
**Profil:** Speed: 5 | Stability: 8 | Efficiency: 10 | Harmony: 2

### Analiza Drzewa Rozwoju
*   **Produkcja (The Code):** Skalowanie wertykalne.
    *   *Krzywa:* Liniowa na początku (`Script Kiddie`), ale wykładnicza w późniejszej fazie (`Quantum Core`). To klasyczny "Snowball effect".
*   **Dystrybucja (The Network):** Czysta matematyka. `The Algorithm` i `Fiber Optics` to mnożniki, które premiują długofalowe planowanie, a nie szybkie klikanie.
*   **Wpływ (Lobbying):** Służy do deregulacji. Zamiast unikać prawa (jak Syndykat), Nexus je zmienia. Wysoka *Efektywność* (10/10) oznacza, że każda zainwestowana jednostka waluty (CR) zwraca się szybciej niż w innych imperiach.

### Prognoza Grywalności (Flow)
*   **Early Game:** **Powolny.** "Garażowy startup" wymaga cierpliwości. Może wydawać się nudniejszy niż Syndykat przez pierwsze 5 minut (*Speed: 5*).
*   **Mid Game:** **Satysfakcjonujący.** Gdy wchodzą ulepszenia `Cloud Cluster`, produkcja zaczyna rosnąć sama. Gracz czuje się mądry ("Zautomatyzowałem to").
*   **Late Game:** **Liczby Astronomiczne.** Dzięki *Efficiency: 10*, Nexus osiągnie najwyższe wartości liczbowe (biliony/tryliony) najszybciej. Idealne dla fanów gier typu *Cookie Clicker* lub *Factorio*, którzy lubią optymalizację.

---

## 3. VERDANT FLOW (Solarpunk)
**Archetyp:** *Cozy Idle / Zen Growth*
**Profil:** Speed: 3 | Stability: 10 | Efficiency: 5 | Harmony: 10

### Analiza Drzewa Rozwoju
*   **Produkcja (Nature):** Organiczny wzrost.
    *   *Krzywa:* Płaska, ale stabilna. `Wild Seeds` i `Bee Hive` dają małe, ale pewne przyrosty. Brak gwałtownych skoków.
*   **Dystrybucja (Mycelium):** Sieć grzybni (`Mycelium Network`) działa jak pasywny bonus, który rośnie w czasie.
*   **Wpływ (Harmony):** Z *Harmony: 10* i *Stability: 10*, to imperium jest praktycznie odporne na negatywne eventy. "Police Raid" tutaj nie istnieje – zastępują go pozytywne eventy społecznościowe.

### Prognoza Grywalności (Flow)
*   **Early Game:** **Relaksujący.** Bardzo wolny start (*Speed: 3*). Gra nie wymaga szybkiego klikania, raczej "doglądania ogródka".
*   **Mid Game:** **Bezpieczny.** Gracz może zostawić grę w tle na 5 godzin i nie martwić się, że coś straci. To idealne "Second Monitor Game".
*   **Late Game:** **Utopijny.** Celem nie jest dominacja (jak w Syndykacie) czy liczby (jak w Nexusie), ale osiągnięcie "Nirvany" (Level 33). Satysfakcja płynie z kompletowania osiągnięć i estetyki.

---

## 📋 Podsumowanie Porównawcze

| Cecha | The Syndicate 👁️ | Nexus Corp 💠 | Verdant Flow 🌿 |
| :--- | :--- | :--- | :--- |
| **Główna Waluta** | Hash Units (HU) | Credits (CR) | Life Force (LF) |
| **Styl Gry** | Aktywny / Ryzykowny | Strategiczny / Skalujący | Pasywny / Relaksacyjny |
| **Krzywa Dopaminy** | Skoki i spadki (Rollercoaster) | Wykładnicza (Hokejowa) | Liniowa / Stała |
| **Grupa Docelowa** | Gracze rywalizacyjni, fani akcji | Inżynierowie, fani optymalizacji | Gracze "Cozy", fani estetyki |
| **Zagrożenia** | Policja, Konkurencja, Więzienie | Krach rynkowy, Koszty serwerów | Zanieczyszczenie (minimalne) |

### Rekomendacja Deweloperska
Obecny silnik (`game.js`) obsługuje te różnice głównie poprzez *Flavor Text* i parametry startowe. Aby pogłębić różnice w rozgrywce (Gameplay Loop), zalecam w przyszłych patchach:

1.  **Dla Syndykatu:** Dodać mechanikę "Heat" (Poziom poszukiwania), który rośnie przy klikaniu i spada z czasem.
2.  **Dla Nexusa:** Dodać mechanikę "Energy Cost" (Utrzymanie serwerów kosztuje walutę co sekundę).
3.  **Dla Verdant:** Dodać bonus za "Nieklikanie" (Synergia z naturą, która nie lubi pośpiechu).