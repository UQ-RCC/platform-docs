---
title: ' Software Modules'
---

# Software Modules

The [training resources](https://rcc.uq.edu.au/training-support/training-videos/hpc-training-videos) have a short video on how to use [software modules](https://youtu.be/qdSRpcEnrHE?si=60b5jif3ku-tf2z3) to load installed software on HPC.

The basic commands are:

`module overview` - shows a brief list of all available modules, and the number of distinct versions<br>
`module avail` - shows all available main modules<br>
`module --ignore_cache avail` - shows all available main modules after re-initialising your personal module cache (which speeds up future searches, but can get out-of-date)<br>
`module --show_hidden avail` - shows all available modules, including those that are normally hidden<br>
`module -t avail` - shows a _terse_ single column list of the available modules<br>
`module avail [SOFTWARE-NAME or KEYWORD]` - shows all modules for SOFTWARE-NAME or KEYWORD<br>
`module spider [SOFTWARE-NAME or KEYWORD]` - shows all possible modules for SOFTWARE-NAME or KEYWORD<br>
`module load [SOFTWARE-NAME/VERSION]` - loads a specific software version<br>
`module unload [SOFTWARE-NAME/VERSION]` - unloads a specific software version<br>
`module list` - lists all currently loaded software modules<br>
`module purge` - unloads ALL currently loaded software modules<br>

Bunya uses EasyBuild to build and install software and modules. Modules on Bunya are self-contained which means users do not need to load any dependencies for the module to work. -This is similar to how modules worked on Tinaroo and FlashLite but different to Wiener.-

Using `module avail` will show only the main software modules installed. It will not show all the different dependency modules that are also available. To show ALL modules including hidden modules use

`module --show_hidden avail`

Ordinarily, the module command will only search standard pre-configured paths, but you can modify the search path within your current session. 
If you have created some personal module files and would like to use them, then you need to add the directory containing those personal software modules to the search path using the following command

`module use path_to_where_you_keep_your_modules`

The `-a` option can be used to _append_ the search path instead of pre-pending it. 
The command `module unuse path_to_where_you_keep_your_modules` will reverse this temporary change (or you could login again). 
You can make sure it is always set by modifying your `$HOME/.bashrc` file.  

**Please note:**
- Use the full module name, software/version, to be sure to load the version you need and ensure that your research is consistent and repeatable
- Modules denoted as the default (D) are only the default in their module list, `/sw/auto/rocky9a/epyc3/modules/all` or `/sw/local/rocky9/noarch/rcc/modules` for example. If a software is available as a module in more than one list then users are required to use the full module name (software/version).
- Most system libraries and tools (gfortran, gcc, eigen, etc) are required to be loaded as modules. Users should check `module --show_hidden avail` if they get a *library not found error* to see if it is avialable via a module.

**Please note:**
- The modules in `/sw/auto/rocky9a/epyc3/modules/all` will also be available on the `epyc4` compute nodes and names etc are identical. So there is nothing different do for modules in this list. Modules in `/sw/local/rocky8/epyc3/rcc/modules`, `/sw/local/rocky8/noarch/rcc/modules`, `/sw/local/rocky9/noarch/rcc/modules`, and `/sw/local/rocky8/noarch/qcif/modules` are also available on all `epyc4` compute nodes.
- The GPU nodes will have different modules available and users are advised to log onto a GPU node via an interactive session to see which modules are available for the specific GPU architectures. For example, CUDA modules will not be available on CPU nodes, but will be available on the CUDA GPU nodes.<br>
The command that will load the default version of the cuda drivers etc. on a GPU node will be <br>
`module load cuda`<br>
An alternative to using an interactive session on a CUDA node, would be to interrogate the `/sw` filesystem for the versions of cuda that are available.<br>
`ls /sw/auto/rocky9*/*/modules/all/cuda/`


