---
title: 'Monitoring, cancelling jobs and job utilisation'
---

# How to monitor your jobs and the resource utilisation of your jobs

## How to show jobs

`squeue`<br>

Bunya is configured that users can only list their own jobs. The `squeue` command without any options is equivalent to the options below.

`squeue -u YourUsername`<br>
`squeue -u $USER`<br>
`squeue --me`<br>

## Some formatting ideas for more detailed squeue reports

Here are some other useful additions to the squeue command. For information on what all these means please consult the man pages.

```
squeue -o "%.18i %.9P %.8j %.8u %.8T %.10M %.9l %.6D %.10a %.4c %R"
JOBID  PARTITION  NAME  USER  STATE  TIME TIME_LIMIT NODES  ACCOUNT  MIN_CPU  NODELIST(or REASON)
```

```
squeue -o "%12i %7q %.9P %.20j %.10u %.2t %.11M %.4D %.4C %.14b %8m %16R %18p %10B %.10L" 
JOBID QOS PARTITION NAME USER STATE TIME NODE CPUS TRES_PER_NODE MIN_MEMORY NODELIST(REASON) PRIORITY EXEC_HOST TIME_LEFT
```
```
#One for the MPI users, perhaps!
squeue -o "%.7i %.9P %.8j %.8u %.2t %.10M %.6D %C"
JOBID PARTITION     NAME     USER ST       TIME  NODES CPUS
```

## When you are wondering why your job has not started

### Check the REASON in your squeue output

Checking the REASON field of the squeue output should provide you with some clue.
The manual page for the squeue command lists the most commonly encountered reasons.
They can be found in the "JOB REASON CODES" section of the `man squeue` command output or online [here](https://slurm.schedmd.com/squeue.html#SECTION_JOB-REASON-CODES).
A full list of job reasons can be found on [this web page](https://slurm.schedmd.com/resource_limits.html#reasons) 

### QOSGrpCpuLimit or QOSGrpMemLimit

[20241024] A recent change was made to the batch system configuration to accommodate the Bunya Phase 3 hardware and associated workloads. It makes greater use of the QOS feature of SLURM. 
So you may now see the REASON given as "QOSGrpCpuLimit" or perhaps "QOSGrpMemLimit" for why your job is queued and not running. 
When it says that it means that Bunya is currently very busy and there is no available space for your job, at the moment. Previously it would have said something to the effect of Resources are unavailable.

Your jobs _will_ eventually start, if, you leave them in the queue!

## Using sinfo to shows status report of Bunya nodes

The sinfo command is used to obtain information about the actual nodes.<br>
You can request the report for a single or all partitions.<br>
Some of the more commonly seen values for the STATE are: 
* idle => nothing running so completely empty
* mix => running jobs but have space available
* drain or drng => drained or draining ... will finish current jobs and await maintenance work
* alloc => fully allocated so no space available
<br>
Here's a snippet for GPU partitions and nodes. So 3 CUDA nodes and 2 VIZ nodes are empty.

```
PARTITION  AVAIL  TIMELIMIT  NODES  STATE NODELIST
gpu_cuda      up 7-00:00:00     14    mix bun[003-004,068,071-079,082,116]
gpu_cuda      up 7-00:00:00      3   idle bun[005,080-081]
gpu_viz       up 7-00:00:00      4    mix bun[077-079,082]
gpu_viz       up 7-00:00:00      2   idle bun[080-081]
```

Here some useful examples.

```
sinfo -o "%n %e %m %a %c %C"
which yields
HOSTNAMES FREE_MEM MEMORY AVAIL CPUS CPUS(A/I/O/T)
```

`sinfo -O Partition,NodeList,Nodes,Gres,CPUs`<br>

```
sinfo -o "%.P %.5a %.10l %.6D %.6t %N %.C %.E %.g %.G %.m"
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST CPUS(A/I/O/T) REASON GROUPS GRES MEMORY
```

## How to know what resources are actually being utilised by a job?

It is also very important that your jobs do not occupy valuable HPC resources and _not_ utilise them.
The fairshare system calculates your usage based on the resources you requested.
If you order a lot of food, but you don't eat it all, then you still pay for the food you ordered.
HPC's don't have a mechanism like doggy bags ;-)

The fairshare system will account for your usage based on the resources (CPU and/or MEM) you requested even if you did not consume them all. That is because no one else could used those resources while your job was running. A job that finishes earlier than the requested walltime does get charged less.

We often don't know in advance how much resource a set of jobs may require. 
You may have some idea based on calculations you have performed on a workstation or other HPC cluster.
Obviously if your software cannot utilised a GPU resource you would never request it.
But if you have CPU code that is expected to run faster on a single node in shared memory (OpenMP) mode, or on multiple nodes in message passing interface (MPI) mode, then you should be certain that you are getting the performance gains that you expect.

To prevent users unintentionally reducing their fair share RCC is starting to automatically delete jobs that leave GPU resources idle. The parameters for automatic deletion are:<br>

* GPU job
* Runtime of at least 12 hour
* At least 3 hours of walltime left
* Idle GPU resources for the last 4 hours


### Jobstats and onBunya Job Stats Helper dashboard

You can use the `jobstats` module to check utilisation of running and completed jobs. It will show **max** CPU, **max** CPU Ram, **average** GPU, and **max** GPU Ram utilisation over the elapsed runtime of the job. Jobstats works on running and finihsed jobs.

Jobstats provides a direct link in the comments to a graphical dashboard in onBunya to show resource utilistaion for whole runtime interval.

Please note that for MPI jobs a max CPU utilisation of 50% means an effective 100% utilisation (if `ntasks` have been requested with `--ntasks-per-core=1`) as MPI jobs need to run on core and not cpus (threads). For MPI jobs only as CPU RAM has been requested as `--mem-per-cpu` with `--ntasks-per-core=1` the allocated RAM will be double of what has been requested.

```
module load jobstats/2024.08
jobstats JobID
```
### sacct for completed jobs

The `sacct` command can be used to report CPU and Memory utilisation by a completed job.
```
sacct -p  -a -S now-48hours --format JobID,User,Group,State,Cluster,AllocCPUS,REQMEM,TotalCPU,Elapsed,MaxRSS,ExitCode,NNodes,NodeList,NTasks -u $USER
```
yields these metrics
```
|JobID|User|Group|State|Cluster|AllocCPUS|ReqMem|TotalCPU|Elapsed|MaxRSS|ExitCode|NNodes|NodeList|NTasks|
```
Notes:
* Each job will result in three of slightly different lines of output. 
* The requested memory is in the first line and the MaxRSS value is in the second line of the three lines for each job.
* Without specifying the start time (using `-S now-48hours`) for the report, sacct will report just your jobs for today (i.e. since midnight)
* You can use the `-j JobID` option to generate a report for a single job. 

### seff for completed jobs

The perl utility script /usr/local/bin/seff will generate a brief more readable report of the total resource utilisation (CPU and MEM). It does not report on GPU utilisation.

Please note that for MPI jobs a max CPU utilisation of 50% means an effective 100% utilisation (if `ntasks` have been requested with `--ntasks-per-core=1`) as MPI jobs need to run on core and not cpus (threads). For MPI jobs only as CPU RAM has been requested as `--mem-per-cpu` with `--ntasks-per-core=1` the allocated RAM will be double of what has been requested.

```
seff JobID
```

## Cancelling a job

If you see that your job is not performing as expected, or is not properly utilising the resources you requested, then you should cancel the job. 

Use the *`scancel`* command to cancel the job. You can cancle an individaul job or job array element, or an entire job array.

Before resubmitting the job, review the job resource request and job inputs and code.


