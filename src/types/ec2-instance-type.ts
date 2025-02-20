// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/** EC2 Instance Type */
export class Ec2InstanceType {
    /**
     * a1
     * - vCPUs: 16
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly A1 = 'a1';

    /**
     * a1.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly A1_2XLARGE = 'a1.2xlarge';

    /**
     * a1.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly A1_4XLARGE = 'a1.4xlarge';

    /**
     * a1.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly A1_LARGE = 'a1.large';

    /**
     * a1.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly A1_MEDIUM = 'a1.medium';

    /**
     * a1.metal
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly A1_METAL = 'a1.metal';

    /**
     * a1.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton Processor
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly A1_XLARGE = 'a1.xlarge';

    /**
     * c1.medium
     * - vCPUs: 2
     * - Memory: 1.7 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Storage: 1 x 350 SSD
     * - GPU Memory: NA
     */
    public static readonly C1_MEDIUM = 'c1.medium';

    /**
     * c1.xlarge
     * - vCPUs: 8
     * - Memory: 7 GiB
     * - Network: High
     * - Processor: Intel Xeon Family
     * - Storage: 4 x 420 SSD
     * - GPU Memory: NA
     */
    public static readonly C1_XLARGE = 'c1.xlarge';

    /**
     * c3
     * - vCPUs: 32
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2680 v2 (Ivy Bridge)
     * - Clock Speed: 2.8 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C3 = 'c3';

    /**
     * c3.2xlarge
     * - vCPUs: 8
     * - Memory: 15 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2680 v2 (Ivy Bridge)
     * - Clock Speed: 2.8 GHz
     * - Storage: 2 x 80 SSD
     * - GPU Memory: NA
     */
    public static readonly C3_2XLARGE = 'c3.2xlarge';

    /**
     * c3.4xlarge
     * - vCPUs: 16
     * - Memory: 30 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2680 v2 (Ivy Bridge)
     * - Clock Speed: 2.8 GHz
     * - Storage: 2 x 160 SSD
     * - GPU Memory: NA
     */
    public static readonly C3_4XLARGE = 'c3.4xlarge';

    /**
     * c3.8xlarge
     * - vCPUs: 32
     * - Memory: 60 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2680 v2 (Ivy Bridge)
     * - Clock Speed: 2.8 GHz
     * - Storage: 2 x 320 SSD
     * - GPU Memory: NA
     */
    public static readonly C3_8XLARGE = 'c3.8xlarge';

    /**
     * c3.large
     * - vCPUs: 2
     * - Memory: 3.75 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2680 v2 (Ivy Bridge)
     * - Clock Speed: 2.8 GHz
     * - Storage: 2 x 16 SSD
     * - GPU Memory: NA
     */
    public static readonly C3_LARGE = 'c3.large';

    /**
     * c3.xlarge
     * - vCPUs: 4
     * - Memory: 7.5 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2680 v2 (Ivy Bridge)
     * - Clock Speed: 2.8 GHz
     * - Storage: 2 x 40 SSD
     * - GPU Memory: NA
     */
    public static readonly C3_XLARGE = 'c3.xlarge';

    /**
     * c4
     * - vCPUs: 36
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2666 v3 (Haswell)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C4 = 'c4';

    /**
     * c4.2xlarge
     * - vCPUs: 8
     * - Memory: 15 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2666 v3 (Haswell)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C4_2XLARGE = 'c4.2xlarge';

    /**
     * c4.4xlarge
     * - vCPUs: 16
     * - Memory: 30 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2666 v3 (Haswell)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C4_4XLARGE = 'c4.4xlarge';

    /**
     * c4.8xlarge
     * - vCPUs: 36
     * - Memory: 60 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2666 v3 (Haswell)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C4_8XLARGE = 'c4.8xlarge';

    /**
     * c4.large
     * - vCPUs: 2
     * - Memory: 3.75 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2666 v3 (Haswell)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C4_LARGE = 'c4.large';

    /**
     * c4.xlarge
     * - vCPUs: 4
     * - Memory: 7.5 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2666 v3 (Haswell)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C4_XLARGE = 'c4.xlarge';

    /**
     * c5
     * - vCPUs: 72
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C5 = 'c5';

    /**
     * c5.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 12 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_12XLARGE = 'c5.12xlarge';

    /**
     * c5.18xlarge
     * - vCPUs: 72
     * - Memory: 144 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_18XLARGE = 'c5.18xlarge';

    /**
     * c5.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_24XLARGE = 'c5.24xlarge';

    /**
     * c5.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_2XLARGE = 'c5.2xlarge';

    /**
     * c5.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_4XLARGE = 'c5.4xlarge';

    /**
     * c5.9xlarge
     * - vCPUs: 36
     * - Memory: 72 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_9XLARGE = 'c5.9xlarge';

    /**
     * c5.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_LARGE = 'c5.large';

    /**
     * c5.metal
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_METAL = 'c5.metal';

    /**
     * c5.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5_XLARGE = 'c5.xlarge';

    /**
     * c5a.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 12 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_12XLARGE = 'c5a.12xlarge';

    /**
     * c5a.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_16XLARGE = 'c5a.16xlarge';

    /**
     * c5a.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_24XLARGE = 'c5a.24xlarge';

    /**
     * c5a.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_2XLARGE = 'c5a.2xlarge';

    /**
     * c5a.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_4XLARGE = 'c5a.4xlarge';

    /**
     * c5a.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_8XLARGE = 'c5a.8xlarge';

    /**
     * c5a.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_LARGE = 'c5a.large';

    /**
     * c5a.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5A_XLARGE = 'c5a.xlarge';

    /**
     * c5ad.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 12 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_12XLARGE = 'c5ad.12xlarge';

    /**
     * c5ad.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 2 x 1200 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_16XLARGE = 'c5ad.16xlarge';

    /**
     * c5ad.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_24XLARGE = 'c5ad.24xlarge';

    /**
     * c5ad.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_2XLARGE = 'c5ad.2xlarge';

    /**
     * c5ad.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_4XLARGE = 'c5ad.4xlarge';

    /**
     * c5ad.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_8XLARGE = 'c5ad.8xlarge';

    /**
     * c5ad.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_LARGE = 'c5ad.large';

    /**
     * c5ad.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 3.3 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5AD_XLARGE = 'c5ad.xlarge';

    /**
     * c5d
     * - vCPUs: 72
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C5D = 'c5d';

    /**
     * c5d.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 12 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3.4 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_12XLARGE = 'c5d.12xlarge';

    /**
     * c5d.18xlarge
     * - vCPUs: 72
     * - Memory: 144 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_18XLARGE = 'c5d.18xlarge';

    /**
     * c5d.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3.4 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_24XLARGE = 'c5d.24xlarge';

    /**
     * c5d.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: 1 x 200 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_2XLARGE = 'c5d.2xlarge';

    /**
     * c5d.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: 1 x 400 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_4XLARGE = 'c5d.4xlarge';

    /**
     * c5d.9xlarge
     * - vCPUs: 36
     * - Memory: 72 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: 1 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_9XLARGE = 'c5d.9xlarge';

    /**
     * c5d.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: 1 x 50 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_LARGE = 'c5d.large';

    /**
     * c5d.metal
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3.4 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_METAL = 'c5d.metal';

    /**
     * c5d.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3.4 GHz
     * - Storage: 1 x 100 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C5D_XLARGE = 'c5d.xlarge';

    /**
     * c5n
     * - vCPUs: 72
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C5N = 'c5n';

    /**
     * c5n.18xlarge
     * - vCPUs: 72
     * - Memory: 192 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_18XLARGE = 'c5n.18xlarge';

    /**
     * c5n.2xlarge
     * - vCPUs: 8
     * - Memory: 21 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_2XLARGE = 'c5n.2xlarge';

    /**
     * c5n.4xlarge
     * - vCPUs: 16
     * - Memory: 42 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_4XLARGE = 'c5n.4xlarge';

    /**
     * c5n.9xlarge
     * - vCPUs: 36
     * - Memory: 96 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_9XLARGE = 'c5n.9xlarge';

    /**
     * c5n.large
     * - vCPUs: 2
     * - Memory: 5.25 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_LARGE = 'c5n.large';

    /**
     * c5n.metal
     * - vCPUs: 72
     * - Memory: 192 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_METAL = 'c5n.metal';

    /**
     * c5n.xlarge
     * - vCPUs: 4
     * - Memory: 10.5 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8124M
     * - Clock Speed: 3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C5N_XLARGE = 'c5n.xlarge';

    /**
     * c6a
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6A = 'c6a';

    /**
     * c6a.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 18750 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_12XLARGE = 'c6a.12xlarge';

    /**
     * c6a.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_16XLARGE = 'c6a.16xlarge';

    /**
     * c6a.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 37500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_24XLARGE = 'c6a.24xlarge';

    /**
     * c6a.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_2XLARGE = 'c6a.2xlarge';

    /**
     * c6a.32xlarge
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_32XLARGE = 'c6a.32xlarge';

    /**
     * c6a.48xlarge
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_48XLARGE = 'c6a.48xlarge';

    /**
     * c6a.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_4XLARGE = 'c6a.4xlarge';

    /**
     * c6a.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_8XLARGE = 'c6a.8xlarge';

    /**
     * c6a.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_LARGE = 'c6a.large';

    /**
     * c6a.metal
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_METAL = 'c6a.metal';

    /**
     * c6a.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6A_XLARGE = 'c6a.xlarge';

    /**
     * c6g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6G = 'c6g';

    /**
     * c6g.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_12XLARGE = 'c6g.12xlarge';

    /**
     * c6g.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_16XLARGE = 'c6g.16xlarge';

    /**
     * c6g.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_2XLARGE = 'c6g.2xlarge';

    /**
     * c6g.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_4XLARGE = 'c6g.4xlarge';

    /**
     * c6g.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_8XLARGE = 'c6g.8xlarge';

    /**
     * c6g.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_LARGE = 'c6g.large';

    /**
     * c6g.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_MEDIUM = 'c6g.medium';

    /**
     * c6g.metal
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_METAL = 'c6g.metal';

    /**
     * c6g.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6G_XLARGE = 'c6g.xlarge';

    /**
     * c6gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6GD = 'c6gd';

    /**
     * c6gd.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_12XLARGE = 'c6gd.12xlarge';

    /**
     * c6gd.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_16XLARGE = 'c6gd.16xlarge';

    /**
     * c6gd.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_2XLARGE = 'c6gd.2xlarge';

    /**
     * c6gd.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_4XLARGE = 'c6gd.4xlarge';

    /**
     * c6gd.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_8XLARGE = 'c6gd.8xlarge';

    /**
     * c6gd.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_LARGE = 'c6gd.large';

    /**
     * c6gd.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_MEDIUM = 'c6gd.medium';

    /**
     * c6gd.metal
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_METAL = 'c6gd.metal';

    /**
     * c6gd.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6GD_XLARGE = 'c6gd.xlarge';

    /**
     * c6gn
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6GN = 'c6gn';

    /**
     * c6gn.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 75 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_12XLARGE = 'c6gn.12xlarge';

    /**
     * c6gn.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 100 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_16XLARGE = 'c6gn.16xlarge';

    /**
     * c6gn.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_2XLARGE = 'c6gn.2xlarge';

    /**
     * c6gn.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_4XLARGE = 'c6gn.4xlarge';

    /**
     * c6gn.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_8XLARGE = 'c6gn.8xlarge';

    /**
     * c6gn.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_LARGE = 'c6gn.large';

    /**
     * c6gn.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_MEDIUM = 'c6gn.medium';

    /**
     * c6gn.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6GN_XLARGE = 'c6gn.xlarge';

    /**
     * c6i
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6I = 'c6i';

    /**
     * c6i.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_12XLARGE = 'c6i.12xlarge';

    /**
     * c6i.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_16XLARGE = 'c6i.16xlarge';

    /**
     * c6i.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_24XLARGE = 'c6i.24xlarge';

    /**
     * c6i.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_2XLARGE = 'c6i.2xlarge';

    /**
     * c6i.32xlarge
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_32XLARGE = 'c6i.32xlarge';

    /**
     * c6i.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_4XLARGE = 'c6i.4xlarge';

    /**
     * c6i.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_8XLARGE = 'c6i.8xlarge';

    /**
     * c6i.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_LARGE = 'c6i.large';

    /**
     * c6i.metal
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_METAL = 'c6i.metal';

    /**
     * c6i.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6I_XLARGE = 'c6i.xlarge';

    /**
     * c6id
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6ID = 'c6id';

    /**
     * c6id.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_12XLARGE = 'c6id.12xlarge';

    /**
     * c6id.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_16XLARGE = 'c6id.16xlarge';

    /**
     * c6id.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_24XLARGE = 'c6id.24xlarge';

    /**
     * c6id.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 474 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_2XLARGE = 'c6id.2xlarge';

    /**
     * c6id.32xlarge
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_32XLARGE = 'c6id.32xlarge';

    /**
     * c6id.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_4XLARGE = 'c6id.4xlarge';

    /**
     * c6id.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_8XLARGE = 'c6id.8xlarge';

    /**
     * c6id.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_LARGE = 'c6id.large';

    /**
     * c6id.metal
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_METAL = 'c6id.metal';

    /**
     * c6id.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C6ID_XLARGE = 'c6id.xlarge';

    /**
     * c6in
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C6IN = 'c6in';

    /**
     * c6in.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_12XLARGE = 'c6in.12xlarge';

    /**
     * c6in.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 100000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_16XLARGE = 'c6in.16xlarge';

    /**
     * c6in.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 150000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_24XLARGE = 'c6in.24xlarge';

    /**
     * c6in.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 40000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_2XLARGE = 'c6in.2xlarge';

    /**
     * c6in.32xlarge
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_32XLARGE = 'c6in.32xlarge';

    /**
     * c6in.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_4XLARGE = 'c6in.4xlarge';

    /**
     * c6in.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_8XLARGE = 'c6in.8xlarge';

    /**
     * c6in.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_LARGE = 'c6in.large';

    /**
     * c6in.metal
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_METAL = 'c6in.metal';

    /**
     * c6in.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 30000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C6IN_XLARGE = 'c6in.xlarge';

    /**
     * c7a
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C7A = 'c7a';

    /**
     * c7a.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 18750 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_12XLARGE = 'c7a.12xlarge';

    /**
     * c7a.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_16XLARGE = 'c7a.16xlarge';

    /**
     * c7a.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 37500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_24XLARGE = 'c7a.24xlarge';

    /**
     * c7a.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_2XLARGE = 'c7a.2xlarge';

    /**
     * c7a.32xlarge
     * - vCPUs: 128
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_32XLARGE = 'c7a.32xlarge';

    /**
     * c7a.48xlarge
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_48XLARGE = 'c7a.48xlarge';

    /**
     * c7a.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_4XLARGE = 'c7a.4xlarge';

    /**
     * c7a.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_8XLARGE = 'c7a.8xlarge';

    /**
     * c7a.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_LARGE = 'c7a.large';

    /**
     * c7a.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_MEDIUM = 'c7a.medium';

    /**
     * c7a.metal-48xl
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_METAL_48XL = 'c7a.metal-48xl';

    /**
     * c7a.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7A_XLARGE = 'c7a.xlarge';

    /**
     * c7g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C7G = 'c7g';

    /**
     * c7g.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 22500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_12XLARGE = 'c7g.12xlarge';

    /**
     * c7g.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_16XLARGE = 'c7g.16xlarge';

    /**
     * c7g.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_2XLARGE = 'c7g.2xlarge';

    /**
     * c7g.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_4XLARGE = 'c7g.4xlarge';

    /**
     * c7g.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_8XLARGE = 'c7g.8xlarge';

    /**
     * c7g.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_LARGE = 'c7g.large';

    /**
     * c7g.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_MEDIUM = 'c7g.medium';

    /**
     * c7g.metal
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_METAL = 'c7g.metal';

    /**
     * c7g.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7G_XLARGE = 'c7g.xlarge';

    /**
     * c7gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C7GD = 'c7gd';

    /**
     * c7gd.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 22500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_12XLARGE = 'c7gd.12xlarge';

    /**
     * c7gd.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_16XLARGE = 'c7gd.16xlarge';

    /**
     * c7gd.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_2XLARGE = 'c7gd.2xlarge';

    /**
     * c7gd.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_4XLARGE = 'c7gd.4xlarge';

    /**
     * c7gd.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_8XLARGE = 'c7gd.8xlarge';

    /**
     * c7gd.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_LARGE = 'c7gd.large';

    /**
     * c7gd.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_MEDIUM = 'c7gd.medium';

    /**
     * c7gd.metal
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_METAL = 'c7gd.metal';

    /**
     * c7gd.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly C7GD_XLARGE = 'c7gd.xlarge';

    /**
     * c7gn
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C7GN = 'c7gn';

    /**
     * c7gn.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 150 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_12XLARGE = 'c7gn.12xlarge';

    /**
     * c7gn.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 200 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_16XLARGE = 'c7gn.16xlarge';

    /**
     * c7gn.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 50 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_2XLARGE = 'c7gn.2xlarge';

    /**
     * c7gn.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_4XLARGE = 'c7gn.4xlarge';

    /**
     * c7gn.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 100 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_8XLARGE = 'c7gn.8xlarge';

    /**
     * c7gn.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_LARGE = 'c7gn.large';

    /**
     * c7gn.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_MEDIUM = 'c7gn.medium';

    /**
     * c7gn.metal
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 200 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_METAL = 'c7gn.metal';

    /**
     * c7gn.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 40 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7GN_XLARGE = 'c7gn.xlarge';

    /**
     * c7i
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C7I = 'c7i';

    /**
     * c7i-flex.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: Up to 18750 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_12XLARGE = 'c7i-flex.12xlarge';

    /**
     * c7i-flex.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_16XLARGE = 'c7i-flex.16xlarge';

    /**
     * c7i-flex.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_2XLARGE = 'c7i-flex.2xlarge';

    /**
     * c7i-flex.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_4XLARGE = 'c7i-flex.4xlarge';

    /**
     * c7i-flex.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_8XLARGE = 'c7i-flex.8xlarge';

    /**
     * c7i-flex.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_LARGE = 'c7i-flex.large';

    /**
     * c7i-flex.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_FLEX_XLARGE = 'c7i-flex.xlarge';

    /**
     * c7i.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_12XLARGE = 'c7i.12xlarge';

    /**
     * c7i.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_16XLARGE = 'c7i.16xlarge';

    /**
     * c7i.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_24XLARGE = 'c7i.24xlarge';

    /**
     * c7i.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_2XLARGE = 'c7i.2xlarge';

    /**
     * c7i.48xlarge
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_48XLARGE = 'c7i.48xlarge';

    /**
     * c7i.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_4XLARGE = 'c7i.4xlarge';

    /**
     * c7i.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_8XLARGE = 'c7i.8xlarge';

    /**
     * c7i.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_LARGE = 'c7i.large';

    /**
     * c7i.metal-24xl
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_METAL_24XL = 'c7i.metal-24xl';

    /**
     * c7i.metal-48xl
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_METAL_48XL = 'c7i.metal-48xl';

    /**
     * c7i.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C7I_XLARGE = 'c7i.xlarge';

    /**
     * c8g
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly C8G = 'c8g';

    /**
     * c8g.12xlarge
     * - vCPUs: 48
     * - Memory: 96 GiB
     * - Network: 22.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_12XLARGE = 'c8g.12xlarge';

    /**
     * c8g.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_16XLARGE = 'c8g.16xlarge';

    /**
     * c8g.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_24XLARGE = 'c8g.24xlarge';

    /**
     * c8g.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_2XLARGE = 'c8g.2xlarge';

    /**
     * c8g.48xlarge
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_48XLARGE = 'c8g.48xlarge';

    /**
     * c8g.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_4XLARGE = 'c8g.4xlarge';

    /**
     * c8g.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_8XLARGE = 'c8g.8xlarge';

    /**
     * c8g.large
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_LARGE = 'c8g.large';

    /**
     * c8g.medium
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_MEDIUM = 'c8g.medium';

    /**
     * c8g.metal-24xl
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_METAL_24XL = 'c8g.metal-24xl';

    /**
     * c8g.metal-48xl
     * - vCPUs: 192
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_METAL_48XL = 'c8g.metal-48xl';

    /**
     * c8g.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly C8G_XLARGE = 'c8g.xlarge';

    /**
     * cc2.8xlarge
     * - vCPUs: 32
     * - Memory: 60.5 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2670
     * - Clock Speed: 2.6 GHz
     * - Storage: 4 x 840 SSD
     * - GPU Memory: NA
     */
    public static readonly CC2_8XLARGE = 'cc2.8xlarge';

