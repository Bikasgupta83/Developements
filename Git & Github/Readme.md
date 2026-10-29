# Git & GitHub Notes

A quick-reference guide to Git and GitHub: setup, everyday commands, branching, syncing, and fixing mistakes.

## Table of Contents

1. [Introduction](#introduction)
2. [Configuration](#configuration)
3. [Getting Started](#getting-started)
4. [Basic Workflow](#basic-workflow)
5. [Connecting to a Remote Repository](#connecting-to-a-remote-repository)
6. [Changing the Remote](#changing-the-remote)
7. [Pushing Changes](#pushing-changes)
8. [Branching](#branching)
9. [Deleting Branches & Repositories](#deleting-branches--repositories)
10. [Comparing & Merging](#comparing--merging)
11. [Pulling Changes](#pulling-changes)
12. [Viewing History](#viewing-history)
13. [Fixing Mistakes](#fixing-mistakes)
14. [Forking](#forking)
15. [Command Cheat Sheet](#command-cheat-sheet)

---

## Introduction

### Git
- Free and open-source **version control system**
- Tracks changes in code and keeps a full history
- Makes collaboration easier

### GitHub
- A website that hosts Git repositories online

---

## Configuration

Set your identity once on your machine:

```bash
git config --global user.name "My Name"
git config --global user.email "example@gmail.com"
```

| Command | Description |
|---|---|
| `git config --list` | List all config values (e.g. `user.name`, `user.email`) |
| `git --version` | Show the installed Git version |

---

## Getting Started

| Command | Description |
|---|---|
| `git init` | Create a new Git repository |
| `git clone PATH` | Clone a remote repository onto your local machine |

---

## Basic Workflow

The everyday cycle: **check status → stage → commit → push**.

| Command | Description |
|---|---|
| `git status` | Display the state of your working directory and staging area |
| `git add PATH` | Add a new or changed file to the staging area |
| `git commit -m "Message"` | Save a record of your staged changes |
| `git commit -am "Message"` | Stage **and** commit tracked files at once (`a` = add, `m` = message) |
| `git push origin main` | Upload local commits to the remote repository |

> **Note:** `git commit -am` only works for files Git already tracks. New files still need `git add`.

---

## Connecting to a Remote Repository

When you start with `git init`, link your local repo to GitHub:

```bash
git remote add origin PATH     # link to a remote repository
git remote -v                  # verify the remote
git branch -M main             # rename current branch to main
git push origin main           # push for the first time
```

---

## Changing the Remote

### Option 1: Update the URL (recommended)

```bash
git remote set-url origin NEW_URL
git remote -v                  # verify the change
git push -u origin main        # push to the new remote
```

### Option 2: Remove and re-add

```bash
git remote remove origin
git remote add origin NEW_URL
```

### Option 3: Keep the old remote under a different name

```bash
git remote rename origin old-origin
git remote add origin NEW_URL
```

### Pushing everything to the new remote

```bash
git push origin --all          # all branches
git push origin --tags         # all tags
```

> **Note:** The URL can be HTTPS (`https://github.com/user/repo.git`) or SSH (`git@github.com:user/repo.git`).

---

## Pushing Changes

```bash
git push -u origin branchName
```

- `-u` sets the **upstream** branch.
- Once the upstream is set, you can simply use:

```bash
git push
```

---

## Branching

| Command | Description |
|---|---|
| `git branch` | List branches (shows the current one) |
| `git branch -M main` | Rename the current branch to `main` |
| `git checkout BranchName` | Switch to another branch |
| `git checkout -b newBranchName` | Create a new branch and switch to it |
| `git branch -d branchName` | Delete a branch |

---

## Deleting Branches & Repositories

### Delete a branch

```bash
git branch -d branchName               # delete local branch
git push origin --delete branchName    # delete remote branch
```

### Delete a repository from GitHub

Git itself cannot delete a repository on GitHub. Use one of these:

**Option 1: GitHub website**

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Scroll to the **Danger Zone**.
4. Click **Delete this repository**.
5. Type the repo name (`owner/repo`) to confirm.

**Option 2: GitHub CLI**

```bash
gh repo delete owner/repo --yes
gh auth refresh -s delete_repo         # run first if you get a permission error
```

### Remove the link to a deleted remote (local)

```bash
git remote remove origin
```

> **Warning:** Deleting a repository is permanent. Clone it first if you may need the code. You need admin rights on the repository.

---

## Comparing & Merging

### Compare

```bash
git diff branchName     # compare commits, branches, files, and more
```

### Merge

Two ways to combine branches:

```bash
git merge branchName
```

or create a **Pull Request (PR)** on GitHub.

---

## Pulling Changes

```bash
git pull origin main
```

Fetches and downloads content from a remote repo and immediately updates your local repo to match it.

---

## Viewing History

```bash
git log
```

Shows the commit history.

---

## Fixing Mistakes

### Case 1: Staged changes (not yet committed)

```bash
git reset fileName     # unstage a specific file
git reset              # unstage everything
```

### Case 2: Committed changes (last commit only)

```bash
git reset HEAD~1
```

### Case 3: Committed changes (multiple commits)

```bash
git reset commitHash            # move back, keep your changes
git reset --hard commitHash     # move back, discard your changes
```

> **Warning:** `--hard` permanently discards uncommitted work. Use it carefully.

---

## Forking

- A **fork** is a new repository that shares code and visibility settings with the original ("upstream") repository.
- Think of it as your own copy of someone else's project, which you can change freely and propose changes back via a PR.

---

## Command Cheat Sheet

| Task | Command |
|---|---|
| Set username | `git config --global user.name "Name"` |
| Set email | `git config --global user.email "email"` |
| Start a repo | `git init` |
| Clone a repo | `git clone PATH` |
| Check status | `git status` |
| Stage files | `git add PATH` |
| Commit | `git commit -m "Message"` |
| Add remote | `git remote add origin PATH` |
| Verify remote | `git remote -v` |
| Change remote URL | `git remote set-url origin NEW_URL` |
| Remove remote | `git remote remove origin` |
| Rename remote | `git remote rename origin old-origin` |
| Push | `git push -u origin main` |
| New branch | `git checkout -b branchName` |
| Switch branch | `git checkout branchName` |
| Delete local branch | `git branch -d branchName` |
| Delete remote branch | `git push origin --delete branchName` |
| Delete GitHub repo (CLI) | `gh repo delete owner/repo --yes` |
| Merge | `git merge branchName` |
| Pull | `git pull origin main` |
| History | `git log` |
| Undo staging | `git reset fileName` |
| Undo last commit | `git reset HEAD~1` |