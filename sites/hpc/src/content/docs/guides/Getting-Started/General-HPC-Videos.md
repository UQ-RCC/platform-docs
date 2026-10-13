# Getting started with HPC 

## General HPC information 

The short videos here contain general, and not Bunya specific, information on what to be aware of around HPC. This information is useful to those who are starting to use HPC but also those who have used HPC before.

[Connecting to HPC via putty](https://youtu.be/wXHqcB3-PJk?si=V7Bs9-n5I64et9h9)<br>
[Where does my data go on HPC](https://youtu.be/fl0XH-glKTE?si=0XkdQGL-v3xllG3K)<br>
[Directories (folders) I should be aware of on HPC](https://youtu.be/dhN7L1kkXkQ?si=ORoikxNWkxtdfNtg)<br>
[Message of the day (info on current status and problems)](https://youtu.be/5INU-uQhVO4?si=fKa6peQdVPgOX4lM)<br>
[Relative and absolute path (common problem in user scripts)](https://youtu.be/pD52omBBKBQ?si=LCBfeTemKAbUhmJA)<br>
[How to load installed software](https://youtu.be/qdSRpcEnrHE?si=60b5jif3ku-tf2z3)<br>
[Why no calculation should be run on the login nodes]( https://youtu.be/huL7ANioPmU?si=r08PlvPS2RBlGU_X)<br>

## Basic Linux/Unix commands

These videos follow the content of Software Carpentry – The Unix Shell (https://swcarpentry.github.io/shell-novice/). 
Sessions 1, 2 and 3 provide instructions on the Linux/Unix commands needed (at the bare minimum level) for new users of HPC. The videos give an overview of the basic command. Further details and exercises with solutions can be found on the Software Carpentry – The Unix Shell page.

### Where am I?, list what is here, manual for commands
This video gives an overview of how to find out where a user is in the filesystem (pwd), list of what is there (ls) and how to find out all the options/flags that can be used with a particular command (man).

[pwd, ls, man](https://youtu.be/vBhyWSHm-t0?si=-hpmMVkneU3RrTlf)

`pwd` - print name of current/working directory<br>
`ls` - list directory contents<br>
`ls [OPTION] [PATH-TO-FILE or PATH-TO-DIRECTORY]`<br>
`man` - an interface to the system reference manuals<br>
`man [COMMAND]`

### Moving around the file system (folders)
Overview of how to move around the file system, change into other directories (cd).

[cd](https://youtu.be/IFmp_OeK4p4?si=n1Bpjo66iRpYxLlI)

`cd` – change the current directory<br>
`cd [PATH-TO-DIRECTORY]`<br>
`cd` on its own will change into the user’s home directory<br>
`cd ..` will go one directory up from the current one

### Creating directories (folders) and files
Overview of how to create new directories and files. New files are created with the editor nano.

[mkdir, nano](https://youtu.be/GblyjdRnYe8?si=zwLibbAW0UCzmYo4)

`mkdir` - creates a new directory.<br>
`mkdir [PATH-TO-DIRECTORY]`<br>
`nano` - Nano's ANOther editor<br>
`nano [PATH-TO-FILE]`

### vi editor
Overview of how to use the vi editor to edit files.

[vi](https://youtu.be/emARVKhbouA?si=lcHW-kvA-haJQymL)<br>
Further commands within vi can be found here: http://www.atmos.albany.edu/daes/atmclasses/atm350/vi_cheat_sheet.pdf

`vi` – powerful text editor<br>
`vi [PATH-TO-FILE]`

`i` – insert mode<br>
`Esc` – leave insert mode<br>
`:w` – write/save file<br>
`:q` – exit file<br>
`:wq` – save and then exit file<br>
`:q!` - override any changes and exit file without saving

### File viewers
Overview of file viewers available.

[cat, more, less](https://youtu.be/Y_9gYsCi5V8?si=1QNfYjDODBQ-eqLc)

`cat` – prints the whole file content to screen.<br>
`cat [PATH-TO-FILE]`<br>
`more` – prints a file to screen page by page, press space bar for next page.<br>
`more [PATH-TO-FILE]`<br>
`less` – prints a file to screen page by page. Scrollable, use page-down and page-up or arrow keys to navigate through the file. Press q to quit.<br>
`less - [PATH-TO-FILE]`

### Copying, moving (renaming) files and directories
Overview of how to copy and move files and directories.

[cp, mv](https://youtu.be/hEc2nKYR3R4?si=O2oso3DYy9te3stA)

`cp` – copies a file or directory<br>
`cp [PATH-TO-OLD-FILE] [PATH-TO-NEW-FILE]`<br>
`cp –r [PATH-TO-OLD-DIRECTOR] [PATH-TO-NEW-DIRECTORY]`<br>
`mv` – moves (renames) a file or directory<br>
`mv [PATH-TO-OLD-FILE] [PATH-TO-NEW-FILE]`<br>
`mv –r [PATH-TO-OLD-DIRECTOR] [PATH-TO-NEW-DIRECTORY]`

### Removing files and directories
Overview of how to remove files and directories.

***IMPORTANT*** On Linux/Unix removing is for ever. There is no recovery.<br>
[rm](https://youtu.be/p5uwYybHNzg?si=pUBRlgh94xD7Nch3)

`rm` – removes (deletes) a file or directory. This is not reversible. Once deleted it is gone and cannot be recovered.<br>
`rm [PATH-TO-FILE]`<br>
`rm –r [PATH-TO-DIRECTORY]`