    /**
     * cr1.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2670
     * - Storage: 2 x 120 SSD
     * - GPU Memory: NA
     */
    public static readonly CR1_8XLARGE = 'cr1.8xlarge';

    /**
     * d2
     * - vCPUs: 36
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly D2 = 'd2';

    /**
     * d2.2xlarge
     * - vCPUs: 8
     * - Memory: 61 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: 6 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D2_2XLARGE = 'd2.2xlarge';

    /**
     * d2.4xlarge
     * - vCPUs: 16
     * - Memory: 122 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: 12 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D2_4XLARGE = 'd2.4xlarge';

    /**
     * d2.8xlarge
     * - vCPUs: 36
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: 24 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D2_8XLARGE = 'd2.8xlarge';

    /**
     * d2.xlarge
     * - vCPUs: 4
     * - Memory: 30.5 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: 3 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D2_XLARGE = 'd2.xlarge';

    /**
     * d3.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 6 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3_2XLARGE = 'd3.2xlarge';

    /**
     * d3.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 12 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3_4XLARGE = 'd3.4xlarge';

    /**
     * d3.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 24 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3_8XLARGE = 'd3.8xlarge';

    /**
     * d3.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 3 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3_XLARGE = 'd3.xlarge';

    /**
     * d3en.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 24 x 14000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3EN_12XLARGE = 'd3en.12xlarge';

    /**
     * d3en.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 14000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3EN_2XLARGE = 'd3en.2xlarge';

    /**
     * d3en.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 8 x 14000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3EN_4XLARGE = 'd3en.4xlarge';

    /**
     * d3en.6xlarge
     * - vCPUs: 24
     * - Memory: 96 GiB
     * - Network: 40 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 12 x 14000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3EN_6XLARGE = 'd3en.6xlarge';

    /**
     * d3en.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 16 x 14000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3EN_8XLARGE = 'd3en.8xlarge';

    /**
     * d3en.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 14000 HDD
     * - GPU Memory: NA
     */
    public static readonly D3EN_XLARGE = 'd3en.xlarge';

    /**
     * dl1
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly DL1 = 'dl1';

    /**
     * dl1.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 400 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3 GHz
     * - Storage: 4 x 1000 GB NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly DL1_24XLARGE = 'dl1.24xlarge';

    /**
     * f1
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly F1 = 'f1';

    /**
     * f1.16xlarge
     * - vCPUs: 64
     * - Memory: 976 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 4 x 940 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly F1_16XLARGE = 'f1.16xlarge';

    /**
     * f1.2xlarge
     * - vCPUs: 8
     * - Memory: 122 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 470 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly F1_2XLARGE = 'f1.2xlarge';

    /**
     * f1.4xlarge
     * - vCPUs: 16
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 940 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly F1_4XLARGE = 'f1.4xlarge';

    /**
     * f2
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly F2 = 'f2';

    /**
     * f2.12xlarge
     * - vCPUs: 48
     * - Memory: 512 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: 2 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly F2_12XLARGE = 'f2.12xlarge';

    /**
     * f2.48xlarge
     * - vCPUs: 192
     * - Memory: 2048 GiB
     * - Network: 100 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: 8 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly F2_48XLARGE = 'f2.48xlarge';

    /**
     * f2.6xlarge
     * - vCPUs: 24
     * - Memory: 256 GiB
     * - Network: 12.5 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly F2_6XLARGE = 'f2.6xlarge';

    /**
     * g2
     * - vCPUs: 32
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2670 (Sandy Bridge)
     * - Clock Speed: 2.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G2 = 'g2';

    /**
     * g2.2xlarge
     * - vCPUs: 8
     * - Memory: 15 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 (Sandy Bridge)
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 60 SSD
     * - GPU Memory: NA
     */
    public static readonly G2_2XLARGE = 'g2.2xlarge';

    /**
     * g2.8xlarge
     * - vCPUs: 32
     * - Memory: 60 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 (Sandy Bridge)
     * - Clock Speed: 2.6 GHz
     * - Storage: 2 x 120 SSD
     * - GPU Memory: NA
     */
    public static readonly G2_8XLARGE = 'g2.8xlarge';

    /**
     * g3
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G3 = 'g3';

    /**
     * g3.16xlarge
     * - vCPUs: 64
     * - Memory: 488 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 32 GB
     */
    public static readonly G3_16XLARGE = 'g3.16xlarge';

    /**
     * g3.4xlarge
     * - vCPUs: 16
     * - Memory: 122 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 8 GB
     */
    public static readonly G3_4XLARGE = 'g3.4xlarge';

    /**
     * g3.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 16 GB
     */
    public static readonly G3_8XLARGE = 'g3.8xlarge';

    /**
     * g3s.xlarge
     * - vCPUs: 4
     * - Memory: 30.5 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 8 GB
     */
    public static readonly G3S_XLARGE = 'g3s.xlarge';

    /**
     * g4ad
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G4AD = 'g4ad';

    /**
     * g4ad.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 2400 GB NVMe SSD
     * - GPU Memory: 32 GB
     */
    public static readonly G4AD_16XLARGE = 'g4ad.16xlarge';

    /**
     * g4ad.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 300 GB NVMe SSD
     * - GPU Memory: 8 GB
     */
    public static readonly G4AD_2XLARGE = 'g4ad.2xlarge';

    /**
     * g4ad.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 600 GB NVMe SSD
     * - GPU Memory: 8 GB
     */
    public static readonly G4AD_4XLARGE = 'g4ad.4xlarge';

    /**
     * g4ad.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 15 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1200 GB NVMe SSD
     * - GPU Memory: 16 GB
     */
    public static readonly G4AD_8XLARGE = 'g4ad.8xlarge';

    /**
     * g4ad.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 150 GB NVMe SSD
     * - GPU Memory: 8 GB
     */
    public static readonly G4AD_XLARGE = 'g4ad.xlarge';

    /**
     * g4dn
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G4DN = 'g4dn';

    /**
     * g4dn.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 900 GB NVMe SSD
     * - GPU Memory: 64 GB
     */
    public static readonly G4DN_12XLARGE = 'g4dn.12xlarge';

    /**
     * g4dn.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 900 GB NVMe SSD
     * - GPU Memory: 16 GB
     */
    public static readonly G4DN_16XLARGE = 'g4dn.16xlarge';

    /**
     * g4dn.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 225 GB NVMe SSD
     * - GPU Memory: 16 GB
     */
    public static readonly G4DN_2XLARGE = 'g4dn.2xlarge';

    /**
     * g4dn.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 225 GB NVMe SSD
     * - GPU Memory: 16 GB
     */
    public static readonly G4DN_4XLARGE = 'g4dn.4xlarge';

    /**
     * g4dn.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 900 GB NVMe SSD
     * - GPU Memory: 16 GB
     */
    public static readonly G4DN_8XLARGE = 'g4dn.8xlarge';

    /**
     * g4dn.metal
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 900 GB NVMe SSD
     * - GPU Memory: 128 GB
     */
    public static readonly G4DN_METAL = 'g4dn.metal';

    /**
     * g4dn.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Family
     * - Clock Speed: 2.5 GHz
     * - Storage: 125 GB NVMe SSD
     * - GPU Memory: 16 GB
     */
    public static readonly G4DN_XLARGE = 'g4dn.xlarge';

