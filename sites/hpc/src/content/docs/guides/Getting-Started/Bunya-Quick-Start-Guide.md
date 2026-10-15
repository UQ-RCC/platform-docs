---
title: UQ Bunya HPC Quick Start Guide
---

## 1. Access Bunya

Before using Bunya you must have:

- [An approved Bunya account](../../apply-for-bunya-access/apply-for-access).
- Multi-factor authentication configured.
- Be a member of a Bunya Slurm accounting group.

:::danger 
Do not share passwords, ssh keys or your multifactor authentication.
:::

Connect using SSH:

```
ssh username@bunya.rcc.uq.edu.au
```

Alternatively, use **onBunya** ([the Web Interface)](../../onbunya/ondemand-guide) for interactive applications such as Jupyter, RStudio and VS Code. 

Important:

- VS Code and other IDEs are not permitted on Bunya login nodes
- Remote tunnelling to Bunya is not permitted

[More information](../../accessing-bunya/connecting-to-bunya).

---

## 2. Understand the filesystems

Bunya provides several storage locations:

| Location | Purpose |
|----------|---------|
| `/home` | Configuration files, software, scripts |
| `/scratch/user` | Temporary working data |
| `/scratch/project` | Shared group workspaces |
| `/QRISdata` | RDM-Q and legacy storage allocations (long-term research data storage) |
| `/scratch/opendata` | Shared open data sets and models |
| `/scratch/licenseddata` | Shared licensed data sets |

Important:

- Scratch storage is temporary.
- Files in `/scratch/user` and `/scratch/project` that have not been accessed for 90 days may be automatically deleted.
- Users should move important data to an appropriate long-term storage solution.

For more information, including quotas on `/home` and `/scratch`, and appropriate usage of `/QRISdata` see the [Guide on User Data Spaces and Quotas](../../data/bunya-userdata-guide) and the [UQRDM Access on Bunya Guide](../../data/rdm-guide).

---

## 3. Load Software Modules

Bunya uses software modules, see [here](../../software/softwaremodules) for more information.

Find available software, use keywords:

```
module avail
module avail miniforge
```

Load software, name and version required:

```
module load miniforge/26.1.0-0
```

Check loaded modules:

```
module list
```

Many common research applications, compilers, MPI libraries and scientific software packages are available through modules. For a compact list of Bunya software modules and onBunya applications see [here](../../software/list-of-software).
 
---

## 4. Test an interactive job

Bunya uses the **Slurm** workload manager for scheduling jobs. 

Do not run computational workloads on the login nodes. Interactive work, including software installations, software compilations, quick tests, should be performed inside an allocated job. 

[Example interactive session](../../slurm/interactivejobs/#interactive-jobs-1):

```
salloc --nodes=1 --ntasks-per-node=1 --cpus-per-task=1 --mem=5G --job-name=CHANGE-ME --time=01:00:00 --partition=general --qos=debug --account=AccountString srun --export=PATH,TERM,HOME,LANG --pty /bin/bash -l
```
- Change *AccountString* to your assigned [AccountString](../../slurm/interactivejobs/#what-is-my-accountstring-)

---

## 5. Submit your first batch job

For information on all the different options for Slurm scripts see [here](../../slurm/batchjobs)

Create a script called `hello.slurm`:

```
#!/bin/bash --login
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=10G
#SBATCH --job-name=hello
#SBATCH --time=1:00:00
#SBATCH --qos=debug
#SBATCH --partition=general
#SBATCH --account=AccountString  ##FIX THIS
#SBATCH -o slurm-%j.output
#SBATCH -e slurm-%j.error

# module loads go before starting your program
# use srun before the executable 

echo "Hello from Bunya"
hostname
date
```
- Change *AccountString* to your assigned [AccountString](../../slurm/interactivejobs/#what-is-my-accountstring-)

Submit the job:

```
sbatch hello.slurm
```

Monitor it:

```
squeue 
```
The output will be in `slurm-JobID.output`.

See example scripts for [CPU single node](../../slurm/exampleslurmscripts/#simple-script-for-cpus-and-single-node), [CPU MPI](../../slurm/exampleslurmscripts/#simple-mpi-script-using-192-cores-as-an-example-using-ntasks-will-spread-the-job-over-multiple-nodes-where-there-is-space), [job array](../../slurm/exampleslurmscripts#job-arrays).

Please check available [partitions](../../slurm/partitions) and associated hardware and available [QoS](../../slurm/qos) and their limits.
 
---

## 6. Running GPU Jobs

Available GPU partitions include:

- `gpu_cuda`
- `gpu_rocm`
- `gpu_sxm` 
- `gpu_viz` (only for onBunya use) 

Example GPU request:

```
#SBATCH --partition=gpu_cuda
#SBATCH --gres=gpu:h100
#SBATCH --qos=gpu
```
Only request GPUs you can actively use. Jobs that leave GPUs idle are automatically terminated.

See example scripts for [Cuda GPUs](../../slurm/exampleslurmscripts#simple-script-for-cuda-gpus) and [ROCM GPUs](../../slurm/exampleslurmscripts#simple-script-for-amd-rocm-gpus).

---

## 7. Monitor Resource Usage

A useful monitoring tool is:

```
module load jobstats/2024.08
jobstats <jobid>
```
This displays max CPU, max CPU and GPU memory, and average GPU utilization for running and completed jobs. It also provides a link to a graphical dashboard showing the jobs history.

---

## 8. Using Conda (Optional)

For Python workflows:

```
module load miniforge/2026.1.0-0
source $ROOTMINIFORGE/etc/profile.d/conda.sh

conda create -n myenv python=3.11
conda activate myenv
```
For guidance on managing Conda environments on Bunya see the [Conda guide](../../software/conda-environment).

---

## 9. Good Practices

✅ Run computations through Slurm jobs  
✅ Keep large datasets in shared spaces provided  
✅ Use scratch space for active computation  
✅ Monitor utilization and optimize resource requests  
✅ Use onBunya for interactive tools and IDEs  

❌ Do not run Python, R, compilations, or IDEs or filesystem intensive tasks (e.g. copy, rsync, tar, zip/unzip) directly on login nodes 

---

