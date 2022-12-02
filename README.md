# Book Manager

This is a sample book management app I wrote to learn how to make server state and client state work together.
The app mostly works via RTK Query (server state management, with Firestore as the source of truth). The remaining client state (Redux slice) turned out to be minimal and only deals with the filter.

### Stack

- TypeScript
- React
- Bootstrap
- Redux Toolkit
- RTK Query
- Firebase

### Live version

A deployed version is available here [here](https://mybooks.cyclic.app/).

### Branches

The source code is in the /dev branch, the compiled version in the /deploy branch.