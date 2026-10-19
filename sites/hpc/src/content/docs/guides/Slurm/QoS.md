---
title: 'Available QoS'
---

# Available Quality of Service (QoS)

```
normal
debug
short
sdf
gpu
viz
```
<br>

## QoS use and limits

QoS are used to control access to resources and apply sustainable limits.<br> 

**Important:**<br>
* viz for onBunya jobs only.
* onBunya Accelerated Desktops with 2 or 3 GPUs will be submitted with the gpu QoS.
* gpu still requires that at least one GPU is requested for the job as the default for number of GPUs is zero.
* The max of H100 GPUs is 4 across all QoS and paritions.
* FairShare usage limit is 15 million BillingMinutes per user, see [here](../fairshare/#assocgrpbillingminutes)
* The task limit on array jobs is 1000.
* See [Slurm Tips](../slurm-tips) on using different QoS for short jobs.


| QOS |  Partitions |  Access| Priority | All User Group limit | User limits |
|:---|:---|:---:|:---:|:---|:---|
|||||||
| normal | general | open | 10 | 20000 CPUs, <br> 200 T CPU memory | 2 weeks,</br>1536 CPUs,<br> 16 T CPU memory,<br> 0 GPUs,<br> 5000 jobs submitted | 
| debug | general,<br> gpu_rocm,<br> gpu_cuda,<br> gpu_viz,<br> ext_intersect | open | 30 | none | 1 hour, <br> 1536 CPUs, <br> 16 T CPU memory, <br> 4 GPUs, <br> 2 jobs running, <br> 20 jobs submitted |
| short | general,<br> gpu_rocm,<br> gpu_cuda,<br> gpu_viz | open | 20 | none | 12 hours, <br> 1536 CPUs, <br> 16 T CPU memory, <br> 4 GPUs, <br> 2 jobs running, <br> 20 jobs submitted |
| gpu | gpu_rocm,<br> gpu_cuda,<br> gpu_viz,<br> ext_intersect | open | 10 | none | 1 week,</br> 256 CPUs, <br> 2 T of CPU memory, <br> 4 GPUs, <br> 4 jobs running, <br> 100 jobs submitted |
|sdf | gpu_rocm| approved users | 10 | none | 256 CPUs, <br> 2 T CPU memory, <br> 8 GPUs |
| viz | general, <br> gpu_viz| onBunya only | 30 | none | 1 day,<br> 192 CPUs (96 CPU per job), <br> 500G per job, <br> 2 GPUs (1 GPU per job), <br> 2 running jobs, <br> 20 jobs submitted | 


