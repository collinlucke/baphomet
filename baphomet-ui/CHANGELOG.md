# Changelog

## [0.1.8] - 2024-12-11

### Added

- Created `AuthenticationContext`
- Added `useLayoutEffect()` in a couple files so loading data doesn't look so choppy
- Created `useIsAuthenticated()` hook

### Changed

- Made custom types changes based on authentication context addition
- Switched out Iconoir for Hugeicons
- flushed out `<ErrorBoundary/>` a little more

### Removed

- Removed AuthCheck from `<LoginPage>`

### Fixed

- ## N/A

<br/>

## [0.1.7] - 2024-23-09

### Added

- Error handling
- Created context for showing the heading

### Changed

- Switch back to `createBrowserRouter` from `createHashRouter`

### Removed

- ## N/A

### Fixed

- ## N/A

<br/>

## [0.1.6] - 2024-23-09

### Added

- ## N/A

### Changed

- Updated some packages

### Removed

- ## N/A

### Fixed

- Fixed weird `<ButtonGroup>` (for now)

<br/>

## [0.1.5] - 2024-23-09

### Added

- Prepped for using `BaphThemeProvider`
- Implemented `deleteMovie` functionality

### Changed

- Some small theming and typing changes

### Removed

- Deleted `main-w-ts.tsx`

### Fixed

-

<br/>

## [0.1.4] - 2024-18-09

### Added

- ## N/A

### Changed

- Reorganized files and directories
- Flattened route structure

### Removed

- ## N/A

### Fixed

- Made it so when a user enter something like `collinlucke.com/create`, it will redirect to
  `collinlucke.com/#/create/`
- Fixed some routing issues when navigating away from the `LoginPage`

<br/>

## [0.1.3] - 2024-17-09

### Added

- Implemented `Modal` from `PhantomArtist`

### Changed

- ## N/A

### Removed

- Removed unused `withAuth` method.

### Fixed

- Routing bug that was letting the `WelcomePage` show even though `beenHereBefore` was already `yup`
- Some small styling changes

<br/>

## [0.1.2] - 2024-17-09

### Added

- Added `Welcome` page
- Created Theme Provider that can pass styles to PhantomArtist
- Add mysterious `Arena` page

### Changed

- Updated routing/navigation to accommodate the new `Welcome` page

### Removed

- Removed unused `AddMovie` component

### Fixed

- #### N/A

<br/>

## [0.1.1] - 2024-10-09

### Added

- #### N/A

### Changed

- Updated `cicd.yml` to store `GIT_REGISTRY_TOKEN` from `secrets`

### Removed

- #### N/A

### Fixed

- #### N/A

<br/>

## [0.1.0] - 2024-10-09

### Added

- CHANGELOG.md
- Emotion css
- baphTheme.ts

### Changed

- Updated the README
- Changed `set-dependencies.ts` to only worry about pulling in the published version of
  PhantomArtist in prod
- Updated `vite.config.mjs` to use Emotion css
- Switched from `createBrowserRouter` to `createHashRouter` due to routing breaks
- Made `Heading.tsx` use PhantomArtist's `<Heading>` instead of `<HeadingMain>` and made the
  appropriate updates to it works.
  - `styleX.css` to `index.css`

### Removed

- Stylex - Juice wasn't worth the squeeze

### Fixed

- #### N/A
