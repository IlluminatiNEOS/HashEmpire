# Metodyka "Matrix-Engine"

Aby przekształcić projekt w uniwersalny silnik symulacyjny (Empire Engine), który adaptuje się do psychometrii gracza (zgodnie z ProfileCoder), oddzielamy **Logikę (Engine)** od **Treści (Content)** i **Parametrów (Profile)**.

### Metodyka: Trójwarstwowa Architektura Adaptacyjna

1.  **Warstwa Danych (The Multidimensional Sheet):**
    Definiuje świat gry w formacie JSON/CSV (plik `empires.js`). Nie zawiera kodu, tylko strukturę:
    *   *Wymiar Semantyczny:* Słownik pojęć (np. "Hash" -> "Kredyty", "Dealer" -> "Junior Dev").
    *   *Wymiar Ekonomiczny:* Koszty bazowe, przyrosty (krzywe matematyczne).
    *   *Wymiar Narracyjny:* Opisy, flavor text, nazwy tierów.

2.  **Warstwa Profilowania (The ProfileCoder Adapter):**
    Algorytm, który bierze "surowy" arkusz danych i modyfikuje go w czasie rzeczywistym na podstawie specyfikacji `profilecoder-3.3.md`.
    *   *Dopamine Index:* Jeśli gracz potrzebuje szybkiej gratyfikacji -> Zwiększamy `clickPower`, skracamy animacje, częstsze achievementy (Bronze).
    *   *Cognitive Load:* Jeśli gracz woli "Slow Burn" -> Mniej powiadomień, trudniejsza ekonomia, rzadsze ale potężniejsze upgrady.
    *   *Cultural Context:* Podmiana walut, slangów i grafik (poprzez CSS classes).

3.  **Warstwa Wykonawcza (The Engine - `game.js`):**
    Kod wyczyszczony z "hardcoded" wartości. Zamiast wpisywać `this.upgrades = [...]`, silnik pyta: `this.config.getUpgrades()`.

### Implementacja w Kodzie

W pliku `game.js` zaimplementowano:
*   Obsługę zewnętrznej konfiguracji (`config`) w konstruktorze.
*   Metodę `applyProfileMetrics`, która zmienia matematykę gry (np. `comboTimeout`, `globalMultiplier`) w zależności od psychometrii.

### Jak to działa w praktyce?
1.  **ProfileCoder (JSON):** Definiuje, kim jest gracz (np. "Korporacyjny" - niska tolerancja ryzyka).
2.  **Adapter:** Silnik widzi niską tolerancję ryzyka -> Zmniejsza zmienność (volatility) w eventach losowych.
3.  **Config (JSON):** Podmienia słowa i grafiki, pozwalając na zmianę tematyki gry bez zmiany kodu.