    /**
     * g5
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G5 = 'g5';

    /**
     * g5.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 40 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 3800 GB NVMe SSD
     * - GPU Memory: 96 GB
     */
    public static readonly G5_12XLARGE = 'g5.12xlarge';

    /**
     * g5.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 1900 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G5_16XLARGE = 'g5.16xlarge';

    /**
     * g5.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 3800 GB NVMe SSD
     * - GPU Memory: 96 GB
     */
    public static readonly G5_24XLARGE = 'g5.24xlarge';

    /**
     * g5.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 450 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G5_2XLARGE = 'g5.2xlarge';

    /**
     * g5.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 2 x 3800 GB NVMe SSD
     * - GPU Memory: 192 GB
     */
    public static readonly G5_48XLARGE = 'g5.48xlarge';

    /**
     * g5.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 600 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G5_4XLARGE = 'g5.4xlarge';

    /**
     * g5.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 900 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G5_8XLARGE = 'g5.8xlarge';

    /**
     * g5.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.8 GHz
     * - Storage: 1 x 250 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G5_XLARGE = 'g5.xlarge';

    /**
     * g5g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G5G = 'g5g';

    /**
     * g5g.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: 32 GB
     */
    public static readonly G5G_16XLARGE = 'g5g.16xlarge';

    /**
     * g5g.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: 16 GB
     */
    public static readonly G5G_2XLARGE = 'g5g.2xlarge';

    /**
     * g5g.4xlarge
     * - vCPUs: 16
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: 16 GB
     */
    public static readonly G5G_4XLARGE = 'g5g.4xlarge';

    /**
     * g5g.8xlarge
     * - vCPUs: 32
     * - Memory: 64 GiB
     * - Network: Up to 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: 16 GB
     */
    public static readonly G5G_8XLARGE = 'g5g.8xlarge';

    /**
     * g5g.metal
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: 32 GB
     */
    public static readonly G5G_METAL = 'g5g.metal';

    /**
     * g5g.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: 16 GB
     */
    public static readonly G5G_XLARGE = 'g5g.xlarge';

    /**
     * g6
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G6 = 'g6';

    /**
     * g6.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 40 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 4 X 940 GB NVMe SSD
     * - GPU Memory: 96 GB
     */
    public static readonly G6_12XLARGE = 'g6.12xlarge';

    /**
     * g6.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 2 x 940 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G6_16XLARGE = 'g6.16xlarge';

    /**
     * g6.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 4 X 940 GB NVMe SSD
     * - GPU Memory: 96 GB
     */
    public static readonly G6_24XLARGE = 'g6.24xlarge';

    /**
     * g6.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 450 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G6_2XLARGE = 'g6.2xlarge';

    /**
     * g6.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 8 x 940 NVMe SSD
     * - GPU Memory: 192 GB
     */
    public static readonly G6_48XLARGE = 'g6.48xlarge';

    /**
     * g6.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 600 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G6_4XLARGE = 'g6.4xlarge';

    /**
     * g6.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 2 x 450 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G6_8XLARGE = 'g6.8xlarge';

    /**
     * g6.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 250 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly G6_XLARGE = 'g6.xlarge';

    /**
     * g6e
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly G6E = 'g6e';

    /**
     * g6e.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 100 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 2 x 1900 GB NVMe SSD
     * - GPU Memory: 192 GB
     */
    public static readonly G6E_12XLARGE = 'g6e.12xlarge';

    /**
     * g6e.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 35 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 1900 GB NVMe SSD
     * - GPU Memory: 48 GB
     */
    public static readonly G6E_16XLARGE = 'g6e.16xlarge';

    /**
     * g6e.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 200 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 2 x 1900 GB NVMe SSD
     * - GPU Memory: 192 GB
     */
    public static readonly G6E_24XLARGE = 'g6e.24xlarge';

    /**
     * g6e.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 20 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 450 GB NVMe SSD
     * - GPU Memory: 48 GB
     */
    public static readonly G6E_2XLARGE = 'g6e.2xlarge';

    /**
     * g6e.48xlarge
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 400 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 4 x 1900 GB NVMe SSD
     * - GPU Memory: 384 GB
     */
    public static readonly G6E_48XLARGE = 'g6e.48xlarge';

    /**
     * g6e.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 600 GB NVMe SSD
     * - GPU Memory: 48 GB
     */
    public static readonly G6E_4XLARGE = 'g6e.4xlarge';

    /**
     * g6e.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 900 GB NVMe SSD
     * - GPU Memory: 48 GB
     */
    public static readonly G6E_8XLARGE = 'g6e.8xlarge';

    /**
     * g6e.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 20 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 250 GB NVMe SSD
     * - GPU Memory: 48 GB
     */
    public static readonly G6E_XLARGE = 'g6e.xlarge';

    /**
     * gr6.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.6 GHz
     * - Storage: 1 x 600 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly GR6_4XLARGE = 'gr6.4xlarge';

    /**
     * gr6.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AMD EPYC 7R32
     * - Clock Speed: 2.6 GHz
     * - Storage: 2 x 450 GB NVMe SSD
     * - GPU Memory: 24 GB
     */
    public static readonly GR6_8XLARGE = 'gr6.8xlarge';

    /**
     * h1
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly H1 = 'h1';

    /**
     * h1.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 8 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly H1_16XLARGE = 'h1.16xlarge';

    /**
     * h1.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly H1_2XLARGE = 'h1.2xlarge';

    /**
     * h1.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 2 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly H1_4XLARGE = 'h1.4xlarge';

    /**
     * h1.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 4 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly H1_8XLARGE = 'h1.8xlarge';

    /**
     * hpc7g.16xlarge
     * - vCPUs: 64
     * - Memory: 128 GiB
     * - Network: 200 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly HPC7G_16XLARGE = 'hpc7g.16xlarge';

    /**
     * hpc7g.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: 200 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly HPC7G_4XLARGE = 'hpc7g.4xlarge';

    /**
     * hpc7g.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 200 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly HPC7G_8XLARGE = 'hpc7g.8xlarge';

    /**
     * hs1.8xlarge
     * - vCPUs: 16
     * - Memory: 117 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2650
     * - Clock Speed: 2 GHz
     * - Storage: 24 x 2000 HDD
     * - GPU Memory: NA
     */
    public static readonly HS1_8XLARGE = 'hs1.8xlarge';

    /**
     * i2
     * - vCPUs: 32
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I2 = 'i2';

    /**
     * i2.2xlarge
     * - vCPUs: 8
     * - Memory: 61 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 800 SSD
     * - GPU Memory: NA
     */
    public static readonly I2_2XLARGE = 'i2.2xlarge';

    /**
     * i2.4xlarge
     * - vCPUs: 16
     * - Memory: 122 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 800 SSD
     * - GPU Memory: NA
     */
    public static readonly I2_4XLARGE = 'i2.4xlarge';

    /**
     * i2.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 8 x 800 SSD
     * - GPU Memory: NA
     */
    public static readonly I2_8XLARGE = 'i2.8xlarge';

    /**
     * i2.large
     * - vCPUs: 2
     * - Memory: 15 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 800 SSD
     * - GPU Memory: NA
     */
    public static readonly I2_LARGE = 'i2.large';

    /**
     * i2.xlarge
     * - vCPUs: 4
     * - Memory: 30.5 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 800 SSD
     * - GPU Memory: NA
     */
    public static readonly I2_XLARGE = 'i2.xlarge';

    /**
     * i3
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I3 = 'i3';

    /**
     * i3.16xlarge
     * - vCPUs: 64
     * - Memory: 488 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 8 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_16XLARGE = 'i3.16xlarge';

    /**
     * i3.2xlarge
     * - vCPUs: 8
     * - Memory: 61 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_2XLARGE = 'i3.2xlarge';

    /**
     * i3.4xlarge
     * - vCPUs: 16
     * - Memory: 122 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_4XLARGE = 'i3.4xlarge';

    /**
     * i3.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_8XLARGE = 'i3.8xlarge';

    /**
     * i3.large
     * - vCPUs: 2
     * - Memory: 15.25 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_LARGE = 'i3.large';

    /**
     * i3.metal
     * - vCPUs: 72
     * - Memory: 512 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 8 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_METAL = 'i3.metal';

    /**
     * i3.xlarge
     * - vCPUs: 4
     * - Memory: 30.5 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3_XLARGE = 'i3.xlarge';

    /**
     * i3en
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I3EN = 'i3en';

    /**
     * i3en.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_12XLARGE = 'i3en.12xlarge';

    /**
     * i3en.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 8 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_24XLARGE = 'i3en.24xlarge';

    /**
     * i3en.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 2500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_2XLARGE = 'i3en.2xlarge';

    /**
     * i3en.3xlarge
     * - vCPUs: 12
     * - Memory: 96 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_3XLARGE = 'i3en.3xlarge';

    /**
     * i3en.6xlarge
     * - vCPUs: 24
     * - Memory: 192 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_6XLARGE = 'i3en.6xlarge';

    /**
     * i3en.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 1250 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_LARGE = 'i3en.large';

    /**
     * i3en.metal
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 8 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_METAL = 'i3en.metal';

    /**
     * i3en.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 2500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I3EN_XLARGE = 'i3en.xlarge';

    /**
     * i4g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I4G = 'i4g';

    /**
     * i4g.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 37500 Megabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 3750 SSD
     * - GPU Memory: NA
     */
    public static readonly I4G_16XLARGE = 'i4g.16xlarge';

    /**
     * i4g.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1875 SSD
     * - GPU Memory: NA
     */
    public static readonly I4G_2XLARGE = 'i4g.2xlarge';

    /**
     * i4g.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 3750 SSD
     * - GPU Memory: NA
     */
    public static readonly I4G_4XLARGE = 'i4g.4xlarge';

    /**
     * i4g.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 18750 Megabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 3750 SSD
     * - GPU Memory: NA
     */
    public static readonly I4G_8XLARGE = 'i4g.8xlarge';

    /**
     * i4g.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 468 SSD
     * - GPU Memory: NA
     */
    public static readonly I4G_LARGE = 'i4g.large';

    /**
     * i4g.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 937 SSD
     * - GPU Memory: NA
     */
    public static readonly I4G_XLARGE = 'i4g.xlarge';

    /**
     * i4i
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I4I = 'i4i';

    /**
     * i4i.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 28125 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 3 x 3750 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_12XLARGE = 'i4i.12xlarge';

    /**
     * i4i.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 35000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 3750 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_16XLARGE = 'i4i.16xlarge';

    /**
     * i4i.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 56250 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 6 x 3750 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_24XLARGE = 'i4i.24xlarge';

    /**
     * i4i.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12 Gigabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1875 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_2XLARGE = 'i4i.2xlarge';

    /**
     * i4i.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 8 x 3750 SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_32XLARGE = 'i4i.32xlarge';

    /**
     * i4i.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 3750 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_4XLARGE = 'i4i.4xlarge';

    /**
     * i4i.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 3750 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_8XLARGE = 'i4i.8xlarge';

    /**
     * i4i.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 468 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_LARGE = 'i4i.large';

    /**
     * i4i.metal
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 8 x 3750 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_METAL = 'i4i.metal';

    /**
     * i4i.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 937 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I4I_XLARGE = 'i4i.xlarge';

    /**
     * i7ie
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I7IE = 'i7ie';

    /**
     * i7ie.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: Up to 50 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 4 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_12XLARGE = 'i7ie.12xlarge';

    /**
     * i7ie.18xlarge
     * - vCPUs: 72
     * - Memory: 576 GiB
     * - Network: Up to 75 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 6 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_18XLARGE = 'i7ie.18xlarge';

    /**
     * i7ie.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: Up to 100 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 8 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_24XLARGE = 'i7ie.24xlarge';

    /**
     * i7ie.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 2 x 2500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_2XLARGE = 'i7ie.2xlarge';

    /**
     * i7ie.3xlarge
     * - vCPUs: 12
     * - Memory: 96 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_3XLARGE = 'i7ie.3xlarge';

    /**
     * i7ie.48xlarge
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 16 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_48XLARGE = 'i7ie.48xlarge';

    /**
     * i7ie.6xlarge
     * - vCPUs: 24
     * - Memory: 192 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 2 x 7500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_6XLARGE = 'i7ie.6xlarge';

    /**
     * i7ie.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 1250 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_LARGE = 'i7ie.large';

    /**
     * i7ie.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Emerald Rapids)
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 2500 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly I7IE_XLARGE = 'i7ie.xlarge';

    /**
     * i8g
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly I8G = 'i8g';

    /**
     * i8g.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: Up to 28.125 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 3 x 3750GB
     * - GPU Memory: NA
     */
    public static readonly I8G_12XLARGE = 'i8g.12xlarge';

    /**
     * i8g.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: Up to 37.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 4 x 3750GB
     * - GPU Memory: NA
     */
    public static readonly I8G_16XLARGE = 'i8g.16xlarge';

    /**
     * i8g.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: Up to 56.25 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 6 x 3750GB
     * - GPU Memory: NA
     */
    public static readonly I8G_24XLARGE = 'i8g.24xlarge';

    /**
     * i8g.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 1 x 1875GB
     * - GPU Memory: NA
     */
    public static readonly I8G_2XLARGE = 'i8g.2xlarge';

    /**
     * i8g.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 1 x 3750GB
     * - GPU Memory: NA
     */
    public static readonly I8G_4XLARGE = 'i8g.4xlarge';

    /**
     * i8g.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 2 x 3750GB
     * - GPU Memory: NA
     */
    public static readonly I8G_8XLARGE = 'i8g.8xlarge';

    /**
     * i8g.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 1 x 468GB
     * - GPU Memory: NA
     */
    public static readonly I8G_LARGE = 'i8g.large';

    /**
     * i8g.metal-24xl
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: Up to 56.25 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 6 x 3750GB
     * - GPU Memory: NA
     */
    public static readonly I8G_METAL_24XL = 'i8g.metal-24xl';

    /**
     * i8g.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: 1 x 937GB
     * - GPU Memory: NA
     */
    public static readonly I8G_XLARGE = 'i8g.xlarge';

