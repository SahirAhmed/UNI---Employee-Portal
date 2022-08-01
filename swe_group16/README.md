## FDM Employee Portal

Please read this **entire** document before editing any part of this project.
### Software
If you're not experienced with webdev tools then please install these if you haven't already:

- Visual Studio Code  
Some useful VS Code extensions:
    - GitLens
    - Bracket Pair Colorizer
- WSL with Windows Terminal
For all commands displayed in this documentation
### Installation
```sh
git clone https://github.research.its.qmul.ac.uk/ec19037/swe_group16.git
```
<sub>(Unless you use SSH)</sub>

- cd into root folder and
```sh
npm install
```
- Wait for installation to finish and then start the server with
```sh
npm start
``` 
- Changes will be displayed in the browser automatically upon saving

### Project structure
- This project uses React Router, which means pages are treated as components.
The pages of the site can be found in the ``Pages`` folder - each page has it's own file.
- Reusable components are found in the ``components`` folder - each component has it's own file. Components are things such as the navbar, sign in/sign out forms etc.
- Logos, Icons etc are all found in the ``assets`` folder.
- There should be no need to touch the rest of the files, but ``App.js`` contains the routing and state of the user that's logged in, as well as some other functions.

- **Styled components:** For the styling of this project, the styled components library is used. This way, css can be grouped with the code in each component. You can think of it like creating custom styled HTML tags. Take a look at ``Announcement.js`` or ``Navbar.js`` if you are confused. Alternatively, [styled-components has very good documentation and examples](https://styled-components.com/).
### Contributing
- The project has two persistent branches: ``main`` and ``dev``.
- **main**: For working code only that contains features that are complete. There should be no features/code on here that is half finished or causing big errors. 
#### **Never push changes directly to main.**

- **dev:** This is the main developmental branch for features currently being worked on. Features and styling that has been confirmed functional on this branch can be merged into main with a pull request. 

- Whenever you're working on a feature (that is not styling) it is advised to branch from ``dev`` and create a new branch with the name of that feature. For example, if a blog feature was being implemented - a branch called ``blog`` would be created. The code for the blog would then be written and tested on the ``blog`` branch. Once it is deemed functional, it can be merged via a pull request to ``dev``. Eventually, ``dev`` will be merged into main once enough features have been added/tested.

[Here is a good tutorial for Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

With merging, you will also run into **merge conflicts** - these are normal, just communicate on discord if you're not sure what to merge/not merge. 
[Here is a quick merge conflict tutorial specifically for VS Code](https://www.youtube.com/watch?v=kBIMGOxqqnk).


### Git commands
cloning, pushing, committing, branching

- ``git pull`` pull new changes
- ``git status`` shows a list of files that you have created/deleted/made changes to.
- ``git add <filename>`` Add a file to the commit you are about to make. Use the ``-A`` flag instead of filename to add everything - please only do this when you are making changes related to each other.
- ``git commit -m "commit message"`` adding a commit to be pushed to remote. Please read the [Commit](#Committing) section below - very important for consistency!
- ``git push`` uploading your commits to the repository.  
  
   
There are a ton of good git tutorials online if you look them up, it's simple once you remember the commands.

### Committing 
Please do not group many big changes into one commit. Ideally, you should make a commit any time you complete a subtask - such as styling a component or fixing a bug. That way, things can be rolled back if errors occur. Commit messages should ideally be written in the same way for everyone to understand easily!

**Please follow the following template for your commit messages:**
```sh
task: subject (in lowercase and imperative mood, no full stops) 
```
<sub>Imperative mood: Just think of it as "Applying this commit will ``commit message here``". For example:
``refactor: remove unneeded error checking`` - *"Applying this commit will remove unneeded error checking"*</sub>

**Task Codes**
Please use these standardised task words in your commits to promote readability:
- ``feat`` - for new features
- ``fix`` - for bug fixes
- ``docs`` - documentation related change
- ``refactor`` - code editing that doesn't fix bugs/add functionality (renaming a variable, rewriting a loop)
- ``style`` - related to styling (make sure to include what you are styling)
- ``perf`` - performance related
- ``misc`` - task that doesn't come under other codes (creating folder etc)
