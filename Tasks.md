# Working on Tasks

## Starting off

At the start of each task, follow these steps to make sure your development is as smooth as possible!

1. Ensure all of your changes have been commited and pushed so you don't have any modified files.
2. Change to the main branch and `git pull` any new changes.
3. Create a new branch and use a descriptive and concise branch name like user-login or basic-nav
4. **Run `npm i` in both the frontend and backend to make sure your dependencies are up to date!**
5. Start working on your task!

## During work

While working, make sure to save and test often. Make a commit whenever you have completed a sub task and you know your code works. I normally commit 1-4 times on most tasks before my initial PR.

Also, if you make a commit you didn't mean to, its not the end of the world. You can undo a commit in VSCode by clicking source control (branch picture on left bar) -> three dots (right above field for message) -> Commit -> Undo last commit. There's also probably a command for it that I don't know lol.

## Submitting work

1. If you have any work remaining, stage it, commit it, and push it. Be aware you may have to publish your branch first.
2. Go to [github.com](https://github.com/hack4impact-calpoly/city-farm-slo) and click on the notification to make a PR. If it doesn't show up, just click on the pull request tab near the top (but not the one at the very top).
3. Write up a description of the work you did, as well as anything extra or anything that isn't fully working. Also include `Resolved <issue #>` in your description to automatically move your task in the project board.
4. Request a reviewer in the menu to the left. Every PR will be reviewed before it is merged!
5. Create the pull request!
6. If you notice that GitHub says there is a merge conflict, try to resolve it if you can so the reviewer doesn't have to. There's info on how to do that further down.

## Reviewing work

Coming soon

## Resolving merge conflicts

If you encounter a merge conflict, it means that there were changes to a file on both your branch and on main, and GitHub isn't sure which one to pick. Sometimes GitHub will allow you to pick directly from the website, but for more complex conflicts, you may need to take the following steps:

1. Ensure all changes are saved on your branch
2. Change to the main branch and pull the new changes
3. Go back to your branch
4. Use `git merge main` to merge the changes in main into your branch
5. Your IDE will probably show the two different versions of the files and ask you which types to accept. Make the decisions, commit, and push
6. Congrats 🎉! You just resolved a merge conflict!