    /**
     * im4gn
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly IM4GN = 'im4gn';

    /**
     * im4gn.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 100 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 7500 SSD
     * - GPU Memory: NA
     */
    public static readonly IM4GN_16XLARGE = 'im4gn.16xlarge';

    /**
     * im4gn.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 3750 SSD
     * - GPU Memory: NA
     */
    public static readonly IM4GN_2XLARGE = 'im4gn.2xlarge';

    /**
     * im4gn.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 7500 SSD
     * - GPU Memory: NA
     */
    public static readonly IM4GN_4XLARGE = 'im4gn.4xlarge';

    /**
     * im4gn.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 7500 SSD
     * - GPU Memory: NA
     */
    public static readonly IM4GN_8XLARGE = 'im4gn.8xlarge';

    /**
     * im4gn.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 937 SSD
     * - GPU Memory: NA
     */
    public static readonly IM4GN_LARGE = 'im4gn.large';

    /**
     * im4gn.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1875 SSD
     * - GPU Memory: NA
     */
    public static readonly IM4GN_XLARGE = 'im4gn.xlarge';

    /**
     * inf1
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8275CL (Cascade Lake)
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly INF1 = 'inf1';

    /**
     * inf1.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8275CL (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly INF1_24XLARGE = 'inf1.24xlarge';

    /**
     * inf1.2xlarge
     * - vCPUs: 8
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275CL (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly INF1_2XLARGE = 'inf1.2xlarge';

    /**
     * inf1.6xlarge
     * - vCPUs: 24
     * - Memory: 48 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275CL (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly INF1_6XLARGE = 'inf1.6xlarge';

    /**
     * inf1.xlarge
     * - vCPUs: 4
     * - Memory: 8 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8275CL (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly INF1_XLARGE = 'inf1.xlarge';

    /**
     * inf2
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly INF2 = 'inf2';

    /**
     * inf2.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: EBS only
     * - GPU Memory: 192 GB
     */
    public static readonly INF2_24XLARGE = 'inf2.24xlarge';

    /**
     * inf2.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: EBS only
     * - GPU Memory: 384 GB
     */
    public static readonly INF2_48XLARGE = 'inf2.48xlarge';

    /**
     * inf2.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: EBS only
     * - GPU Memory: 32 GB
     */
    public static readonly INF2_8XLARGE = 'inf2.8xlarge';

    /**
     * inf2.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: EBS only
     * - GPU Memory: 32 GB
     */
    public static readonly INF2_XLARGE = 'inf2.xlarge';

    /**
     * is4gen.2xlarge
     * - vCPUs: 8
     * - Memory: 48 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 7500 SSD
     * - GPU Memory: NA
     */
    public static readonly IS4GEN_2XLARGE = 'is4gen.2xlarge';

    /**
     * is4gen.4xlarge
     * - vCPUs: 16
     * - Memory: 96 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 7500 SSD
     * - GPU Memory: NA
     */
    public static readonly IS4GEN_4XLARGE = 'is4gen.4xlarge';

    /**
     * is4gen.8xlarge
     * - vCPUs: 32
     * - Memory: 192 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 7500 SSD
     * - GPU Memory: NA
     */
    public static readonly IS4GEN_8XLARGE = 'is4gen.8xlarge';

    /**
     * is4gen.large
     * - vCPUs: 2
     * - Memory: 12 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1875 SSD
     * - GPU Memory: NA
     */
    public static readonly IS4GEN_LARGE = 'is4gen.large';

    /**
     * is4gen.medium
     * - vCPUs: 1
     * - Memory: 6 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 937 SSD
     * - GPU Memory: NA
     */
    public static readonly IS4GEN_MEDIUM = 'is4gen.medium';

    /**
     * is4gen.xlarge
     * - vCPUs: 4
     * - Memory: 24 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 3750 SSD
     * - GPU Memory: NA
     */
    public static readonly IS4GEN_XLARGE = 'is4gen.xlarge';

    /**
     * m1.large
     * - vCPUs: 2
     * - Memory: 7.5 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Storage: 2 x 420 SSD
     * - GPU Memory: NA
     */
    public static readonly M1_LARGE = 'm1.large';

    /**
     * m1.medium
     * - vCPUs: 1
     * - Memory: 3.75 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Storage: 1 x 410 SSD
     * - GPU Memory: NA
     */
    public static readonly M1_MEDIUM = 'm1.medium';

    /**
     * m1.small
     * - vCPUs: 1
     * - Memory: 1.7 GiB
     * - Network: Low
     * - Processor: Intel Xeon Family
     * - Storage: 1 x 160 SSD
     * - GPU Memory: NA
     */
    public static readonly M1_SMALL = 'm1.small';

    /**
     * m1.xlarge
     * - vCPUs: 4
     * - Memory: 15 GiB
     * - Network: High
     * - Processor: Intel Xeon Family
     * - Storage: 4 x 420 SSD
     * - GPU Memory: NA
     */
    public static readonly M1_XLARGE = 'm1.xlarge';

    /**
     * m2.2xlarge
     * - vCPUs: 4
     * - Memory: 34.2 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Storage: 1 x 850 SSD
     * - GPU Memory: NA
     */
    public static readonly M2_2XLARGE = 'm2.2xlarge';

    /**
     * m2.4xlarge
     * - vCPUs: 8
     * - Memory: 68.4 GiB
     * - Network: High
     * - Processor: Intel Xeon Family
     * - Storage: 2 x 840 SSD
     * - GPU Memory: NA
     */
    public static readonly M2_4XLARGE = 'm2.4xlarge';

    /**
     * m2.xlarge
     * - vCPUs: 2
     * - Memory: 17.1 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Storage: 1 x 420 SSD
     * - GPU Memory: NA
     */
    public static readonly M2_XLARGE = 'm2.xlarge';

    /**
     * m3
     * - vCPUs: 8
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M3 = 'm3';

    /**
     * m3.2xlarge
     * - vCPUs: 8
     * - Memory: 30 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 80 SSD
     * - GPU Memory: NA
     */
    public static readonly M3_2XLARGE = 'm3.2xlarge';

    /**
     * m3.large
     * - vCPUs: 2
     * - Memory: 7.5 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 32 SSD
     * - GPU Memory: NA
     */
    public static readonly M3_LARGE = 'm3.large';

    /**
     * m3.medium
     * - vCPUs: 1
     * - Memory: 3.75 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 4 SSD
     * - GPU Memory: NA
     */
    public static readonly M3_MEDIUM = 'm3.medium';

    /**
     * m3.xlarge
     * - vCPUs: 4
     * - Memory: 15 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 40 SSD
     * - GPU Memory: NA
     */
    public static readonly M3_XLARGE = 'm3.xlarge';

