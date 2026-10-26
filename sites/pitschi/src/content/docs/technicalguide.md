---
title: "Technical guide"
---

# Status
In construction

# Purpose
This technical guide explains the components of Pitschi and how they work together.

# Components
Pitschi employs two methods of moving data from instrument computer (camera computer to be exact) to the RDM. 

If Pitschi can be installed directly into the camera computer, it will use the direct transfer method.

![image](images/direct-sync.png)

In for some reasons, the camera computer cannot be modified, or the RDM cannot be mounted directly to the camera computer, then the indirect method is used. In this mode, the data is synced via a third party computer (support machine, preprocessing computer).

![image](images/indirect-sync.png)

Pitschi relies on the [MeDICI](https://rcc.uq.edu.au/data-storage) for data movement and [UQ RDM](https://research.uq.edu.au/rmbt/uqrdm) for data storage. The booking information is queried from PPMS.

Pitschi consists of the following components:
* **[Clowder](https://github.com/UQ-RCC/clowder)**: a modified version of the Clowder framework for data management and automatic metadata extraction
* **[XAPI](https://github.com/UQ-RCC/xapi)**: an API to manage data importation from RDM storage collections. The booking information from PPMS is cached in this XAPI as well. 
* **[Pitschi-cli](https://github.com/UQ-RCC/pitschi-cli)**: A desktop client residing in the instrument computers for syncing datasets and files to the project's storage collection.  
* **[DataMover](https://github.com/UQ-RCC/pitschidatamover)**: a Web service to handle 1) mounting of correct collection to the third party computer 2) sync the data and 3) ingest the data to Clowder. This Web service provides a client, which can be accessible from the camera machine.

# Deployment
Pitschi is deployed on a [Docker Swarm Cluster](https://docs.docker.com/engine/swarm/) on top of the [QRISCloud](https://www.qriscloud.org.au/) (OpenStack) research cloud. [Ansible](https://www.ansible.com/) 2.9 is used provision the stack. The deployment code can be found [here](https://github.com/UQ-RCC/ansible-swarm-clowder)




# Data management
![image](images/clowder_datamodel.png)

In Clowder, space is the highest level in hierarchy of data organization. Space consists of datasets, and within datasets, there are files and folders. Collection is a group of datasets. Users can generally create spaces by themselves and within each space and dataset, what users can do is limited by their roles. A more detailed description of Clowder can be found [here](https://clowder-framework.readthedocs.io/en/latest/userguide/ug_index.html)

In Pitschi, while the data hierarchy is the same, we have modified the access control to fit our data flow. This section of the guide details how data management is done is Pitschi.

## User accounts and access controls
In Pitschi, manual creation of accounts and spaces is disabled. Instead, projects and its accounts are synced from PPMS. 

UQ users will need to use UQ SSO to log into Pitschi, while external accounts are created using email address supplied from PPMS. 

## Data organisation

### Overview

### Project level data organisation

# Data ingestion

## Web ingestion
![image](images/webingestion.png)

## RDM ingestion - direct
![image](images/rdm_ingestion.png)

## RDM ingestion - indirect
![image](images/rdm-indirect-ingestion.png)
