# Portfolio Overview — Krishna Taneja

Personal portfolio website for showcasing software, AI/ML, and hardware engineering projects to companies for internships and engineering roles.

## Tech Stack

- **HTML5 & CSS3**: Clean markup and responsive layouts.
- **Dart Sass**: SCSS styling with dark engineering theme and teal accents.
- **JavaScript (Vanilla)**: Navigation drawer, project modals, clipboard copy.
- **Live-Server**: Development server with live reload.

## Project Structure

- `dist/`: Ready-to-serve website files.
  - `index.html`: Main portfolio page with all sections.
  - `work.html`: Dedicated projects showcase.
  - `about.html`: About me, background, and education.
  - `contact.html`: Contact links.
  - `css/main.css`: Compiled CSS stylesheet.
  - `js/main.js`: Main JavaScript and modal content.
- `scss/`: Source Sass files.
  - `main.scss`: Main style file.
  - `_config.scss`: Colors, typography, and mixins.
  - `_menu.scss`: Navigation and header styles.
  - `_mobile.scss`: Mobile responsiveness.

## Commands

- Start development server with Sass watch: `npm start`
- Compile Sass once: `npm run build:sass`
