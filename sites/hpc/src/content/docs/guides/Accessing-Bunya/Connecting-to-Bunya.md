---
title: Connecting to Bunya
---


:::danger[Warning]
***Do not share passwords, ssh keys or your multifactor authentication.*** 

This is a violation of UQ's cyber security policy and UQ's conditions of access to RCC infrastructure policy to which every Bunya user agrees to when applying for Bunya access.

**Violation of UQ's policies and conditions of access may lead to the suspension of access to RCC infrastructure (temporarily or permanently) and in some cases a report to the Integrity Unit for misconduct.**

Here are just some examples that are a violation of UQ's policies (there are others):

* You allow another person to use your account to access Bunya. It makes no difference if they have used Bunya (i.e. ran jobs), or not. And it makes no difference if you logged them in and were there all the time.
* Another user is struggling to get enough resources (jobs running) for their work. You allow them to use your account to be able to run more jobs. It does not matter if the other user is a fellow student, or you are their supervisor, or you are their friend, or you are their partner etc.
* You are sharing your computer (work or home) with others and you have set up an ssh key for convenient access. If you are sharing a single local account on the computer, by default there is a single ssh key even if you are accessing different accounts. If you are sharing a computer, you must all have distinct ssh keys stored in separate accounts on the shared computer, or you should not use ssh keys but use passwords only. Best practice would be to set up separate accounts on the shared computer for each person.
* You have your password or SSH key stored somewhere that another person can access it, and they can gain access to your DUO authenticator. Your account credentials are only to be used by yourself, and not to be shared with anybody including your supervisor or IT support staff.
:::

## Passwords

### UQ Users

UQ users of Bunya will use their UQ credentials. If you have both staff and student credentials then you will need to use the one that was used to request your access. This is most likely to be your *staff* credential if you have one. Multi-factor authentication is automatically active for UQ users. See below.

### QCIF (non-UQ) users

