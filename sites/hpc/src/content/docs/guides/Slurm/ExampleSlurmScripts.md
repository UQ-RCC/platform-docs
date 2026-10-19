---
title: 'Example Slurm Scripts'
---

## Simple script for CUDA GPUs.

```
#!/bin/bash --login
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=10G
#SBATCH --job-name=CHANGE-ME
#SBATCH --time=1:00:00
#SBATCH --qos=gpu
#SBATCH --partition=gpu_cuda
#SBATCH --gres=gpu:nvidia_a100_80gb_pcie_3g.40gb:1
#SBATCH --account=AccountString
#SBATCH -o slurm-%j.output
#SBATCH -e slurm-%j.error

module-loads-go-here

srun executable < input > output
```
For full A100 change to<br>
`#SBATCH --gres=gpu:a100:1`<br>

For H100 change to<br> 
`#SBATCH --gres=gpu:h100:1`<br>

For L40s change to<br> 
`#SBATCH --gres=gpu:l40s:1`<br>


## Simple script for AMD ROCM GPUs.

**Nodes bun001, bun002, bun070, bun144, bun145, and bun159 - bun161. These are AMD GPUs. You most likely will need to compile your own code or use a container to run on these.**

```
#!/bin/bash --login
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=10G
#SBATCH --job-name=CHANGE-ME
#SBATCH --time=1:00:00
#SBATCH --qos=gpu
#SBATCH --partition=gpu_rocm
#SBATCH --gres=gpu:mi210:1 #you can ask for up to 2 here
#SBATCH --account=AccountString
#SBATCH -o slurm-%j.output
#SBATCH -e slurm-%j.error

module-loads-go-here

srun executable < input > output
```
For Mi300x change to<br>
`#SBATCH --gres=gpu:mi300x:1`<br>
With `--qos=gpu` you can ask for up to 4<br>
With `--qos=sdf` you can ask for all 8<br>

For Mi355x change to<br>
`#SBATCH --gres=gpu:mi355x:1`<br>
With `--qos=gpu` you can ask for up to 4<br>
With `--qos=sdf` you can ask for all 8<br>

## Simple script for CPUs and single node

```
#!/bin/bash --login
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=10G
#SBATCH --job-name=CHANGE-ME
#SBATCH --time=1:00:00
#SBATCH --qos=normal
#SBATCH --partition=general
#SBATCH --account=AccountString
#SBATCH -o slurm-%j.output
#SBATCH -e slurm-%j.error

module-loads-go-here

srun executable < input > output
```

To ask for more than 1 thread change the line

`#SBATCH --cpus-per-task=12`

To run over 12 threads for example.


You can target specific architectures like `epyc3` (phase 1), `epyc4` (phase 2-3), `epcy5 (phase 4) by adding

```
#SBATCH --constraint=[epyc3, epyc4, or epyc5]
#SBATCH --batch=[epyc3, epyc4, or epyc5]
```


## Simple MPI script (using 192 cores, as an example). Using --ntasks will spread the job over multiple nodes where there is space.

```
#!/bin/bash --login
#SBATCH --ntasks=192
#SBATCH --ntasks-per-core=1
#SBATCH --mem-per-cpu=5G
#SBATCH --job-name=MPI-CHANGE-ME
#SBATCH --time=1:00:00
#SBATCH --qos=normal
#SBATCH --partition=general
#SBATCH --account=AccountString
#SBATCH -o slurm-%j.output
#SBATCH -e slurm-%j.error

module-loads-go-here

srun executable < input > output
```

You can target specific architectures like `epyc3` (phase 1), `epyc4` (phase 2-3), `epyc5` (phase 4) by adding

```
#SBATCH --constraint=[epyc3, epyc4, or epyc5]
#SBATCH --batch=[epyc3, epyc4, or epyc5]
```

## Job Arrays

Here is one example of an array job script with 5 array tasks. Important: Request resources for a single task and not resources for all together.

```
#!/bin/bash --login
#SBATCH --job-name=array-CHANGE-ME
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=5G
#SBATCH --time=00:01:00
#SBATCH --qos=normal
#SBATCH --partition=general
#SBATCH --account=AccountString
#SBATCH --output=test_array_%A_%a.out
#SBATCH --array=1-5

module-loads-go-here

srun executable < input > output
```

Useful variables for array jobs

`$SLURM_ARRAY_JOB_ID` = Job array's master job ID number.<br>
`$SLURM_ARRAY_TASK_COUNT` = Total number of tasks in a job array.<br>
`$SLURM_ARRAY_TASK_ID` = Job array ID (index) number.


You can target specific architectures like `epyc3` (phase 1), `epyc4` (phase 2-3), `epyc5` (phase 4) by adding

```
#SBATCH --constraint=[epyc3, epyc4, or epyc5]
#SBATCH --batch=[epyc3, epyc4, or epyc5]
``````


