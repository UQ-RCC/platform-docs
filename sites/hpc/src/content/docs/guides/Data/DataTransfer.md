---
title: 'Transferring Data'
---


We recommend to use command line `scp` and `sftp`. These are accessible to all users, via a shell for Linux and Mac users and via WSL and `cmd` for Windows users.

## Using scp

From the command line on your PC, type

`scp file username@bunya.rcc.uq.edu.au:/path-to-place-for-file/`

For example

`scp test.dat username@bunya.rcc.uq.edu.au:/scratch/user/username/`

will copy the file `test.dat` to the user's scratch directory.

## Using sftp

From the command line on your PC, type

`sftp username@bunya.rcc.uq.edu.au`

You will see `sftp>` as prompt once you have logged in.

`help` provides a summary of the commands available in sftp.

- Use `pwd`, `ls`, `cd` and `mkdir` to print location, list files, change directory and create a new directory **on the Bunya end**.
- Use `lpwd`, `lls`, `lcd` and `lmkdir` to print your location, list files, change directory and create a new directory **on your desktop/laptop**.
- Use `get` to pull files and directories **from Bunya to your desktop/laptop**.
- Use `put` to push files and directories **from your desktop/laptop to Bunya**.

## Using WinSCP

Windows users can also use WinSCP if they require a graphical SFTP client. WinSCP allows the MFA authentication without extra setup. WinSCP also allows mutiple file and directory transfer without having to re-enter the MFA passcode.

## Using FileZilla ... Don't!

FileZilla is no longer recommended. FileZilla does not work well with MFA and will ask you to authenticate for every single file even if you are transferring whole directories.