QCIF users (non-UQ) will use their QSAC username and password.[https://services.qriscloud.org.au/credential](https://services.qriscloud.org.au/credential)
Multi-factor authentication must also be configured. See below.

## "onBunya only" users


:::note[First Time Bunya Users]
We get it, but sometimes you need to use the command line to get things done.<br>

Even if you want to use onBunya exclusively, you will need to login using a direct ssh method when you access Bunya for the first time. <br>
This is required to trigger the proper setup of your account, so that you will be able to use onBunya fully.

A straightforward way to achieve this is to <br>
1. login into the onBunya Dashboard (https://onbunya.rcc.uq.edu.au) <br>
2. select Clusters ... Bunya Shell Access  from the drop down menus <br>
3. enter your password for your Bunya HPC username and your Multi-factor Authentication code when prompted (see MFA section below)<br>
4. once you are logged in you can use `exit` to logout again.<br>
<br>
You may find from time to time that you need to query the batch system or perform tasks that require Bunya Shell Access. <br><br>
Alternatively, you can use an ssh command line client like putty or ssh in a command terminal on a Mac, Linux or Windows PC as described here:
:::

## Connection methods

### Approved connection methods

Approved methods to connect to Bunya are
- command line ssh and ssh clients (PuTTY, MobaXterm)
- command line sftp and sftp clients (WinSCP, MobaXterm)
- onBunya

### Not permitted connection methods

This list shows examples of not permitted methods. By default, unless listed above, the connection method should be assumed as *not permitted* unless confirmed as permitted in writing by RCC.  
- VS Code and similar IDE apps (pycharm, zed, cursor, mutagen, etc)
- Remote tunnelling services and features, including VS Code remote tunnels

## Command line SSH Access to Bunya

Set 1 of the [Training resources](https://rcc.uq.edu.au/training-support/training-videos/hpc-training-videos) explains how to use Putty to connect to a HPC with the basics found [here](https://youtu.be/oP_5JJrMm1U). To connect to Bunya please use:

Hostname: bunya.rcc.uq.edu.au<br>
Port: 22

For those using command line ssh:<br>
`ssh username@bunya.rcc.uq.edu.au`

### Bunya enforces MFA (multi-factor authentication)

For UQ users, this will use their UQ Okta MFA that is used for all other access to UQ resources.<br>

**IMPORTANT**: Bunya uses a push notification to the user's device. For this to work the user has to have FaceID or passcode enabled or the push will not work even if the user selects the right number on their device. Users are strongly advised to log into a UQ service and select to use a push notification to make sure their device setup is working with Bunya.

QCIF users are required to go here [https://services.qriscloud.org.au/credential](https://services.qriscloud.org.au/credential) and set up an **Authenticator App**.

Users will first be asked for their password (or key). After users have entered this, you will be asked to use MFA.

For UQ users, you will receive an Okta push to your UQ Okta registered device with the number shown on the command line. Press enter once you have answered the push on your device.<br>
For any problems with Okta you should contact the ITS help desk about [MFA issues](https://my.uq.edu.au/information-and-services/information-technology/uq-accounts-and-passwords/multi-factor-authentication-mfa).   

For QCIF users, you will be asked to enter the one-time-authentication code (6 numbers with no spaces).

After this you will be logged into Bunya.

### Preventing SSH session timeouts

Some network devices and firewalls may terminate inactive ssh connections. To help keep your connection to Bunya open, configure ssh keepalive settings in your ssh client.

- OpenSSH (Linux, macOS, Windows OpenSSH)<br>
  Add the following to your ~/.ssh/config file:<br>
  ```
  Host bunya
      ServerAliveInterval 300
  ```
  Alternatively, specify the option on the command line:<br>
  ```
  ssh -o ServerAliveInterval=300 username@bunya.rcc.uq.edu.au
  ```
- Putty<br>
  Open the PuTTY configuration window<br>
  Navigate to Connection<br>
  Under Sending of null packets to keep session active, set:<br>
  Seconds between keepalives: 300<br>
  Save the session profile<br>
- MobaXterm<br>
  Open Settings and then Configuration<br>
  Select the SSH tab<br>
  Enable SSH keepalive<br>
  Set the keepalive interval to an appropriate value, such as 300 seconds (default might be 60)<br>
- Other SSH Clients<br>
  Most SSH clients provide a keepalive or connection persistence setting. Consult your client's documentation and configure a keepalive interval of approximately 300 seconds to reduce the likelihood of idle connections being disconnected.

### SSH multiplexing

SHH multiplexing allows multiple and subsequent sessions to use the same initial ssh connection without having to authenticate again. See the [guide on SSH multiplexing](../bunya-ssh-multiplexing-guide) for more details.

### VS Code and other IDEs

VS Code must not be run on login nodes. Users who require VS Code for development or interactive work can use one of the following supported options:

- The VS Code software module on a compute node 
- The VS Code app available through onBunya.

### Note for those using MobaXTerm Software

This SSH/X11 client has an experimental feature called "Remote monitoring". 
Please disable it by modifying default behaviour for SSH connections via the main menu _Settings ... SSH ... uncheck Remote-monitoring (Experimental)_ and please don't activate it manually.

### When Bunya is down for maintenance

Bunya is taken offline 4 times per year (second Tuesday of February, May, August, November) to perform important maintenance work. All users are advised in the weeks leading up to these occasions.

Depending on where the maintenance work has reached when you attempt to login, you may get connection refused or no route to host (because the login nodes are still being worked on) or you may get a login session that closes immediately and automatically with a message:
```
Success. Logging you in...
Bunya is currently down for maintenance

Connection closed by 203.22.86.167 port 22
```

### What to do when you can't login and it isn't a maintenance day ?

Email rcc-support@uq.edu.au and try to provide as much detail about the situation. 


At the minimum, your Bunya username, where you were trying to connect from (e.g. campus, home, VPN) and the tool you are using to connect with.
