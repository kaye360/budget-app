# Budget App
Made with Astro

## File Structure and Naming Conventions of /src
- /components -> Global components
    - /components/_feature -> Feature component folder
    - /components/GlobalComponent -> Sub folder for more complex or grouped components
- /actions -> Backend business logic
    - /actions/_feature.ts -> Feature actions. Keep short and simple
    - /actions/_feature.services.ts -> Feature handler functions
    - /actions/_feature.validator.ts -> Feature validator functions for more complex features
- /layouts -> Global Layouts
- /lib -> External or internal libraries
- /pages -> App routes
- /styles -> Css stylesheets with global classes or tailwind utilities
- /types -> Typescript types
- /utils -> Utility functions
    - /utils/feature.utils.ts -> Feature utility functions

## Conventions

### Component and data naming collisions
When using a component and its data, use the following naming structure to avoid naming collison:
``const entityComponent = document.querySelector()``
``const entityState = JSON.parse( entityComponent.getAttribute('state') )``
For example:
``const transaction = ...`` could be either the element or the data so use ``transactionComponent`` and ``transactionState``

### Getting state from nested elements
Use ``el.closest('transaction-item')`` and get the state from there in nested elements


## Todo
- Make restore transaction function
- when adding transaction, have it default to negative. or have some sort of toggle button
- remove 'accept form' in all actions

## Bugs

## Upcoming Features
- implement proper auth
- data visualization and graphs
    - Budgets -> view spending over months
    - All spending -> view spending over months
- error toast
- search transactions

## Maybe
- DOM utils - cloneNode wrapper
- getClosest wrapper
