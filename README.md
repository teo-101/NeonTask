# NeonTask Documentaion
The final goal of this repository is to familiarize myself with _Javascript localStorage_ and the _basics of Git_ through this _TODO list_ project documenting my way.

## Javascript

## Git

In the making of this little project I used the following git commands:

- **Staging changes**
    ```
    git add .
    ```
    `.` is used to stage all the tracked changes.

- **Commiting the staged changes**
    ```
    git commit -m "COMMIT_DESCRIPTION"
    ```
    `-m` flag allows a multiline message to go along the commit itself.

- **Pushing commits into a branch**
    ```
    git push -u -f origin <BRANCH>
    ```
    `-u` flag allows the commit to be tracked, `-f` flag is used to force a commit to overide the remote branch (on Github) with the local changes. _use carefull, this can lead to data loss_.
    `origin` is the name of the remote repository to which you are pushing your changes. By default, origin is the name given to the remote repository you cloned from. `<BRANCH>` is a placeholder for the branch in which the commits go.

- **Branch commands:**
    - Switch branch: ``git checkout <BRANCH_NAME>``
    - Creating a new branch and swithing to it: ``git checkout -b <BRANCH_NAME>``
    - Merging: ``git merge <BRANCH1>`` (merges the _BRANCH1_ into the current branch). If i am in the main branch and i run the command it merges BRANCH1 into main.
    - Deleting local: ``git branch -d <BRANCH_NAME>``
    - Deleting remote: ``git branch -D <BRANCH_NAME>``

__Git documentation: https://git-scm.com/doc.__