    /**
     * m4
     * - vCPUs: 40
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M4 = 'm4';

    /**
     * m4.10xlarge
     * - vCPUs: 40
     * - Memory: 160 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M4_10XLARGE = 'm4.10xlarge';

    /**
     * m4.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M4_16XLARGE = 'm4.16xlarge';

    /**
     * m4.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M4_2XLARGE = 'm4.2xlarge';

    /**
     * m4.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M4_4XLARGE = 'm4.4xlarge';

    /**
     * m4.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M4_LARGE = 'm4.large';

    /**
     * m4.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2676 v3 (Haswell)
     * - Clock Speed: 2.4 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M4_XLARGE = 'm4.xlarge';

    /**
     * m5
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M5 = 'm5';

    /**
     * m5.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_12XLARGE = 'm5.12xlarge';

    /**
     * m5.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_16XLARGE = 'm5.16xlarge';

    /**
     * m5.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_24XLARGE = 'm5.24xlarge';

    /**
     * m5.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_2XLARGE = 'm5.2xlarge';

    /**
     * m5.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_4XLARGE = 'm5.4xlarge';

    /**
     * m5.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_8XLARGE = 'm5.8xlarge';

    /**
     * m5.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_LARGE = 'm5.large';

    /**
     * m5.metal
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_METAL = 'm5.metal';

    /**
     * m5.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5_XLARGE = 'm5.xlarge';

    /**
     * m5a.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_12XLARGE = 'm5a.12xlarge';

    /**
     * m5a.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 12 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_16XLARGE = 'm5a.16xlarge';

    /**
     * m5a.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_24XLARGE = 'm5a.24xlarge';

    /**
     * m5a.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_2XLARGE = 'm5a.2xlarge';

    /**
     * m5a.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_4XLARGE = 'm5a.4xlarge';

    /**
     * m5a.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_8XLARGE = 'm5a.8xlarge';

    /**
     * m5a.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_LARGE = 'm5a.large';

    /**
     * m5a.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5A_XLARGE = 'm5a.xlarge';

    /**
     * m5ad.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_12XLARGE = 'm5ad.12xlarge';

    /**
     * m5ad.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 12 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_16XLARGE = 'm5ad.16xlarge';

    /**
     * m5ad.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_24XLARGE = 'm5ad.24xlarge';

    /**
     * m5ad.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_2XLARGE = 'm5ad.2xlarge';

    /**
     * m5ad.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_4XLARGE = 'm5ad.4xlarge';

    /**
     * m5ad.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_8XLARGE = 'm5ad.8xlarge';

    /**
     * m5ad.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_LARGE = 'm5ad.large';

    /**
     * m5ad.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5AD_XLARGE = 'm5ad.xlarge';

    /**
     * m5d
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M5D = 'm5d';

    /**
     * m5d.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_12XLARGE = 'm5d.12xlarge';

    /**
     * m5d.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_16XLARGE = 'm5d.16xlarge';

    /**
     * m5d.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_24XLARGE = 'm5d.24xlarge';

    /**
     * m5d.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_2XLARGE = 'm5d.2xlarge';

    /**
     * m5d.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_4XLARGE = 'm5d.4xlarge';

    /**
     * m5d.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_8XLARGE = 'm5d.8xlarge';

    /**
     * m5d.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_LARGE = 'm5d.large';

    /**
     * m5d.metal
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_METAL = 'm5d.metal';

    /**
     * m5d.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5D_XLARGE = 'm5d.xlarge';

    /**
     * m5dn
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M5DN = 'm5dn';

    /**
     * m5dn.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 900 GB NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_12XLARGE = 'm5dn.12xlarge';

    /**
     * m5dn.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_16XLARGE = 'm5dn.16xlarge';

    /**
     * m5dn.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_24XLARGE = 'm5dn.24xlarge';

    /**
     * m5dn.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_2XLARGE = 'm5dn.2xlarge';

    /**
     * m5dn.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_4XLARGE = 'm5dn.4xlarge';

    /**
     * m5dn.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_8XLARGE = 'm5dn.8xlarge';

    /**
     * m5dn.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_LARGE = 'm5dn.large';

    /**
     * m5dn.metal
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_METAL = 'm5dn.metal';

    /**
     * m5dn.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M5DN_XLARGE = 'm5dn.xlarge';

    /**
     * m5n
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M5N = 'm5n';

    /**
     * m5n.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_12XLARGE = 'm5n.12xlarge';

    /**
     * m5n.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_16XLARGE = 'm5n.16xlarge';

    /**
     * m5n.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_24XLARGE = 'm5n.24xlarge';

    /**
     * m5n.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_2XLARGE = 'm5n.2xlarge';

    /**
     * m5n.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_4XLARGE = 'm5n.4xlarge';

    /**
     * m5n.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_8XLARGE = 'm5n.8xlarge';

    /**
     * m5n.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_LARGE = 'm5n.large';

    /**
     * m5n.metal
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_METAL = 'm5n.metal';

    /**
     * m5n.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5N_XLARGE = 'm5n.xlarge';

    /**
     * m5zn
     * - vCPUs: 48
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M5ZN = 'm5zn';

    /**
     * m5zn.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_12XLARGE = 'm5zn.12xlarge';

    /**
     * m5zn.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_2XLARGE = 'm5zn.2xlarge';

    /**
     * m5zn.3xlarge
     * - vCPUs: 12
     * - Memory: 48 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_3XLARGE = 'm5zn.3xlarge';

    /**
     * m5zn.6xlarge
     * - vCPUs: 24
     * - Memory: 96 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_6XLARGE = 'm5zn.6xlarge';

    /**
     * m5zn.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_LARGE = 'm5zn.large';

    /**
     * m5zn.metal
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_METAL = 'm5zn.metal';

    /**
     * m5zn.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M5ZN_XLARGE = 'm5zn.xlarge';

    /**
     * m6a
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6A = 'm6a';

    /**
     * m6a.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 18750 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_12XLARGE = 'm6a.12xlarge';

    /**
     * m6a.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_16XLARGE = 'm6a.16xlarge';

    /**
     * m6a.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 37500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_24XLARGE = 'm6a.24xlarge';

    /**
     * m6a.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_2XLARGE = 'm6a.2xlarge';

    /**
     * m6a.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_32XLARGE = 'm6a.32xlarge';

    /**
     * m6a.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_48XLARGE = 'm6a.48xlarge';

    /**
     * m6a.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_4XLARGE = 'm6a.4xlarge';

    /**
     * m6a.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_8XLARGE = 'm6a.8xlarge';

    /**
     * m6a.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_LARGE = 'm6a.large';

    /**
     * m6a.metal
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_METAL = 'm6a.metal';

    /**
     * m6a.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6A_XLARGE = 'm6a.xlarge';

    /**
     * m6g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6G = 'm6g';

    /**
     * m6g.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_12XLARGE = 'm6g.12xlarge';

    /**
     * m6g.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_16XLARGE = 'm6g.16xlarge';

    /**
     * m6g.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_2XLARGE = 'm6g.2xlarge';

    /**
     * m6g.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_4XLARGE = 'm6g.4xlarge';

    /**
     * m6g.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_8XLARGE = 'm6g.8xlarge';

    /**
     * m6g.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_LARGE = 'm6g.large';

    /**
     * m6g.medium
     * - vCPUs: 1
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_MEDIUM = 'm6g.medium';

    /**
     * m6g.metal
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_METAL = 'm6g.metal';

    /**
     * m6g.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6G_XLARGE = 'm6g.xlarge';

    /**
     * m6gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6GD = 'm6gd';

    /**
     * m6gd.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_12XLARGE = 'm6gd.12xlarge';

    /**
     * m6gd.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_16XLARGE = 'm6gd.16xlarge';

    /**
     * m6gd.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_2XLARGE = 'm6gd.2xlarge';

    /**
     * m6gd.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_4XLARGE = 'm6gd.4xlarge';

    /**
     * m6gd.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_8XLARGE = 'm6gd.8xlarge';

    /**
     * m6gd.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_LARGE = 'm6gd.large';

    /**
     * m6gd.medium
     * - vCPUs: 1
     * - Memory: 4 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_MEDIUM = 'm6gd.medium';

    /**
     * m6gd.metal
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_METAL = 'm6gd.metal';

    /**
     * m6gd.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6GD_XLARGE = 'm6gd.xlarge';

    /**
     * m6i
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6I = 'm6i';

    /**
     * m6i.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_12XLARGE = 'm6i.12xlarge';

    /**
     * m6i.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_16XLARGE = 'm6i.16xlarge';

    /**
     * m6i.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_24XLARGE = 'm6i.24xlarge';

    /**
     * m6i.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_2XLARGE = 'm6i.2xlarge';

    /**
     * m6i.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_32XLARGE = 'm6i.32xlarge';

    /**
     * m6i.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_4XLARGE = 'm6i.4xlarge';

    /**
     * m6i.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_8XLARGE = 'm6i.8xlarge';

    /**
     * m6i.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_LARGE = 'm6i.large';

    /**
     * m6i.metal
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_METAL = 'm6i.metal';

    /**
     * m6i.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6I_XLARGE = 'm6i.xlarge';

    /**
     * m6id
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6ID = 'm6id';

    /**
     * m6id.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_12XLARGE = 'm6id.12xlarge';

    /**
     * m6id.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_16XLARGE = 'm6id.16xlarge';

    /**
     * m6id.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_24XLARGE = 'm6id.24xlarge';

    /**
     * m6id.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 474 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_2XLARGE = 'm6id.2xlarge';

    /**
     * m6id.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_32XLARGE = 'm6id.32xlarge';

    /**
     * m6id.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_4XLARGE = 'm6id.4xlarge';

    /**
     * m6id.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_8XLARGE = 'm6id.8xlarge';

    /**
     * m6id.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_LARGE = 'm6id.large';

    /**
     * m6id.metal
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_METAL = 'm6id.metal';

    /**
     * m6id.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6ID_XLARGE = 'm6id.xlarge';

    /**
     * m6idn
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6IDN = 'm6idn';

    /**
     * m6idn.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_12XLARGE = 'm6idn.12xlarge';

    /**
     * m6idn.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 100000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_16XLARGE = 'm6idn.16xlarge';

    /**
     * m6idn.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 150000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_24XLARGE = 'm6idn.24xlarge';

    /**
     * m6idn.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 40000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 474 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_2XLARGE = 'm6idn.2xlarge';

    /**
     * m6idn.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_32XLARGE = 'm6idn.32xlarge';

    /**
     * m6idn.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_4XLARGE = 'm6idn.4xlarge';

    /**
     * m6idn.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_8XLARGE = 'm6idn.8xlarge';

    /**
     * m6idn.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_LARGE = 'm6idn.large';

    /**
     * m6idn.metal
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_METAL = 'm6idn.metal';

    /**
     * m6idn.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 30000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M6IDN_XLARGE = 'm6idn.xlarge';

    /**
     * m6in
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M6IN = 'm6in';

    /**
     * m6in.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_12XLARGE = 'm6in.12xlarge';

    /**
     * m6in.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 100000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_16XLARGE = 'm6in.16xlarge';

    /**
     * m6in.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 150000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_24XLARGE = 'm6in.24xlarge';

    /**
     * m6in.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 40000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_2XLARGE = 'm6in.2xlarge';

    /**
     * m6in.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_32XLARGE = 'm6in.32xlarge';

    /**
     * m6in.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_4XLARGE = 'm6in.4xlarge';

    /**
     * m6in.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_8XLARGE = 'm6in.8xlarge';

    /**
     * m6in.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_LARGE = 'm6in.large';

    /**
     * m6in.metal
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_METAL = 'm6in.metal';

    /**
     * m6in.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 30000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M6IN_XLARGE = 'm6in.xlarge';

    /**
     * m7a
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M7A = 'm7a';

    /**
     * m7a.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 18750 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_12XLARGE = 'm7a.12xlarge';

    /**
     * m7a.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_16XLARGE = 'm7a.16xlarge';

    /**
     * m7a.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 37500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_24XLARGE = 'm7a.24xlarge';

    /**
     * m7a.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_2XLARGE = 'm7a.2xlarge';

    /**
     * m7a.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_32XLARGE = 'm7a.32xlarge';

    /**
     * m7a.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_48XLARGE = 'm7a.48xlarge';

    /**
     * m7a.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_4XLARGE = 'm7a.4xlarge';

    /**
     * m7a.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_8XLARGE = 'm7a.8xlarge';

    /**
     * m7a.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_LARGE = 'm7a.large';

    /**
     * m7a.medium
     * - vCPUs: 1
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_MEDIUM = 'm7a.medium';

    /**
     * m7a.metal-48xl
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_METAL_48XL = 'm7a.metal-48xl';

    /**
     * m7a.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7A_XLARGE = 'm7a.xlarge';

    /**
     * m7g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M7G = 'm7g';

    /**
     * m7g.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 22500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_12XLARGE = 'm7g.12xlarge';

    /**
     * m7g.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_16XLARGE = 'm7g.16xlarge';

    /**
     * m7g.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_2XLARGE = 'm7g.2xlarge';

    /**
     * m7g.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_4XLARGE = 'm7g.4xlarge';

    /**
     * m7g.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_8XLARGE = 'm7g.8xlarge';

    /**
     * m7g.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_LARGE = 'm7g.large';

    /**
     * m7g.medium
     * - vCPUs: 1
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_MEDIUM = 'm7g.medium';

    /**
     * m7g.metal
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_METAL = 'm7g.metal';

    /**
     * m7g.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7G_XLARGE = 'm7g.xlarge';

    /**
     * m7gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M7GD = 'm7gd';

    /**
     * m7gd.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 22500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_12XLARGE = 'm7gd.12xlarge';

    /**
     * m7gd.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_16XLARGE = 'm7gd.16xlarge';

    /**
     * m7gd.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_2XLARGE = 'm7gd.2xlarge';

    /**
     * m7gd.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_4XLARGE = 'm7gd.4xlarge';

    /**
     * m7gd.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_8XLARGE = 'm7gd.8xlarge';

    /**
     * m7gd.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_LARGE = 'm7gd.large';

    /**
     * m7gd.medium
     * - vCPUs: 1
     * - Memory: 4 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_MEDIUM = 'm7gd.medium';

    /**
     * m7gd.metal
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_METAL = 'm7gd.metal';

    /**
     * m7gd.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly M7GD_XLARGE = 'm7gd.xlarge';

    /**
     * m7i
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M7I = 'm7i';

    /**
     * m7i-flex.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: Up to 18750 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_12XLARGE = 'm7i-flex.12xlarge';

    /**
     * m7i-flex.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_16XLARGE = 'm7i-flex.16xlarge';

    /**
     * m7i-flex.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_2XLARGE = 'm7i-flex.2xlarge';

    /**
     * m7i-flex.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_4XLARGE = 'm7i-flex.4xlarge';

    /**
     * m7i-flex.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_8XLARGE = 'm7i-flex.8xlarge';

    /**
     * m7i-flex.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_LARGE = 'm7i-flex.large';

    /**
     * m7i-flex.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_FLEX_XLARGE = 'm7i-flex.xlarge';

    /**
     * m7i.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_12XLARGE = 'm7i.12xlarge';

    /**
     * m7i.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_16XLARGE = 'm7i.16xlarge';

    /**
     * m7i.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_24XLARGE = 'm7i.24xlarge';

    /**
     * m7i.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_2XLARGE = 'm7i.2xlarge';

    /**
     * m7i.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_48XLARGE = 'm7i.48xlarge';

    /**
     * m7i.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_4XLARGE = 'm7i.4xlarge';

    /**
     * m7i.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_8XLARGE = 'm7i.8xlarge';

    /**
     * m7i.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_LARGE = 'm7i.large';

    /**
     * m7i.metal-24xl
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_METAL_24XL = 'm7i.metal-24xl';

    /**
     * m7i.metal-48xl
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_METAL_48XL = 'm7i.metal-48xl';

    /**
     * m7i.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M7I_XLARGE = 'm7i.xlarge';

    /**
     * m8g
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly M8G = 'm8g';

    /**
     * m8g.12xlarge
     * - vCPUs: 48
     * - Memory: 192 GiB
     * - Network: 22.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_12XLARGE = 'm8g.12xlarge';

    /**
     * m8g.16xlarge
     * - vCPUs: 64
     * - Memory: 256 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_16XLARGE = 'm8g.16xlarge';

    /**
     * m8g.24xlarge
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_24XLARGE = 'm8g.24xlarge';

    /**
     * m8g.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_2XLARGE = 'm8g.2xlarge';

    /**
     * m8g.48xlarge
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_48XLARGE = 'm8g.48xlarge';

    /**
     * m8g.4xlarge
     * - vCPUs: 16
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_4XLARGE = 'm8g.4xlarge';

    /**
     * m8g.8xlarge
     * - vCPUs: 32
     * - Memory: 128 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_8XLARGE = 'm8g.8xlarge';

    /**
     * m8g.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_LARGE = 'm8g.large';

    /**
     * m8g.medium
     * - vCPUs: 1
     * - Memory: 4 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_MEDIUM = 'm8g.medium';

    /**
     * m8g.metal-24xl
     * - vCPUs: 96
     * - Memory: 384 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_METAL_24XL = 'm8g.metal-24xl';

    /**
     * m8g.metal-48xl
     * - vCPUs: 192
     * - Memory: 768 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_METAL_48XL = 'm8g.metal-48xl';

    /**
     * m8g.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly M8G_XLARGE = 'm8g.xlarge';

    /**
     * mac1
     * - vCPUs: 12
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Core i7-8700B CPU
     * - Clock Speed: 3.2 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly MAC1 = 'mac1';

    /**
     * mac1.metal
     * - vCPUs: 12
     * - Memory: 32 GiB
     * - Network: NA
     * - Processor: Intel Core i7-8700B CPU
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly MAC1_METAL = 'mac1.metal';

    /**
     * mac2
     * - vCPUs: 12
     * - Memory: NA
     * - Network: NA
     * - Processor: Apple M1 chip with 8-core CPU, 8-core GPU, and 16-core Neural Engine
     * - Clock Speed: 3.2 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly MAC2 = 'mac2';

    /**
     * mac2-m1ultra
     * - vCPUs: 20
     * - Memory: NA
     * - Network: NA
     * - Processor: Apple silicon M1 Ultra
     * - Clock Speed: 3.2 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly MAC2_M1ULTRA = 'mac2-m1ultra';

    /**
     * mac2-m1ultra.metal
     * - vCPUs: 20
     * - Memory: 128 GiB
     * - Network: NA
     * - Processor: Apple silicon M1 Ultra
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly MAC2_M1ULTRA_METAL = 'mac2-m1ultra.metal';

    /**
     * mac2-m2
     * - vCPUs: 12
     * - Memory: NA
     * - Network: NA
     * - Processor: Apple M2 Chip
     * - Clock Speed: 3.49 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly MAC2_M2 = 'mac2-m2';

    /**
     * mac2-m2.metal
     * - vCPUs: 12
     * - Memory: 24 GiB
     * - Network: NA
     * - Processor: Apple M2 Chip
     * - Clock Speed: 3.49 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly MAC2_M2_METAL = 'mac2-m2.metal';

    /**
     * mac2-m2pro
     * - vCPUs: 20
     * - Memory: NA
     * - Network: NA
     * - Processor: Apple M2 Pro
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly MAC2_M2PRO = 'mac2-m2pro';

    /**
     * mac2-m2pro.metal
     * - vCPUs: 20
     * - Memory: 32 GiB
     * - Network: NA
     * - Processor: Apple M2 Pro
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly MAC2_M2PRO_METAL = 'mac2-m2pro.metal';

    /**
     * mac2.metal
     * - vCPUs: 12
     * - Memory: 16 GiB
     * - Network: NA
     * - Processor: Apple M1 chip with 8-core CPU, 8-core GPU, and 16-core Neural Engine
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly MAC2_METAL = 'mac2.metal';

    /**
     * p2
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly P2 = 'p2';

    /**
     * p2.16xlarge
     * - vCPUs: 64
     * - Memory: 732 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly P2_16XLARGE = 'p2.16xlarge';

    /**
     * p2.8xlarge
     * - vCPUs: 32
     * - Memory: 488 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly P2_8XLARGE = 'p2.8xlarge';

    /**
     * p2.xlarge
     * - vCPUs: 4
     * - Memory: 61 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly P2_XLARGE = 'p2.xlarge';

    /**
     * p3
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly P3 = 'p3';

    /**
     * p3.16xlarge
     * - vCPUs: 64
     * - Memory: 488 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 128 GiB
     */
    public static readonly P3_16XLARGE = 'p3.16xlarge';

    /**
     * p3.2xlarge
     * - vCPUs: 8
     * - Memory: 61 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 16 GiB
     */
    public static readonly P3_2XLARGE = 'p3.2xlarge';

    /**
     * p3.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: 64 GiB
     */
    public static readonly P3_8XLARGE = 'p3.8xlarge';

    /**
     * p3dn
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8175 (Skylake)
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly P3DN = 'p3dn';

    /**
     * p3dn.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8175 (Skylake)
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: 256 GiB
     */
    public static readonly P3DN_24XLARGE = 'p3dn.24xlarge';

