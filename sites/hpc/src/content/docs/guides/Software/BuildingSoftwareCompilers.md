---
title: 'Building Software and Compilers on Bunya'
---


## Compilers

- The GCC compilers are available via the `foss` modules. These contain the complete tool chain, which include the compiler, OpenMPI, FlexiBlas, FFTW and Scalapack.
- Users should use `foss/2023a`, `foss/2024a`, or `foss/2025a`. `foss/2022a` is scheduled to be removed before the end of 2026.
- The Intel compilers are available via the `intel/2023a`, `intel/2024a` or `intel/2025a` modules which include the compiler, IntelMPI and MKL. 

## How to build your own software

:::note[IMPORTANT] If you are building your own software, especially if you are compiling your own software, you need to be aware of the different architectures, `epyc3`, `epyc4`, and `epyc5`. Software built on an `epyc3` compute node will run on a `epyc4` or `epyc5` compute node **BUT** software built on a `epyc4` compute node will not run on a `epyc3` compute node and software built on a `epyc5` compute node will not run on a `epyc3` or `epyc4` compute node. If you want ease of use you need to make sure to compile on a `epyc3` compute node. If you want best performance you should compile for a specific architecture but then need to request that architecture for your jobs. 
:::

:::caution[Please note] **ALL** software builds should be done on a compute node. Processes running on the login nodes, including software builds (conda environments, make-make install, EasyBuild) will most likely be killed if found on the login nodes.
:::

### Building additional packages for R

The installation of R on Bunya comes with many packages provided (see `module help r`) that can be loaded using the library() function.
Additional R packages (ones that you need but don't have provided already need to be built using the `install.package()` function _within_ R. 
**Note: R packages that were built for Tinaroo, or for a different version of R will NOT work properly, or at all, on Bunya.**
We recommend that you delete all packages built with/for/on Tinaroo and FlashLite and run `install.packages()` again.

Additionally, R packages built on the newer EPYC4 CPU nodes are known _not_ to work on the older EPYC3 CPU nodes. To ensure you build R packages that can be run on both CPU types you must run install.packages() on the older EPYC3. See the section on interactive jobs for how to target the older nodes for building R packages.

### Building Python and Conda environments

Similary to information about for R packages. Python environments built with/for/on Tinaroo and FlashLite need to be reinstalled on Bunya.

Please see [here](../conda-environment) for more information on how to build conda environments on Bunya.

### Building software using EasyBuild

Users can use EasyBuild to build their own software against existing modules on Bunya.

[https://docs.easybuild.io/en/latest/index.html](https://docs.easybuild.io/en/latest/index.html)

EasyBuild recipes can be found for a very wide range of software. Some might need tweaking for newer versions, but it often is relatively easy. You can also write your own.

Users can build into their own home directory but use all exisiting software and software tool chains that are already available. Users need to load the EasyBuild module first:

`module load easybuild/5.2.0`

Please note: We usually advise to use the full module, name/version, to load software modules. The easybuild module is an exception as you want to make sure to always have the lastest version to have access to all available recipes.

For example, if you create a folder called EasyBuild in your home directory and have a recipe located in this directory you can build the software via this command. Make sure you are on a compute node before doing this.

```
eb --prefix=/home/YourUsername/EasyBuild --installpath=/home/YourUsername/EasyBuild --buildpath=/home/YourUsername/EasyBuild/build --robot=/home/YourUsername/EasyBuild ./EasyBuild-recipe-file.eb
```

If you add the `-D` option, it will do a dry run first. Please use `eb -H` to get the help manual.

There are currently over 16,000 sample easybuild (.eb) recipe scripts available after you load the easybuild module.
The `eb -S  searchtext` will return all .eb scripts with a case insensitive match. You may need to refine your search. 

The names of sample easy build scripts include one of the following labels that represent the toolchain to be used when building the software.
As you can see, the toolchains are built upon a specific version of compiler. The vast majority of the software for Bunya has been built with one of the Solid GCC based toolchains.

|Toolchain Module|Compiler Base|Status on Bunya|
|:---|:---:|:---:|
|foss/2025a|GCC 14.2.0|Solid|
|gfbf/2025a|GCC 14.2.0|Solid|
|gcc/14.2.0|GCC 14.2.0|Solid|
|foss/2024a|GCC 13.3.0|Solid|
|gfbf/2024a|GCC 13.3.0|Solid|
|gcc/13.3.0|GCC 13.3.0|Solid|
|foss/2023a|GCC 12.3.0|Solid|
|gfbf/2023a|GCC 12.3.0|Solid|
|gcc/12.3|GCC 12.3.0|Solid|
|foss/2022a|GCC 11.3.0|To be removed|
|gfbf/2022a|GCC 11.3.0|To be removed|
|gcc/11.3|GCC 11.3.0|To be removed|
||||
|intel/2025a|Intel 2025.1.1|Solid|
|intel/2024a|Intel 2024.2.0|Solid|
|intel/2023a|Intel 2023.1.0|Solid|
|intel/2022a|Intel 2022.1.0|To be removed|

For more information about the toolchains, refer to the [EasyBuild documentation](https://docs.easybuild.io/common-toolchains/#newest-generations-2022b-and-later)

Many older versions and toolchains may be present amongst the sample eb scripts (recipes). If you choose to build software with a non-Solid toolchain on Bunya, you may find the task quite time consuming as you could end up building the entire toolchain and every dependency from source code. You have been warned ;-)

The specific version of the software you need to build _may_ have an eb script available for one of our "Solid" toolchains available on Bunya. That makes building software quicker and more straightforward because the build can rely on pre-existing components. 

If a "Solid" version doesn't exist then you have two choices and both may involve extra work. 
You could proceed with attempting to build it using the .eb file without modification. This will build everything that it needs (i.e. _all_ dependencies) for that software so can take many hours to complete. It may entail minor fixes along the way to get it all successfully built.  
Alternatively, you could adapt the eb script to make it compatible with one of the Solid toolchains listed above. This involves tracing dependencies (exact versions matter).

Users who have a working EasyBuild recipe and have tested that the software installed as such is working on Bunya can offer their EasyBuild recipe to be uploaded to the suite of cluster wide installed software and it would then be available via modules. It is preferable that the recipe be for one of the "Solid" toolchains, unless there is a strong reason because of compatibility with other software.

