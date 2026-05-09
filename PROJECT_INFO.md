# Portfolio Project Overview

This is a responsive personal portfolio website designed to showcase professional work, skills, and contact information.

## Tech Stack

- **HTML5 & CSS3**: Core structure and styling.
- **Sass (SCSS)**: Used for modular and maintainable CSS.
- **JavaScript (Vanilla)**: For interactive elements (e.g., menu toggles).
- **Node-sass**: Compiles SCSS to CSS.
- **GH-Pages**: For deployment to GitHub Pages.

## Project Structure

- `dist/`: The "distribution" folder containing the production-ready website.
  - `index.html`: Home page.
  - `about.html`: About me section.
  - `work.html`: Portfolio of projects.
  - `contact.html`: Contact information.
  - `css/`: Compiled CSS files.
  - `img/`: Image assets.
  - `js/main.js`: Main JavaScript logic.
- `scss/`: Source Sass files.
  - `main.scss`: Main stylesheet that imports partials.
  - `_config.scss`: Variables and mixins (colors, fonts, etc.).
  - `_menu.scss`: Styling for the navigation menu and overlay.
  - `_mobile.scss`: Media queries and responsive design overrides.

## Development

### Sass Compilation
To compile the SCSS files into CSS and watch for changes, run:
```bash
npm run sass
```
