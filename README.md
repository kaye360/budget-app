# Budget App
Made with Astro

## File Structure and Naming Conventions of /src
- /components -> Global components
    - /components/_feature -> Feature component folder
    - /components/GlobalComponent -> Sub folder for more complex or grouped components
- /services -> Backend API business logic
    - /services/feature.services.ts -> Feature handler functions
- /layouts -> Global Layouts
- /lib -> External or internal libraries
- /pages -> App routes
- /styles -> Css stylesheets with global classes or tailwind utilities
- /types -> Typescript types
- /utils -> Utility functions
    - /utils/feature.utils.ts -> Feature utility functions


## Todo
- Make undelete transaction function
- DOM utils - cloneNode wrapper
- when adding transaction, have it default to negative. or have some sort of toggle button
- remove 'accept form' in all actions

## Bugs
- More transactions button doesn't work - still on api

## Upcoming Features
- implement proper auth
- data visualization and graphs
    - Budgets -> view spending over months
- error toast
