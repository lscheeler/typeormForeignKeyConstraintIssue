# Repo used to reproduce the bug described in [typeorm issue 1332](https://github.com/typeorm/typeorm/issues/1332)

# Behavior
- Should create `db.sqlite` with 2 tables, `parent` and `child`
- The `child` entity has a many-to-one relationship with the `parent` whereas the `parent` has a one-to-many relationship with the `child` entity.
- In this example, the `parent` table should be populated with the data from `config/development.json`. Also a new child is added to the child table with a new parent. See lines 36 to 42 in `src/server.ts`

# Setup
### After cloning this repo do the following:
- Run npm install
- Launch the program (should not fail) then open `db.sqlite` to look at the contents
  - Should have created `child` and `parent` tables.
      - The `child` table should have one entry
      - The `parent` table should have three entries
- Re-launch the program
  - Should crash on line 36 of `src/server.ts` ,
  ```
  const databaseConnection = await createConnection(databaseOptions);
  ```
   with the error -> `Error: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed`

# NOTES
- The following code from `src/server.ts` triggers this error
  ```
  // *TEST* ADD NEW CHILD WITH NEW PARENT
  const childRepository = databaseConnection.getCustomRepository(ChildRepository);
  const child = await childRepository.findOrCreate("sally.may@test.com", "Sally May", uuid());
  ```

# Questions
- I am confused as to why adding a new entry to the `child` table seems to mess up the database schema upon application re-launch.
