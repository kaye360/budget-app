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
- fix transaction delete - don't immediately close modal
- implement proper auth
- form validation
- look into storage all transaction data into one prop
- Make universal date converter class
- Make undelete transaction function
- DOM utils - cloneNode wrapper
- Add "Uncategorized" to transaction filters