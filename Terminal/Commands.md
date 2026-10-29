# Git Bash – Basic Terminal Commands

Git Bash allows you to execute Linux-style terminal commands on Windows. These commands help you navigate directories, create files, manage folders, and work with files.

## 1. Navigation Commands

| Command | Description | Example |
|---|---|---|
| `pwd` | Display the current working directory | `pwd` |
| `ls` | List files and folders | `ls` |
| `ls -a` | Show all files, including hidden files | `ls -a` |
| `ls -l` | Display files in detailed format | `ls -l` |
| `cd folder` | Navigate into a folder | `cd frontend` |
| `cd ..` | Move to the parent directory | `cd ..` |
| `cd ../..` | Move up two directories | `cd ../..` |
| `cd ~` | Navigate to the home directory | `cd ~` |
| `cd /` | Navigate to the root directory | `cd /` |
| `cd -` | Return to the previous directory | `cd -` |

## 2. File and Directory Commands

| Command | Description | Example |
|---|---|---|
| `mkdir folder` | Create a new directory | `mkdir backend` |
| `mkdir -p a/b` | Create nested directories | `mkdir -p src/components` |
| `touch file.txt` | Create an empty file | `touch README.md` |
| `cat file.txt` | Display file contents | `cat README.md` |
| `less file.txt` | Read a file page by page | `less README.md` |
| `cp file1 file2` | Copy a file | `cp app.js app-copy.js` |
| `cp -r folder1 folder2` | Copy a directory recursively | `cp -r src backup` |
| `mv old new` | Rename or move a file | `mv old.txt new.txt` |
| `rm file.txt` | Delete a file | `rm test.txt` |
| `rmdir folder` | Remove an empty directory | `rmdir empty-folder` |
| `rm -r folder` | Delete a directory and its contents | `rm -r test-folder` |

## 3. Terminal Utility Commands

| Command | Description | Example |
|---|---|---|
| `clear` | Clear the terminal screen | `clear` |
| `history` | Display previously executed commands | `history` |
| `whoami` | Display the current username | `whoami` |
| `date` | Display the current date and time | `date` |
| `echo "Hello"` | Print text in the terminal | `echo "Hello World"` |
| `man command` | Display a command's manual, when available | `man ls` |
| `command --help` | Display command help, when supported | `ls --help` |
| `exit` | Exit the terminal session | `exit` |

## 4. Useful Shortcuts

| Shortcut | Description |
|---|---|
| `Tab` | Autocomplete file and directory names |
| `↑` / `↓` | Navigate command history |
| `Ctrl + C` | Stop a running command |
| `Ctrl + L` | Clear the terminal screen |
| `Ctrl + A` | Move the cursor to the beginning of the line |
| `Ctrl + E` | Move the cursor to the end of the line |

## 5. Important Notes

- Use `pwd` to check your current directory before running file commands.
- Use `ls -a` to view hidden files such as `.env` and `.gitignore`.
- Use `cd ..` to move back to the parent directory.
- Use `mkdir -p` to create nested directories in one command.
- Be careful with `rm` and `rm -r`, because deleted files may not be recoverable through the terminal.
- Git Bash supports many Unix commands, but some commands and options may differ from Linux or macOS.

## 6. Practice Example

```bash
# Check the current directory
pwd

# List all files, including hidden files
ls -a

# Create a project directory
mkdir my-project

# Navigate into the directory
cd my-project

# Create a README file
touch README.md

# Add text to the file
echo "# My Project" > README.md

# Display the file contents
cat README.md

# Return to the parent directory
cd ..

# Clear the terminal
clear
```

**Tip:** Practice these commands regularly to become comfortable navigating and managing files through Git Bash.