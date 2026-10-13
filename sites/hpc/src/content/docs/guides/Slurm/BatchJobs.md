---
title: 'Submitting batch jobs'
---

# Submitting batch jobs

Users should keep in mind that the majority of CPU nodes on Bunya have 96 cores (192 threads) per node. Only 12 nodes have 256 cores (512 threads). 256 cores (`--ntask-per-node=256`) 512 threads (`--cpu-per-task=512`) is therefore the maximum a multi thread job can request. Please note not all calculations scale well with cores, so before requesting all 256/512 cores/threads **do some testing first**. 

The GPU nodes can have different numbers of CPUs available. Users are reminded to check and request sensible CPU numbers with their GPU requests.

The Pawsey Centre has an excellent guide on how to [migrate from PBS to SLURM](https://pawsey.atlassian.net/wiki/spaces/US/pages/51925978/How+to+Migrate+from+PBS+Pro+to+Slurm). The Pawsey Centre also provides a good general overview of [job scheduling with Slurm](https://support.pawsey.org.au/documentation/display/US/Job+Scheduling) and [examples workflows](https://support.pawsey.org.au/documentation/display/US/Example+Workflows) like array jobs.

### How to submit a job

You would usually write a slurm script to submit your jobs. Once you have a script you use `sbatch` to submit this script. For example if you have a script called `first-job-script` then you use<br>

`sbatch first-job-script`<br>

to submit the slurm script and your job.

**Jobs need to request all resources they need or they will fail. This includes GPUs (default is zero) and walltime.** 

Below are examples for single thread, single node but multiple threads, MPI, and array job submission scripts. 
The different request flags mean the following:
<br>
`#SBATCH --nodes=[number]` - how many nodes the job will use<br>
`#SBATCH --ntasks-per-node=[number]` - This is 1 for single thread jobs and multi thread jobs. This is 256 (or less if single node) for MPI jobs.<br>
`#SBATCH --ntasks=[number]` - total number of tasks of the job. Relevant to MPI jobs (it is usually 1 for non-MPI jobs) and should be set to the total number of tasks for the job (what you would use with the -np or -n option for mpirun). This should be used instead of requesting number of nodes and tasks per node to enable faster scheduling of MPI jobs.<br> 
`#SBATCH --ntasks-per-core=[number]` - maximum  ntasks on each core. Use with `--ntasks=[number]` for MPI jobs and set to `--ntasks-per-core=1`.
`#SBATCH --cpus-per-task=[number]` - This is 1 for single thread jobs, number of threads for multi thread jobs. `--cpus-per-task` can be undertstood as `OMP_NUM_THREADS`. Do not use for MPI jobs.<br>
`#SBATCH --hint nomultithread` - This option may help in situations where your parallelisation (single node multicore or hybrid OpenMP+MPI) is confused by the numbers of cores/threads.<br>
<br>
`#SBATCH --mem=[number M|G|T]` - RAM per job given in megabytes (M), gigabytes (G), or terabytes (T). The full memory of 1.5 TB or 2TB or 3TB or 4TB is not available to jobs, therefore jobs asking for 1.5TB or 2TB or 3TB or 4TB (1500G or 2000G or 3000GB or 4000G) will NOT run. Ask for `1500000M` to get the maximum on an `epyc4` standard node. Ask for `2000000M` to get the maximum memory on a `epyc3` standard node and ask for `3000000M` to get the maximum memory on a `epyc5` standard node. Ask for `4000000M` to get the maximum memory on a high memory node. See note below why.<br>
`#SBATCH --mem-per-cpu=[number M|G|T]` - alternative to the request above, only relevant to MPI jobs. This request is per cpu, so RAM per core (MPI task) will be double what is requested here.<br>
<br>
`#SBATCH --gres=gpu:[type]:[number]` - to request the use of GPU on a GPU node. Please see description of partitions above for the available types of GPUs<br>
`#SBATCH --time=[hours:minutes:seconds]` - time the job needs to complete. Partition limits: `general` = 336 hours (2 weeks), `gpu_rocm, gpu_cuda, gpu_sxm, ext_intersect` = 168 hours (1 week).<br>
<br>
`#SBATCH --qos=[normal,gpu,debug,sdf]` - to request a quality of service for the job.<br>
`#SBATCH -o filename` - filename where the standard output should go to. See `man sbatch` for filename templating options.<br>
`#SBATCH -e filename` - filename where the standard error should go to. See `man sbatch` for filename templating options.<br>
`#SBATCH -job-name=[Name]` - Name for the job that is seen in the queue<br>
<br>
`#SBATCH --account=[Name]` - AccountString for your research or accounting group. All AccountStrings start with `a_`. Use the `groups` command to list your groups<br>
<br>
`#SBATCH --constraint=[epyc3, epyc4, or epyc5]` - to submit to a specific CPU architectures if required, needs to be applied with `--batch` below.<br>
`#SBATCH --batch=[epyc3, epyc4, or epyc5]` - to submit to the a specific CPU architecture, needs to be applied with `--constraint` above.<br>
<br>
`#SBATCH --partition=general/gpu_rocm/gpu_cuda/gpu_sxm/ext_intersect`<br>
<br>
`#SBATCH --array=[range]` - Indicates that this is an array job with range number of tasks. Range can be `0-999`. The maximum range value is 1000.<br>
<br>
`srun` - runs the executable using the resources you requested for this job. It will receive info on number of threads, memory, etc from Slurm. There is no need to specify them here.

See `man sbatch` and `man srun` for more options (use arrow keys to scroll up and down and `q` to quit)

***Default partition is general*** If you do not specify a partition when you submit you get the default partition. The default partition is `general` which is CPU only.  Important, the slurm defaults are usually not sufficient for most user jobs. If you want appropriate resources, you are required to request them.

***Standard outout and error***: Using the `SBATCH` options `-o` and `-e` with a `filename` in a script will result in the standard error and standard output file to appear as soon as the job starts to run. This behaviour is different to standard PBS behaviour on Tinaroo and FlashLite (unless you specified paths for those files there too) where the standard error, .e, and standard output, .o, files only appeared when the job was finished or had crashed.

***Default working directory***: In Slurm your job will start in the directory/folder you submitted from. This is different to PBS behaviour where your job started in your home directory. So on Bunya, using slurm, there is no need to change into the job directory, unless this is different to the directory you submitted from.

***$TMPDIR***: If your job produces temporary files during the calculation or if you need a space to write to that does not impact your quotas in `/home`, `/scratch/user` or `/scratch/project` then please use **$TMPDIR** during your calculations. **$TMPDIR** is automatically created at the start of a job and is then automatically deleted at the end of the job. It is therefore the best place to write temporary files (those not needed after the calculation is done) to. If you use **$TMPDIR** for output you wish to keep then please make sure you copy all needed files to a location in `/home`, `/scratch/user`, `/scratch/project` or `/QRISdata`. A big (all in one go) copy from **$TMPDIR** to `/QRISdata` (RDM) at the end of a job is possible.

***Note on maximum memory requests:*** The standard compute node has 2TB of physical memory available (or 4TB for the 3 high memory compute nodes). Not all of this can be given to jobs running on the compute node as the Linux operating system also needs resources. This is why the maximum requestable memory has been capped at 2000000MB for the standard compute nodes and 4000000MB for high memory compute nodes. 

So why is 2000000MB not the same as 2TB? 1024 MB = 1 GB and 1024 GB = 1 TB. This means 2000 GB = 2048000 MB which is larger than 2000000M which is set as the maximum available memory on a standard compute node.

***See [Slurm tips](https://github.com/UQ-RCC/hpc-docs/blob/main/guides/Slurm-Tips.md) on how to target a rage of GPUs, multiple partitions, and short jobs.***



