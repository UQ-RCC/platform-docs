---
title: 'Available partitions'
---

# Available partitions

The available partitions on Bunya are
```
general
gpu_rocm
gpu_cuda
gpu_sxm
gpu_viz
ext_intersect
```

## Available partitions and nodes

The available compute nodes on Bunya are listed in the table below. Please note while some feature the same CPU or GPU type, the available memory and/or number of CPUs or architecture can differ. Be mindful of this when requesting resources for jobs.

**Maximum walltimes**:<br>
* general: 2 weeks (14 days, 336 hours)
* gpu_cuda, gpu_viz, gpu_rocm, gpu_sxm, ext_intersect : 1 week (7 days, 168 hours) 

**Default walltime for all partitions: 30 minutes**

**Default number of GPUs for all partitions: zero**

**gpu_viz** is used exclusively by onBunya. Users should not be submitting batch jobs via sbatch to the gpu_viz partition. The L40s GPUs are available through the gpu_cuda partition. <br>
**ext_intersect** is exclusive for ACU users.

See [Slurm tips](https://github.com/UQ-RCC/hpc-docs/blob/main/guides/Slurm-Tips.md) on how to target multiple partions and range of GPUs.

| Partition | Hostnames |  Count |  CPU Memory (MB) per node| CPUS per node| FEATURES | GRES per node| Charge Multiplier|
|:---|:---|:---:|---:|:---:|:---|:---|---:|
| general | bun[006-008] | 3 | 4000000 | 192 | epyc3 | (null) | 1 |
| general | bun[009-067] | 59 | 2000000 | 192 | epyc3 | (null) | 1 |
| general| bun[083-115,126-143] | 51 | 1500000 | 192 | epyc4 | (null) | 1 |
| general| bun[147-158] | 12 | 3000000 | 512 | epyc5 | (null) | 1 |
|||||||||
| gpu_cuda | bun003 | 1 | 2000000 | 256 | epyc3,<br> cuda,<br> cuda80gb | gpu:a100:3 | 50 |
| gpu_cuda | bun[004-005] | 2 | 2000000 | 256 | epyc3,<br> cuda,<br> cuda40gb | gpu:nvidia_a100_80gb_pcie_3g.40gb:3<br> gpu:nvidia_a100_80gb_pcie_4g.40gb:3| 24 <br> 26 |
| gpu_cuda | bun068 | 1 | 2000000 | 192 | epyc3,<br> cuda,<br> cuda80gb | gpu:a100:2 | 50 |
|||||||||
| gpu_cuda | bun071 | 1 | 2000000 | 192 | epyc3,<br> cuda,<br> cuda40gb | gpu:nvidia_h100_80gb_pcie_3g.40gb:3<br> gpu:nvidia_h100_80gb_pcie_4g.40gb:3 | 45 <br> 55 |
| gpu_cuda | bun[072-076,116] | 6 | 2000000 | 192 | epyc3,<br> cuda,<br> cuda80gb | gpu:h100:3 | 100 |
| gpu_sxm | bun[118-120] | 3 | 1000000 | 192 | xeonsp4,<br> cuda,<br> cuda80gb,<br> sxm | gpu:h100:4 | 100 |
|||||||||
| gpu_viz | bun[077-082] | 6 | 2000000 | 192 | epyc3,<br> cuda,<br> cuda48gb | gpu:l40:3 | 40 |
| gpu_cuda <br> gpu_viz | bun[124-125] | 2 | 750000 | 192 | epyc4,<br> cuda,<br> cuda48gb | gpu:l40s:3 | 42 |
| gpu_viz | bun[121-123] | 3 | 750000 | 192 | epyc4,<br> cuda | gpu:a16:12 | 6 |
|||||||||
| gpu_rocm | bun[001-002] | 2 | 500000 | 192 | epyc3,<br> rocm | gpu:mi210:2 | 50 |
| gpu_rocm | bun070 | 1 | 380000 | 64 | epyc4,<br> rocm | gpu:mi210:2 | 50 |
| gpu_rocm | bun144 | 1 | 2000000 | 192 | epyc4, <br> rocm | gpu:mi300x:8 | 100 |
| gpu_rocm | bun145 | 1 | 2000000 | 128 | epyc4, <br> rocm | gpu:mi300x:8 | 100 |
| gpu_rocm | bun[159-161 | 3 | 2300000 | 192 | epyc5, <br> rocm | gpu:mi355x:8 | 150 |
|||||||||
| ext_intersect | bun117 | 1 | 1000000 | 192 | xeonsp4,<br> cuda,<br> cuda80gb,<br> sxm | gpu:h100:4 | 100 |

## Maximum CPU resources per GPU

>[!IMPORTANT] 
>Users should be mindful of the CPU resources per node when requesting GPU resources. Over requesting CPU resources such as the number of CPUs and CPU ram can unintentionally block other GPUs on the same node being used as the CPU resources of other jobs cannot be accommodated even if GPUs are still free. This can lead to unnecessary wait time for other user's jobs and might lead to GPU resources being left idle. Users should request the resources that their job needs to run and not just arbitrary CPU resources or just always the same CPU resources. Users are required to check the resource utilisation of their jobs and adjust future job accordingly.
>Jobs that are found to not utilise the resources they have requested and are blocking free GPUs being used may be terminated.  

This table shows what are appropriate maximum CPU resource requests per GPU, depending on the GPU and GPU node.

| Partition | Hostnames |  Count | Max CPU Memory (MB) per GPU| Max CPUS per GPU | FEATURES | GPUs per node | multiplier per GPU|
|:---|:---|:---:|---:|:---:|:---|:---|---:|
| gpu_cuda | bun003 | 1 | 700000 | 86 | epyc3,<br> cuda,<br> cuda80gb | gpu:a100:3 | 50 |
| gpu_cuda | bun[004-005] | 2 | 333000 | 42 | epyc3,<br> cuda,<br> cuda40gb | gpu:nvidia_a100_80gb_pcie_3g.40gb:3, <br> gpu:nvidia_a100_80gb_pcie_4g.40gb:3| 24 |
| gpu_cuda | bun068 | 1 | 1000000 | 96 | epyc3,<br> cuda,<br> cuda80gb | gpu:a100:2 | 50 |
|||||||||
| gpu_cuda | bun071 | 1 | 333000 | 32 | epyc3,<br> cuda,<br> cuda40gb | gpu:nvidia_h100_80gb_pcie_3g.40gb:3, <br> gpu:nvidia_h100_80gb_pcie_4g.40gb:3 | 50 |
| gpu_cuda | bun[072-076,116] | 6 | 700000 | 64 | epyc3,<br> cuda,<br> cuda80gb | gpu:h100:3 | 100 |
| gpu_sxm | bun[118-120] | 3 | 250000 | 48 | xeonsp4,<br> cuda,<br> cuda80gb,<br> sxm | gpu:h100:4 | 100 |
|||||||||
| gpu_cuda <br> gpu_viz | bun[077-082] | 6 | 700000 | 64 | epyc3,<br> cuda,<br> cuda48gb | gpu:l40:3 | 40 |
| gpu_cuda <br> gpu_viz | bun[124-125] | 2 | 250000 | 64 | epyc4,<br> cuda,<br> cuda48gb | gpu:l40s:3 | 42 |
| gpu_viz | bun[121-123] | 3 | 64000 | 16 | epyc4,<br> cuda | gpu:a16:12 | 6 |
|||||||||
| gpu_rocm | bun[001-002] | 2 | 250000 | 96 | epyc3,<br> rocm | gpu:mi210:2 | 50 |
| gpu_rocm | bun070 | 1 | 190000 | 32 | epyc4,<br> rocm | gpu:mi210:2 | 50 |
| gpu_rocm | bun144 | 1 | 250000 | 24 | epyc4, <br> rocm | gpu:mi300x:8 | 100 |
| gpu_rocm | bun145 | 1 | 250000 | 16 | epyc4, <br> rocm | gpu:mi300x:8 | 100 |
| gpu_rocm | bun[159-161] | 3 | 287500 | 24 | epyc5, <br> rocm | gpu:mi355x:8 | 150 |
|||||||||
| ext_intersect | bun117 | 1 | 250000 | 48 | xeonsp4,<br> cuda,<br> cuda80gb,<br> sxm | gpu:h100:4 | 100 |

