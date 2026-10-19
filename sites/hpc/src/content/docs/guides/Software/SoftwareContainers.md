---
title: 'Using Software Containers on Bunya'
---


The software build management system on Bunya is better equipped to support a range of software on the "bare-metal". There is, still, support on Bunya for software container technology to provide greater flexibility for Bunya users.

## Background

Software containers is a generic technology term. It provides a mechanism for different operating systems and software that are not available in the host operating system so they can be used safely on the HPC platform. Software containers can be built from a "recipe" or downloaded as pre-built images, often as a stack that is assembled on the fly.

The names Docker, Shifter, Singularity/Apptainer are like different "brands" that support software containers.

Bunya uses [*Apptainer*](https://apptainer.org/docs/user/latest/introduction.html). Apptainer was created when Singularity was rebranded when it joined the Linux Foundation. Currently, the version of Apptainer installed on Bunya is version 1.3.0-1.el8 which is actually newer than the latest Singularity release (v3.8.7).

Apptainer is *not* installed on the Bunya login nodes. Apptainer is installed into the operating system on every compute node. You must use an interactive job via the batch system (or an [onBunya](http://bunya-ondemand.rcc.uq.edu.au/) session) to be able to reach compute nodes and use apptainer. You do *not* need to load a software module to use the apptainer command.

## How to run a software container on Bunya

You can 
* fetch an external software container from a public repository URL and launch it on the fly (this includes Docker images),
* launch a software container image file that you have already downloaded to the filesystem,
* you may even be using a software container without realising it because some software on Bunya (`module load ...`) is provided seamlessly using containers.  

To make the magic happen you need to
* launch an interactive job an wait for that job to start running on a compute node,
* the apptainer/singularity command is automatically in your PATH (the apptainer command should just work on any _compute_ node)
* set environment variables that govern the location of where the container will store temporary files.<br> 
Specifically, you may run into /home quota trouble if you do not set the **SINGULARITY_CACHEDIR** and **SINGULARITY_TMPDIR** where you have sufficient space (such as `/scratch/user` or `/scratch/project`)
* provide a complete apptainer/singularity command line invocation including bind mounts.

Of course, you can also use software containers within a regular batch job, noting the points above about cache and tmp directories and bind mounts.

## Where and how to build a software container

Singularity/Apptainer software containers do _not_ need to be built on systems where the user has system admin access. 
So, regular users are able to _build_ software containers on Bunya. 
There is, however, one complication. The GPFS filesystem that underpins your `/scratch` and `/home`, as well as `$TMPDIR`, does not support "sandbox" mode. Sandbox mode allows you to add additional functionality to a container created with just a rudimentary installation. The sandbox needs to be converted to a portable image file once it has been completely built. If you need to use sandbox mode on Bunya, please contact RCC Support. 

You can build your own on a suitable external system and bring it onto Bunya.

You cannot build a container on Bunya directly from a Dockerfile prescription. Instead, you will need to use the docker software to create a container image and upload it to a suitable repository. Then you will be able to "pull" a copy of it and it will be converted to apptainer format.

## For more information about software containers

Refer to this more [detailed guide about using apptainer](../basics-apptainer).

