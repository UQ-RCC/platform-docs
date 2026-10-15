---
title: 'Bunya Hardware'
---

# Bunya Hardware

- Bunya has 113 AMD CPU nodes with 96 physical cores per compute node, 2 \* 48 core CPUs per node (roughly 10,600 cores) and 12 AMD CPU nodes with 256 physical cores per compute node, 2 \* 128 core CPUs per node (roughly 3,000 cores). Cores are requested by `--ntasks-per-node` or `--ntasks` and by `--ntasks-per-core=1`. 
- The queue allows 2 \* 96 = 192 threads per compute node or 2 \* 256 = 512 threads per compute node (requested by `--cpus-per-task` and by keeping `--ntasks=1` or `--ntasks-per-node=1`)  
- These CPUs are based on AMD epyc3 Milan (62, phase 1), epyc4 Genoa (51, 33 phase 2 and 18 in phase 3), and AMD epyc5 (12, in phase 4). 
- These CPU cores are based on the industry standard x86\_64 architecture.
- Each Bunya phase 1 standard compute node (epyc3) has 2TB of RAM (2000000M is the maximum that can be requested in jobs).
- Each Bunya phase 2 and 3 standard compute node (epyc4) has 1.5TB of ram (1500000M is the maximum that can be requested in jobs).
- Each Bunya phase 4 standard compute node (epyc5) has 3TB of ram (3000000M is the maximum that can be requested in jobs).
- There are also 3 high memory nodes (epyc3) that each have 4TB of RAM (4000000M is the maximum that can be requested in jobs).

- Bunya has 32 nodes of various types.
- There are 4 H100 SXM5 NVIDIA GPU nodes (intel Xeon SP4) with 4 H100 cards each (16 in total). Each H100 card has 80GB of GPU RAM. 
- There are 6 H100 PCIE NVIDIA GPU nodes (epyc3) with 3 H100 cards each (21 in total). Each H100 card has 80GB of GPU RAM.
- There is 1 H100 PCIE NVIDIA GPU nodes (epyc3) with MIG H100 cards leading to 6 MIG slices with 40GB of GPU RAM.
- There are 6 L40 NVIDIA GPU nodes (epyc3) with 3 L40 cards each (18 in total). Each L40 card has 48GB of GPU RAM. The L40 are good for visualisation and FP32 workloads.
- There are 2 L40s NVIDIA GPUs nodes (epyc4) with 3 L40s cards each (6 in total). Each L40s card has 48GB of GPU RAM. The L40s are good for visualisation and FP32 and FP16 workloads.
- There is 1 A100 NVIDIA GPU nodes (epyc3) with 3 A100 cards each, 1 A100 NVIDIA GPU node with 2 A100 cards. Each A100 card has 80GB of GPU RAM. 
- There are 2 A100 NVIDIA GPU nodes (epyc3) with MIG A100 cards leading to 12 MIG slices with 40GB of GPU RAM.
- There are 3 A16 NVIDIA GPU nodes (epyc4) with 12 A16 GPUs each (36 in total). The A16 GPU are good for vizualisation and accelerated desktops.
- There are 3 AMD Mi210 GPU nodes (2 epyc3 and 1 epyc4) with 2 Mi201 cards each (6 in total). Each Mi210 card has 64GB GPU RA.M.
- There are 2 AMD Mi300x GPU nodes (epyc4) with 8 Mi300x cards. Each Mi300x card has 192GB GPU RAM
- There are 3 AMD Mi355x GPU nodes (pecy5) with 8 Mi355x cards. Each Mi355x card has 288GB GPU RAM. 
- For a full table of all available compute nodes and their features like GPU, Memory and CPUs see [here](../../slurm/partitions)
 
- Users have a location in `/home` and `/scratch/user`. There are quotas on these locations for total GB _and_ total number of files. Refer to [Bunya UserData Guide](../../data/bunya-userdata-guide) 
- Users can run the command `rquota` to check on quotas and usage.
- Users can request more space and files in `/scratch/user`. Email rcc-support@uq.edu.au for the application form.
- Group leaders can request a shared scratch space for their group. Email rcc-support@uq.edu.au for the application form.
- Software and software environments should be installed in `/home` or `/scratch`. Software must not be installed on RDM (`/QRISdata`)
- Jobs should be run from `/scratch`. It is not advisable to use `/home` as the space to run (submit jobs) from. Jobs are not permitted to be submitted from RDM (`/QRISdata`).

- RDMs are located in `/QRISdata`. These are automounted and there is no need to request a RDM to be mounted on Bunya. 
- Use `ls /QRISdata/QNNNN/` (the `/` at the end is important) or `cd /QRISdata/QNNNN` to *see* your RDM (where QNNNN is your RDM number). Due to the automount the RDM needs to be *used* to be *seen*.
