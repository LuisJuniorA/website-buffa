# L3 Miage 2025-2026 Applications Web - Projet Buffa

**Auteur principal du Hub :** Luis-Junior ARAUJO DA COSTA

(Voir le détail des collaborations par jeu ci-dessous)

> **Liens indispensables**
>
> - **LIEN DU SITE HÉBERGÉ (Les 3 jeux) :** [Lien du site](https://website-buffa.vercel.app/frontend/index.html)
> - **VIDÉO YOUTUBE (Pitch & Gameplay) :** [URL_DE_LA_VIDEO]
> - **RAPPORT DE CONCEPTION (PDF - 6 pages max) :** [Lien du pdf](https://github.com/LuisJuniorA/website-buffa/blob/main/Rapport%20de%20conception%20Applicaion%20Web.pdf)
> - **LIEN DES 3 JEUX :**
>     - RSGBE (DOM) : [Lien vers le GitHub de l'émulateur Rust](https://github.com/LuisJuniorA/rsgbe) + [Lien vers le Github du site démo](https://github.com/LuisJuniorA/gb-site)
>     - Hazard Arena (Canvas) : [Lien vers le Github](https://github.com/LuisJuniorA/Hazard-Arena)
>     - The Day I'll Live (Babylon JS) : [Lien vers le Github](https://github.com/LuisJuniorA/The-Day-I-ll-Live-BabylonJS)

## Le Hub Web (IA & Vibe Coding)

Le thème du concours Games On Web de cette année étant l'**IA**, et comme mon jeu principal (_The Day I'll Live_) est axé sur le narratif, j'ai décidé d'intégrer l'IA dans la conception même du site vitrine qui lie nos projets.

À l'ère de l'intelligence artificielle, j'ai décidé de **"full vibe coder"** ce site. J'ai installé Qwen3.6 en local avec Ollama, et utilisé Claude Code avec un fichier `CLAUDE.md` (system prompt strict) pour guider l'assistant dans la génération de l'UI et l'intégration de mes trois jeux. Et honnêtement, c'est pas si simple. J'ai sûrement pas mal de progrès à faire.

## PARTIE PERSONNELLE : LES 3 JEUX

### JEU 1 (DOM) : RSGBE - Relatively Simple Gameboy Emulator

**Équipe :** Luis-Junior (50%) & David MANILIUC (50%)

- **L'histoire et nos choix :** Tout est parti d'une "vanne" où David avait fait un simulateur Game Boy. Je l'ai regardé et je lui ai dit : _"Viens, on fait un vrai émulateur"_. Le défi était immense car je n'avais jamais fait de bas niveau de ma vie. David, qui maîtrisait déjà ces concepts, m'a guidé.
- **Répartition (50/50 parfait) :** On a vraiment travaillé tous les deux sur tout. On a géré ensemble l'architecture en Rust, la gestion de la mémoire, le PPU pour le rendu des pixels et la compilation en WebAssembly pour que ça tourne sur le DOM. On est super fiers de ce qu'on a produit.
- **Difficultés :** La précision chirurgicale des cycles CPU. Faire en sorte que le code Rust communique parfaitement avec l'interface web sans latence a été notre plus gros challenge technique.

### JEU 2 (Canvas) : Hazard Arena

**Équipe :** Luis-Junior (50%) & Tristan TRONCONI (50%)

(Note : Tristan présente l'oral de son côté).

- **L'histoire et nos choix :** C'était l'idée de Tristan. Je n'avais pas d'idée précise, il m'a proposé de faire un groupe et j'ai accepté. Je ne sais pas exactement pourquoi ce choix de jeu, mais c'est un style qu'il apprécie.
- **Répartition :**
    - **Luis-Junior (50%) :** J'ai mis en place toute l'**architecture SOLID** du jeu (classes abstraites, modularité, système de comportements). J'ai aussi géré le système de particules et les mécaniques de gameplay (XP, upgrades).
    - **Tristan (50%) :** Il s'est occupé de toute la partie audio, de l'intégration des sons et de la création des menus.
- **Difficultés :** Le mélange des styles. J'essayais de maintenir une structure SOLID très propre, alors que Tristan avait une approche moins modularisée. Concilier ces deux visions dans le même repo a été complexe, notamment pour harmoniser le code des menus avec le moteur de jeu.

### JEU 3 (BabylonJS) : The Day I'll Live

**Équipe :** Luis-Junior (100% - Solo)

- **L'histoire et mon choix :** Ce projet est né d'une période très difficile. En novembre 2024, ma rupture avec mon ex a été brutale. Il faut savoir que je suis potentiellement alexithymique (pas de diagnostic médical, mais c'est une piste sérieuse). J'avais l'impression de mourir, mais je n'arrivais pas à mettre des mots sur ce que je ressentais.
- **La conception :** J'ai fini par "voir" ce monde dans mon esprit. Un monde délabré qui me permettait de raconter ce que je vivais. Créer un jeu sur les émotions quand on a du mal à les comprendre est un défi, mais c'était une étape pour grandir. J'ai fait les croquis, écrit toute l'histoire, et Games On Web m'a permis de donner vie au Chapitre 1 : "La zone d'angoisse".
- **Difficulté principale :** Le TEMPS. Entre le développement complexe de l'émulateur en Rust et le projet en groupe sur Canvas, le temps m'a manqué pour amener ce projet BabylonJS au niveau visuel que je souhaitais pour cette échéance.

- **État actuel :** Pour cette soutenance, le projet est une Preuve de Concept technique. L'histoire est écrite, les bases de la scène sont là, mais l'ambiance "lourde" et oppressante que je souhaite demande un travail de polish que je n'ai pas pu terminer à temps. Et puis, il manque un boss et encore quelques mécaniques de jeu.

---

### Instructions pour lancer le projet

1. Cloner le repo : `git clone https://github.com/LuisJuniorA/website-buffa.git`
2. Lancer un serveur local (ex: Live Server sur VS Code) à la racine.
3. Le hub `index.html` permet d'accéder aux trois univers.
