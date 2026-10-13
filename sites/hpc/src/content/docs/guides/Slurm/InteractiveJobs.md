---
title: 'Interactive Jobs'
---

# Interactive jobs

## Do not run on the login nodes

>[!WARNING]
>Users are reminded that no computing task, no matter how quick or small, should be run on the login nodes. So no, the quick python or R or bash script or similar should NOT be just quickly run from the command line as it is so much more convenient. **All calculations, installations and file operations are required to be done on the compute nodes.**
>
>This includes software installations. Conda create, pip installs and R install.packages should be run via an interactive job not on the login nodes. Software installations using make and then make install (or cmake) especially are not suitable to be done on a login node. For these users should be careful choosing the correct architecture, see [here](https://github.com/UQ-RCC/hpc-docs/blob/main/guides/Bunya-User-Guide.md#how-to-build-your-own-software)
>
>Users can use interactive jobs which will give them that command line feel and flexibility and allow the use of graphical user interfaces. Users who need a Graphical User Interface (GUI) should consult the [onBunya User Guide](./OnDemand-Guide.md). 
>
>Users have access to a `debug` QoS for quick testing of new jobs and codes etc.
>
>Processes that should not be running on the login nodes may be terminated without explanation.

## Interactive jobs

User should use interactive jobs to do quick testing and if they need to use a graphical user interface (GUI) to run their calculations. This could include jupyter, spider, etc. 
Filesystem operations (e.g. housekeeping tasks, packing and unpacking data sets, copying data from/to RDM or scratch, pulling data from external sources) is much more efficient on a compute node compared with the login nodes.

The salloc is used to submit an interactive job and you should specify the required resources via the command line. IMPORTANT: Interactive jobs should be limited to a single node. Multinode jobs are required to be submitted as a batch job.

**Jobs need to request all resources they need or they will fail. This includes GPUs (default is zero) and walltime.** 

### How do I launch an interactive job ?

**Use this full command line to create an interactive session on a compute node. Use the copy icon on the right hand side.**
<br>
```
salloc --nodes=1 --ntasks-per-node=1 --cpus-per-task=1 --mem=5G --job-name=CHANGE-ME --time=01:00:00 --partition=general --qos=debug --account=AccountString srun --export=PATH,TERM,HOME,LANG --pty /bin/bash -l
```
Once you are done type `exit` on the command line which will stop any processes still running and will release the allocation for the job.


>[!WARNING]
>For interactive work, we recommend that you combine `salloc` and `srun`, as shown above, to ensure that your session switches to a Bunya compute node and does not remain on the login node.
><br><br>
>You can use the salloc, followed by separate srun commands, however _*every*_ command that you wish to run on the allocated compute node must be explicitly `srun`.  Otherwise, that processing will happen on your login node.
><br><br>
>In either case, once the walltime of the salloc has elapsed, the job will terminate and the control will return to your login node. In that case, any subsequent commands will run on the login node and will cause problems. Always confirm what node you are on, before running computations on Bunya. 

### How can I confirm that I am running on a compute node ?

Your shell login prompt will usually include the name of the node. 
However, some people sometimes don't see that (notably when they use conda environments).

You can use the command<br>
`hostname`<br>
to check that you are on a compute node. If the command output includes `bunya1`, `bunya2`, `bunya3`, `bunya4`, or `bunya5` then you are still on a login node. <br> **Do not start your calculation, compile or environment install on a login node.* Make sure you are on a compute node. 

When an interactive job reaches the walltime, the job will terminate and your login session will return to the login node. Again, check your login prompt or use the `hostname` command to confirm you are on a compute node before doing work.

### Which Partition and QoS ?

Please use `--partition=general` unless you need access to GPUs. The `general` partition has `epyc3`, `epyc4`, and `epyc5` architecture CPUs. The `--qos=debug` has a higher priority but has a walltime limit of 1 hour and limits number of jobs per user. Use `--qos=normal` to submit standard jobs. The `normal` QoS does not allow GPUs. 

### What is my AccountString ?

Use the `groups` command to list your groups- Bunya Account Strings will begin a_ . Replace `AccountString` with your actual accounting group in the `--account=` option. This is the AccountString for your research or accounting group. All AccountStrings start with a_. Use the `groups` command to list your group memberships and grab the one that begins with `a_` characters.

### What if I need a particular CPU type ?

To target an `epyc3` compute node add `--constraint=epyc3` to the `salloc` part. To target an `epyc4` compute node add `--constraint=epyc4` to the `salloc` part. To target an `epyc5` compute node add `--constraint=epyc5` to the `salloc` part.

### What about using a GUI ?

If you need to run a GUI then add the option `--x11` to the `salloc` part.

### What about using a GPU interactively ?

For an interactive session on the `gpu_rocm` or `gpu_cuda`  partitions you will need to add `--gres=gpu:[type]:[number]` to the `salloc` request and use `--qos=gpu` instead of `--qos=normal`. It is important that you use a **`[type]`** to get the correct GPU card for your job.

To target a particular GPU RAM in the `gpu_cuda` partition, especially an A100 and H100 MIG slice add `--constraint=cuda40gb`, or `--constraint=cuda80gb` to target a card with the full GPU RAM to the `salloc` part.

See [here](https://github.com/UQ-RCC/hpc-docs/blob/main/guides/Bunya-User-Guide.md#available-partitions-and-nodes) for a full list of partitions, QoS, GPU types and other features.

See [here](https://github.com/UQ-RCC/hpc-docs/blob/main/guides/Slurm-Tips.md) for tips on how to target different sets of GPUs and submit short jobs on Bunya.