    /**
     * p4d
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly P4D = 'p4d';

    /**
     * p4d.24xlarge
     * - vCPUs: 96
     * - Memory: 1152 GiB
     * - Network: 400 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3 GHz
     * - Storage: 8 x 1000 SSD
     * - GPU Memory: 320 GB HBM2
     */
    public static readonly P4D_24XLARGE = 'p4d.24xlarge';

    /**
     * p4de
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly P4DE = 'p4de';

    /**
     * p4de.24xlarge
     * - vCPUs: 96
     * - Memory: 1152 GiB
     * - Network: 400 Gigabit
     * - Processor: Intel Xeon Platinum 8275L
     * - Clock Speed: 3 GHz
     * - Storage: 8 x 1000 SSD
     * - GPU Memory: 640 GB HBM2e
     */
    public static readonly P4DE_24XLARGE = 'p4de.24xlarge';

    /**
     * p5.48xlarge
     * - vCPUs: 192
     * - Memory: 2048 GiB
     * - Network: 3200 Gigabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 2.95 GHz
     * - Storage: 8 x 3840 GB SSD
     * - GPU Memory: 640 GB HBM3
     */
    public static readonly P5_48XLARGE = 'p5.48xlarge';

    /**
     * r3
     * - vCPUs: 32
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R3 = 'r3';

    /**
     * r3.2xlarge
     * - vCPUs: 8
     * - Memory: 61 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 160 SSD
     * - GPU Memory: NA
     */
    public static readonly R3_2XLARGE = 'r3.2xlarge';

    /**
     * r3.4xlarge
     * - vCPUs: 16
     * - Memory: 122 GiB
     * - Network: High
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 320 SSD
     * - GPU Memory: NA
     */
    public static readonly R3_4XLARGE = 'r3.4xlarge';

    /**
     * r3.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 320 SSD
     * - GPU Memory: NA
     */
    public static readonly R3_8XLARGE = 'r3.8xlarge';

    /**
     * r3.large
     * - vCPUs: 2
     * - Memory: 15.25 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 32 SSD
     * - GPU Memory: NA
     */
    public static readonly R3_LARGE = 'r3.large';

    /**
     * r3.xlarge
     * - vCPUs: 4
     * - Memory: 30.5 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon E5-2670 v2 (Ivy Bridge)
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 80 SSD
     * - GPU Memory: NA
     */
    public static readonly R3_XLARGE = 'r3.xlarge';

    /**
     * r4
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R4 = 'r4';

    /**
     * r4.16xlarge
     * - vCPUs: 64
     * - Memory: 488 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R4_16XLARGE = 'r4.16xlarge';

    /**
     * r4.2xlarge
     * - vCPUs: 8
     * - Memory: 61 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R4_2XLARGE = 'r4.2xlarge';

    /**
     * r4.4xlarge
     * - vCPUs: 16
     * - Memory: 122 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R4_4XLARGE = 'r4.4xlarge';

    /**
     * r4.8xlarge
     * - vCPUs: 32
     * - Memory: 244 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R4_8XLARGE = 'r4.8xlarge';

    /**
     * r4.large
     * - vCPUs: 2
     * - Memory: 15.25 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R4_LARGE = 'r4.large';

    /**
     * r4.xlarge
     * - vCPUs: 4
     * - Memory: 30.5 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon E5-2686 v4 (Broadwell)
     * - Clock Speed: 2.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R4_XLARGE = 'r4.xlarge';

    /**
     * r5
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R5 = 'r5';

    /**
     * r5.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_12XLARGE = 'r5.12xlarge';

    /**
     * r5.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_16XLARGE = 'r5.16xlarge';

    /**
     * r5.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_24XLARGE = 'r5.24xlarge';

    /**
     * r5.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_2XLARGE = 'r5.2xlarge';

    /**
     * r5.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_4XLARGE = 'r5.4xlarge';

    /**
     * r5.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_8XLARGE = 'r5.8xlarge';

    /**
     * r5.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_LARGE = 'r5.large';

    /**
     * r5.metal
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_METAL = 'r5.metal';

    /**
     * r5.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5_XLARGE = 'r5.xlarge';

    /**
     * r5a.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_12XLARGE = 'r5a.12xlarge';

    /**
     * r5a.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 12 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_16XLARGE = 'r5a.16xlarge';

    /**
     * r5a.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_24XLARGE = 'r5a.24xlarge';

    /**
     * r5a.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_2XLARGE = 'r5a.2xlarge';

    /**
     * r5a.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_4XLARGE = 'r5a.4xlarge';

    /**
     * r5a.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_8XLARGE = 'r5a.8xlarge';

    /**
     * r5a.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_LARGE = 'r5a.large';

    /**
     * r5a.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5A_XLARGE = 'r5a.xlarge';

    /**
     * r5ad.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_12XLARGE = 'r5ad.12xlarge';

    /**
     * r5ad.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 12 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_16XLARGE = 'r5ad.16xlarge';

    /**
     * r5ad.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 20 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_24XLARGE = 'r5ad.24xlarge';

    /**
     * r5ad.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_2XLARGE = 'r5ad.2xlarge';

    /**
     * r5ad.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_4XLARGE = 'r5ad.4xlarge';

    /**
     * r5ad.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_8XLARGE = 'r5ad.8xlarge';

    /**
     * r5ad.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_LARGE = 'r5ad.large';

    /**
     * r5ad.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5AD_XLARGE = 'r5ad.xlarge';

    /**
     * r5b
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R5B = 'r5b';

    /**
     * r5b.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_12XLARGE = 'r5b.12xlarge';

    /**
     * r5b.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_16XLARGE = 'r5b.16xlarge';

    /**
     * r5b.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_24XLARGE = 'r5b.24xlarge';

    /**
     * r5b.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_2XLARGE = 'r5b.2xlarge';

    /**
     * r5b.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_4XLARGE = 'r5b.4xlarge';

    /**
     * r5b.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_8XLARGE = 'r5b.8xlarge';

    /**
     * r5b.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_LARGE = 'r5b.large';

    /**
     * r5b.metal
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_METAL = 'r5b.metal';

    /**
     * r5b.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5B_XLARGE = 'r5b.xlarge';

    /**
     * r5d
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R5D = 'r5d';

    /**
     * r5d.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_12XLARGE = 'r5d.12xlarge';

    /**
     * r5d.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 20 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_16XLARGE = 'r5d.16xlarge';

    /**
     * r5d.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_24XLARGE = 'r5d.24xlarge';

    /**
     * r5d.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_2XLARGE = 'r5d.2xlarge';

    /**
     * r5d.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_4XLARGE = 'r5d.4xlarge';

    /**
     * r5d.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_8XLARGE = 'r5d.8xlarge';

    /**
     * r5d.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_LARGE = 'r5d.large';

    /**
     * r5d.metal
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_METAL = 'r5d.metal';

    /**
     * r5d.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8175
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5D_XLARGE = 'r5d.xlarge';

    /**
     * r5dn
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R5DN = 'r5dn';

    /**
     * r5dn.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 900 GB NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_12XLARGE = 'r5dn.12xlarge';

    /**
     * r5dn.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_16XLARGE = 'r5dn.16xlarge';

    /**
     * r5dn.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_24XLARGE = 'r5dn.24xlarge';

    /**
     * r5dn.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_2XLARGE = 'r5dn.2xlarge';

    /**
     * r5dn.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_4XLARGE = 'r5dn.4xlarge';

    /**
     * r5dn.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 2 x 600 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_8XLARGE = 'r5dn.8xlarge';

    /**
     * r5dn.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_LARGE = 'r5dn.large';

    /**
     * r5dn.metal
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 4 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_METAL = 'r5dn.metal';

    /**
     * r5dn.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 3.1 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R5DN_XLARGE = 'r5dn.xlarge';

    /**
     * r5n
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R5N = 'r5n';

    /**
     * r5n.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_12XLARGE = 'r5n.12xlarge';

    /**
     * r5n.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_16XLARGE = 'r5n.16xlarge';

    /**
     * r5n.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_24XLARGE = 'r5n.24xlarge';

    /**
     * r5n.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_2XLARGE = 'r5n.2xlarge';

    /**
     * r5n.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_4XLARGE = 'r5n.4xlarge';

    /**
     * r5n.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_8XLARGE = 'r5n.8xlarge';

    /**
     * r5n.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_LARGE = 'r5n.large';

    /**
     * r5n.metal
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_METAL = 'r5n.metal';

    /**
     * r5n.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8259 (Cascade Lake)
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R5N_XLARGE = 'r5n.xlarge';

    /**
     * r6a
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6A = 'r6a';

    /**
     * r6a.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 18750 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_12XLARGE = 'r6a.12xlarge';

    /**
     * r6a.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_16XLARGE = 'r6a.16xlarge';

    /**
     * r6a.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 37500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_24XLARGE = 'r6a.24xlarge';

    /**
     * r6a.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_2XLARGE = 'r6a.2xlarge';

    /**
     * r6a.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_32XLARGE = 'r6a.32xlarge';

    /**
     * r6a.48xlarge
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_48XLARGE = 'r6a.48xlarge';

    /**
     * r6a.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_4XLARGE = 'r6a.4xlarge';

    /**
     * r6a.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_8XLARGE = 'r6a.8xlarge';

    /**
     * r6a.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_LARGE = 'r6a.large';

    /**
     * r6a.metal
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_METAL = 'r6a.metal';

    /**
     * r6a.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 7R13 Processor
     * - Clock Speed: 3.6 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6A_XLARGE = 'r6a.xlarge';

    /**
     * r6g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6G = 'r6g';

    /**
     * r6g.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_12XLARGE = 'r6g.12xlarge';

    /**
     * r6g.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_16XLARGE = 'r6g.16xlarge';

    /**
     * r6g.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_2XLARGE = 'r6g.2xlarge';

    /**
     * r6g.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_4XLARGE = 'r6g.4xlarge';

    /**
     * r6g.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_8XLARGE = 'r6g.8xlarge';

    /**
     * r6g.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_LARGE = 'r6g.large';

    /**
     * r6g.medium
     * - vCPUs: 1
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_MEDIUM = 'r6g.medium';

    /**
     * r6g.metal
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_METAL = 'r6g.metal';

    /**
     * r6g.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6G_XLARGE = 'r6g.xlarge';

    /**
     * r6gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6GD = 'r6gd';

    /**
     * r6gd.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_12XLARGE = 'r6gd.12xlarge';

    /**
     * r6gd.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_16XLARGE = 'r6gd.16xlarge';

    /**
     * r6gd.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_2XLARGE = 'r6gd.2xlarge';

    /**
     * r6gd.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_4XLARGE = 'r6gd.4xlarge';

    /**
     * r6gd.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_8XLARGE = 'r6gd.8xlarge';

    /**
     * r6gd.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_LARGE = 'r6gd.large';

    /**
     * r6gd.medium
     * - vCPUs: 1
     * - Memory: 8 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_MEDIUM = 'r6gd.medium';

    /**
     * r6gd.metal
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_METAL = 'r6gd.metal';

    /**
     * r6gd.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6GD_XLARGE = 'r6gd.xlarge';

    /**
     * r6i
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6I = 'r6i';

    /**
     * r6i.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_12XLARGE = 'r6i.12xlarge';

    /**
     * r6i.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_16XLARGE = 'r6i.16xlarge';

    /**
     * r6i.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_24XLARGE = 'r6i.24xlarge';

    /**
     * r6i.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_2XLARGE = 'r6i.2xlarge';

    /**
     * r6i.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_32XLARGE = 'r6i.32xlarge';

    /**
     * r6i.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_4XLARGE = 'r6i.4xlarge';

    /**
     * r6i.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_8XLARGE = 'r6i.8xlarge';

    /**
     * r6i.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_LARGE = 'r6i.large';

    /**
     * r6i.metal
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_METAL = 'r6i.metal';

    /**
     * r6i.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6I_XLARGE = 'r6i.xlarge';

    /**
     * r6id
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6ID = 'r6id';

    /**
     * r6id.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_12XLARGE = 'r6id.12xlarge';

    /**
     * r6id.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_16XLARGE = 'r6id.16xlarge';

    /**
     * r6id.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_24XLARGE = 'r6id.24xlarge';

    /**
     * r6id.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 474 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_2XLARGE = 'r6id.2xlarge';

    /**
     * r6id.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_32XLARGE = 'r6id.32xlarge';

    /**
     * r6id.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_4XLARGE = 'r6id.4xlarge';

    /**
     * r6id.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_8XLARGE = 'r6id.8xlarge';

    /**
     * r6id.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_LARGE = 'r6id.large';

    /**
     * r6id.metal
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_METAL = 'r6id.metal';

    /**
     * r6id.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6ID_XLARGE = 'r6id.xlarge';

    /**
     * r6idn
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6IDN = 'r6idn';

    /**
     * r6idn.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_12XLARGE = 'r6idn.12xlarge';

    /**
     * r6idn.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 100000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_16XLARGE = 'r6idn.16xlarge';

    /**
     * r6idn.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 150000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_24XLARGE = 'r6idn.24xlarge';

    /**
     * r6idn.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 40000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 474 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_2XLARGE = 'r6idn.2xlarge';

    /**
     * r6idn.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_32XLARGE = 'r6idn.32xlarge';

    /**
     * r6idn.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_4XLARGE = 'r6idn.4xlarge';

    /**
     * r6idn.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_8XLARGE = 'r6idn.8xlarge';

    /**
     * r6idn.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_LARGE = 'r6idn.large';

    /**
     * r6idn.metal
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_METAL = 'r6idn.metal';

    /**
     * r6idn.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 30000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R6IDN_XLARGE = 'r6idn.xlarge';

    /**
     * r6in
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R6IN = 'r6in';

    /**
     * r6in.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 75000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_12XLARGE = 'r6in.12xlarge';

    /**
     * r6in.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 100000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_16XLARGE = 'r6in.16xlarge';

    /**
     * r6in.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 150000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_24XLARGE = 'r6in.24xlarge';

    /**
     * r6in.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 40000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_2XLARGE = 'r6in.2xlarge';

    /**
     * r6in.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_32XLARGE = 'r6in.32xlarge';

    /**
     * r6in.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_4XLARGE = 'r6in.4xlarge';

    /**
     * r6in.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_8XLARGE = 'r6in.8xlarge';

    /**
     * r6in.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 25000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_LARGE = 'r6in.large';

    /**
     * r6in.metal
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 200000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_METAL = 'r6in.metal';

    /**
     * r6in.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 30000 Megabit
     * - Processor: Intel Xeon 8375C (Ice Lake)
     * - Clock Speed: 3.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R6IN_XLARGE = 'r6in.xlarge';

    /**
     * r7a
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R7A = 'r7a';

    /**
     * r7a.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 18750 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_12XLARGE = 'r7a.12xlarge';

    /**
     * r7a.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_16XLARGE = 'r7a.16xlarge';

    /**
     * r7a.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 37500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_24XLARGE = 'r7a.24xlarge';

    /**
     * r7a.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_2XLARGE = 'r7a.2xlarge';

    /**
     * r7a.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_32XLARGE = 'r7a.32xlarge';

    /**
     * r7a.48xlarge
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_48XLARGE = 'r7a.48xlarge';

    /**
     * r7a.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_4XLARGE = 'r7a.4xlarge';

    /**
     * r7a.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_8XLARGE = 'r7a.8xlarge';

    /**
     * r7a.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_LARGE = 'r7a.large';

    /**
     * r7a.medium
     * - vCPUs: 1
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_MEDIUM = 'r7a.medium';

    /**
     * r7a.metal-48xl
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50000 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_METAL_48XL = 'r7a.metal-48xl';

    /**
     * r7a.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AMD EPYC 9R14 Processor
     * - Clock Speed: Up to 3.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7A_XLARGE = 'r7a.xlarge';

    /**
     * r7g
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R7G = 'r7g';

    /**
     * r7g.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 22500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_12XLARGE = 'r7g.12xlarge';

    /**
     * r7g.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_16XLARGE = 'r7g.16xlarge';

    /**
     * r7g.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_2XLARGE = 'r7g.2xlarge';

    /**
     * r7g.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_4XLARGE = 'r7g.4xlarge';

    /**
     * r7g.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_8XLARGE = 'r7g.8xlarge';

    /**
     * r7g.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_LARGE = 'r7g.large';

    /**
     * r7g.medium
     * - vCPUs: 1
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_MEDIUM = 'r7g.medium';

    /**
     * r7g.metal
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_METAL = 'r7g.metal';

    /**
     * r7g.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7G_XLARGE = 'r7g.xlarge';

    /**
     * r7gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R7GD = 'r7gd';

    /**
     * r7gd.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 22500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_12XLARGE = 'r7gd.12xlarge';

    /**
     * r7gd.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_16XLARGE = 'r7gd.16xlarge';

    /**
     * r7gd.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_2XLARGE = 'r7gd.2xlarge';

    /**
     * r7gd.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_4XLARGE = 'r7gd.4xlarge';

    /**
     * r7gd.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_8XLARGE = 'r7gd.8xlarge';

    /**
     * r7gd.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_LARGE = 'r7gd.large';

    /**
     * r7gd.medium
     * - vCPUs: 1
     * - Memory: 8 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_MEDIUM = 'r7gd.medium';

    /**
     * r7gd.metal
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_METAL = 'r7gd.metal';

    /**
     * r7gd.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: AWS Graviton3 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly R7GD_XLARGE = 'r7gd.xlarge';

    /**
     * r7i
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R7I = 'r7i';

    /**
     * r7i.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 18750 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_12XLARGE = 'r7i.12xlarge';

    /**
     * r7i.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_16XLARGE = 'r7i.16xlarge';

    /**
     * r7i.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_24XLARGE = 'r7i.24xlarge';

    /**
     * r7i.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_2XLARGE = 'r7i.2xlarge';

    /**
     * r7i.48xlarge
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_48XLARGE = 'r7i.48xlarge';

    /**
     * r7i.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_4XLARGE = 'r7i.4xlarge';

    /**
     * r7i.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_8XLARGE = 'r7i.8xlarge';

    /**
     * r7i.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_LARGE = 'r7i.large';

    /**
     * r7i.metal-24xl
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 37500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_METAL_24XL = 'r7i.metal-24xl';

    /**
     * r7i.metal-48xl
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_METAL_48XL = 'r7i.metal-48xl';

    /**
     * r7i.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.2 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7I_XLARGE = 'r7i.xlarge';

    /**
     * r7iz
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R7IZ = 'r7iz';

    /**
     * r7iz.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_12XLARGE = 'r7iz.12xlarge';

    /**
     * r7iz.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_16XLARGE = 'r7iz.16xlarge';

    /**
     * r7iz.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_2XLARGE = 'r7iz.2xlarge';

    /**
     * r7iz.32xlarge
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_32XLARGE = 'r7iz.32xlarge';

    /**
     * r7iz.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_4XLARGE = 'r7iz.4xlarge';

    /**
     * r7iz.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_8XLARGE = 'r7iz.8xlarge';

    /**
     * r7iz.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_LARGE = 'r7iz.large';

    /**
     * r7iz.metal-16xl
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_METAL_16XL = 'r7iz.metal-16xl';

    /**
     * r7iz.metal-32xl
     * - vCPUs: 128
     * - Memory: 1024 GiB
     * - Network: 50000 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_METAL_32XL = 'r7iz.metal-32xl';

    /**
     * r7iz.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12500 Megabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 3.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R7IZ_XLARGE = 'r7iz.xlarge';

    /**
     * r8g
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly R8G = 'r8g';

    /**
     * r8g.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 22.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_12XLARGE = 'r8g.12xlarge';

    /**
     * r8g.16xlarge
     * - vCPUs: 64
     * - Memory: 512 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_16XLARGE = 'r8g.16xlarge';

    /**
     * r8g.24xlarge
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_24XLARGE = 'r8g.24xlarge';

    /**
     * r8g.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_2XLARGE = 'r8g.2xlarge';

    /**
     * r8g.48xlarge
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_48XLARGE = 'r8g.48xlarge';

    /**
     * r8g.4xlarge
     * - vCPUs: 16
     * - Memory: 128 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_4XLARGE = 'r8g.4xlarge';

    /**
     * r8g.8xlarge
     * - vCPUs: 32
     * - Memory: 256 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_8XLARGE = 'r8g.8xlarge';

    /**
     * r8g.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_LARGE = 'r8g.large';

    /**
     * r8g.medium
     * - vCPUs: 1
     * - Memory: 8 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_MEDIUM = 'r8g.medium';

    /**
     * r8g.metal-24xl
     * - vCPUs: 96
     * - Memory: 768 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_METAL_24XL = 'r8g.metal-24xl';

    /**
     * r8g.metal-48xl
     * - vCPUs: 192
     * - Memory: 1536 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_METAL_48XL = 'r8g.metal-48xl';

    /**
     * r8g.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly R8G_XLARGE = 'r8g.xlarge';

    /**
     * t1.micro
     * - vCPUs: 1
     * - Memory: 0.613 GiB
     * - Network: Very Low
     * - Processor: Variable
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T1_MICRO = 't1.micro';

    /**
     * t2.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_2XLARGE = 't2.2xlarge';

    /**
     * t2.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Low to Moderate
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_LARGE = 't2.large';

    /**
     * t2.medium
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Low to Moderate
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_MEDIUM = 't2.medium';

    /**
     * t2.micro
     * - vCPUs: 1
     * - Memory: 1 GiB
     * - Network: Low to Moderate
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_MICRO = 't2.micro';

    /**
     * t2.nano
     * - vCPUs: 1
     * - Memory: 0.5 GiB
     * - Network: Low
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_NANO = 't2.nano';

    /**
     * t2.small
     * - vCPUs: 1
     * - Memory: 2 GiB
     * - Network: Low to Moderate
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_SMALL = 't2.small';

    /**
     * t2.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Moderate
     * - Processor: Intel Xeon Family
     * - Clock Speed: Up to 3.3 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T2_XLARGE = 't2.xlarge';

    /**
     * t3
     * - vCPUs: 8
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly T3 = 't3';

    /**
     * t3.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_2XLARGE = 't3.2xlarge';

    /**
     * t3.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_LARGE = 't3.large';

    /**
     * t3.medium
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_MEDIUM = 't3.medium';

    /**
     * t3.micro
     * - vCPUs: 2
     * - Memory: 1 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_MICRO = 't3.micro';

    /**
     * t3.nano
     * - vCPUs: 2
     * - Memory: 0.5 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_NANO = 't3.nano';

    /**
     * t3.small
     * - vCPUs: 2
     * - Memory: 2 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_SMALL = 't3.small';

    /**
     * t3.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: Intel Skylake E5 2686 v5
     * - Clock Speed: 3.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3_XLARGE = 't3.xlarge';

    /**
     * t3a.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_2XLARGE = 't3a.2xlarge';

    /**
     * t3a.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_LARGE = 't3a.large';

    /**
     * t3a.medium
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_MEDIUM = 't3a.medium';

    /**
     * t3a.micro
     * - vCPUs: 2
     * - Memory: 1 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_MICRO = 't3a.micro';

    /**
     * t3a.nano
     * - vCPUs: 2
     * - Memory: 0.5 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_NANO = 't3a.nano';

    /**
     * t3a.small
     * - vCPUs: 2
     * - Memory: 2 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_SMALL = 't3a.small';

    /**
     * t3a.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AMD EPYC 7571
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T3A_XLARGE = 't3a.xlarge';

    /**
     * t4g.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_2XLARGE = 't4g.2xlarge';

    /**
     * t4g.large
     * - vCPUs: 2
     * - Memory: 8 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_LARGE = 't4g.large';

    /**
     * t4g.medium
     * - vCPUs: 2
     * - Memory: 4 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_MEDIUM = 't4g.medium';

    /**
     * t4g.micro
     * - vCPUs: 2
     * - Memory: 1 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_MICRO = 't4g.micro';

    /**
     * t4g.nano
     * - vCPUs: 2
     * - Memory: 0.5 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_NANO = 't4g.nano';

    /**
     * t4g.small
     * - vCPUs: 2
     * - Memory: 2 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_SMALL = 't4g.small';

    /**
     * t4g.xlarge
     * - vCPUs: 4
     * - Memory: 16 GiB
     * - Network: Up to 5 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly T4G_XLARGE = 't4g.xlarge';

    /**
     * trn1
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: Up to 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly TRN1 = 'trn1';

    /**
     * trn1.2xlarge
     * - vCPUs: 8
     * - Memory: 32 GiB
     * - Network: 12500 Megabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: Up to 3.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: 32 GB
     */
    public static readonly TRN1_2XLARGE = 'trn1.2xlarge';

