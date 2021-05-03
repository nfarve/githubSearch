# Github Search

A first application in React that allows for searching of repositories in github and viewing commits for a desired repo.

## Why React
After doing research on javascript frameworks, React seemed like the best choice for this simple use case. Although I hadn't used it before, it was best for real time feedback and user interactions.

## How to Start
You can run `yarn start` or you can view the app here: https://peaceful-escarpment-52962.herokuapp.com/. 

## Testing
I didn't have enough time to dive into testing for react so here is a list of things I would have written tests for:
* On a fresh page, only a search field should be present and there should be no data in the table.
* When querying a nonexistent org, a message should appear letting the user know there are no results.
* If an actual org is entered, a table with the first 30 repos should be returned in order of forks (desc). 
* After entering an org, the search field should be empty.
* After entering a org in a search field, there should be a header saying what org was searched ("searched results for [name of org]").
* A user should be able to select a repo and be taken to that repo's page in a new tab.
* If a user selects "View More", additional repos should be added to the table (still sorted), if they exist. 
* If a user clicks a commit they should be taken to a new table with commits for that repo.
* When moving to the commit table, the repo's table should not be visible.
* A user should be able to click a commit and be taken to those changes. 
* If a user clicks "show more" on the commit table, 30 more commits should be added to the table.
* If a user clicks "Back", they should be taken back to the repo's table and the correct repos should be present. 
* When moving from the commit table to the repo's table, the commit table should no longer be visible. 
* Check that the correct number of repositories are returned (tests for more than 30, less than 30, ect).
* Check the correct number of commits are returned.

## If I had time I would: 
* Add authentication (OAuth). This would allow for more actions such as adding a commit in the app, forking directly from the app,  updating a repo, etc.
* Add more fields to the commit table, such as the date, and allow for filtering
* Allow for more ways to filter to repos table as well. 
* Include pagination rather than just a show more feature.
* Spend more time beautifying things, adding more spacing around buttons and such. 
* Spend time adding some protection against bad actors, this is probably not neccessary since this is an internal tool. 
* Disable buttons when they are no longer valid. For example, "show more" should not be clickable when less than 30 results are returned from a query. 



