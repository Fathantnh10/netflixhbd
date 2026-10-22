# Public Repository Reference Review

**Reviewed:** 2026-10-22

This brief records public references consulted while improving the template. They are design and documentation references; this project does not vendor their code.

## 1. Netflix-style UI and carousels

### `sumudev/netflix-clone`
- URL: https://github.com/sumudev/netflix-clone
- Relevant ideas: independent carousel rows, hover boundaries, profile selection, modal interaction, and responsive viewport handling.
- Difference: React/Vite + an external movie-data API; BirthdayFlix remains plain HTML/CSS/JavaScript and uses user-provided media.

### `hameed-codes/Netflix-Clone`
- URL: https://github.com/hameed-codes/Netflix-Clone
- Relevant ideas: hero overlay, manual horizontal carousel controls, dark styling, FAQ/footer structure, and responsive layout.
- Difference: it is a homepage UI clone, not a personal birthday flow.

### `ahmedashhad484-cell/netflix-clone`
- URL: https://github.com/ahmedashhad484-cell/netflix-clone
- Relevant ideas: multiple independent carousels and a hover/preview popup using data attributes.
- Difference: it focuses on streaming-style content previews, while this template centers on personal photos and birthday messages.

## 2. Birthday website templates

### `felisaans/cute-birthday-website`
- URL: https://github.com/felisaans/cute-birthday-website
- Relevant ideas: clear placeholder assets, easy text/photo swapping, explicit folder documentation, and friendly customization instructions.

### `haneef3/birthday-greeting-website`
- URL: https://github.com/haneef3/birthday-greeting-website
- Relevant ideas: describing the media files used, showing how to replace photos and video, and warning about local browser limitations.

## 3. Repository presentation guidance

### GitHub Docs — repository customization and README
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- Relevant ideas: explain what the project does, document getting started, add relevant Topics, configure a social preview, and choose an explicit license when granting reuse permissions.

## Implementation decisions in BirthdayFlix

- Keep the project framework-free so it remains easy to download and edit.
- Put customizable names, copy, demo users, PIN, and gallery headings into `customization.js`.
- Provide generic placeholder assets so all 63 card slots render before personal photos are added.
- Keep three independent manual carousels and a document-level hover preview; personal images are never bundled.
- Make the demo authentication limitation explicit because browser-side credentials are not secure.

No third-party repository code was copied wholesale into this project. Respect each upstream project's license and terms if you independently reuse code or assets.
