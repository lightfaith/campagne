# Campagne
Campagne je nástroj k návrhu otevřené kampaně pro RPG hry typu DnD. Umožňuje specifikaci důležitých informací a jejich provázanost.

## Kategorie
### Země
Tady patří kontinenty (Středozem) nebo menší územní celky (Gondor, Mordor). 
Lze specifikovat:
- politický status (království),
- geografie (na západě),
- prostředí (hory, doly, černý les),
- historie.
### Lokace
Tady patří jednotlivá města a vesnice, případně menší celky vyžadující podrobnější popis (chudinská čtvrť, hospoda) a také dungeony.
Lze specifikovat typ.
### Frakce
Tady patří skupiny zahrnující osoby, které mají něco společného, typicky původ (rod Lannisterů) nebo konkrétní zájem (Nazgúlové).
Lze specifikovat typ.
### Osoby
Tady patří všechna NPC a bossové.
Lze specifikovat:
- osobní informace (démon z dávného světa),
- vzhled (dlouhé vlasy),
- osobnost (krátký rozum),
- schopnosti (vaření, teleport).
### Úkoly
Tady patří úkoly a podúkoly.
Lze specifikovat:
- stav (DONE, TODO, UNAVAILABLE, ...),
- odměna (věčná sláva, titul "Devítiprsťák"),
- detail (zanést prsten do Mordoru).
### Dialogy
Tady patří předem napsané narativy pro PJe ("Svět se změnil. Cítím to ve vodě.") nebo epické proslovy NPC v důležitých situacích ("You shall not pass!").
### Podmínky
Tady patří definice podmínek, které mohou mít vliv na úpravu úkolu (Hlupák Bralovská probudil celou Morii -> Odrazit útok skřetů), povolení dialogu (Gandalf neuspěl na obratnost -> "Fly, you fools!") nebo zásadně změní získané zkušenosti.
### Informace
Tady patří klíčové informace, ke kterým se hráči musí dopracovat.
Lze specifikovat pravdivost.
### Hráči
Tady patří informace o hráčích.
Lze specifikovat úplně všechno.
### Sezení
Tady patří informace o konkrétním sezení.
Lze specifikovat:
- průběh (kam se až stihlo dojít),
- přidělené zkušenosti.

### Další specifikace
U všech záznamů lze navíc specifikovat:
- barva (pro snadnější orientaci v přehledech, zejména úkolů, podmínek a osob),
- poznámka,
- 1 obrázek (ukládá se ručně do složky images/ pod názvem <kód>.png, např. Z1.png).

## Provázanost
Jednotlivé záznamy lze vzájemně provázat. To umožňuje zobrazení vazeb v detailu a také možnost rychlého prokliku na související záznam. K vazbám lze připojit krátký komentář, který se u vazby zobrazí (otec). Pro rychlejší zadávání lze vztah hned popsat oboustranně, a to zápisem v podobě otec\-\-syn. Po potvrzení změn se tento zápis automaticky rozdělí na oba směry.

## Ukládání
Data (kromě obrázků) se při změnách automaticky ukládají do LocalStorage prohlížeče. Při nové návštěvě stránky se tedy zobrazí aktuální verze. Spolehlivější je ovšem změny ukládat ručně kliknutím na ikonu diskety. Data jsou tak (bez obrázků) uložena ve formátu JSON v umístění zvoleném uživatelem.