    /**
     * trn1.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 800 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: Up to 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: 512 GB
     */
    public static readonly TRN1_32XLARGE = 'trn1.32xlarge';

    /**
     * trn1n.32xlarge
     * - vCPUs: 128
     * - Memory: 512 GiB
     * - Network: 1600 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 4 x 1900 NVMe SSD
     * - GPU Memory: 512 GB
     */
    public static readonly TRN1N_32XLARGE = 'trn1n.32xlarge';

    /**
     * u-12tb1
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U_12TB1 = 'u-12tb1';

    /**
     * u-12tb1.112xlarge
     * - vCPUs: 448
     * - Memory: 12288 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_12TB1_112XLARGE = 'u-12tb1.112xlarge';

    /**
     * u-12tb1.metal
     * - vCPUs: 448
     * - Memory: 12288 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_12TB1_METAL = 'u-12tb1.metal';

    /**
     * u-18tb1
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8280L (Cascade Lake)
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U_18TB1 = 'u-18tb1';

    /**
     * u-18tb1.112xlarge
     * - vCPUs: 448
     * - Memory: 18432 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8280L (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_18TB1_112XLARGE = 'u-18tb1.112xlarge';

    /**
     * u-18tb1.metal
     * - vCPUs: 448
     * - Memory: 18432 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8280L (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_18TB1_METAL = 'u-18tb1.metal';

    /**
     * u-24tb1
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8280L (Cascade Lake)
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U_24TB1 = 'u-24tb1';

    /**
     * u-24tb1.112xlarge
     * - vCPUs: 448
     * - Memory: 24576 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8280L (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_24TB1_112XLARGE = 'u-24tb1.112xlarge';

    /**
     * u-24tb1.metal
     * - vCPUs: 448
     * - Memory: 24576 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8280L (Cascade Lake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_24TB1_METAL = 'u-24tb1.metal';

    /**
     * u-3tb1.56xlarge
     * - vCPUs: 224
     * - Memory: 3072 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Clock Speed: 2.1 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_3TB1_56XLARGE = 'u-3tb1.56xlarge';

    /**
     * u-6tb1
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U_6TB1 = 'u-6tb1';

    /**
     * u-6tb1.112xlarge
     * - vCPUs: 448
     * - Memory: 6144 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_6TB1_112XLARGE = 'u-6tb1.112xlarge';

    /**
     * u-6tb1.56xlarge
     * - vCPUs: 224
     * - Memory: 6144 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_6TB1_56XLARGE = 'u-6tb1.56xlarge';

    /**
     * u-6tb1.metal
     * - vCPUs: 448
     * - Memory: 6144 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_6TB1_METAL = 'u-6tb1.metal';

    /**
     * u-9tb1
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U_9TB1 = 'u-9tb1';

    /**
     * u-9tb1.112xlarge
     * - vCPUs: 448
     * - Memory: 9216 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_9TB1_112XLARGE = 'u-9tb1.112xlarge';

    /**
     * u-9tb1.metal
     * - vCPUs: 448
     * - Memory: 9216 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Skylake)
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U_9TB1_METAL = 'u-9tb1.metal';

    /**
     * u7i-12tb
     * - vCPUs: 896
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U7I_12TB = 'u7i-12tb';

    /**
     * u7i-12tb.224xlarge
     * - vCPUs: 896
     * - Memory: 12288 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U7I_12TB_224XLARGE = 'u7i-12tb.224xlarge';

    /**
     * u7i-6tb
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U7I_6TB = 'u7i-6tb';

    /**
     * u7i-6tb.112xlarge
     * - vCPUs: 448
     * - Memory: 6144 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U7I_6TB_112XLARGE = 'u7i-6tb.112xlarge';

    /**
     * u7i-8tb
     * - vCPUs: 448
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U7I_8TB = 'u7i-8tb';

    /**
     * u7i-8tb.112xlarge
     * - vCPUs: 448
     * - Memory: 8192 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U7I_8TB_112XLARGE = 'u7i-8tb.112xlarge';

    /**
     * u7in-16tb
     * - vCPUs: 896
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U7IN_16TB = 'u7in-16tb';

    /**
     * u7in-16tb.224xlarge
     * - vCPUs: 896
     * - Memory: 16384 GiB
     * - Network: 200 Gigabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U7IN_16TB_224XLARGE = 'u7in-16tb.224xlarge';

    /**
     * u7in-24tb
     * - vCPUs: 896
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U7IN_24TB = 'u7in-24tb';

    /**
     * u7in-24tb.224xlarge
     * - vCPUs: 896
     * - Memory: 24576 GiB
     * - Network: 200 Gigabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U7IN_24TB_224XLARGE = 'u7in-24tb.224xlarge';

    /**
     * u7in-32tb
     * - vCPUs: 896
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly U7IN_32TB = 'u7in-32tb';

    /**
     * u7in-32tb.224xlarge
     * - vCPUs: 896
     * - Memory: 32768 GiB
     * - Network: 200 Gigabit
     * - Processor: Intel Xeon Scalable (Sapphire Rapids)
     * - Clock Speed: 2.9 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly U7IN_32TB_224XLARGE = 'u7in-32tb.224xlarge';

    /**
     * vt1
     * - vCPUs: 96
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8259CL
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly VT1 = 'vt1';

    /**
     * vt1.24xlarge
     * - vCPUs: 96
     * - Memory: 192 GiB
     * - Network: 25000 Megabit
     * - Processor: Intel Xeon Platinum 8259CL
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly VT1_24XLARGE = 'vt1.24xlarge';

    /**
     * vt1.3xlarge
     * - vCPUs: 12
     * - Memory: 24 GiB
     * - Network: 3125 Megabit
     * - Processor: Intel Xeon Platinum 8259CL
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly VT1_3XLARGE = 'vt1.3xlarge';

    /**
     * vt1.6xlarge
     * - vCPUs: 24
     * - Memory: 48 GiB
     * - Network: 6250 Megabit
     * - Processor: Intel Xeon Platinum 8259CL
     * - Clock Speed: 2.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly VT1_6XLARGE = 'vt1.6xlarge';

    /**
     * x1
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X1 = 'x1';

    /**
     * x1.16xlarge
     * - vCPUs: 64
     * - Memory: 976 GiB
     * - Network: High
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 1920 SSD
     * - GPU Memory: NA
     */
    public static readonly X1_16XLARGE = 'x1.16xlarge';

