# Budget App
Made with Astro

## File Structure and Naming Conventions of /src
- /components -> Global components
    - /components/_feature -> Feature component folder
    - /components/GlobalComponent -> Sub folder for more complex or grouped components
- /layouts -> Global Layouts
- /lib -> External or internal libraries
- /pages -> App routes
- /services -> API helper functions
    - /services/feature.services.ts -> Feature services
- /styles -> Css stylesheets with global classes or tailwind utilities
- /types -> Typescript types
- /utils -> Utility functions
    - /utils/feature.utils.ts -> Feature utility functions


## Todo
- fix transaction delete - don't immediately close modal
- implement proper auth
- form validation
- look into storage all transaction data into one prop