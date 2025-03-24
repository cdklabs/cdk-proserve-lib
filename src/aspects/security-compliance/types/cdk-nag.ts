export interface CdkNagSuppression {
    id: string;
    reason: string;
    appliesTo?: string[];
}

export interface CdkNagRulesToSuppress {
    rules_to_suppress: CdkNagSuppression[];
}

export interface CdkNagMetadata {
    cdk_nag?: CdkNagRulesToSuppress;
}