    /**
     * x1.32xlarge
     * - vCPUs: 128
     * - Memory: 1952 GiB
     * - Network: High
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 2 x 1920 SSD
     * - GPU Memory: NA
     */
    public static readonly X1_32XLARGE = 'x1.32xlarge';

    /**
     * x1e
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X1E = 'x1e';

    /**
     * x1e.16xlarge
     * - vCPUs: 64
     * - Memory: 1952 GiB
     * - Network: 10 Gigabit
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 1920 SSD
     * - GPU Memory: NA
     */
    public static readonly X1E_16XLARGE = 'x1e.16xlarge';

    /**
     * x1e.2xlarge
     * - vCPUs: 8
     * - Memory: 244 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 240 SSD
     * - GPU Memory: NA
     */
    public static readonly X1E_2XLARGE = 'x1e.2xlarge';

    /**
     * x1e.32xlarge
     * - vCPUs: 128
     * - Memory: 3904 GiB
     * - Network: 25 Gigabit
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 2 x 1920 SSD
     * - GPU Memory: NA
     */
    public static readonly X1E_32XLARGE = 'x1e.32xlarge';

    /**
     * x1e.4xlarge
     * - vCPUs: 16
     * - Memory: 488 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 480 SSD
     * - GPU Memory: NA
     */
    public static readonly X1E_4XLARGE = 'x1e.4xlarge';

    /**
     * x1e.8xlarge
     * - vCPUs: 32
     * - Memory: 976 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 960 SSD
     * - GPU Memory: NA
     */
    public static readonly X1E_8XLARGE = 'x1e.8xlarge';

    /**
     * x1e.xlarge
     * - vCPUs: 4
     * - Memory: 122 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: High Frequency Intel Xeon E7-8880 v3 (Haswell)
     * - Clock Speed: 2.3 GHz
     * - Storage: 1 x 120 SSD
     * - GPU Memory: NA
     */
    public static readonly X1E_XLARGE = 'x1e.xlarge';

    /**
     * x2gd
     * - vCPUs: 64
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X2GD = 'x2gd';

    /**
     * x2gd.12xlarge
     * - vCPUs: 48
     * - Memory: 768 GiB
     * - Network: 20 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1425 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_12XLARGE = 'x2gd.12xlarge';

    /**
     * x2gd.16xlarge
     * - vCPUs: 64
     * - Memory: 1024 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_16XLARGE = 'x2gd.16xlarge';

    /**
     * x2gd.2xlarge
     * - vCPUs: 8
     * - Memory: 128 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 474 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_2XLARGE = 'x2gd.2xlarge';

    /**
     * x2gd.4xlarge
     * - vCPUs: 16
     * - Memory: 256 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 950 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_4XLARGE = 'x2gd.4xlarge';

    /**
     * x2gd.8xlarge
     * - vCPUs: 32
     * - Memory: 512 GiB
     * - Network: 12 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 1900 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_8XLARGE = 'x2gd.8xlarge';

    /**
     * x2gd.large
     * - vCPUs: 2
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 118 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_LARGE = 'x2gd.large';

    /**
     * x2gd.medium
     * - vCPUs: 1
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 59 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_MEDIUM = 'x2gd.medium';

    /**
     * x2gd.metal
     * - vCPUs: 64
     * - Memory: 1024 GiB
     * - Network: 25 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 2 x 1900 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_METAL = 'x2gd.metal';

    /**
     * x2gd.xlarge
     * - vCPUs: 4
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: AWS Graviton2 Processor
     * - Clock Speed: 2.5 GHz
     * - Storage: 1 x 237 SSD
     * - GPU Memory: NA
     */
    public static readonly X2GD_XLARGE = 'x2gd.xlarge';

    /**
     * x2idn
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X2IDN = 'x2idn';

    /**
     * x2idn.16xlarge
     * - vCPUs: 64
     * - Memory: 1024 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IDN_16XLARGE = 'x2idn.16xlarge';

    /**
     * x2idn.24xlarge
     * - vCPUs: 96
     * - Memory: 1536 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IDN_24XLARGE = 'x2idn.24xlarge';

    /**
     * x2idn.32xlarge
     * - vCPUs: 128
     * - Memory: 2048 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IDN_32XLARGE = 'x2idn.32xlarge';

    /**
     * x2idn.metal
     * - vCPUs: 128
     * - Memory: 2048 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IDN_METAL = 'x2idn.metal';

    /**
     * x2iedn
     * - vCPUs: 128
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X2IEDN = 'x2iedn';

    /**
     * x2iedn.16xlarge
     * - vCPUs: 64
     * - Memory: 2048 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_16XLARGE = 'x2iedn.16xlarge';

    /**
     * x2iedn.24xlarge
     * - vCPUs: 96
     * - Memory: 3072 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1425 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_24XLARGE = 'x2iedn.24xlarge';

    /**
     * x2iedn.2xlarge
     * - vCPUs: 8
     * - Memory: 256 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 237 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_2XLARGE = 'x2iedn.2xlarge';

    /**
     * x2iedn.32xlarge
     * - vCPUs: 128
     * - Memory: 4096 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_32XLARGE = 'x2iedn.32xlarge';

    /**
     * x2iedn.4xlarge
     * - vCPUs: 16
     * - Memory: 512 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 475 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_4XLARGE = 'x2iedn.4xlarge';

    /**
     * x2iedn.8xlarge
     * - vCPUs: 32
     * - Memory: 1024 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 950 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_8XLARGE = 'x2iedn.8xlarge';

    /**
     * x2iedn.metal
     * - vCPUs: 128
     * - Memory: 4096 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 2 x 1900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_METAL = 'x2iedn.metal';

    /**
     * x2iedn.xlarge
     * - vCPUs: 4
     * - Memory: 128 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Scalable (Icelake)
     * - Clock Speed: 3.5 GHz
     * - Storage: 1 x 118 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly X2IEDN_XLARGE = 'x2iedn.xlarge';

    /**
     * x2iezn
     * - vCPUs: 48
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X2IEZN = 'x2iezn';

    /**
     * x2iezn.12xlarge
     * - vCPUs: 48
     * - Memory: 1536 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X2IEZN_12XLARGE = 'x2iezn.12xlarge';

    /**
     * x2iezn.2xlarge
     * - vCPUs: 8
     * - Memory: 256 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X2IEZN_2XLARGE = 'x2iezn.2xlarge';

    /**
     * x2iezn.4xlarge
     * - vCPUs: 16
     * - Memory: 512 GiB
     * - Network: Up to 25 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X2IEZN_4XLARGE = 'x2iezn.4xlarge';

    /**
     * x2iezn.6xlarge
     * - vCPUs: 24
     * - Memory: 768 GiB
     * - Network: 50 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X2IEZN_6XLARGE = 'x2iezn.6xlarge';

    /**
     * x2iezn.8xlarge
     * - vCPUs: 32
     * - Memory: 1024 GiB
     * - Network: 75 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X2IEZN_8XLARGE = 'x2iezn.8xlarge';

    /**
     * x2iezn.metal
     * - vCPUs: 48
     * - Memory: 1536 GiB
     * - Network: 100 Gigabit
     * - Processor: Intel Xeon Platinum 8252
     * - Clock Speed: 4.5 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X2IEZN_METAL = 'x2iezn.metal';

    /**
     * x8g
     * - vCPUs: 192
     * - Memory: NA
     * - Network: NA
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly X8G = 'x8g';

    /**
     * x8g.12xlarge
     * - vCPUs: 48
     * - Memory: 768 GiB
     * - Network: 22.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_12XLARGE = 'x8g.12xlarge';

    /**
     * x8g.16xlarge
     * - vCPUs: 64
     * - Memory: 1024 GiB
     * - Network: 30 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_16XLARGE = 'x8g.16xlarge';

    /**
     * x8g.24xlarge
     * - vCPUs: 96
     * - Memory: 1536 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_24XLARGE = 'x8g.24xlarge';

    /**
     * x8g.2xlarge
     * - vCPUs: 8
     * - Memory: 128 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_2XLARGE = 'x8g.2xlarge';

    /**
     * x8g.48xlarge
     * - vCPUs: 192
     * - Memory: 3072 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_48XLARGE = 'x8g.48xlarge';

    /**
     * x8g.4xlarge
     * - vCPUs: 16
     * - Memory: 256 GiB
     * - Network: Up to 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_4XLARGE = 'x8g.4xlarge';

    /**
     * x8g.8xlarge
     * - vCPUs: 32
     * - Memory: 512 GiB
     * - Network: 15 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_8XLARGE = 'x8g.8xlarge';

    /**
     * x8g.large
     * - vCPUs: 2
     * - Memory: 32 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_LARGE = 'x8g.large';

    /**
     * x8g.medium
     * - vCPUs: 1
     * - Memory: 16 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_MEDIUM = 'x8g.medium';

    /**
     * x8g.metal-24xl
     * - vCPUs: 96
     * - Memory: 1536 GiB
     * - Network: 40 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_METAL_24XL = 'x8g.metal-24xl';

    /**
     * x8g.metal-48xl
     * - vCPUs: 192
     * - Memory: 3072 GiB
     * - Network: 50 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_METAL_48XL = 'x8g.metal-48xl';

    /**
     * x8g.xlarge
     * - vCPUs: 4
     * - Memory: 64 GiB
     * - Network: Up to 12.5 Gigabit
     * - Processor: AWS Graviton4 Processor
     * - Clock Speed: 2.7 GHz
     * - Storage: EBS only
     * - GPU Memory: NA
     */
    public static readonly X8G_XLARGE = 'x8g.xlarge';

    /**
     * z1d
     * - vCPUs: 48
     * - Memory: NA
     * - Network: NA
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: NA
     * - GPU Memory: NA
     */
    public static readonly Z1D = 'z1d';

    /**
     * z1d.12xlarge
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_12XLARGE = 'z1d.12xlarge';

    /**
     * z1d.2xlarge
     * - vCPUs: 8
     * - Memory: 64 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 300 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_2XLARGE = 'z1d.2xlarge';

    /**
     * z1d.3xlarge
     * - vCPUs: 12
     * - Memory: 96 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 450 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_3XLARGE = 'z1d.3xlarge';

    /**
     * z1d.6xlarge
     * - vCPUs: 24
     * - Memory: 192 GiB
     * - Network: 10 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_6XLARGE = 'z1d.6xlarge';

    /**
     * z1d.large
     * - vCPUs: 2
     * - Memory: 16 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 75 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_LARGE = 'z1d.large';

    /**
     * z1d.metal
     * - vCPUs: 48
     * - Memory: 384 GiB
     * - Network: 25 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 2 x 900 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_METAL = 'z1d.metal';

    /**
     * z1d.xlarge
     * - vCPUs: 4
     * - Memory: 32 GiB
     * - Network: Up to 10 Gigabit
     * - Processor: Intel Xeon Platinum 8151
     * - Clock Speed: 4 GHz
     * - Storage: 1 x 150 NVMe SSD
     * - GPU Memory: NA
     */
    public static readonly Z1D_XLARGE = 'z1d.xlarge';

    private constructor() {} // Prevents instantiation
}
/** End EC2 Instance Type */
